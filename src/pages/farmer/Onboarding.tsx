import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeefIcon as BeeIcon, CheckCircle, MapPin, Phone, Mail, Building, Award } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted: boolean;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    phone: '',
    email: '',
    productionMethods: [] as string[],
  });

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to Trustabee! 🎉",
      description: "Let's set up your farm profile to start your honey export journey.",
      icon: <BeeIcon className="h-8 w-8 text-amber-600" />,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Farm Information",
      description: "Tell us about your farm and its location.",
      icon: <Building className="h-8 w-8 text-amber-600" />,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Contact Details",
      description: "How can we reach you?",
      icon: <Phone className="h-8 w-8 text-amber-600" />,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Production Methods",
      description: "Share your beekeeping practices.",
      icon: <Award className="h-8 w-8 text-amber-600" />,
      isCompleted: false,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data and navigate to dashboard
      navigate('/farmer/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Honey Export Journey! 🍯
            </h2>
            <p className="text-gray-600 mb-8">
              We'll guide you through setting up your profile and getting your honey ready for the UK market.
            </p>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                onClick={handleNext}
              >
                Let's Begin
              </Button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Farm Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                  placeholder="Enter your farm name"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Location</span>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter your farm location"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.farmName || !formData.location}
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Phone Number</span>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!formData.phone || !formData.email}
              >
                Next
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">
                Select all that apply to your beekeeping practices:
              </p>
              <div className="space-y-2">
                {['Organic', 'Traditional', 'Modern', 'Sustainable', 'Wild Harvest'].map((method) => (
                  <label key={method} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      checked={formData.productionMethods.includes(method)}
                      onChange={(e) => {
                        const methods = e.target.checked
                          ? [...formData.productionMethods, method]
                          : formData.productionMethods.filter(m => m !== method);
                        setFormData({ ...formData, productionMethods: methods });
                      }}
                    />
                    <span className="text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={formData.productionMethods.length === 0}
              >
                Complete Setup
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-900">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    index < currentStep ? 'bg-amber-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {renderStepContent()}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding; 