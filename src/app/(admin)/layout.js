"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import UnauthorizedAccess from '../../components/UnauthorizedAccess';

export default function AdminLayout({ children }) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If no user is logged in, redirect to login page
      if (!user) {
        router.push('/');
        return;
      }

      // If user doesn't have admin role
      if (!hasRole('admin')) {
        // Redirect to employee dashboard if they're an employee
        if (hasRole('employee')) {
          router.push('/employee');
        } else {
          // Otherwise redirect to login
          router.push('/');
        }
        return;
      }
    }
  }, [user, loading, router, hasRole]);

  // Show loading state
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
  }

  // If no user or wrong role, show unauthorized access component
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }

  // If user has admin role, render the layout with sidebar and content
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
} 