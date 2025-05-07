"use client";

import { useState } from "react";
import AdminHeader from "../../../../components/AdminHeader";
import { useAuth } from "../../../../context/AuthContext";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";

export default function SettingsPage() {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก AuthContext
  const { user, hasRole } = useAuth();
  // กำหนด state สำหรับแท็บที่เลือกในปัจจุบัน
  const [activeTab, setActiveTab] = useState("general");
  // กำหนด state สำหรับการตั้งค่าการแจ้งเตือน
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    dailyReports: false,
    weeklyReports: true
  });
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ (ต้องเป็นแอดมิน)
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  // กำหนด state สำหรับการตั้งค่าทั่วไป
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "บริษัท ไทม์คล็อค จำกัด",
    timezone: "Asia/Bangkok",
    workWeekStart: "monday"
  });
  
  // กำหนด state สำหรับการเปลี่ยนรหัสผ่าน
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  // กำหนด state สำหรับข้อความแจ้งผลการทำงาน
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // ฟังก์ชันจัดการการเปลี่ยนแปลงการตั้งค่าการแจ้งเตือน
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  // ฟังก์ชันจัดการการเปลี่ยนแปลงการตั้งค่าทั่วไป
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };
  
  // ฟังก์ชันจัดการการเปลี่ยนแปลงข้อมูลรหัสผ่าน
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    });
  };
  
  // ฟังก์ชันบันทึกการตั้งค่าทั่วไป
  const saveGeneralSettings = () => {
    // จำลองการบันทึกข้อมูล
    setTimeout(() => {
      setSuccessMessage("บันทึกการตั้งค่าทั่วไปเรียบร้อยแล้ว");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 500);
  };
  
  // ฟังก์ชันบันทึกการตั้งค่าการแจ้งเตือน
  const saveNotificationSettings = () => {
    // จำลองการบันทึกข้อมูล
    setTimeout(() => {
      setSuccessMessage("บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 500);
  };
  
  // ฟังก์ชันเปลี่ยนรหัสผ่าน
  const changePassword = (e) => {
    e.preventDefault();
    
    // ตรวจสอบความถูกต้องของข้อมูล
    if (!password.current) {
      setErrorMessage("กรุณากรอกรหัสผ่านปัจจุบัน");
      return;
    }
    
    if (!password.new) {
      setErrorMessage("กรุณากรอกรหัสผ่านใหม่");
      return;
    }
    
    if (password.new.length < 6) {
      setErrorMessage("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    
    if (password.new !== password.confirm) {
      setErrorMessage("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    
    // จำลองการเปลี่ยนรหัสผ่าน
    setTimeout(() => {
      setSuccessMessage("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      setPassword({
        current: "",
        new: "",
        confirm: ""
      });
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 500);
  };

  return (
    <>
      <AdminHeader title="ตั้งค่าระบบ" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        {/* แสดงข้อความสำเร็จเมื่อมีการบันทึกการตั้งค่า */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {/* ส่วนหลักของการตั้งค่า */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* แท็บเมนูสำหรับเลือกประเภทการตั้งค่า */}
          <div className="flex border-b overflow-x-auto">
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'general' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('general')}
            >
              ตั้งค่าทั่วไป
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'notifications' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('notifications')}
            >
              การแจ้งเตือน
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'security' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('security')}
            >
              ความปลอดภัย
            </button>
            <button 
              className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'advanced' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
              onClick={() => setActiveTab('advanced')}
            >
              ขั้นสูง
            </button>
          </div>
          
          {/* เนื้อหาของการตั้งค่าแต่ละแท็บ */}
          <div className="p-6">
            {/* เนื้อหาแท็บตั้งค่าทั่วไป */}
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">ตั้งค่าทั่วไป</h2>
                
                <div className="space-y-6">
                  {/* ตั้งค่าชื่อบริษัท */}
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อบริษัท
                    </label>
                    <input 
                      type="text" 
                      id="companyName" 
                      name="companyName"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={generalSettings.companyName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  
                  {/* ตั้งค่าโซนเวลา */}
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                      โซนเวลา
                    </label>
                    <select 
                      id="timezone" 
                      name="timezone"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={generalSettings.timezone}
                      onChange={handleGeneralChange}
                    >
                      <option value="Asia/Bangkok">เวลากรุงเทพฯ (GMT+7)</option>
                      <option value="Asia/Tokyo">เวลาโตเกียว (GMT+9)</option>
                      <option value="Europe/London">เวลาลอนดอน (GMT+0)</option>
                      <option value="America/New_York">เวลานิวยอร์ก (GMT-5)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  {/* ตั้งค่าวันเริ่มต้นสัปดาห์การทำงาน */}
                  <div>
                    <label htmlFor="workWeekStart" className="block text-sm font-medium text-gray-700 mb-1">
                      วันเริ่มต้นสัปดาห์การทำงาน
                    </label>
                    <select 
                      id="workWeekStart" 
                      name="workWeekStart"
                      className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      value={generalSettings.workWeekStart}
                      onChange={handleGeneralChange}
                    >
                      <option value="sunday">วันอาทิตย์</option>
                      <option value="monday">วันจันทร์</option>
                      <option value="saturday">วันเสาร์</option>
                    </select>
                  </div>
                  
                  {/* ปุ่มบันทึกการตั้งค่าทั่วไป */}
                  <div className="border-t pt-6">
                    <button 
                      className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565]"
                      onClick={saveGeneralSettings}
                    >
                      บันทึกการเปลี่ยนแปลง
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* เนื้อหาแท็บตั้งค่าการแจ้งเตือน */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแจ้งเตือน</h2>
                
                <div className="space-y-4">
                  {/* ตั้งค่าการแจ้งเตือนทางอีเมล */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">การแจ้งเตือนทางอีเมล</h3>
                      <p className="text-sm text-gray-500">รับการแจ้งเตือนผ่านทางอีเมล</p>
                    </div>
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
                  
                  {/* ตั้งค่ารายงานประจำวัน */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">รายงานประจำวัน</h3>
                      <p className="text-sm text-gray-500">รับสรุปการเข้างานประจำวัน</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="dailyReports" 
                        className="sr-only"
                        checked={notificationSettings.dailyReports}
                        onChange={() => handleNotificationChange('dailyReports')}
                      />
                      <label 
                        htmlFor="dailyReports" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.dailyReports ? 'bg-[#2A7F7F]' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.dailyReports ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  {/* ตั้งค่ารายงานประจำสัปดาห์ */}
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium">รายงานประจำสัปดาห์</h3>
                      <p className="text-sm text-gray-500">รับสรุปการเข้างานประจำสัปดาห์</p>
                    </div>
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
            
            {/* เนื้อหาแท็บตั้งค่าความปลอดภัย */}
            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">ตั้งค่าความปลอดภัย</h2>
                
                {/* แสดงข้อความแจ้งเตือนความผิดพลาด */}
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                    {errorMessage}
                  </div>
                )}
                
                <div className="space-y-6">
                  {/* ส่วนเปลี่ยนรหัสผ่าน */}
                  <div>
                    <h3 className="font-medium mb-2">เปลี่ยนรหัสผ่าน</h3>
                    <form onSubmit={changePassword} className="space-y-3">
                      <div>
                        <label htmlFor="current" className="block text-sm text-gray-700 mb-1">
                          รหัสผ่านปัจจุบัน
                        </label>
                        <input 
                          type="password" 
                          id="current" 
                          name="current"
                          className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={password.current}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="new" className="block text-sm text-gray-700 mb-1">
                          รหัสผ่านใหม่
                        </label>
                        <input 
                          type="password" 
                          id="new" 
                          name="new"
                          className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={password.new}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm" className="block text-sm text-gray-700 mb-1">
                          ยืนยันรหัสผ่านใหม่
                        </label>
                        <input 
                          type="password" 
                          id="confirm" 
                          name="confirm"
                          className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          value={password.confirm}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <button type="submit" className="mt-3 bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565]">
                        เปลี่ยนรหัสผ่าน
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {/* เนื้อหาแท็บตั้งค่าขั้นสูง */}
            {activeTab === 'advanced' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">ตั้งค่าขั้นสูง</h2>
                
                {/* กล่องเตือนสำหรับการตั้งค่าขั้นสูง */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">คำเตือน</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        การเปลี่ยนแปลงการตั้งค่าขั้นสูงอาจส่งผลกระทบต่อการทำงานของระบบ โปรดดำเนินการด้วยความระมัดระวัง
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* ส่วนการสำรองข้อมูล */}
                  <div>
                    <h3 className="font-medium mb-2">การสำรองข้อมูล</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ดาวน์โหลดสำเนาข้อมูลทั้งหมดในระบบ
                    </p>
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
                      สำรองข้อมูลทั้งหมด
                    </button>
                  </div>
                  
                  {/* ส่วนการลบข้อมูล */}
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2">ลบข้อมูล</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      ลบข้อมูลทั้งหมดในระบบ การดำเนินการนี้ไม่สามารถย้อนกลับได้
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none">
                      ลบข้อมูลทั้งหมด
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}