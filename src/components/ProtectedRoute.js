"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

// คอมโพเนนต์สำหรับป้องกันการเข้าถึงเส้นทางที่ต้องมีการยืนยันตัวตนและสิทธิ์
// children: คอมโพเนนต์ลูกที่จะแสดงเมื่อมีสิทธิ์เข้าถึง
// requiredRole: สิทธิ์ที่จำเป็นต้องมีเพื่อเข้าถึงหน้านี้ (เช่น 'admin', 'employee')
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // ถ้าไม่มีผู้ใช้ล็อกอิน ให้กลับไปยังหน้าล็อกอิน
      if (!user) {
        router.push('/');
        return;
      }

      // ถ้ามีการระบุสิทธิ์ที่ต้องการและผู้ใช้ไม่มีสิทธิ์นั้น
      if (requiredRole && !hasRole(requiredRole)) {
        // นำทางไปยังหน้าแดชบอร์ดที่เหมาะสมตามสิทธิ์ของผู้ใช้
        if (user.role === 'admin') {
          router.push('/admin/admin');
        } else {
          router.push('/employee/employee');
        }
        return;
      }
    }
  }, [user, loading, router, requiredRole, hasRole]);

  // แสดงสถานะการโหลดระหว่างรอตรวจสอบข้อมูลผู้ใช้
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // ถ้าไม่มีผู้ใช้หรือไม่มีสิทธิ์ที่ถูกต้อง ไม่แสดงเนื้อหา (ระหว่างที่กำลังเปลี่ยนเส้นทาง)
  if (!user || (requiredRole && !hasRole(requiredRole))) {
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  // ถ้ามีสิทธิ์ถูกต้อง แสดงเนื้อหาของหน้านั้น
  return children;
} 