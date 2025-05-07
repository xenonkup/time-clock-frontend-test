"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EmployeeSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(true);

  const isActive = (path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className={`bg-[#134B4B] text-white transition-all duration-300 ${expanded ? 'w-64' : 'w-20'}`}>
      <div className="flex flex-col h-full">
        {/* Header with logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-[#1d6363]">
          {expanded ? (
            <h1 className="text-xl font-semibold text-white">Time Clock</h1>
          ) : (
            <h1 className="text-xl font-semibold text-white">TC</h1>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded-md hover:bg-[#1d6363]"
          >
            {expanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-[#1d6363]">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="bg-[#1d6363] h-10 w-10 rounded-full flex items-center justify-center text-white font-medium">
                {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            {expanded && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user ? user.name : 'พนักงาน'}
                </p>
                <p className="text-xs text-gray-300 truncate">
                  {user ? user.position : 'ตำแหน่ง'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link 
            href="/employee" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {expanded && <span>หน้าหลัก</span>}
          </Link>

          <Link 
            href="/employee/attendance" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee/attendance') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {expanded && <span>บันทึกเวลา</span>}
          </Link>

          <Link 
            href="/employee/schedule" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee/schedule') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {expanded && <span>ตารางงาน</span>}
          </Link>

          <Link 
            href="/employee/reports" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee/reports') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {expanded && <span>รายงาน</span>}
          </Link>

          <Link 
            href="/employee/announcements" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee/announcements') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            {expanded && <span>ประกาศ</span>}
          </Link>

          <Link 
            href="/employee/profile" 
            className={`flex items-center px-2 py-2 text-sm rounded-md ${
              isActive('/employee/profile') ? 'bg-[#1d6363] text-white' : 'text-gray-300 hover:bg-[#1d6363] hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {expanded && <span>โปรไฟล์</span>}
          </Link>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#1d6363]">
          <button
            onClick={logout}
            className="flex items-center w-full px-2 py-2 text-sm text-white hover:bg-[#1d6363] rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${expanded ? 'mr-3' : 'mx-auto'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {expanded && <span>ออกจากระบบ</span>}
          </button>
        </div>
      </div>
    </div>
  );
}