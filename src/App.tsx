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
import FarmerOnboarding from './pages/farmer/Onboarding';
import ExportJourney from './components/farmer/ExportJourney';
import ExportTracking from './components/farmer/ExportTracking';
import BrowseProducts from './pages/client/Browse';
import VerificationManagement from './pages/admin/VerificationManagement';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import MyOrders from './pages/client/MyOrders';
import Favorites from './pages/client/Favorites';
import Cart from './pages/client/Cart';
import SplashScreen from './pages/splash/SplashScreen';
import ExportWelcome from './pages/splash/ExportWelcome';
import ImportWelcome from './pages/splash/ImportWelcome';
import { Provider } from 'react-redux';
import { store } from './store';
import Badges from './components/farmer/Badges';

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
      return '/farmer/export-journey';
    case 'admin':
      return '/admin/verification';
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
          {/* Splash and Welcome routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/export-welcome" element={<ExportWelcome />} />
          <Route path="/import-welcome" element={<ImportWelcome />} />
          
          {/* Public routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={getDefaultRoute(user.role)} replace /> : <Register />} />

          {/* Protected Farmer routes */}
          <Route
            path="/farmer/onboarding"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerOnboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/export-journey"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <ExportJourney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/export-tracking"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <ExportTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/farmer/badges"
            element={
              <ProtectedRoute allowedRoles={['farmer']}>
                <Badges />
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
            path="/admin/verification"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <VerificationManagement />
              </ProtectedRoute>
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