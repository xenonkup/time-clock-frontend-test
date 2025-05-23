"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// คอมโพเนนต์สำหรับแสดงแถบนำทางด้านข้างของหน้าพนักงาน
export default function EmployeeSidebar() {
  // ดึงข้อมูลเส้นทางปัจจุบันเพื่อระบุเมนูที่ควรไฮไลต์
  const pathname = usePathname();
  // ดึงข้อมูลผู้ใช้และฟังก์ชันออกจากระบบจาก Context
  const { user, logout } = useAuth();
  
  // ฟังก์ชันตรวจสอบว่าเส้นทางปัจจุบันตรงกับเมนูที่ระบุหรือไม่
  const isActive = (path) => {
    return pathname === path;
  };

  // ตรวจสอบว่าผู้ใช้มีรูปโปรไฟล์หรือไม่
  const hasProfileImage = user?.profileImage;

  return (
    <div className="w-64 bg-white shadow-md overflow-y-auto hidden md:block">
      {/* ส่วนแสดงโลโก้ด้านบน */}
      <div className="p-4 flex items-center justify-center border-b">
        <Image 
          src="/assets/Logo/logo.png"
          alt="Logo"
          width={150}
          height={50}
          className="mb-2"
        />
      </div>
      
      {/* ส่วนแสดงข้อมูลผู้ใช้ */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="avatar">
              {hasProfileImage ? (
                // แสดงรูปโปรไฟล์ถ้ามี
                <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-[#2A7F7F]">
                  <Image 
                    src={user.profileImage || '/assets/images/profiles/default-employee.jpg'}
                    alt={user?.name || 'Employee Profile'}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ) : (
                // แสดงตัวอักษรแรกของชื่อถ้าไม่มีรูป
                <div className="w-12 h-12 rounded-full bg-[#2A7F7F] flex items-center justify-center text-white font-medium text-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
                </div>
              )}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name || 'พนักงาน'}</p>
            <p className="text-xs text-gray-500">{user?.position || 'เจ้าหน้าที่'}</p>
          </div>
        </div>
      </div>
      
      {/* เมนูนำทางหลัก */}
      <div className="p-4">
        <nav>
          <ul className="space-y-2">
            {/* เมนูแดชบอร์ด */}
            <li>
              <Link 
                href="/employee"
                className={`flex items-center p-2 rounded-md ${
                  isActive('/employee') 
                    ? 'bg-[#2A7F7F] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                แดชบอร์ด
              </Link>
            </li>
            {/* เมนูการลงเวลา */}
            <li>
              <Link 
                href="/employee/attendance"
                className={`flex items-center p-2 rounded-md ${
                  isActive('/employee/attendance') 
                    ? 'bg-[#2A7F7F] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                การลงเวลา
              </Link>
            </li>
            {/* เมนูโปรไฟล์ */}
            <li>
              <Link 
                href="/employee/profile" 
                className={`flex items-center p-2 rounded-md ${
                  isActive('/employee/profile') 
                    ? 'bg-[#2A7F7F] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                โปรไฟล์
              </Link>
            </li>
            {/* เมนูตั้งค่า */}
            <li>
              <Link 
                href="/employee/settings" 
                className={`flex items-center p-2 rounded-md ${
                  isActive('/employee/settings') 
                    ? 'bg-[#2A7F7F] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ตั้งค่า
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* ส่วนล่างสุดสำหรับปุ่มออกจากระบบ */}
      <div className="p-4 mt-auto border-t">
        <button 
          onClick={logout}
          className="flex items-center p-2 rounded-md text-red-500 hover:bg-red-50 w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}