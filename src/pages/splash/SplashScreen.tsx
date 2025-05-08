import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BeefIcon as BeeIcon } from 'lucide-react';
import Button from '../../components/common/Button';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-white p-4">
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-8">
          <img src="/logo/LOGO_LANDSCAPE.png" alt="Trustabee Logo" className="h-32 w-auto" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          That's So Honey
        </h1>
        
        <p className="text-xl text-gray-600 mb-12">
          Pure, Sustainable, and Straight from the Source. 🍯
        </p>

        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full max-w-md bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => navigate('/export-welcome')}
          >
            <BeeIcon className="mr-2 h-5 w-5" />
            Export Edition (Sri Lanka)
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full max-w-md border-amber-600 text-amber-600 hover:bg-amber-50"
            onClick={() => navigate('/import-welcome')}
          >
            Import Edition (UK)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 