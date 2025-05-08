"use client"; // คอมโพเนนต์ฝั่งไคลเอนต์

// นำเข้าคอมโพเนนต์และฟังก์ชันที่จำเป็น
import { useState } from "react"; // ฮุคสำหรับจัดการสถานะในคอมโพเนนต์
import { useAuth } from "../../../../context/AuthContext"; // ฮุคสำหรับใช้งานข้อมูลการยืนยันตัวตน
import EmployeeHeader from "../../../../components/EmployeeHeader"; // คอมโพเนนต์ส่วนหัวของหน้าพนักงาน
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess"; // คอมโพเนนต์แสดงเมื่อไม่มีสิทธิ์เข้าถึง

// คอมโพเนนต์หลักสำหรับหน้าตั้งค่าของพนักงาน
export default function EmployeeSettingsPage() {
  // ดึงข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก AuthContext
  const { user, hasRole } = useAuth();
  // สร้าง state สำหรับจัดการแท็บที่กำลังแสดงผล เริ่มต้นที่แท็บการแจ้งเตือน
  const [activeTab, setActiveTab] = useState("notifications");
  // สร้าง state สำหรับเก็บค่าการตั้งค่าการแจ้งเตือนต่างๆ
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true, // การแจ้งเตือนทางอีเมล
    clockReminders: true, // การแจ้งเตือนเวลาลงชื่อเข้า-ออก
    weeklyReports: false, // รายงานประจำสัปดาห์
    leaveApprovals: true // การแจ้งเตือนการอนุมัติวันลา
  });
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ ถ้าไม่ใช่พนักงานจะแสดงหน้าแจ้งเตือนไม่มีสิทธิ์
  if (!user || hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  // สร้าง state สำหรับเก็บข้อความแจ้งสถานะความสำเร็จ
  const [successMessage, setSuccessMessage] = useState("");
  
  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงการตั้งค่าการแจ้งเตือน
  const handleNotificationChange = (setting) => {
    // อัปเดตสถานะการตั้งค่าโดยสลับค่าของการตั้งค่าที่ถูกเลือก (เปิด/ปิด)
    setNotificationSettings({
      ...notificationSettings, // คงค่าเดิมของการตั้งค่าอื่นๆ
      [setting]: !notificationSettings[setting] // สลับค่าการตั้งค่าที่ต้องการเปลี่ยน
    });
  };
  
  // ฟังก์ชันสำหรับจำลองการบันทึกการตั้งค่าการแจ้งเตือน
  const saveNotificationSettings = () => {
    // จำลองการบันทึกข้อมูลโดยใช้ setTimeout เพื่อทำให้ดูเหมือนมีการเรียก API
    setTimeout(() => {
      // แสดงข้อความแจ้งเตือนความสำเร็จ
      setSuccessMessage("บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว");
      // ซ่อนข้อความแจ้งเตือนหลังจาก 3 วินาที
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 500);
  };

  // ส่วนการแสดงผล UI ของหน้าตั้งค่า
  return (
    <>
      {/* แสดงส่วนหัวของหน้าพนักงาน */}
      <EmployeeHeader title="ตั้งค่า" />
      
      {/* ส่วนเนื้อหาหลักของหน้า */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        {/* แสดงข้อความแจ้งความสำเร็จหากมี */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {/* กล่องเนื้อหาหลัก */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* แถบแท็บสำหรับเลือกหมวดการตั้งค่า */}
            <div className="flex border-b overflow-x-auto">
              {/* ปุ่มแท็บสำหรับหมวดการแจ้งเตือน */}
              <button 
                className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'notifications' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('notifications')}
              >
                การแจ้งเตือน
              </button>
              {/* ปุ่มแท็บสำหรับหมวดการแสดงผล */}
              <button 
                className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'appearance' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('appearance')}
              >
                การแสดงผล
              </button>
            </div>
            
            {/* พื้นที่แสดงเนื้อหาตามแท็บที่เลือก */}
            <div className="p-6">
              {/* เนื้อหาของแท็บการแจ้งเตือน */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแจ้งเตือน</h2>
                  
                  {/* รายการตั้งค่าการแจ้งเตือนต่างๆ */}
                  <div className="space-y-4">
                    {/* การตั้งค่าการแจ้งเตือนทางอีเมล */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">การแจ้งเตือนทางอีเมล</h3>
                        <p className="text-sm text-gray-500">รับการแจ้งเตือนผ่านทางอีเมล</p>
                      </div>
                      {/* สวิตช์เปิด/ปิดการแจ้งเตือนทางอีเมล */}
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="emailNotifications" 
                          className="sr-only"
                          checked={notificationSettings.emailNotifications}
                          onChange={() => handleNotificationChange('emailNotifications')}
                        />
                        <label 
                          htmlFor="emailNotifications" 
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                            notificationSettings.emailNotifications ? 'bg-[#2A7F7F]' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                              notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    {/* การตั้งค่าเตือนการลงเวลา */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">เตือนการลงเวลา</h3>
                        <p className="text-sm text-gray-500">รับการแจ้งเตือนเมื่อใกล้ถึงเวลาลงชื่อเข้างาน/ออกงาน</p>
                      </div>
                      {/* สวิตช์เปิด/ปิดการแจ้งเตือนการลงเวลา */}
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="clockReminders" 
                          className="sr-only"
                          checked={notificationSettings.clockReminders}
                          onChange={() => handleNotificationChange('clockReminders')}
                        />
                        <label 
                          htmlFor="clockReminders" 
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                            notificationSettings.clockReminders ? 'bg-[#2A7F7F]' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                              notificationSettings.clockReminders ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    {/* การตั้งค่ารายงานประจำสัปดาห์ */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">รายงานประจำสัปดาห์</h3>
                        <p className="text-sm text-gray-500">รับสรุปการเข้างานประจำสัปดาห์</p>
                      </div>
                      {/* สวิตช์เปิด/ปิดรายงานประจำสัปดาห์ */}
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="weeklyReports" 
                          className="sr-only"
                          checked={notificationSettings.weeklyReports}
                          onChange={() => handleNotificationChange('weeklyReports')}
                        />
                        <label 
                          htmlFor="weeklyReports" 
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                            notificationSettings.weeklyReports ? 'bg-[#2A7F7F]' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                              notificationSettings.weeklyReports ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    {/* การตั้งค่าการแจ้งเตือนการอนุมัติลา */}
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">การอนุมัติลา</h3>
                        <p className="text-sm text-gray-500">รับการแจ้งเตือนเมื่อมีการอนุมัติหรือปฏิเสธการลา</p>
                      </div>
                      {/* สวิตช์เปิด/ปิดการแจ้งเตือนการอนุมัติลา */}
                      <div className="relative inline-block w-12 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id="leaveApprovals" 
                          className="sr-only"
                          checked={notificationSettings.leaveApprovals}
                          onChange={() => handleNotificationChange('leaveApprovals')}
                        />
                        <label 
                          htmlFor="leaveApprovals" 
                          className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                            notificationSettings.leaveApprovals ? 'bg-[#2A7F7F]' : 'bg-gray-300'
                          }`}
                        >
                          <span 
                            className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                              notificationSettings.leaveApprovals ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          ></span>
                        </label>
                      </div>
                    </div>
                    
                    {/* ปุ่มบันทึกการตั้งค่าการแจ้งเตือน */}
                    <div className="border-t pt-6 mt-6">
                      <button 
                        className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565]"
                        onClick={saveNotificationSettings}
                      >
                        บันทึกการเปลี่ยนแปลง
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* เนื้อหาของแท็บการแสดงผล */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแสดงผล</h2>
                  
                  <div className="space-y-6">
                    {/* การตั้งค่าภาษา */}
                    <div>
                      <h3 className="font-medium mb-2">ภาษา</h3>
                      {/* ตัวเลือกภาษาสำหรับระบบ */}
                      <select className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="th">ไทย</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    {/* ปุ่มบันทึกการตั้งค่าการแสดงผล */}
                    <div className="border-t pt-6">
                      <button className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565]">
                        บันทึกการเปลี่ยนแปลง
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 