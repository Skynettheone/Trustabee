import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { BeefIcon as BeeIcon, LineChart, TrendingUp, AlertCircle, Package, Star, Award, CheckCircle2 } from 'lucide-react';
import SampleSubmissionStepper, { SampleSubmission } from './SampleSubmissionStepper';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [showStepper, setShowStepper] = useState(false);
  const [samples, setSamples] = useState<SampleSubmission[]>([]);

  const handleSampleSubmit = (sample: SampleSubmission) => {
    setSamples(prev => [
      {
        ...sample,
        status: 'Waiting for Collection',
        id: `SMP-${1000 + prev.length + 1}`,
        submittedAt: new Date().toISOString().slice(0, 10),
      },
      ...prev
    ]);
  };

  if (!user || user.role !== 'farmer') {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={() => {/* Navigate to samples */}}
          >
            <BeeIcon className="mr-2 h-4 w-4" />
            New Sample
          </Button>
          <Button 
            className="flex items-center"
            onClick={() => setShowStepper(true)}
          >
            <Package className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'overview' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'samples' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('samples')}
          >
            Samples
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'orders' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'analytics' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="md:col-span-3">
            <div className="p-6 flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-amber-100 text-amber-700 text-2xl font-bold mb-4 md:mb-0">
                {user.name.charAt(0)}
              </div>
              <div className="md:ml-6">
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 mt-1">Honey Farmer</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center mr-6">
                    <Star className="h-5 w-5 text-amber-500 mr-1" />
                    <span className="text-gray-900 font-medium">4.8</span>
                    <span className="text-gray-500 ml-1">(26 reviews)</span>
                  </div>
                  <Badge variant="success" className="flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified Farmer
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="primary">Top Seller</Badge>
                  <Badge variant="accent">Quality Expert</Badge>
                  <Badge variant="secondary">1 Year Member</Badge>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-auto">
                <Button variant="outline" className="w-full md:w-auto">
                  Edit Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Sample Status</h3>
                <BeeIcon className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-2xl font-bold text-amber-600">{sampleStatusData.submitted}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">In Verification</p>
                  <p className="text-2xl font-bold text-purple-600">{sampleStatusData.in_verification}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{sampleStatusData.verified}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{sampleStatusData.rejected}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" fullWidth>
                  View All Samples
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Orders</h3>
                <Package className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{orderData.total}</p>
                </div>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
              <div className="bg-gray-100 rounded-full h-2 mb-6">
                <div 
                  className="bg-amber-500 rounded-full h-2" 
                  style={{ width: `${(orderData.delivered / orderData.total) * 100}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-500">Pending</p>
                  <p className="font-medium text-gray-900">{orderData.pending}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Shipped</p>
                  <p className="font-medium text-gray-900">{orderData.shipped}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Delivered</p>
                  <p className="font-medium text-gray-900">{orderData.delivered}</p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" fullWidth>
                  Manage Orders
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Achievements</h3>
                <Award className="h-5 w-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Verification Rate</p>
                <div className="flex items-center">
                  <div className="flex-grow bg-gray-100 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-500 rounded-full h-2" 
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">85%</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="primary" className="flex items-center px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  Top Seller
                </Badge>
                <Badge variant="success" className="flex items-center px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  Quality Expert
                </Badge>
                <Badge variant="secondary" className="flex items-center px-3 py-1">
                  <Award className="h-3 w-3 mr-1" />
                  1 Year Member
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You're close to unlocking 3 new badges! Continue listing quality products to earn more rewards.
              </p>
              <Button variant="outline" size="sm" fullWidth>
                View Achievements
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-3">
            <CardHeader>
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </CardHeader>
            <div className="divide-y divide-gray-100">
              {recentActivityData.map((activity) => (
                <div key={activity.id} className="px-6 py-4 flex items-start">
                  <div className={`
                    flex-shrink-0 rounded-full p-2 mr-4
                    ${activity.type === 'verification' ? 'bg-amber-100 text-amber-600' : 
                      activity.type === 'order' ? 'bg-green-100 text-green-600' : 
                      'bg-purple-100 text-purple-600'}
                  `}>
                    {activity.type === 'verification' ? (
                      <BeeIcon className="h-5 w-5" />
                    ) : activity.type === 'order' ? (
                      <Package className="h-5 w-5" />
                    ) : (
                      <Star className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <Button variant="outline" size="sm" fullWidth>
                View All Activity
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'samples' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">My Honey Samples</h3>
            <Button 
              size="sm"
              className="flex items-center"
              onClick={() => setShowStepper(true)}
            >
              <BeeIcon className="mr-2 h-4 w-4" />
              Submit New Sample
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sample ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submission Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {samples.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">No samples submitted yet.</td>
                  </tr>
                ) : (
                  samples.map((sample: any, idx) => (
                    <tr key={sample.id || idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sample.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{sample.honeyType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{sample.submittedAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="primary">{sample.status}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-amber-600 hover:text-amber-900 mr-2">View</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Placeholder for Orders tab */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-amber-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Orders Management</h3>
              <p className="mt-1 text-gray-500">
                View and manage your orders from UK clients
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for Analytics tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <LineChart className="mx-auto h-12 w-12 text-amber-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Analytics</h3>
              <p className="mt-1 text-gray-500">
                Track your performance and sales analytics
              </p>
            </div>
          </div>
        </div>
      )}
      <SampleSubmissionStepper open={showStepper} onClose={() => setShowStepper(false)} onSubmit={handleSampleSubmit} />
    </div>
  );
};

export default FarmerDashboard;