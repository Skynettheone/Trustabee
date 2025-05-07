import React from 'react';
import Card, { CardContent } from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ShoppingCart, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

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

const MyOrders: React.FC = () => {
  const { orders } = useShop();
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-900">Order #{order.id}</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                  <div className="mt-2 md:mt-0">{statusBadge(order.status)}</div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    {order.items.map((item, idx) => (
                      <img key={idx} src={item.image} alt={item.name} className="h-16 w-16 rounded object-cover border" />
                    ))}
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders; 