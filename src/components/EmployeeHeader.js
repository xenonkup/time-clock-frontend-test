"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function EmployeeHeader({ title }) {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันออกจากระบบจาก AuthContext
  const { user, logout } = useAuth();
  // สร้าง state สำหรับจัดการการแสดงเมนูและการแจ้งเตือน
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // ข้อมูลการแจ้งเตือนจำลองสำหรับแสดงผล
  const [notifications] = useState([
    {
      id: 1,
      title: 'ประกาศวันหยุดประจำปี 2567',
      message: 'ประกาศวันหยุดประจำปี 2567 สามารถดูรายละเอียดได้ที่บอร์ดประชาสัมพันธ์',
      time: '10 นาทีที่แล้ว',
      unread: true
    },
    {
      id: 2,
      title: 'เปลี่ยนแปลงนโยบายการทำงาน',
      message: 'มีการเปลี่ยนแปลงนโยบายการทำงานจากที่บ้าน (Work from Home)',
      time: '2 วันที่แล้ว',
      unread: false
    }
  ]);
  
  // ฟังก์ชันจัดการการออกจากระบบที่มีการยืนยันก่อน
  const handleLogout = () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      logout();
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center px-4 py-4 md:px-6">
        {/* ส่วนด้านซ้ายที่แสดงชื่อหน้าและปุ่มเมนูบนมือถือ */}
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        </div>
        
        {/* ส่วนด้านขวาที่แสดงการแจ้งเตือนและโปรไฟล์ผู้ใช้ */}
        <div className="flex items-center space-x-4">
          {/* ปุ่มและเมนูการแจ้งเตือน */}
          <div className="relative">
            <button
              className="p-1 rounded-full text-gray-600 hover:bg-gray-100 relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v0.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {/* ไอคอนแสดงว่ามีการแจ้งเตือนที่ยังไม่ได้อ่าน */}
              {notifications.some(n => n.unread) && (
                <span className="absolute top-0 right-0 bg-red-500 rounded-full h-2 w-2"></span>
              )}
            </button>
            
            {/* รายการการแจ้งเตือนแบบดรอปดาวน์ */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                {/* ส่วนหัวของเมนูแจ้งเตือน */}
                <div className="py-2 px-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">การแจ้งเตือน</span>
                  <button className="text-xs text-[#2A7F7F] hover:underline">
                    ทำเครื่องหมายว่าอ่านทั้งหมด
                  </button>
                </div>
                
                {/* รายการแจ้งเตือน */}
                <div className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-4 px-4 text-center text-gray-500">
                      ไม่มีการแจ้งเตือนใหม่
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`py-3 px-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))
                  )}
                </div>
                
                {/* ส่วนท้ายของเมนูแจ้งเตือน */}
                <div className="py-2 px-4 text-center border-t border-gray-100">
                  <Link href="/employee/notifications" className="text-xs text-[#2A7F7F] hover:underline">
                    ดูการแจ้งเตือนทั้งหมด
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* ส่วนแสดงข้อมูลผู้ใช้และเมนูผู้ใช้ */}
          <div className="relative">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {/* ไอคอนโปรไฟล์ผู้ใช้ */}
              <div className="h-8 w-8 rounded-full bg-[#2A7F7F] flex items-center justify-center text-white font-medium mr-2">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="text-sm text-gray-700 hidden md:block">
                {user?.name || 'พนักงาน'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* เมนูผู้ใช้แบบดรอปดาวน์ */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <Link 
                  href="/employee/profile" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  โปรไฟล์ของฉัน
                </Link>
                <Link 
                  href="/employee/settings" 
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
      
      {/* เมนูบนมือถือที่แสดงเมื่อกดปุ่มเมนู */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          <nav className="space-y-2">
            <Link href="/employee" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
              หน้าหลัก
            </Link>
            <Link href="/employee/attendance" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
              บันทึกเวลา
            </Link>
            <Link href="/employee/schedule" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
              ตารางงาน
            </Link>
            <Link href="/employee/profile" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
              โปรไฟล์
            </Link>
            <Link href="/employee/settings" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md">
              ตั้งค่า
            </Link>
            <div className="border-t border-gray-200 mt-2 pt-2">
              <button 
                onClick={handleLogout}
                className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-md"
              >
                ออกจากระบบ
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 