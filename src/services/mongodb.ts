import { MongoClient, Db, ObjectId } from 'mongodb';

// MongoDB connection
const MONGODB_URI = 'http://localhost:27017';
const DB_NAME = 'trustabee';

let client: MongoClient | null = null;
let db: Db | null = null;

// Collection names
const COLLECTIONS = {
  USERS: 'users',
  ORDERS: 'orders',
  SAMPLES: 'samples',
} as const;

export const connectDB = async () => {
  if (db) {
    return db; // Return existing connection if available
  }

  try {
    client = await MongoClient.connect(MONGODB_URI);
    db = client.db(DB_NAME);
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('Successfully connected to MongoDB');
    
    // Set up collections with validation
    await setupCollections();
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Reset connection variables on error
    client = null;
    db = null;
    throw error;
  }
};

const setupCollections = async () => {
  if (!db) throw new Error('Database not initialized');

  try {
    // Users collection
    await db.createCollection(COLLECTIONS.USERS, {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'name', 'role', 'password', 'createdAt'],
          properties: {
            email: {
              bsonType: 'string',
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            },
            name: { bsonType: 'string' },
            role: { enum: ['client', 'farmer', 'admin'] },
            password: { bsonType: 'string' },
            createdAt: { bsonType: 'date' }
          }
        }
      }
    });

    // Orders collection
    await db.createCollection(COLLECTIONS.ORDERS, {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'items', 'total', 'status', 'createdAt', 'updatedAt'],
          properties: {
            userId: { bsonType: 'string' },
            items: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['productId', 'quantity', 'price'],
                properties: {
                  productId: { bsonType: 'string' },
                  quantity: { bsonType: 'int', minimum: 1 },
                  price: { bsonType: 'double', minimum: 0 }
                }
              }
            },
            total: { bsonType: 'double', minimum: 0 },
            status: { enum: ['pending', 'processing', 'shipped', 'delivered'] },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });

    // Samples collection
    await db.createCollection(COLLECTIONS.SAMPLES, {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['farmerId', 'honeyType', 'harvestDate', 'quantity', 'status', 'createdAt', 'updatedAt'],
          properties: {
            farmerId: { bsonType: 'string' },
            honeyType: { bsonType: 'string' },
            harvestDate: { bsonType: 'date' },
            quantity: { bsonType: 'string' },
            photo: { bsonType: 'string' },
            address: { bsonType: 'string' },
            collectionDate: { bsonType: 'date' },
            status: { enum: ['pending', 'collected', 'verified', 'rejected'] },
            createdAt: { bsonType: 'date' },
            updatedAt: { bsonType: 'date' }
          }
        }
      }
    });

    // Create indexes
    await db.collection(COLLECTIONS.USERS).createIndex({ email: 1 }, { unique: true });
    await db.collection(COLLECTIONS.ORDERS).createIndex({ userId: 1 });
    await db.collection(COLLECTIONS.ORDERS).createIndex({ status: 1 });
    await db.collection(COLLECTIONS.SAMPLES).createIndex({ farmerId: 1 });
    await db.collection(COLLECTIONS.SAMPLES).createIndex({ status: 1 });
    console.log('Collections and indexes set up successfully');
  } catch (error) {
    console.error('Error setting up collections:', error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return db;
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
};

// User operations
export const createUser = async (userData: {
  email: string;
  name: string;
  role: 'client' | 'farmer' | 'admin';
  password: string;
}) => {
  const db = getDB();
  try {
    const result = await db.collection(COLLECTIONS.USERS).insertOne({
      ...userData,
      createdAt: new Date(),
    });
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  const db = getDB();
  try {
    return await db.collection(COLLECTIONS.USERS).findOne({ email });
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};

export const updateUser = async (email: string, updateData: Partial<{
  name: string;
  role: 'client' | 'farmer' | 'admin';
  password: string;
}>) => {
  const db = getDB();
  return db.collection(COLLECTIONS.USERS).updateOne(
    { email },
    { 
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    }
  );
};

// Order operations
export const createOrder = async (orderData: {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}) => {
  const db = getDB();
  const result = await db.collection(COLLECTIONS.ORDERS).insertOne({
    ...orderData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
};

export const getOrdersByUser = async (userId: string) => {
  const db = getDB();
  return db.collection(COLLECTIONS.ORDERS)
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
};

export const updateOrderStatus = async (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered') => {
  const db = getDB();
  return db.collection(COLLECTIONS.ORDERS).updateOne(
    { _id: new ObjectId(orderId) },
    { 
      $set: {
        status,
        updatedAt: new Date()
      }
    }
  );
};

// Sample operations
export const createSample = async (sampleData: {
  farmerId: string;
  honeyType: string;
  harvestDate: Date;
  quantity: string;
  photo: string;
  address: string;
  collectionDate: Date;
  status: 'pending' | 'collected' | 'verified' | 'rejected';
}) => {
  const db = getDB();
  const result = await db.collection(COLLECTIONS.SAMPLES).insertOne({
    ...sampleData,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result;
};

export const getSamplesByFarmer = async (farmerId: string) => {
  const db = getDB();
  return db.collection(COLLECTIONS.SAMPLES)
    .find({ farmerId })
    .sort({ createdAt: -1 })
    .toArray();
};

export const updateSampleStatus = async (sampleId: string, status: 'pending' | 'collected' | 'verified' | 'rejected') => {
  const db = getDB();
  return db.collection(COLLECTIONS.SAMPLES).updateOne(
    { _id: new ObjectId(sampleId) },
    { 
      $set: {
        status,
        updatedAt: new Date()
      }
    }
  );
}; 