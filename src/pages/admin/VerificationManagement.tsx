import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader, CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { BeefIcon as BeeIcon, ClipboardCheck, Check, X, Search, AlertCircle, Filter } from 'lucide-react';

// Mock data
const pendingVerifications = [
  {
    id: 'VS-123',
    farmerId: '1',
    farmerName: 'Kumara Perera',
    farmName: 'Happy Bee Farm',
    sampleType: 'Wildflower Honey',
    submissionDate: '2025-04-15',
    receivedDate: '2025-04-18',
    status: 'received',
    harvestDate: '2025-03-20',
    region: 'Central Province',
    notes: 'Harvested from wildflower meadows in the highlands.',
  },
  {
    id: 'VS-124',
    farmerId: '3',
    farmerName: 'Chaminda Silva',
    farmName: 'Green Hills Farm',
    sampleType: 'Forest Honey',
    submissionDate: '2025-04-16',
    receivedDate: '2025-04-19',
    status: 'received',
    harvestDate: '2025-03-25',
    region: 'Uva Province',
    notes: 'Collected from forest beehives in the mountains.',
  },
  {
    id: 'VS-125',
    farmerId: '2',
    farmerName: 'Nimal Dissanayake',
    farmName: 'Spice Garden Apiary',
    sampleType: 'Cinnamon Honey',
    submissionDate: '2025-04-17',
    receivedDate: null,
    status: 'submitted',
    harvestDate: '2025-03-30',
    region: 'Western Province',
    notes: 'Bees primarily fed on cinnamon flowers from our plantation.',
  },
];

const VerificationManagement: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  
  if (!user || user.role !== 'admin') {
    return <div>Access denied. Admin access required.</div>;
  }
  
  const handleVerify = (id: string) => {
    // In a real app, this would send a request to verify the sample
    console.log(`Verifying sample ${id}`);
    setSelectedVerification(null);
  };
  
  const handleReject = (id: string) => {
    // In a real app, this would send a request to reject the sample
    console.log(`Rejecting sample ${id}`);
    setSelectedVerification(null);
  };
  
  const filteredVerifications = pendingVerifications.filter(v => 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.sampleType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectedSample = pendingVerifications.find(v => v.id === selectedVerification);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Management</h1>
          <p className="text-gray-600">Process and manage honey sample verifications</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center bg-amber-50 rounded-lg p-2 text-amber-800">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">5 samples awaiting verification</span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'pending' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('pending')}
          >
            Pending Verifications
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'completed' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('completed')}
          >
            Completed Verifications
          </button>
          <button
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === 'reports' 
                ? 'border-amber-500 text-amber-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </nav>
      </div>
      
      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Pending Samples</h2>
                  <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search samples..."
                        className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <div className="overflow-y-auto max-h-[550px]">
                {filteredVerifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {filteredVerifications.map((verification) => (
                      <div
                        key={verification.id}
                        className={`
                          px-6 py-4 cursor-pointer hover:bg-gray-50
                          ${selectedVerification === verification.id ? 'bg-amber-50' : ''}
                        `}
                        onClick={() => setSelectedVerification(verification.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <BeeIcon className="h-5 w-5 text-amber-600" />
                            </div>
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900">
                                {verification.sampleType}
                              </h3>
                              <p className="text-xs text-gray-500">
                                ID: {verification.id}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              {verification.farmName} - {verification.farmerName}
                            </p>
                            <div className="mt-1 flex items-center">
                              <Badge 
                                variant={verification.status === 'received' ? 'primary' : 'secondary'}
                                className="text-xs"
                              >
                                {verification.status === 'received' ? 'Sample Received' : 'Awaiting Sample'}
                              </Badge>
                              <span className="ml-2 text-xs text-gray-500">
                                Submitted: {verification.submissionDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No matching samples found</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
          
          {/* Verification Detail */}
          <div className="lg:col-span-1">
            <Card>
              {selectedSample ? (
                <>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium text-gray-900">Sample Details</h2>
                      <Badge 
                        variant={selectedSample.status === 'received' ? 'primary' : 'secondary'}
                      >
                        {selectedSample.status === 'received' ? 'Sample Received' : 'Awaiting Sample'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Sample ID</h3>
                        <p className="mt-1 text-sm text-gray-900">{selectedSample.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Honey Type</h3>
                        <p className="mt-1 text-sm text-gray-900">{selectedSample.sampleType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Farmer</h3>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedSample.farmerName} - {selectedSample.farmName}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Region</h3>
                        <p className="mt-1 text-sm text-gray-900">{selectedSample.region}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Harvest Date</h3>
                        <p className="mt-1 text-sm text-gray-900">{selectedSample.harvestDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Submission Timeline</h3>
                        <div className="mt-1 text-sm">
                          <div className="flex items-center text-gray-900">
                            <span className="w-32">Registered:</span>
                            <span>{selectedSample.submissionDate}</span>
                          </div>
                          <div className="flex items-center text-gray-900">
                            <span className="w-32">Received:</span>
                            <span>{selectedSample.receivedDate || 'Pending'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Farmer Notes</h3>
                        <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                          {selectedSample.notes}
                        </p>
                      </div>
                      
                      {selectedSample.status === 'received' && (
                        <>
                          <div className="pt-2">
                            <label htmlFor="verification-notes" className="block text-sm font-medium text-gray-700">
                              Verification Notes
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="verification-notes"
                                rows={3}
                                className="shadow-sm block w-full focus:ring-amber-500 focus:border-amber-500 sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Enter your verification notes..."
                                value={verificationNotes}
                                onChange={(e) => setVerificationNotes(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="pt-2 flex space-x-2">
                            <Button 
                              variant="outline" 
                              className="flex-1 flex items-center justify-center"
                              onClick={() => handleReject(selectedSample.id)}
                            >
                              <X className="mr-1 h-4 w-4 text-red-500" />
                              Reject
                            </Button>
                            <Button 
                              className="flex-1 flex items-center justify-center"
                              onClick={() => handleVerify(selectedSample.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Verify
                            </Button>
                          </div>
                        </>
                      )}
                      
                      {selectedSample.status === 'submitted' && (
                        <div className="pt-2">
                          <Button 
                            fullWidth
                            className="flex items-center justify-center"
                          >
                            <ClipboardCheck className="mr-2 h-4 w-4" />
                            Mark as Received
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center h-96">
                  <ClipboardCheck className="h-12 w-12 text-gray-300" />
                  <h3 className="mt-2 text-base font-medium text-gray-900">No Sample Selected</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    Select a sample from the list to view details and perform verification actions.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
      
      {/* Placeholder for completed verifications tab */}
      {activeTab === 'completed' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <Check className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Completed Verifications</h3>
              <p className="mt-1 text-gray-500">
                View a history of all completed verification processes
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Placeholder for reports tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <ClipboardCheck className="mx-auto h-12 w-12 text-amber-500" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Verification Reports</h3>
              <p className="mt-1 text-gray-500">
                Generate and view reports on verification activities
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationManagement;