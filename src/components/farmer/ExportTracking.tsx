import React from 'react';
import { CheckCircle, Beaker, Award, Truck, Store, Factory, Clock } from 'lucide-react';
import Card from '../common/Card';

interface Sample {
  id: string;
  name: string;
  type: string;
  submittedDate: string;
  currentStep: number;
  status: 'pending' | 'approved' | 'rejected';
  distributor?: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Sample Received",
    description: "Testing lab has received your sample",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    id: 2,
    title: "Quality Testing",
    description: "Your honey is being tested for quality and authenticity",
    icon: <Beaker className="h-5 w-5" />
  },
  {
    id: 3,
    title: "Quality Verification",
    description: "Expert approval of your honey quality",
    icon: <Award className="h-5 w-5" />
  },
  {
    id: 4,
    title: "Distribution Assignment",
    description: "Your honey is being assigned to distributors",
    icon: <Truck className="h-5 w-5" />
  }
];

// Mock data - this would come from your backend
const samples: Sample[] = [
  {
    id: "1",
    name: "Wild Forest Honey",
    type: "Raw",
    submittedDate: "2024-03-15",
    currentStep: 2,
    status: 'pending'
  },
  {
    id: "2",
    name: "Organic Mountain Honey",
    type: "Filtered",
    submittedDate: "2024-03-10",
    currentStep: 4,
    status: 'approved',
    distributor: "Tropical Wholefoods"
  },
  {
    id: "3",
    name: "Traditional Honey",
    type: "Raw",
    submittedDate: "2024-03-20",
    currentStep: 1,
    status: 'pending'
  }
];

const ExportTracking: React.FC = () => {
  const getStepStatus = (sample: Sample, stepId: number) => {
    if (stepId < sample.currentStep) return 'completed';
    if (stepId === sample.currentStep) return 'current';
    return 'upcoming';
  };

  const getStatusColor = (status: 'pending' | 'approved' | 'rejected') => {
    switch (status) {
      case 'approved':
        return 'text-[#8fce90]';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-amber-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Export Tracking</h1>
          <p className="text-gray-600">Track the progress of your submitted honey samples</p>
        </div>

        <div className="space-y-6">
          {samples.map((sample) => (
            <Card key={sample.id} className="p-6">
              <div className="relative mb-8">
                {/* Progress bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-[#8fce90] to-[#4c6737] rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${((sample.currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                <div className="flex justify-between px-8">
                  {steps.map((step) => {
                    const status = getStepStatus(sample, step.id);
                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div className={`
                          w-14 h-14 rounded-full flex items-center justify-center mb-4
                          ${status === 'completed' ? 'bg-gradient-to-br from-[#8fce90] to-[#4c6737] text-white shadow-md' :
                            status === 'current' ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-400 ring-offset-2' :
                            'bg-gray-100 text-gray-400'}
                          transition-all duration-200
                          ${status === 'completed' ? 'scale-110' : ''}
                        `}>
                          {step.icon}
                        </div>
                        <div className="text-center max-w-[140px]">
                          <p className={`text-sm font-medium ${
                            status === 'completed' ? 'text-[#4c6737]' :
                            status === 'current' ? 'text-amber-600' :
                            'text-gray-400'
                          }`}>
                            {step.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{sample.name}</h2>
                  <p className="text-gray-500">Type: {sample.type}</p>
                  <p className="text-gray-500">Submitted: {sample.submittedDate}</p>
                </div>
                <div className={`flex items-center ${getStatusColor(sample.status)}`}>
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-medium">
                    {sample.status === 'approved' ? 'Verified' : 
                     sample.status === 'rejected' ? 'Rejected' : 'In Progress'}
                  </span>
                </div>
              </div>

              {sample.distributor && (
                <div className="mt-6 p-4 bg-[#8fce90]/10 rounded-lg">
                  <div className="flex items-center">
                    <Store className="h-5 w-5 text-[#8fce90] mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">Assigned Distributor</p>
                      <p className="text-gray-600">{sample.distributor}</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportTracking; 