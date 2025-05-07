"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If no user is logged in, redirect to login page
      if (!user) {
        router.push('/');
        return;
      }

      // If role is specified and user doesn't have required role
      if (requiredRole && !hasRole(requiredRole)) {
        // Redirect to appropriate dashboard based on user's role
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/employee');
        }
        return;
      }
    }
  }, [user, loading, router, requiredRole, hasRole]);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If no user or wrong role, don't render children (while redirect is happening)
  if (!user || (requiredRole && !hasRole(requiredRole))) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  // Otherwise, render the children
  return children;
} 