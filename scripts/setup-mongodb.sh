#!/bin/bash

# Create data directory if it doesn't exist
mkdir -p ./data/db

# Start MongoDB
echo "Starting MongoDB..."
mongod --dbpath ./data/db &

# Wait for MongoDB to start
sleep 5

# Create database and collections
echo "Setting up database..."
mongosh --eval '
use trustabee

// Create users collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "name", "role", "password", "createdAt", "updatedAt"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        name: { bsonType: "string" },
        role: { enum: ["client", "farmer", "admin"] },
        password: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create orders collection
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "items", "total", "status", "createdAt", "updatedAt"],
      properties: {
        userId: { bsonType: "string" },
        items: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["productId", "quantity", "price"],
            properties: {
              productId: { bsonType: "string" },
              quantity: { bsonType: "int", minimum: 1 },
              price: { bsonType: "double", minimum: 0 }
            }
          }
        },
        total: { bsonType: "double", minimum: 0 },
        status: { enum: ["pending", "processing", "shipped", "delivered"] },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create samples collection
db.createCollection("samples", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["farmerId", "honeyType", "harvestDate", "quantity", "status", "createdAt", "updatedAt"],
      properties: {
        farmerId: { bsonType: "string" },
        honeyType: { bsonType: "string" },
        harvestDate: { bsonType: "date" },
        quantity: { bsonType: "string" },
        photo: { bsonType: "string" },
        address: { bsonType: "string" },
        collectionDate: { bsonType: "date" },
        status: { enum: ["pending", "collected", "verified", "rejected"] },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ userId: 1 })
db.orders.createIndex({ status: 1 })
db.samples.createIndex({ farmerId: 1 })
db.samples.createIndex({ status: 1 })

print("Database setup complete!")
'

echo "MongoDB setup complete!"
echo "You can now connect to MongoDB using MongoDB Compass with the following connection string:"
echo "mongodb://localhost:27017" 