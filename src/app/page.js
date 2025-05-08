"use client"; // คอมโพเนนต์ฝั่งไคลเอนต์

// นำเข้าคอมโพเนนต์และฟังก์ชันที่จำเป็น
import Image from "next/image"; // คอมโพเนนต์สำหรับแสดงรูปภาพแบบออพติไมซ์
import Link from "next/link"; // คอมโพเนนต์สำหรับการนำทางภายในแอพ
import { useState, useEffect } from "react"; // ฮุคพื้นฐานสำหรับจัดการสถานะและวงจรชีวิต
import { useAuth } from "../context/AuthContext"; // ฮุคสำหรับเรียกใช้ข้อมูลการยืนยันตัวตน

// คอมโพเนนต์หลักสำหรับหน้าเข้าสู่ระบบ (หน้าแรกของแอปพลิเคชัน)
export default function Home() {
  // สร้าง state ต่างๆ สำหรับจัดการข้อมูลในฟอร์มและการแสดงผล
  const [username, setUsername] = useState(""); // สำหรับเก็บค่าชื่อผู้ใช้
  const [password, setPassword] = useState(""); // สำหรับเก็บค่ารหัสผ่าน
  const [error, setError] = useState(""); // สำหรับเก็บข้อความแสดงข้อผิดพลาด
  const [rememberMe, setRememberMe] = useState(false); // สำหรับสถานะจดจำการเข้าสู่ระบบ
  const [pageReady, setPageReady] = useState(false); // สำหรับควบคุมการแสดงผลหน้าเว็บ ป้องกันการกระพริบ
  
  // ดึงฟังก์ชันและสถานะจาก AuthContext
  const { login, loading } = useAuth(); // login=ฟังก์ชันเข้าสู่ระบบ, loading=สถานะกำลังโหลด

  // ตรวจสอบสถานะ loading จาก AuthContext เพื่อป้องกันการกระพริบของหน้าเว็บ
  useEffect(() => {
    // เมื่อไม่มีการโหลดข้อมูลแล้ว ให้แสดงหน้าเว็บ
    if (!loading) {
      setPageReady(true);
    }
  }, [loading]); // เรียกใช้เมื่อ loading เปลี่ยนแปลง

  // ฟังก์ชันจัดการการส่งฟอร์มเข้าสู่ระบบ
  const handleSubmit = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บเมื่อกดส่งฟอร์ม
    setError(""); // ล้างข้อความแสดงข้อผิดพลาดเดิม
    
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
    // หากสำเร็จ AuthContext จะนำทางไปยังหน้าที่เหมาะสมโดยอัตโนมัติ
  };

  // แสดงหน้าโหลดถ้า AuthContext กำลังโหลดข้อมูล เพื่อป้องกันการกระพริบ
  if (!pageReady) {
    return (
      <div className="bg-[#DEFBF9] min-h-screen flex items-center justify-center">
        <div className="text-[#2A7F7F] text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  // หน้าเว็บหลักที่แสดงเมื่อโหลดเสร็จสมบูรณ์
  return (
    <>
      <main className="bg-[#DEFBF9] min-h-screen flex flex-col items-center justify-center p-4">
        {/* ส่วนแสดงโลโก้ของระบบ */}
        <div className="mb-6">
          <Image 
            src="/assets/Logo/logo.png"
            alt="Logo"
            width={250}
            height={250}
            className=""
          />
        </div>

        {/* ฟอร์มสำหรับการเข้าสู่ระบบ */}
        <div className="bg-white rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-medium text-[#2A7F7F] mb-6">เข้าสู่ระบบ</h1>
          
          {/* แสดงข้อความแจ้งเตือนข้อผิดพลาด (แสดงเฉพาะเมื่อมีข้อผิดพลาด) */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {/* ฟอร์มสำหรับกรอกข้อมูลเข้าสู่ระบบ */}
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
            
            {/* ตัวเลือกจดจำการเข้าสู่ระบบ สำหรับเก็บสถานะผู้ใช้ */}
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
            
            {/* ลิงก์สำหรับไปยังหน้าลืมรหัสผ่าน */}
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-[#2A7F7F] text-sm hover:underline">
                ลืมรหัสผ่าน?
              </Link>
            </div>
          </form>
        </div>
        
        {/* ส่วนแสดงข้อมูลเพิ่มเติมและคำแนะนำการใช้งาน */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            ระบบบันทึกเวลาทำงานพนักงาน (Time Clock System)
          </p>
          {/* ข้อความแจ้งเตือนสำคัญเกี่ยวกับการลงทะเบียนบัญชีผู้ใช้ */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
            <p className="font-medium">หมายเหตุสำคัญ</p>
            <p>พนักงานไม่สามารถลงทะเบียนบัญชีผู้ใช้ได้ด้วยตนเอง</p>
            <p>กรุณาติดต่อผู้ดูแลระบบเพื่อขอรับบัญชีผู้ใช้สำหรับเข้าใช้งาน</p>
          </div>
          {/* ส่วนแสดงข้อมูลตัวอย่างสำหรับทดสอบการเข้าสู่ระบบ */}
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