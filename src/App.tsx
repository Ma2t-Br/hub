import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Utils/ProtectedRoute';
import Login from './pages/Login';
import Hub from './pages/Hub';
import Marketplace from './pages/Marketplace';
import Service from './pages/Service';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/hub/" element={<Hub />} />
            <Route path="/hub/marketplace" element={<Marketplace />} />
            <Route path="/hub/service/:id" element={<Service />} />
          </Route>
          
          {/* Redirect to login or hub based on auth status */}
          <Route path="*" element={<Navigate to="/hub" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;