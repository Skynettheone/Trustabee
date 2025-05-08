export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'farmer' | 'admin';
  createdAt: string;
}

export interface FarmerProfile extends User {
  role: 'farmer';
  farmName: string;
  location: string;
  productionMethods: string[];
  bio: string;
  rating: number;
  verificationRate: number;
  badges: Badge[];
  profileImage?: string;
}

export interface ClientProfile extends User {
  role: 'client';
  shippingAddress: string;
  loyaltyPoints: number;
  badges: Badge[];
  profileImage?: string;
}

export interface AdminProfile extends Omit<User, 'role'> {
  role: 'admin';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
  unlockedAt?: string;
}

export interface HoneySample {
  id: string;
  farmerId: string;
  submissionDate: string;
  status: 'submitted' | 'in_verification' | 'verified' | 'rejected';
  type: string;
  harvestDate: string;
  notes: string;
  verificationNotes?: string;
  certificateId?: string;
}

export interface HoneyProduct {
  id: string;
  farmerId: string;
  sampleId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: 'g' | 'kg';
  type: string;
  harvestDate: string;
  characteristics: string[];
  images: string[];
  certificateId: string;
  rating: number;
  reviewCount: number;
}

export interface Order {
  id: string;
  clientId: string;
  products: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'verification' | 'order' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  clientId: string;
  rating: number;
  comment: string;
  createdAt: string;
}