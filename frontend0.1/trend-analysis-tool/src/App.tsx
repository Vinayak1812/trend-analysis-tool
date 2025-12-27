import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute'; // <--- Import the Bouncer
import HotelDetails from './pages/HotelDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- PROTECTED ADMIN ROUTE --- */}
        {/* Logic: "Only render AdminDashboard if the userRole is 'admin'" */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        {/* NEW: DYNAMIC ROUTE FOR HOTEL DETAILS */}
        {/* The ":id" part is the variable */}
        <Route 
          path="/hotel/:id" 
          element={
            <ProtectedRoute allowedRole="admin">
              <HotelDetails />
            </ProtectedRoute>
          } 
        />

        {/* --- PROTECTED OWNER ROUTE --- */}
        <Route 
          path="/owner" 
          element={
            <ProtectedRoute allowedRole="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;