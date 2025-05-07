import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BeefIcon as BeeIcon, MenuIcon, X, ShoppingCart, Bell, LogOut } from 'lucide-react';
import Button from './Button';
import { useShop } from '../../context/ShopContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cart } = useShop();
  const cartCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close other dropdowns when mobile menu is opened
    if (!mobileMenuOpen) {
      setNotificationsOpen(false);
      setProfileOpen(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    // Close other dropdowns
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    // Close other dropdowns
    setNotificationsOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  // Different navigation items based on user role
  const getNavigationItems = () => {
    if (!user) {
      return [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ];
    }

    switch (user.role) {
      case 'farmer':
        return [
        ];
      case 'client':
        return [
          { name: 'Browse Honey', path: '/client/browse' },
          { name: 'My Orders', path: '/client/orders' },
          { name: 'Favorites', path: '/client/favorites' },
        ];
      case 'admin':
        return [
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={() => handleNavigate('/')}
                className="flex items-center text-amber-600 hover:text-amber-700"
              >
                <img src="/logo/LOGO_LANDSCAPE.png" alt="Trustabee Logo" className="h-16 w-auto" />
              </button>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {getNavigationItems().map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-amber-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side items */}
          <div className="flex items-center">
            {user ? (
              <>
                {/* Cart icon - visible only for clients */}
                {user.role === 'client' && (
                  <button
                    onClick={() => handleNavigate('/client/cart')}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 relative"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-amber-500 text-white text-xs">
                        {cartCount}
                      </span>
                    )}
                  </button>
                )}
                
                {/* Notifications */}
                <div className="ml-3 relative">
                  <button
                    onClick={toggleNotifications}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 relative"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                      2
                    </span>
                  </button>
                  
                  {/* Notifications dropdown */}
                  {notificationsOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                          {/* Sample notifications */}
                          <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">Your honey sample was verified</p>
                            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                            <p className="text-sm font-medium text-gray-900">New order received</p>
                            <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNavigate('/notifications')}
                          className="block w-full text-left px-4 py-2 text-sm text-amber-600 hover:bg-gray-50"
                        >
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <button
                    onClick={toggleProfile}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 items-center"
                  >
                    <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                      {user.name}
                    </span>
                  </button>
                  
                  {profileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={() => handleNavigate(`/${user.role}/profile`)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          Your Profile
                        </button>
                        <button
                          onClick={() => handleNavigate(`/${user.role}/settings`)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          role="menuitem"
                        >
                          Settings
                        </button>
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                          role="menuitem"
                        >
                          <LogOut className="h-4 w-4 mr-2" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleNavigate('/register')}
                >
                  Sign up
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              >
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <MenuIcon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {getNavigationItems().map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-amber-300 w-full text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
          {!user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 space-x-2">
                <Button 
                  variant="outline"
                  fullWidth
                  onClick={() => handleNavigate('/login')}
                >
                  Log in
                </Button>
                <Button
                  fullWidth
                  onClick={() => handleNavigate('/register')}
                >
                  Sign up
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;