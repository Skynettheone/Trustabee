import React, { useState } from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ShoppingCart, CheckCircle, Clock, XCircle, MapPin, Truck, Calendar, Package } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface TrackingStep {
  status: 'completed' | 'current' | 'upcoming';
  title: string;
  description: string;
  date?: string;
}

const statusBadge = (status: string) => {
  switch (status) {
    case 'Delivered':
      return <Badge variant="success" className="flex items-center"><CheckCircle className="h-4 w-4 mr-1" />Delivered</Badge>;
    case 'Processing':
      return <Badge variant="primary" className="flex items-center"><Clock className="h-4 w-4 mr-1" />Processing</Badge>;
    case 'Cancelled':
      return <Badge variant="error" className="flex items-center"><XCircle className="h-4 w-4 mr-1" />Cancelled</Badge>;
    default:
      return null;
  }
};

const OrderTracking: React.FC<{ order: any }> = ({ order }) => {
  const trackingSteps: TrackingStep[] = [
    {
      status: 'completed',
      title: 'Order Placed',
      description: 'Your order has been confirmed',
      date: order.date
    },
    {
      status: 'current',
      title: 'Processing',
      description: 'Your order is being prepared',
      date: new Date(Date.now() - 86400000).toLocaleDateString() // Yesterday
    },
    {
      status: 'upcoming',
      title: 'In Transit',
      description: 'Your order is on its way',
      date: new Date(Date.now() + 86400000).toLocaleDateString() // Tomorrow
    },
    {
      status: 'upcoming',
      title: 'Delivery',
      description: 'Estimated delivery',
      date: new Date(Date.now() + 172800000).toLocaleDateString() // Day after tomorrow
    }
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* Tracking Timeline */}
      <div className="relative">
        {trackingSteps.map((step, index) => (
          <div key={index} className="flex items-start mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step.status === 'completed' ? 'bg-[#8fce90]' :
              step.status === 'current' ? 'bg-[#8fce90] ring-4 ring-[#8fce90]/20' :
              'bg-gray-200'
            }`}>
              {step.status === 'completed' ? (
                <CheckCircle className="w-4 h-4 text-white" />
              ) : (
                <div className={`w-2 h-2 rounded-full ${
                  step.status === 'current' ? 'bg-white' : 'bg-gray-400'
                }`} />
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                <span className="text-xs text-gray-500">{step.date}</span>
              </div>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery Details */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#8fce90] mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Delivery Address</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    123 Honey Street<br />
                    London, UK<br />
                    SW1A 1AA
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-[#8fce90] mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Shipping Method</h4>
                  <p className="text-sm text-gray-500 mt-1">Express Delivery</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-[#8fce90] mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Estimated Delivery</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(Date.now() + 172800000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.650490016099!2d-0.1277583!3d51.5072178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9a45aa9!2sLondon!5e0!3m2!1sen!2suk!4v1647881234567!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MyOrders: React.FC = () => {
  const { orders } = useShop();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-gray-500">Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.id}>
              <CardContent>
                <div 
                  className="cursor-pointer"
                  onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-gray-900">Order #{order.id}</span>
                      <span className="text-sm text-gray-500">{order.date}</span>
                    </div>
                    <div className="mt-2 md:mt-0">{statusBadge(order.status)}</div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-4">
                      {order.items.map((item: any, idx: number) => (
                        <img key={idx} src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover border" />
                      ))}
                      <div className="space-y-1">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="text-gray-700 text-sm">
                            {item.name} <span className="text-gray-400">x{item.cartQuantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 text-right">
                      <div className="text-lg font-bold text-gray-900">£{order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
                {selectedOrder === order.id && <OrderTracking order={order} />}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders; 