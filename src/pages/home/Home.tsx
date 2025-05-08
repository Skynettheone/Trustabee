import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BeefIcon as BeeIcon, CheckCircle, Award, Lock, Users } from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardContent } from '../../components/common/Card';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(/images/honey-1296x728-header.webp)',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#4c6737]/90 to-[#8fce90]/70" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Authentic Sri Lankan Honey,<br />Verified For UK Clients
          </h1>
          <p className="mt-6 text-xl text-white/90 max-w-2xl mx-auto">
            Connect with verified honey farmers and get genuine honey products with our cutting-edge verification system.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button 
              size="lg"
              variant="primary"
              className="bg-white text-[#8fce90] hover:bg-white/90"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="bg-white/20 border-white text-white hover:bg-white/30"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Trustabee Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our unique verification process ensures authenticity at every step
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8fce90]/10 text-white">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">Submit Sample</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Sri Lankan farmers submit honey samples through our platform and send physical samples for verification.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8fce90]/10 text-white">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">Verification Process</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Our experts conduct thorough testing to verify the authenticity and quality of honey samples.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#8fce90]/10 text-white">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="ml-16">
                  <h3 className="text-xl font-medium text-gray-900">Connect & Purchase</h3>
                  <p className="mt-2 text-base text-gray-500">
                    UK clients browse verified products, connect with farmers, and purchase authentic honey with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#8fce90]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Why Choose Trustabee?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Our platform offers unique benefits for both farmers and clients, creating a thriving ecosystem for authentic honey.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-[#8fce90] flex-shrink-0" />
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-700">100% Authentic Honey.</span>
                    {' '}Every product is thoroughly tested and verified before listing.
                  </p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-[#8fce90] flex-shrink-0" />
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-700">Direct Farmer Connection.</span>
                    {' '}Build relationships with the source of your honey.
                  </p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-[#8fce90] flex-shrink-0" />
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-700">Fair Trade Practices.</span>
                    {' '}Supporting sustainable beekeeping and fair compensation.
                  </p>
                </div>
                <div className="flex">
                  <CheckCircle className="h-6 w-6 text-[#8fce90] flex-shrink-0" />
                  <p className="ml-3 text-base text-gray-500">
                    <span className="font-medium text-gray-700">Gamified Experience.</span>
                    {' '}Earn rewards and recognition through our platform.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/register')}
                >
                  Join Trustabee
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4">
                <img 
                  src="/images/honey1.webp" 
                  alt="Beekeeper with honeycomb" 
                  className="rounded-lg shadow-md object-cover h-64"
                />
                <img 
                  src="/images/Honey-Cake-take-3_5.jpg" 
                  alt="Honey jar with dipper" 
                  className="rounded-lg shadow-md object-cover h-48"
                />
              </div>
              <div className="flex flex-col gap-4">
                <img 
                  src="/images/honey-e396fd81cc2d4275bfaee2948d414fd8.jpg" 
                  alt="Honey production" 
                  className="rounded-lg shadow-md object-cover h-48"
                />
                <img 
                  src="/images/Honey_Skin_Benefits_1.webp" 
                  alt="Healthy breakfast with honey" 
                  className="rounded-lg shadow-md object-cover h-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Which Role Are You?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Trustabee is designed for three distinct user roles, each with tailored features
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card hover className="flex flex-col">
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 rounded-full bg-[#8fce90]/10 flex items-center justify-center mb-4">
                  <BeeIcon className="h-6 w-6 text-[#8fce90]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Sri Lankan Farmers</h3>
                <p className="text-gray-500 mb-4">
                  Showcase your authentic honey products to a global market through our verification system.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Submit honey samples for verification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Manage verified product listings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Connect with UK clients directly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Earn badges and improve rating</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 pt-0 mt-4">
                <Button 
                  variant="outline" 
                  fullWidth
                  onClick={() => navigate('/register')}
                >
                  Sign up as Farmer
                </Button>
              </div>
            </Card>

            <Card hover className="flex flex-col">
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 rounded-full bg-[#8fce90]/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-[#8fce90]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">UK Clients</h3>
                <p className="text-gray-500 mb-4">
                  Purchase guaranteed authentic honey directly from Sri Lankan farmers with full transparency.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Browse verified honey products</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">View verification certificates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Contact farmers with questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Earn loyalty points and badges</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 pt-0 mt-4">
                <Button 
                  fullWidth
                  onClick={() => navigate('/register')}
                >
                  Sign up as Client
                </Button>
              </div>
            </Card>

            <Card hover className="flex flex-col">
              <div className="p-6 flex-grow">
                <div className="w-12 h-12 rounded-full bg-[#8fce90]/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-[#8fce90]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Admin</h3>
                <p className="text-gray-500 mb-4">
                  Manage the verification process and maintain the integrity of the platform.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Process honey sample verifications</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Generate verification certificates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Monitor platform activity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="ml-2 text-gray-600">Generate reports and analytics</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 pt-0 mt-4">
                <Button 
                  variant="secondary" 
                  fullWidth
                  onClick={() => navigate('/login')}
                >
                  Admin Login
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#8fce90]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Hear from farmers and clients who are already part of our community
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="bg-white shadow-lg">
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#8fce90]/20 flex items-center justify-center text-[#8fce90] font-bold">
                    KP
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Kumara Perera</h4>
                    <p className="text-gray-500">Honey Farmer, Sri Lanka</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Trustabee has transformed my honey business. The verification process gives my products credibility, and I'm now connected with clients from the UK who value authentic honey."
                </p>
                <div className="mt-4 flex text-[#8fce90]">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#8fce90]/20 flex items-center justify-center text-[#8fce90] font-bold">
                    EJ
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Emily Johnson</h4>
                    <p className="text-gray-500">Client, UK</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As someone who values authentic honey, Trustabee gives me confidence that I'm getting genuine products. I love being able to connect directly with farmers and learn about their beekeeping practices."
                </p>
                <div className="mt-4 flex text-[#8fce90]">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#8fce90]/20 flex items-center justify-center text-[#8fce90] font-bold">
                    ND
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Nimal Dissanayake</h4>
                    <p className="text-gray-500">Honey Farmer, Sri Lanka</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The gamification aspect of Trustabee keeps me motivated to maintain high quality. Earning badges and seeing my rating improve has been rewarding, and it's helped attract more customers to my products."
                </p>
                <div className="mt-4 flex text-[#8fce90]">
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                  <Award className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4c6737] to-[#8fce90]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to join the Trustabee community?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-white/90">
            Whether you're a honey farmer or a honey enthusiast, our platform has something for you.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-white text-[#4c6737] hover:bg-white/90"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;