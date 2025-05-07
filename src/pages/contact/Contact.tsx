import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/common/Button';
import Card, { CardContent } from '../../components/common/Card';

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-amber-100 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mx-auto mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600">
                  <a href="mailto:info@trustabee.com" className="text-amber-600 hover:text-amber-700">
                    info@trustabee.com
                  </a>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  We'll respond within 24 hours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mx-auto mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600">
                  <a href="tel:+441234567890" className="text-amber-600 hover:text-amber-700">
                    +44 123 456 7890
                  </a>
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Mon-Fri, 9am-5pm GMT
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-500 text-white mx-auto mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600">
                  123 Honey Street<br />
                  London, UK<br />
                  SW1A 1AA
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  By appointment only
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Send Us a Message
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Fill out the form below and we'll get back to you shortly
            </p>
          </div>

          <Card className="bg-white">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="farmer">Farmer Registration</option>
                    <option value="client">Client Registration</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="flex items-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Find quick answers to common questions
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900">How does the verification process work?</h3>
                <p className="mt-2 text-gray-600">
                  Our verification process involves multiple steps including sample testing, documentation review, and quality assessment to ensure the authenticity of honey products.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900">What are the requirements for farmers?</h3>
                <p className="mt-2 text-gray-600">
                  Farmers need to provide proof of beekeeping practices, submit honey samples for testing, and maintain quality standards throughout their production process.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900">How can I track my order?</h3>
                <p className="mt-2 text-gray-600">
                  Once your order is placed, you'll receive a tracking number and can monitor your shipment through our platform's order tracking system.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
                <p className="mt-2 text-gray-600">
                  We accept major credit cards, PayPal, and bank transfers. All transactions are secure and encrypted.
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
            Ready to Get Started?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-amber-100">
            Join our community of honey farmers and clients today
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Button 
              size="lg"
              className="bg-white text-amber-600 hover:bg-amber-50"
              onClick={() => navigate('/register')}
            >
              Register Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:bg-opacity-10"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 