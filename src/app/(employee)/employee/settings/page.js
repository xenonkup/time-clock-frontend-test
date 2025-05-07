"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import EmployeeHeader from "../../../../components/EmployeeHeader";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";

export default function EmployeeSettingsPage() {
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState("notifications");
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    clockReminders: true,
    weeklyReports: false,
    leaveApprovals: true
  });
  
  // Role verification
  if (!user || hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Handlers
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value
    });
  };
  
  const saveNotificationSettings = () => {
    // จำลองการบันทึกข้อมูล
    setTimeout(() => {
      setSuccessMessage("บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 500);
  };
  
  const changePassword = (e) => {
    e.preventDefault();
    
    // Validation
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
      <EmployeeHeader title="ตั้งค่า" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex border-b overflow-x-auto">
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
                className={`px-4 py-3 font-medium whitespace-nowrap ${activeTab === 'appearance' ? 'text-[#2A7F7F] border-b-2 border-[#2A7F7F]' : 'text-gray-500'}`}
                onClick={() => setActiveTab('appearance')}
              >
                การแสดงผล
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแจ้งเตือน</h2>
                  
                  <div className="space-y-4">
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
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">เตือนการลงเวลา</h3>
                        <p className="text-sm text-gray-500">รับการแจ้งเตือนเมื่อใกล้ถึงเวลาลงชื่อเข้างาน/ออกงาน</p>
                      </div>
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
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h3 className="font-medium">การอนุมัติลา</h3>
                        <p className="text-sm text-gray-500">รับการแจ้งเตือนเมื่อมีการอนุมัติหรือปฏิเสธการลา</p>
                      </div>
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
              
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">ตั้งค่าความปลอดภัย</h2>
                  
                  {errorMessage && (
                    <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                      {errorMessage}
                    </div>
                  )}
                  
                  <div className="space-y-6">
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
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-2">การเข้าสู่ระบบ</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        จัดการเซสชันการเข้าสู่ระบบและอุปกรณ์ที่ใช้งาน
                      </p>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                        ออกจากระบบทุกอุปกรณ์
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">ตั้งค่าการแสดงผล</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">ธีม</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div className="border-2 border-[#2A7F7F] p-3 rounded-lg cursor-pointer">
                          <div className="h-20 bg-white rounded-md mb-2 flex items-center justify-center text-[#2A7F7F]">
                            สว่าง
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium">โหมดสว่าง</span>
                          </div>
                        </div>
                        
                        <div className="border-2 border-gray-200 p-3 rounded-lg cursor-pointer">
                          <div className="h-20 bg-gray-800 rounded-md mb-2 flex items-center justify-center text-white">
                            มืด
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium">โหมดมืด</span>
                          </div>
                        </div>
                        
                        <div className="border-2 border-gray-200 p-3 rounded-lg cursor-pointer">
                          <div className="h-20 bg-gradient-to-b from-white to-gray-800 rounded-md mb-2 flex items-center justify-center text-gray-600">
                            อัตโนมัติ
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium">ตามระบบ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-2">ภาษา</h3>
                      <select className="block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="th">ไทย</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
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