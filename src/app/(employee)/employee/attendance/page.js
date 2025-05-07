"use client";

import { useState } from "react";
import EmployeeHeader from "../../../../components/EmployeeHeader";

export default function EmployeeAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Mock attendance data
  const attendanceData = [
    { date: '2024-03-01', status: 'present', clockIn: '08:55', clockOut: '17:02', hoursWorked: 8.12, remarks: '' },
    { date: '2024-03-04', status: 'present', clockIn: '08:50', clockOut: '17:05', hoursWorked: 8.25, remarks: '' },
    { date: '2024-03-05', status: 'present', clockIn: '08:45', clockOut: '17:00', hoursWorked: 8.25, remarks: '' },
    { date: '2024-03-06', status: 'late', clockIn: '09:10', clockOut: '17:05', hoursWorked: 7.92, remarks: 'สาย 10 นาที' },
    { date: '2024-03-07', status: 'present', clockIn: '08:50', clockOut: '17:00', hoursWorked: 8.17, remarks: '' },
    { date: '2024-03-08', status: 'present', clockIn: '08:45', clockOut: '17:00', hoursWorked: 8.25, remarks: '' },
    { date: '2024-03-11', status: 'present', clockIn: '08:55', clockOut: '17:02', hoursWorked: 8.12, remarks: '' },
    { date: '2024-03-12', status: 'present', clockIn: '08:58', clockOut: '17:00', hoursWorked: 8.03, remarks: '' },
    { date: '2024-03-13', status: 'absent', clockIn: '-', clockOut: '-', hoursWorked: 0, remarks: 'ลาป่วย' },
    { date: '2024-03-14', status: 'present', clockIn: '08:45', clockOut: '17:00', hoursWorked: 8.25, remarks: '' },
    { date: '2024-03-15', status: 'present', clockIn: '08:50', clockOut: '17:00', hoursWorked: 8.17, remarks: '' },
  ];
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'short'
    });
  };
  
  // Month navigation
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  // Get month name
  const getMonthName = (month) => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return months[month];
  };
  
  // Calculate monthly statistics
  const calculateStats = () => {
    let presentDays = 0;
    let lateDays = 0;
    let absentDays = 0;
    let totalHours = 0;
    
    attendanceData.forEach(day => {
      if (day.status === 'present') {
        presentDays++;
        totalHours += day.hoursWorked;
      } else if (day.status === 'late') {
        lateDays++;
        totalHours += day.hoursWorked;
      } else if (day.status === 'absent') {
        absentDays++;
      }
    });
    
    return { presentDays, lateDays, absentDays, totalHours };
  };
  
  const stats = calculateStats();

  return (
    <>
      <EmployeeHeader title="ประวัติการเข้างาน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Month selector */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex justify-between items-center">
              <button 
                onClick={goToPreviousMonth}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h2 className="text-xl font-medium">
                {getMonthName(currentMonth)} {currentYear + 543}
              </h2>
              
              <button 
                onClick={goToNextMonth}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">เข้างานตรงเวลา</p>
                  <p className="text-xl font-semibold">{stats.presentDays} วัน</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">มาสาย</p>
                  <p className="text-xl font-semibold">{stats.lateDays} วัน</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ขาด/ลา</p>
                  <p className="text-xl font-semibold">{stats.absentDays} วัน</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ชั่วโมงทำงานรวม</p>
                  <p className="text-xl font-semibold">{stats.totalHours.toFixed(2)} ชม.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Attendance table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      วันที่
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      เข้างาน
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ออกงาน
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ชั่วโมงทำงาน
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      หมายเหตุ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceData.map((day, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(day.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${day.status === 'present' ? 'bg-green-100 text-green-800' : 
                            day.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {day.status === 'present' ? 'เข้างาน' : 
                           day.status === 'late' ? 'มาสาย' : 'ขาด/ลา'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{day.clockIn}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{day.clockOut}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{day.hoursWorked} ชม.</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{day.remarks}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 