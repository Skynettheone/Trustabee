import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Users, Globe, Heart, Shield, Leaf } from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardContent } from '../../components/common/Card';

const About: React.FC = () => {
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
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 to-amber-700/70" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Trustabee
          </h1>
          <p className="mt-6 text-xl text-amber-100 max-w-2xl mx-auto">
            Bridging the gap between Sri Lankan honey farmers and UK clients through trust, transparency, and technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Mission
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              To revolutionize the honey industry by creating a transparent, trustworthy platform that benefits both farmers and consumers.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="bg-amber-50">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Global Connection</h3>
                <p className="text-gray-600">
                  Creating meaningful connections between Sri Lankan honey farmers and UK consumers, fostering cultural exchange and economic growth.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Quality Assurance</h3>
                <p className="text-gray-600">
                  Implementing rigorous verification processes to ensure every drop of honey meets the highest standards of authenticity and quality.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-amber-50">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Supporting sustainable beekeeping practices and fair trade principles to create positive change in local communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              The principles that guide everything we do at Trustabee
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600">
                We believe in complete openness about our verification process, pricing, and business practices. Every transaction and interaction is built on trust and honesty.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                Our platform promotes sustainable beekeeping practices and environmental conservation, ensuring the long-term health of bee populations and ecosystems.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously develop new technologies and methods to improve our verification process and enhance the user experience for both farmers and clients.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Community</h3>
              <p className="text-gray-600">
                We foster a supportive community where farmers and clients can connect, share knowledge, and grow together in the honey industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Meet the passionate individuals behind Trustabee
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent>
                <div className="h-32 w-32 rounded-full bg-amber-200 mx-auto mb-4 flex items-center justify-center text-amber-700 text-2xl font-bold">
                  JD
                </div>
                <h3 className="text-xl font-medium text-gray-900">John Doe</h3>
                <p className="text-amber-600">Founder & CEO</p>
                <p className="mt-2 text-gray-600">
                  With over 15 years of experience in the honey industry, John leads our mission to revolutionize honey trade.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <div className="h-32 w-32 rounded-full bg-amber-200 mx-auto mb-4 flex items-center justify-center text-amber-700 text-2xl font-bold">
                  SJ
                </div>
                <h3 className="text-xl font-medium text-gray-900">Sarah Johnson</h3>
                <p className="text-amber-600">Head of Verification</p>
                <p className="mt-2 text-gray-600">
                  Sarah ensures the highest standards of quality and authenticity in our verification process.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <div className="h-32 w-32 rounded-full bg-amber-200 mx-auto mb-4 flex items-center justify-center text-amber-700 text-2xl font-bold">
                  RK
                </div>
                <h3 className="text-xl font-medium text-gray-900">Raj Kumar</h3>
                <p className="text-amber-600">Farmer Relations</p>
                <p className="mt-2 text-gray-600">
                  Raj works closely with Sri Lankan farmers to ensure their success on our platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Join Our Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-amber-100">
            Be part of our mission to transform the honey industry
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-white text-amber-600 hover:bg-amber-50"
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:bg-opacity-10"
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

export default About; 