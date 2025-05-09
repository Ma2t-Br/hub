import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../Layout/PageLayout';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected content
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default ProtectedRoute;