"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// คอมโพเนนต์หลักสำหรับหน้าเข้าสู่ระบบ
export default function Home() {
  // สร้าง state สำหรับจัดเก็บชื่อผู้ใช้
  const [username, setUsername] = useState("");
  // สร้าง state สำหรับจัดเก็บรหัสผ่าน
  const [password, setPassword] = useState("");
  // สร้าง state สำหรับจัดเก็บข้อความแสดงข้อผิดพลาด
  const [error, setError] = useState("");
  // สร้าง state สำหรับสถานะจดจำการเข้าสู่ระบบ
  const [rememberMe, setRememberMe] = useState(false);
  // state สำหรับควบคุมการแสดงผลหน้าเว็บ
  const [pageReady, setPageReady] = useState(false);
  // ดึงฟังก์ชันเข้าสู่ระบบจาก AuthContext
  const { login, loading } = useAuth();

  // ตรวจสอบสถานะ loading จาก AuthContext
  useEffect(() => {
    if (!loading) {
      setPageReady(true);
    }
  }, [loading]);

  // ฟังก์ชันจัดการการส่งฟอร์มเข้าสู่ระบบ
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // ตรวจสอบว่ามีการกรอกชื่อผู้ใช้และรหัสผ่านครบหรือไม่
    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }
    
    // เรียกใช้ฟังก์ชันเข้าสู่ระบบและตรวจสอบผลลัพธ์
    const success = login(username, password);
    if (!success) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  // แสดงหน้าโหลดถ้า AuthContext กำลังโหลดข้อมูล
  if (!pageReady) {
    return (
      <div className="bg-[#DEFBF9] min-h-screen flex items-center justify-center">
        <div className="text-[#2A7F7F] text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <>
      <main className="bg-[#DEFBF9] min-h-screen flex flex-col items-center justify-center p-4">
        {/* ส่วนแสดงโลโก้ */}
        <div className="mb-6">
          <Image 
            src="/assets/Logo/logo.png"
            alt="Logo"
            width={250}
            height={250}
            className=""
          />
        </div>

        {/* ฟอร์มเข้าสู่ระบบ */}
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-medium text-[#2A7F7F] mb-6">เข้าสู่ระบบ</h1>
          
          {/* แสดงข้อความแจ้งเตือนข้อผิดพลาด (ถ้ามี) */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* ช่องกรอกชื่อผู้ใช้ */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
              <input 
                type="text" 
                id="username" 
                placeholder="ชื่อผู้ใช้" 
                className="w-full border border-gray-300 rounded-md p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            {/* ช่องกรอกรหัสผ่าน */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium mb-1">รหัสผ่าน</label>
              <input 
                type="password" 
                id="password" 
                placeholder="รหัสผ่าน" 
                className="w-full border border-gray-300 rounded-md p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* ตัวเลือกจดจำการเข้าสู่ระบบ */}
            <div className="mb-6 flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2 h-4 w-4 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm">จดจำการเข้าสู่ระบบ</label>
            </div>
            
            {/* ปุ่มส่งฟอร์มเข้าสู่ระบบ */}
            <button 
              type="submit"
              className="w-full bg-[#2A7F7F] text-white py-2 rounded-md text-center hover:bg-[#236565] transition-colors"
            >
              เข้าสู่ระบบ
            </button>
            
            {/* ลิงก์ไปหน้าลืมรหัสผ่าน */}
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-[#2A7F7F] text-sm hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </form>
        </div>
        
        {/* ส่วนข้อมูลเพิ่มเติมและคำแนะนำ */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ระบบบันทึกเวลาทำงานพนักงาน (Time Clock System)
          </p>
          {/* ข้อความแจ้งเตือนสำคัญสำหรับการใช้งาน */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
            <p className="font-medium">หมายเหตุสำคัญ</p>
            <p>พนักงานไม่สามารถลงทะเบียนบัญชีผู้ใช้ได้ด้วยตนเอง</p>
            <p>กรุณาติดต่อผู้ดูแลระบบเพื่อขอรับบัญชีผู้ใช้สำหรับเข้าใช้งาน</p>
          </div>
          {/* ข้อมูลรหัสสำหรับทดสอบระบบ */}
          <p className="mt-2">
            ข้อมูลเข้าสู่ระบบสำหรับทดสอบ:
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <div>
              <p><strong>แอดมิน</strong></p>
              <p>ชื่อผู้ใช้: admin</p>
              <p>รหัสผ่าน: admin123</p>
            </div>
            <div>
              <p><strong>พนักงาน</strong></p>
              <p>ชื่อผู้ใช้: employee1</p>
              <p>รหัสผ่าน: emp123</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 