"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }
    
    const success = login(username, password);
    if (!success) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <>
      <main className="bg-[#DEFBF9] min-h-screen flex flex-col items-center justify-center p-4">
        <div className="mb-6">
          <Image 
            src="/assets/Logo/logo.png"
            alt="Logo"
            width={250}
            height={250}
            className=""
          />
        </div>

        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-medium text-[#2A7F7F] mb-6">เข้าสู่ระบบ</h1>
          
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
            
            <button 
              type="submit"
              className="w-full bg-[#2A7F7F] text-white py-2 rounded-md text-center hover:bg-[#236565] transition-colors"
            >
              เข้าสู่ระบบ
            </button>
            
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-[#2A7F7F] text-sm hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ระบบบันทึกเวลาทำงานพนักงาน (Time Clock System)
          </p>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
            <p className="font-medium">หมายเหตุสำคัญ</p>
            <p>พนักงานไม่สามารถลงทะเบียนบัญชีผู้ใช้ได้ด้วยตนเอง</p>
            <p>กรุณาติดต่อผู้ดูแลระบบเพื่อขอรับบัญชีผู้ใช้สำหรับเข้าใช้งาน</p>
          </div>
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