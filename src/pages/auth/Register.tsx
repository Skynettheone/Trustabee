import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeefIcon as BeeIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Register: React.FC = () => {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'farmer' | 'client'>('client');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    await register(name, email, password, role);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BeeIcon className="h-12 w-12 text-amber-500" />
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              fullWidth
            />

            <Input
              id="email"
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              fullWidth
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                    ${role === 'client' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                    }
                    cursor-pointer
                  `}>
                    <input
                      type="radio"
                      name="role"
                      value="client"
                      checked={role === 'client'}
                      onChange={() => setRole('client')}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">UK Client</span>
                  </label>
                </div>
                <div>
                  <label className={`
                    relative flex items-center justify-center px-4 py-3 border rounded-md shadow-sm 
                    ${role === 'farmer' 
                      ? 'border-amber-500 bg-amber-50' 
                      : 'border-gray-300 bg-white hover:bg-gray-50'
                    }
                    cursor-pointer
                  `}>
                    <input
                      type="radio"
                      name="role"
                      value="farmer"
                      checked={role === 'farmer'}
                      onChange={() => setRole('farmer')}
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