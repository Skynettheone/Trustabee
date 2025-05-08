import React, { useState } from 'react';
import { MapPin, Volume2, Upload, CheckCircle, Package, AlertCircle, FileCheck, Beaker, Award, Truck, Store, Factory } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

interface Step {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  reward: string;
  status?: 'pending' | 'approved' | 'rejected';
  icon: JSX.Element;
}

interface Product {
  id: string;
  name: string;
  type: string;
  quantity: string;
  harvestDate: string;
}

const ExportJourney: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Health Certificate",
      description: "Upload your official health certificate from the agriculture office.",
      isCompleted: false,
      isLocked: false,
      reward: "🎉 Step 1 Complete! You've earned your first badge!",
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Select Product",
      description: "Choose the honey product you want to submit for testing.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Product selected for testing!",
      icon: <Package className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Sample Submission",
      description: "Send your honey sample for quality testing.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Sample submitted successfully!",
      status: 'pending',
      icon: <Beaker className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Sample Received",
      description: "Testing lab has received your sample.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Sample received at testing lab!",
      status: 'pending',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Quality Testing",
      description: "Your honey is being tested for quality and authenticity.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Quality testing in progress!",
      status: 'pending',
      icon: <Beaker className="h-5 w-5" />
    },
    {
      id: 6,
      title: "Quality Verification",
      description: "Expert approval of your honey quality.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Quality verification complete!",
      status: 'pending',
      icon: <Award className="h-5 w-5" />
    },
    {
      id: 7,
      title: "Distribution Assignment",
      description: "Your honey is being assigned to distributors.",
      isCompleted: false,
      isLocked: true,
      reward: "🎉 Distribution partners assigned!",
      status: 'pending',
      icon: <Truck className="h-5 w-5" />
    }
  ]);

  // Mock products data
  const products: Product[] = [
    {
      id: "1",
      name: "Wild Forest Honey",
      type: "Raw",
      quantity: "500g",
      harvestDate: "2024-03-01"
    },
    {
      id: "2",
      name: "Organic Mountain Honey",
      type: "Filtered",
      quantity: "1kg",
      harvestDate: "2024-03-15"
    },
    {
      id: "3",
      name: "Traditional Honey",
      type: "Raw",
      quantity: "750g",
      harvestDate: "2024-02-28"
    }
  ];

  const handleStepComplete = (stepId: number) => {
    if (stepId === 1) {
      // For health certificate upload
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true }
          : step.id === stepId + 1
            ? { ...step, isLocked: false }
            : step
      ));
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (stepId === 2) {
      // For product selection
      if (selectedProduct) {
        setSteps(steps.map(step => 
          step.id === stepId 
            ? { ...step, isCompleted: true }
            : step.id === stepId + 1
              ? { ...step, isLocked: false }
              : step
        ));
      }
    } else if (stepId === 3) {
      // For sample submission
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true, status: 'pending' }
          : step.id === stepId + 1
            ? { ...step, isLocked: false }
            : step
      ));
    } else if (stepId === 4) {
      // For sample received
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true, status: 'pending' }
          : step.id === stepId + 1
            ? { ...step, isLocked: false }
            : step
      ));
    } else if (stepId === 5) {
      // For quality testing
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true, status: 'pending' }
          : step.id === stepId + 1
            ? { ...step, isLocked: false }
            : step
      ));
    } else if (stepId === 6) {
      // For quality verification
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true, status: 'approved' }
          : step.id === stepId + 1
            ? { ...step, isLocked: false }
            : step
      ));
    } else if (stepId === 7) {
      // For distribution assignment
      setSteps(steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true, status: 'approved' }
          : step
      ));
      
      navigate('/farmer/dashboard');
    }
  };

  const getProgress = () => {
    const completedSteps = steps.filter(step => step.isCompleted).length;
    return (completedSteps / steps.length) * 100;
  };

  const renderStepContent = (step: Step) => {
    switch (step.id) {
      case 1:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is a Health Certificate?
              </h3>
              <p className="text-gray-600">
                A health certificate is an official document from the government that proves your honey is safe and clean to export. 
                This certificate is required for international trade and ensures your honey meets quality standards.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How to Get Your Certificate
              </h3>
              <p className="text-gray-600 mb-4">
                Visit your local agriculture office to request this form. The farmer or cooperative must request this certificate from a government body.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => window.open('https://www.rab.gov.rw/', '_blank')}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  View Map
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  <Volume2 className="h-5 w-5 mr-2" />
                  Voice Instructions
                </Button>
              </div>
            </div>

            {!step.isCompleted && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload Photo of Your Certificate
                </p>
                <Button
                  onClick={() => handleStepComplete(step.id)}
                  className="w-full"
                >
                  Upload Certificate
                </Button>
              </div>
            )}
          </>
        );

      case 2:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select Your Product
              </h3>
              <p className="text-gray-600 mb-4">
                Choose the honey product you want to submit for testing. Make sure to select the correct batch and quantity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedProduct?.id === product.id
                      ? 'border-[#8fce90] bg-[#8fce90]/5'
                      : 'border-gray-200 hover:border-[#8fce90]/50'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-500">Type: {product.type}</p>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      <p className="text-sm text-gray-500">Harvest Date: {product.harvestDate}</p>
                    </div>
                    {selectedProduct?.id === product.id && (
                      <CheckCircle className="h-5 w-5 text-[#8fce90]" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <Button
                onClick={() => handleStepComplete(step.id)}
                className="w-full"
              >
                Confirm Selection
              </Button>
            )}
          </>
        );

      case 3:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Submit Your Honey Sample
              </h3>
              <p className="text-gray-600">
                Send a sample of your selected honey for quality testing. Our experts will verify its authenticity and quality.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Testing Laboratory Location
              </h3>
              <p className="text-gray-600 mb-4">
                Visit our authorized testing laboratory to submit your honey sample. The lab is open Monday to Friday, 9 AM to 5 PM.
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#8fce90] mt-1 flex-shrink-0" />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Trustabee Quality Testing Lab</p>
                    <p className="text-gray-600">123 Honey Street, Colombo 03</p>
                    <p className="text-gray-600">Sri Lanka</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=6.9271,79.8612', '_blank')}
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  View on Map
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center"
                >
                  <Volume2 className="h-5 w-5 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>

            {!step.isCompleted && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">
                  Prepare your honey sample for submission
                </p>
                <div className="space-y-4">
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900 mb-2">Sample Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Minimum 200g of honey sample</li>
                      <li>Clean, sealed container</li>
                      <li>Label with your name and contact details</li>
                      <li>Sample collection date</li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleStepComplete(step.id)}
                    className="w-full"
                  >
                    Submit Sample
                  </Button>
                </div>
              </div>
            )}
          </>
        );

      case 4:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sample Received
              </h3>
              <p className="text-gray-600">
                Your honey sample has been received at the testing laboratory. The sample will now proceed to quality testing.
              </p>
            </div>

            <div className="bg-[#8fce90]/10 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-[#8fce90]" />
                <div>
                  <h4 className="font-medium text-gray-900">Sample Received Confirmation</h4>
                  <p className="text-gray-600">Your sample has been logged into our system</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleStepComplete(step.id)}
              className="w-full mt-6"
            >
              Confirm Receipt
            </Button>
          </>
        );

      case 5:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Testing in Progress
              </h3>
              <p className="text-gray-600">
                Your honey sample is currently undergoing comprehensive quality testing. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Authenticity verification</li>
                <li>Purity analysis</li>
                <li>Quality parameters testing</li>
                <li>Safety standards compliance</li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <Beaker className="h-8 w-8 text-amber-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Testing Status</h4>
                  <p className="text-amber-700">Quality testing in progress</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleStepComplete(step.id)}
              className="w-full mt-6"
            >
              Update Testing Status
            </Button>
          </>
        );

      case 6:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quality Verification Complete
              </h3>
              <p className="text-gray-600">
                Your honey has passed all quality tests and has been verified for export. The next step is distribution assignment.
              </p>
            </div>

            <div className="bg-[#8fce90]/10 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <Award className="h-8 w-8 text-[#8fce90]" />
                <div>
                  <h4 className="font-medium text-gray-900">Quality Verification Results</h4>
                  <p className="text-[#8fce90]">All quality parameters met</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleStepComplete(step.id)}
              className="w-full mt-6"
            >
              Proceed to Distribution
            </Button>
          </>
        );

      case 7:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Distribution Assignment
              </h3>
              <p className="text-gray-600">
                Your verified honey will be distributed through our trusted partners:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Store className="h-6 w-6 text-[#8fce90]" />
                  <div>
                    <h4 className="font-medium text-gray-900">Tropical Wholefoods</h4>
                    <p className="text-sm text-gray-500">UK-based distributor specializing in organic and fair-trade products</p>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Factory className="h-6 w-6 text-[#8fce90]" />
                  <div>
                    <h4 className="font-medium text-gray-900">JTS – Just Trading Scotland</h4>
                    <p className="text-sm text-gray-500">Scottish fair-trade organization focusing on sustainable sourcing</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => handleStepComplete(step.id)}
              className="w-full"
            >
              Complete Export Journey
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Export Journey</h1>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#8fce90] bg-[#8fce90]/10">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-[#8fce90]">
                  {Math.round(getProgress())}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#8fce90]/20">
              <div
                style={{ width: `${getProgress()}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#8fce90]"
              ></div>
            </div>
          </div>
        </div>

        {/* Current Step */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Step {currentStep}: {steps[currentStep - 1].title}
              </h2>
              {steps[currentStep - 1].isCompleted && (
                <CheckCircle className="h-8 w-8 text-[#8fce90]" />
              )}
            </div>

            <p className="text-gray-600 mb-6">
              {steps[currentStep - 1].description}
            </p>

            {renderStepContent(steps[currentStep - 1])}

            {steps[currentStep - 1].isCompleted && (
              <div className="bg-[#8fce90]/10 rounded-lg p-4 text-center mt-6">
                <p className="text-[#8fce90] font-semibold">
                  {steps[currentStep - 1].reward}
                </p>
              </div>
            )}

            {/* Next Step Button */}
            {steps[currentStep - 1].isCompleted && currentStep < steps.length && (
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center"
                >
                  Next Step
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ExportJourney; 