"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

// คอมโพเนนต์ส่วนหัวของหน้าพนักงาน แสดงชื่อหน้าและเมนูผู้ใช้
export default function EmployeeHeader({ title }) {
  // สถานะสำหรับจัดการการแสดงเมนูบนอุปกรณ์มือถือ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // สถานะสำหรับการแสดงเมนูผู้ใช้ (โปรไฟล์, ตั้งค่า, ออกจากระบบ)
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // ดึงข้อมูลผู้ใช้และฟังก์ชันออกจากระบบจาก Context
  const { user, logout } = useAuth();

  // ฟังก์ชันจัดการการออกจากระบบ พร้อมการยืนยัน
  const handleLogout = () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      logout();
    }
  };

  // ตรวจสอบว่าผู้ใช้มีรูปโปรไฟล์หรือไม่
  const hasProfileImage = user?.profileImage;

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          {/* ปุ่มแฮมเบอร์เกอร์สำหรับอุปกรณ์มือถือ */}
          <button 
            className="md:hidden mr-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* แสดงชื่อหน้าปัจจุบัน */}
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* ไอคอนแจ้งเตือน */}
          <div className="relative">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
          
          {/* เมนูผู้ใช้ พร้อมดรอปดาวน์ */}
          <div className="relative">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="avatar">
                {hasProfileImage ? (
                  // แสดงรูปโปรไฟล์ถ้ามี
                  <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-[#2A7F7F]">
                    <Image 
                      src={user.profileImage || '/assets/images/profiles/default-employee.jpg'}
                      alt={user?.name || 'Employee Profile'}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  // แสดงตัวอักษรแรกของชื่อถ้าไม่มีรูป
                  <div className="w-10 h-10 rounded-full bg-[#2A7F7F] flex items-center justify-center text-white font-medium">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
                  </div>
                )}
              </div>
              <span className="ml-2 hidden md:block">{user?.name || 'Employee'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* เมนูดรอปดาวน์สำหรับผู้ใช้ */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                <Link 
                  href="/employee/employee/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  โปรไฟล์ของฉัน
                </Link>
                <Link 
                  href="/employee/employee/settings" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  ตั้งค่า
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* เมนูสำหรับมือถือที่จะแสดงเมื่อกดปุ่มแฮมเบอร์เกอร์ */}
      {isMobileMenuOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <nav className="px-2 pt-2 pb-4">
            <Link href="/employee/employee" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">แดชบอร์ด</Link>
            <Link href="/employee/employee/attendance" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">การลงเวลา</Link>
            <Link href="/employee/employee/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">โปรไฟล์</Link>
            <Link href="/employee/employee/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100">ตั้งค่า</Link>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-100"
            >
              ออกจากระบบ
            </button>
          </nav>
        </div>
      )}
    </header>
  );
} 