"use client";

import Link from 'next/link';

// คอมโพเนนต์สำหรับแสดงหน้าแจ้งเตือนเมื่อผู้ใช้ไม่มีสิทธิ์เข้าถึงหน้านั้นๆ
export default function UnauthorizedAccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {/* ไอคอนแจ้งเตือน */}
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        {/* ข้อความแจ้งเตือน */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        {/* ปุ่มกลับไปยังหน้าล็อกอิน */}
        <Link href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
          Return to Login
        </Link>
      </div>
    </div>
  );
} 