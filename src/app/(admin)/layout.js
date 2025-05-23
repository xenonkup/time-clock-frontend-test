"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/AdminSidebar';
import UnauthorizedAccess from '../../components/UnauthorizedAccess';

// คอมโพเนนต์สำหรับจัดการเลย์เอาท์ของส่วนแอดมิน
// ทำหน้าที่ตรวจสอบสิทธิ์การเข้าถึง และจัดโครงสร้างหน้าเว็บด้วย Sidebar
export default function AdminLayout({ children }) {
  // ดึงข้อมูลผู้ใช้งาน สถานะการโหลด และฟังก์ชันตรวจสอบสิทธิ์จาก Context
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  // ตรวจสอบว่ามีผู้ใช้ล็อกอินอยู่หรือไม่ ถ้าไม่มีให้กลับไปหน้าล็อกอิน
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // แสดงข้อความกำลังโหลดระหว่างรอข้อมูลผู้ใช้
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
  }

  // ตรวจสอบสิทธิ์การเข้าถึง - ถ้าไม่ใช่แอดมินให้แสดงหน้าปฏิเสธการเข้าถึง
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }

  // เรนเดอร์เลย์เอาท์สำหรับแอดมิน พร้อม Sidebar และพื้นที่สำหรับเนื้อหา
  return (
    <div className="flex h-screen bg-gray-100">
      {/* แสดง Sidebar ด้านซ้าย */}
      <AdminSidebar />
      {/* พื้นที่สำหรับแสดงเนื้อหาหลัก */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
} 