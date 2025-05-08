import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { BeefIcon as BeeIcon, LineChart, TrendingUp, AlertCircle, Package, Star, Award, CheckCircle2 } from 'lucide-react';
import SampleSubmissionStepper, { SampleSubmission } from './SampleSubmissionStepper';
import VerificationNotice from '../../components/farmer/VerificationNotice';
import { useNavigate } from 'react-router-dom';

// Mock data
const sampleStatusData = {
  submitted: 3,
  in_verification: 2,
  verified: 15,
  rejected: 1,
};

const orderData = {
  pending: 4,
  shipped: 7,
  delivered: 35,
  total: 46,
};

const recentActivityData = [
  { id: 1, type: 'verification', message: 'Your honey sample HY-123 has been verified', time: '2 hours ago' },
  { id: 2, type: 'order', message: 'New order #5678 received for 500g Wildflower Honey', time: '5 hours ago' },
  { id: 3, type: 'review', message: 'Emily Johnson left a 5-star review on your Cinnamon Honey', time: '1 day ago' },
  { id: 4, type: 'verification', message: 'Your honey sample HY-124 is now in verification', time: '2 days ago' },
];

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getFarmerOrders, getFarmerSamples, updateSampleStatus } = useShop();
  const [activeTab, setActiveTab] = useState('overview');
  const [showStepper, setShowStepper] = useState(false);
  const navigate = useNavigate();

  if (!user || user.role !== 'farmer') {
    return <div>Loading...</div>;
  }

  const farmerOrders = getFarmerOrders(user.id);
  const farmerSamples = getFarmerSamples(user.id);

  // Calculate order statistics
  const orderStats = {
    pending: farmerOrders.filter(order => order.status === 'Pending').length,
    shipped: farmerOrders.filter(order => order.status === 'Shipped').length,
    delivered: farmerOrders.filter(order => order.status === 'Delivered').length,
    total: farmerOrders.length,
  };

  // Calculate sample statistics
  const sampleStats = {
    submitted: farmerSamples.filter(sample => sample.status === 'Waiting for Collection').length,
    in_verification: farmerSamples.filter(sample => sample.status === 'In Verification').length,
    verified: farmerSamples.filter(sample => sample.status === 'Verified').length,
    rejected: farmerSamples.filter(sample => sample.status === 'Rejected').length,
  };

  // This would typically come from your backend/state management
  const verificationStatus = {
    status: 'pending' as const,
    message: 'Your honey sample is being tested. This process typically takes 2-3 business days.',
    timestamp: new Date().toLocaleDateString()
  };

  // Mock data for export journey completion status
  // This would typically come from your backend/state management
  const exportJourneyStatus = {
    healthCertificate: true,
    sampleSubmission: true,
    qualityVerification: false
  };

  const handleSampleSubmit = (sample: Omit<SampleSubmission, 'id' | 'status' | 'submittedAt'>) => {
    // The submitSample function is now handled by the ShopContext
    setShowStepper(false);
  };

  const handleAddProduct = () => {
    // Check if all export journey steps are completed
    if (!exportJourneyStatus.healthCertificate || 
        !exportJourneyStatus.sampleSubmission || 
        !exportJourneyStatus.qualityVerification) {
      // If not completed, navigate to export journey
      navigate('/farmer/export-journey');
    } else {
      // If completed, navigate to add product
      navigate('/farmer/add-product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here's an overview of your honey export journey.</p>
        </div>

        {/* Verification Notice */}
        <div className="mb-8">
          <VerificationNotice {...verificationStatus} />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#8fce90]/10 text-[#8fce90]">
                <Package className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Export Tracking</h3>
                <p className="text-sm text-gray-500">Track your sample progress</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/farmer/export-tracking')}
              >
                View Tracking
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#8fce90]/10 text-[#8fce90]">
                <Package className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Add Product</h3>
                <p className="text-sm text-gray-500">
                  {!exportJourneyStatus.qualityVerification 
                    ? "Complete export journey to add products"
                    : "List new honey products"}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/farmer/export-journey')}
              >
                {!exportJourneyStatus.qualityVerification 
                  ? "Complete Export Journey"
                  : "Add Product"}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#8fce90]/10 text-[#8fce90]">
                <Award className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Your Badges</h3>
                <p className="text-sm text-gray-500">View achievements</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/farmer/badges')}
              >
                View Badges
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Sample Submitted</p>
                <p className="text-sm text-gray-500">Your honey sample is being tested</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <p className="text-sm font-medium text-gray-900">Health Certificate Uploaded</p>
                <p className="text-sm text-gray-500">Your certificate has been verified</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;