import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FarmerDashboard from './pages/farmer/Dashboard';
import BrowseProducts from './pages/client/Browse';
import VerificationManagement from './pages/admin/VerificationManagement';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import MyOrders from './pages/client/MyOrders';
import Favorites from './pages/client/Favorites';
import Cart from './pages/client/Cart';
import { Provider } from 'react-redux';
import { store } from './store';

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Helper function to get the default route for a user role
const getDefaultRoute = (role: string) => {
  switch (role) {
    case 'client':
      return '/client/browse';
    case 'farmer':
      return '/farmer/dashboard';
    case 'admin':
      return '/admin/verifications';
    default:
      return '/';
  }
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <Register />} />

          {/* Protected Farmer routes */}
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Client routes */}
          <Route
            path="/client/browse"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <BrowseProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/orders"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/favorites"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/client/cart"
            element={
              <ProtectedRoute allowedRoles={['client']}>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin routes */}
          <Route
            path="/admin/verifications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VerificationManagement />
              </ProtectedRoute>
            }
          />

          {/* Redirect to appropriate page if logged in */}
          <Route
            path="*"
            element={
              user ? (
                <Navigate to={getDefaultRoute(user.role)} replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ShopProvider>
            <AppContent />
          </ShopProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;