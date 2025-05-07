"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import EmployeeHeader from "../../../components/EmployeeHeader";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [clockStatus, setClockStatus] = useState('out'); // 'in', 'out', 'break'

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Mock function for clock-in action
  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setClockStatus('in');
    
    // ในระบบจริงจะต้องส่ง API request เพื่อบันทึกเวลาเข้างาน
    console.log("Clock in at:", now);
  };

  // Mock function for clock-out action
  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    setClockStatus('out');
    
    // ในระบบจริงจะต้องส่ง API request เพื่อบันทึกเวลาออกงาน
    console.log("Clock out at:", now);
  };

  // Format time as HH:MM
  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  // Format date as day month year
  const formatDate = (date) => {
    return date.toLocaleDateString('th-TH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  // Calculate hours worked
  const calculateHoursWorked = () => {
    if (!clockInTime || !clockOutTime) return '-';
    
    const diffMs = clockOutTime - clockInTime;
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    return diffHrs.toFixed(2);
  };

  return (
    <>
      <EmployeeHeader title="หน้าหลักพนักงาน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clock In/Out Card */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">บันทึกเวลาทำงาน</h2>
            
            <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <p className="text-sm text-gray-500">{formatDate(currentTime)}</p>
                <p className="text-4xl font-bold">{formatTime(currentTime)}</p>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleClockIn}
                  disabled={clockStatus === 'in'}
                  className={`px-6 py-2 rounded-md ${
                    clockStatus === 'in'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  เข้างาน
                </button>
                
                <button
                  onClick={handleClockOut}
                  disabled={clockStatus === 'out'}
                  className={`px-6 py-2 rounded-md ${
                    clockStatus === 'out'
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  ออกงาน
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-4">
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">เข้างาน</p>
                <p className="text-xl font-medium">{formatTime(clockInTime)}</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">ออกงาน</p>
                <p className="text-xl font-medium">{formatTime(clockOutTime)}</p>
              </div>
              
              <div className="text-center p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500">ชั่วโมงทำงาน</p>
                <p className="text-xl font-medium">{calculateHoursWorked()} ชม.</p>
              </div>
            </div>
          </div>
          
          {/* Employee Info Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">ข้อมูลพนักงาน</h2>
            
            <div className="flex items-center mb-6">
              <div className="mr-4 bg-[#2A7F7F] h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <h3 className="text-xl font-medium">{user?.name || 'พนักงาน'}</h3>
                <p className="text-gray-500">{user?.position || 'ตำแหน่ง'}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">แผนก:</span>
                <span className="font-medium">{user?.department || '-'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">รหัสพนักงาน:</span>
                <span className="font-medium">#{user?.id || '-'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">อีเมล:</span>
                <span className="font-medium">{user?.email || '-'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-500">สถานะ:</span>
                <span className="font-medium text-green-500">ทำงาน</span>
              </div>
            </div>
          </div>
          
          {/* Announcements Preview */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">ประกาศล่าสุด</h2>
            
            <div className="divide-y divide-gray-200">
              <div className="py-4">
                <h3 className="text-md font-medium text-[#2A7F7F] mb-1">ประกาศวันหยุดประจำปี 2567</h3>
                <p className="text-sm text-gray-500 mb-2">28 กุมภาพันธ์ 2567</p>
                <p className="text-sm text-gray-700">ประกาศวันหยุดประจำปี 2567 สามารถดูรายละเอียดได้ที่บอร์ดประชาสัมพันธ์...</p>
              </div>
              
              <div className="py-4">
                <h3 className="text-md font-medium text-[#2A7F7F] mb-1">เปลี่ยนแปลงนโยบายการทำงาน</h3>
                <p className="text-sm text-gray-500 mb-2">15 กุมภาพันธ์ 2567</p>
                <p className="text-sm text-gray-700">มีการเปลี่ยนแปลงนโยบายการทำงานจากที่บ้าน (Work from Home)...</p>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a href="/employee/announcements" className="text-sm text-[#2A7F7F] hover:underline">ดูประกาศทั้งหมด</a>
            </div>
          </div>
          
          {/* Recent Attendance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">การเข้างานล่าสุด</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-md bg-green-50">
                <div>
                  <p className="text-sm font-medium">จันทร์, 4 มี.ค. 2567</p>
                  <p className="text-xs text-gray-500">8:50 - 17:05</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">ตรงเวลา</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-md bg-green-50">
                <div>
                  <p className="text-sm font-medium">อังคาร, 5 มี.ค. 2567</p>
                  <p className="text-xs text-gray-500">8:45 - 17:00</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">ตรงเวลา</span>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-md bg-red-50">
                <div>
                  <p className="text-sm font-medium">พุธ, 6 มี.ค. 2567</p>
                  <p className="text-xs text-gray-500">9:10 - 17:05</p>
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">สาย</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a href="/employee/attendance" className="text-sm text-[#2A7F7F] hover:underline">ดูประวัติการเข้างานทั้งหมด</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 