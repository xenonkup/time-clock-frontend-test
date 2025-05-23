"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  // ประกาศตัวแปร state เพื่อเก็บค่าต่างๆ ในฟอร์ม
  const [oldPassword, setOldPassword] = useState("");  // รหัสผ่านเดิม
  const [newPassword, setNewPassword] = useState("");  // รหัสผ่านใหม่
  const [confirmPassword, setConfirmPassword] = useState("");  // ยืนยันรหัสผ่านใหม่
  const [message, setMessage] = useState(null);  // ข้อความแจ้งเตือนหรือแสดงสถานะ
  const [isSubmitting, setIsSubmitting] = useState(false);  // สถานะการส่งข้อมูล
  const router = useRouter();  // ตัวช่วยในการนำทางไปยังหน้าอื่นๆ

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();  // ป้องกันการรีเฟรชหน้าเว็บเมื่อกดส่งฟอร์ม
    setIsSubmitting(true);  // ตั้งค่าสถานะว่ากำลังส่งข้อมูล
    setMessage(null);  // ล้างข้อความแจ้งเตือนเดิม
    
    // ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
    // ตรวจสอบว่ากรอกรหัสผ่านเดิมหรือไม่
    if (!oldPassword) {
      setMessage({ type: 'error', text: 'โปรดกรอกรหัสผ่านเดิม' });
      setIsSubmitting(false);
      return;
    }
    
    // ตรวจสอบว่ากรอกรหัสผ่านใหม่หรือไม่
    if (!newPassword) {
      setMessage({ type: 'error', text: 'โปรดกรอกรหัสผ่านใหม่' });
      setIsSubmitting(false);
      return;
    }
    
    // ตรวจสอบว่ารหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ตรงกันหรือไม่
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'รหัสผ่านใหม่ไม่ตรงกัน' });
      setIsSubmitting(false);
      return;
    }

    try {
      // ในระบบจริงจะมีการเรียก API เพื่อเปลี่ยนรหัสผ่าน
      // จำลองการเรียก API โดยใช้ setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // แสดงข้อความเมื่อเปลี่ยนรหัสผ่านสำเร็จ
      setMessage({ 
        type: 'success', 
        text: 'เปลี่ยนรหัสผ่านสำเร็จ' 
      });
      
      // ล้างข้อมูลในฟอร์ม
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      // ในระบบจริงจะมีการนำทางกลับไปยังหน้าล็อกอินหลังจากเปลี่ยนรหัสผ่านสำเร็จ
      setTimeout(() => {
        router.push('/');  // นำทางไปยังหน้าล็อกอิน
      }, 2000);  // หน่วงเวลา 2 วินาทีเพื่อให้ผู้ใช้เห็นข้อความสำเร็จ
      
    } catch (error) {
      // แสดงข้อความเมื่อเกิดข้อผิดพลาด
      setMessage({ 
        type: 'error', 
        text: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง' 
      });
    } finally {
      // ตั้งค่าสถานะว่าเสร็จสิ้นการส่งข้อมูล
      setIsSubmitting(false);
    }
  };

  return (
    // หน้าเปลี่ยนรหัสผ่าน
    <main className="bg-[#DEFBF9] min-h-screen flex flex-col items-center justify-center p-4">
      {/* แสดงโลโก้ */}
      <div className="mb-6">
        <Image 
          src="/assets/Logo/logo.png"
          alt="Logo"
          width={150}
          height={150}
          className=""
        />
      </div>

      {/* กล่องฟอร์มเปลี่ยนรหัสผ่าน */}
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-medium text-center text-[#2A7F7F] mb-6">เปลี่ยนรหัสผ่าน</h1>
        
        {/* แสดงข้อความแจ้งเตือนหรือข้อความสำเร็จ */}
        {message && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700'  // สไตล์สำหรับข้อความสำเร็จ
              : 'bg-red-100 text-red-700'  // สไตล์สำหรับข้อความแจ้งเตือน
          }`}>
            {message.text}
          </div>
        )}
        
        {/* ฟอร์มสำหรับเปลี่ยนรหัสผ่าน */}
        <form onSubmit={handleSubmit}>
          {/* ช่องกรอกรหัสผ่านเดิม */}
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">รหัสผ่านเดิม</label>
            <input 
              type="password" 
              id="oldPassword" 
              placeholder="รหัสผ่านเดิม" 
              className="w-full border border-gray-300 rounded-md p-2"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          
          {/* ช่องกรอกรหัสผ่านใหม่ */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">รหัสผ่านใหม่</label>
            <input 
              type="password" 
              id="newPassword" 
              placeholder="รหัสผ่านใหม่" 
              className="w-full border border-gray-300 rounded-md p-2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          {/* ช่องกรอกยืนยันรหัสผ่านใหม่ */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">ยืนยันรหัสผ่านใหม่</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="รหัสผ่านใหม่" 
              className="w-full border border-gray-300 rounded-md p-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          {/* ปุ่มยืนยันการเปลี่ยนรหัสผ่าน */}
          <button 
            type="submit"
            className="w-full bg-[#2A7F7F] text-white py-2 rounded-md text-center hover:bg-[#236565] transition-colors"
          >
            {isSubmitting ? 'กำลังดำเนินการ...' : 'ยืนยัน'}
          </button>
          
          {/* ลิงก์กลับไปยังหน้าล็อกอิน */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-[#2A7F7F] text-sm hover:underline">
              กลับสู่หน้าล็อกอิน
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
} 