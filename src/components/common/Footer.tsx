import React from 'react';
import { BeefIcon as BeeIcon, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-50">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <BeeIcon className="h-8 w-8 text-amber-600" />
              <span className="ml-2 text-xl font-bold text-amber-600">HoneyVerify</span>
            </div>
            <p className="mt-4 text-base text-gray-600">
              Connecting authentic Sri Lankan honey farmers with UK clients through verified honey products.
            </p>
            <div className="mt-4 flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-amber-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-amber-600">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Browse Products
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  For Farmers
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Verification Process
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-600 hover:text-amber-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-800 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <span className="text-base text-gray-600">
                  123 Honey Lane, London, UK
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <span className="text-base text-gray-600">
                  +44 123 456 7890
                </span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                <span className="text-base text-gray-600">
                  contact@honeyverify.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-amber-200">
          <p className="text-center text-base text-gray-500">
            &copy; {new Date().getFullYear()} HoneyVerify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;