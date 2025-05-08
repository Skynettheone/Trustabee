import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeefIcon as BeeIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Register: React.FC = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client' as 'client' | 'farmer',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      // Redirect based on role
      if (formData.role === 'farmer') {
        navigate('/farmer/export-journey');
      } else {
        navigate('/client/browse');
      }
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo/LOGO_LANDSCAPE.png" alt="Trustabee Logo" className="h-28 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button 
            onClick={() => navigate('/login')}
            className="font-medium text-amber-600 hover:text-amber-500"
          >
            sign in to your existing account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Input
              id="name"
              label="Full name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              autoComplete="name"
              fullWidth
            />

            <Input
              id="email"
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              autoComplete="email"
              fullWidth
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              autoComplete="new-password"
              fullWidth
            />

            <Input
              id="confirm-password"
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={passwordError}
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                I am a:
              </label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div>
                  <label className={`
                    relative flex items-center justify-center px-4 py-3 border rounded-md shadow-sm 
                    ${formData.role === 'client' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                    }
                    cursor-pointer
                  `}>
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={formData.role === 'client'}
                      onChange={() => setFormData({ ...formData, role: 'client' })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">UK Client</span>
                  </label>
                </div>
                <div>
                  <label className={`
                    relative flex items-center justify-center px-4 py-3 border rounded-md shadow-sm 
                    ${formData.role === 'farmer' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                    }
                    cursor-pointer
                  `}>
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      checked={formData.role === 'farmer'}
                      onChange={() => setFormData({ ...formData, role: 'farmer' })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">Honey Farmer</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <Button 
                type="submit" 
                fullWidth 
                loading={loading}
              >
                Create account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;