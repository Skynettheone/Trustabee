import React from 'react';
import Button from '../../components/common/Button';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity } = useShop();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, quantity);
    }
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-gray-500">Add some products to your cart to see them here.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-gray-500">£{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                      className="p-1.5 border rounded-md hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.cartQuantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                      className="p-1.5 border rounded-md hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div className="text-xl font-bold text-gray-900">
              Total: £{total.toFixed(2)}
            </div>
            <Button>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 