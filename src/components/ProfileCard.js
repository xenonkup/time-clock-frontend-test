"use client";

import Image from "next/image";
import { useAuth } from "../context/AuthContext";

// คอมโพเนนต์ ProfileCard ใช้สำหรับแสดงข้อมูลโปรไฟล์ของผู้ใช้งานในระบบ
// รับ props className เพื่อกำหนดคลาสเพิ่มเติมจากภายนอก
export default function ProfileCard({ className }) {
  // ดึงข้อมูลผู้ใช้งานจาก AuthContext
  const { user } = useAuth();

  // กำหนดค่าเริ่มต้นกรณีที่ไม่มีข้อมูลผู้ใช้งาน
  const userData = {
    name: user?.name || "Admin User",
    role: user?.role || "ผู้ใช้งาน",
    position: user?.position || "System Administrator",
  };

  // กำหนดชื่อตำแหน่งให้เป็นภาษาไทยตามสิทธิ์การใช้งาน
  const roleName = userData.role === "admin" ? "System Administrator" : "พนักงาน";

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-4 relative">
        <div className="flex items-center justify-between">
          {/* ส่วนแสดงรูปโปรไฟล์และข้อมูลผู้ใช้ */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* แสดงตัวอักษรแรกของชื่อเป็นรูปโปรไฟล์ */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                {user?.name?.charAt(0) || "A"}
              </div>
            </div>
            {/* แสดงชื่อและตำแหน่งของผู้ใช้ */}
            <div className="ml-4">
              <h3 className="text-base font-medium text-gray-900">{userData.name}</h3>
              <p className="text-sm text-gray-500">{userData.position}</p>
            </div>
          </div>
          {/* ปุ่มสำหรับดูรายละเอียดโปรไฟล์เพิ่มเติม */}
          <div>
            <button className="text-[#2A7F7F] hover:text-[#236565] font-medium text-sm flex items-center">
              โปรไฟล์
              <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 