"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import UnauthorizedAccess from "../../../components/UnauthorizedAccess";
import EmployeeHeader from "../../../components/EmployeeHeader";

// คอมโพเนนต์หลักสำหรับหน้าแดชบอร์ดของพนักงาน
export default function EmployeeDashboard() {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก Context
  const { user, hasRole } = useAuth();
  
  // สร้าง state สำหรับการแสดงผลและจัดการข้อมูล
  const [isLoading, setIsLoading] = useState(true);  // แสดงสถานะการโหลดข้อมูล
  const [clockStatus, setClockStatus] = useState('out');  // สถานะการลงเวลาปัจจุบัน (เข้างาน/ออกงาน)
  const [lastClock, setLastClock] = useState(null);  // เวลาที่ลงเวลาล่าสุด
  
  // ดึงข้อมูลเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ข้ามการดึงข้อมูลถ้าผู้ใช้ไม่มีสิทธิ์เป็นพนักงาน
    if (!user || !hasRole('employee')) {
      return;
    }
    
    // ฟังก์ชันสำหรับดึงข้อมูลการลงเวลาของพนักงาน
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // จำลองการรอข้อมูลจาก API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // ข้อมูลจำลองสำหรับทดสอบ
        const mockStatus = 'out';  // สถานะการลงเวลาเริ่มต้น
        const mockLastClock = new Date();  // สร้างเวลาปัจจุบัน
        mockLastClock.setHours(mockLastClock.getHours() - 2);  // กำหนดให้ลงเวลาล่าสุดเมื่อ 2 ชั่วโมงที่แล้ว
        
        // อัพเดต state ด้วยข้อมูลจำลอง
        setClockStatus(mockStatus);
        setLastClock(mockLastClock);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลพนักงาน:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // เรียกฟังก์ชันดึงข้อมูล
    fetchData();
  }, [user, hasRole]);
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ (ต้องเป็นพนักงาน)
  if (!user || !hasRole('employee')) {
    return <UnauthorizedAccess />;
  }
  
  // ฟังก์ชันจัดรูปแบบเวลาให้แสดงเฉพาะชั่วโมงและนาที
  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  // ฟังก์ชันจัดรูปแบบวันที่เป็นภาษาไทย
  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('th-TH', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // จัดการการกดปุ่มลงเวลาเข้า-ออกงาน
  const handleClockInOut = () => {
    // สลับสถานะการลงเวลาระหว่างเข้างาน/ออกงาน
    const newStatus = clockStatus === 'in' ? 'out' : 'in';
    setClockStatus(newStatus);
    setLastClock(new Date());  // บันทึกเวลาปัจจุบันเป็นเวลาลงเวลาล่าสุด
    
    // ในระบบจริงจะมีการส่งข้อมูลไปยัง API เพื่อบันทึกการลงเวลา
    alert(`ลงเวลา${newStatus === 'in' ? 'เข้างาน' : 'ออกงาน'}สำเร็จที่เวลา ${formatTime(new Date())}`);
  };

  return (
    <>
      {/* ส่วนหัวของหน้า */}
      <EmployeeHeader title="แดชบอร์ด" />
      
      {/* เนื้อหาหลัก */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {/* แสดง loading spinner ระหว่างโหลดข้อมูล */}
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A7F7F]"></div>
            </div>
          ) : (
            <div className="mt-8">
              {/* บัตรสำหรับลงเวลาเข้า-ออกงาน */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">ระบบลงเวลา</h2>
                <p className="text-gray-600 mb-2">สถานะปัจจุบัน: 
                  <span className={`ml-2 font-semibold ${clockStatus === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                    {clockStatus === 'in' ? 'ลงเวลาเข้างานแล้ว' : 'ยังไม่ได้ลงเวลาเข้างาน'}
                  </span>
                </p>
                
                {/* แสดงเวลาลงเวลาล่าสุด (ถ้ามี) */}
                {lastClock && (
                  <p className="text-gray-600 mb-4">
                    ล่าสุด{clockStatus === 'in' ? 'ลงเวลาเข้า' : 'ลงเวลาออก'}เมื่อ: {formatTime(lastClock)} วันที่ {formatDate(lastClock)}
                  </p>
                )}
                
                {/* ปุ่มสำหรับลงเวลาเข้า/ออกงาน */}
                <button
                  onClick={handleClockInOut}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    clockStatus === 'in' 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {clockStatus === 'in' ? 'ลงเวลาออกงาน' : 'ลงเวลาเข้างาน'}
                </button>
              </div>
              
              {/* บัตรแสดงข้อมูลตารางงานวันนี้ */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">ตารางงานวันนี้</h2>
                <div className="border rounded-md p-4 bg-gray-50">
                  {/* เวลาการทำงาน */}
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-medium">เวลาทำงาน:</span>
                    <span>9:00 น. - 17:00 น.</span>
                  </div>
                  
                  {/* เวลาพัก */}
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <span className="font-medium">เวลาพัก:</span>
                    <span>12:00 น. - 13:00 น.</span>
                  </div>
                  
                  {/* แผนก */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium">แผนก:</span>
                    <span>ทั่วไป</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 