"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import EmployeeSidebar from '../../components/EmployeeSidebar';
import UnauthorizedAccess from '../../components/UnauthorizedAccess';

// คอมโพเนนต์สำหรับจัดการเลย์เอาท์ของส่วนพนักงาน
// ทำหน้าที่ตรวจสอบสิทธิ์การเข้าถึง และจัดโครงสร้างหน้าเว็บด้วย Sidebar
export default function EmployeeLayout({ children }) {
  // ดึงข้อมูลผู้ใช้งาน สถานะการโหลด และฟังก์ชันตรวจสอบสิทธิ์จาก Context
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // ถ้าไม่มีผู้ใช้ล็อกอิน ให้กลับไปหน้าล็อกอิน
      if (!user) {
        router.push('/');
        return;
      }

      // ถ้าผู้ใช้ไม่มีสิทธิ์เป็นพนักงาน
      if (!hasRole('employee')) {
        // ถ้าเป็นแอดมิน ให้นำทางไปหน้าแดชบอร์ดแอดมิน
        if (hasRole('admin')) {
          router.push('/admin');
        } else {
          // ถ้าไม่ใช่ ให้กลับไปหน้าล็อกอิน
          router.push('/');
        }
        return;
      }
    }
  }, [user, loading, router, hasRole]);

  // แสดงสถานะกำลังโหลด
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
  }

  // ถ้าไม่มีผู้ใช้หรือมีสิทธิ์ไม่ถูกต้อง ให้แสดงคอมโพเนนต์ปฏิเสธการเข้าถึง
  if (!user || !hasRole('employee')) {
    return <UnauthorizedAccess />;
  }

  // ถ้าผู้ใช้มีสิทธิ์เป็นพนักงาน ให้แสดงเลย์เอาท์พร้อม Sidebar และเนื้อหา
  return (
    <div className="flex h-screen bg-gray-100">
      {/* แสดง Sidebar ด้านซ้าย */}
      <EmployeeSidebar />
      {/* พื้นที่สำหรับแสดงเนื้อหาหลัก */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
} 