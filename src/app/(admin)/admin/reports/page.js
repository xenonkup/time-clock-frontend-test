"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import AdminHeader from "../../../../components/AdminHeader";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";
import { Chart } from "react-google-charts";

// คอมโพเนนต์หลักสำหรับหน้ารายงานของแอดมิน
export default function ReportsPage() {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์
  const { user, hasRole } = useAuth();
  
  // สร้าง state สำหรับเก็บช่วงวันที่ที่ต้องการดูรายงาน
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0], // วันที่เริ่มต้น (30 วันก่อน)
    endDate: new Date().toISOString().split('T')[0] // วันที่สิ้นสุด (วันนี้)
  });
  
  // สร้าง state สำหรับเก็บประเภทรายงานที่เลือก
  const [reportType, setReportType] = useState("attendance");
  
  // สร้าง state สำหรับควบคุมการโหลดข้อมูล
  const [isLoading, setIsLoading] = useState(false);
  
  // ตรวจสอบสิทธิ์ - ถ้าไม่ใช่แอดมิน ให้แสดงหน้าปฏิเสธการเข้าถึง
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }

  // ฟังก์ชันจัดการเมื่อเปลี่ยนช่วงวันที่
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ฟังก์ชันจัดการเมื่อเปลี่ยนประเภทรายงาน
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  // ฟังก์ชันจัดการการส่งฟอร์มเพื่อสร้างรายงาน
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // จำลองการโหลดข้อมูล
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // ข้อมูลรายงานการมาทำงานรายวัน (ข้อมูลจำลอง)
  const attendanceData = [
    ["วันที่", "มาทำงาน", "ขาดงาน", "มาสาย"],
    ["01/05/2023", 14, 1, 2],
    ["02/05/2023", 15, 0, 1],
    ["03/05/2023", 12, 2, 3],
    ["04/05/2023", 13, 1, 2],
    ["05/05/2023", 14, 0, 2],
    ["08/05/2023", 15, 0, 1],
    ["09/05/2023", 14, 1, 1],
    ["10/05/2023", 13, 2, 1],
    ["11/05/2023", 12, 3, 1],
    ["12/05/2023", 15, 0, 1],
  ];

  // ข้อมูลรายงานการลาแยกตามประเภท (ข้อมูลจำลอง)
  const leaveData = [
    ["ประเภทการลา", "จำนวนวัน"],
    ["ลาป่วย", 15],
    ["ลากิจ", 8],
    ["ลาพักร้อน", 12],
    ["ลาคลอด", 3],
    ["อื่นๆ", 2],
  ];

  // ข้อมูลรายงานชั่วโมงการทำงานล่วงเวลา (ข้อมูลจำลอง)
  const overtimeData = [
    ["แผนก", "ชั่วโมงล่วงเวลา"],
    ["IT", 48],
    ["การตลาด", 32],
    ["บัญชี", 24],
    ["ขาย", 44],
    ["ผลิต", 62],
  ];

  // เลือกข้อมูลกราฟตามประเภทรายงานที่เลือก
  const getChartData = () => {
    switch (reportType) {
      case "attendance":
        return attendanceData;
      case "leave":
        return leaveData;
      case "overtime":
        return overtimeData;
      default:
        return attendanceData;
    }
  };

  // เลือกประเภทกราฟตามประเภทรายงานที่เลือก
  const getChartType = () => {
    switch (reportType) {
      case "attendance":
        return "LineChart";
      case "leave":
        return "PieChart";
      case "overtime":
        return "ColumnChart";
      default:
        return "LineChart";
    }
  };

  // กำหนดตัวเลือกสำหรับกราฟ
  const chartOptions = {
    legend: { position: 'bottom' },
    colors: ['#2A7F7F', '#E53E3E', '#F59E0B'],
    chartArea: { width: '80%', height: '70%' },
  };

  return (
    <>
      <AdminHeader title="รายงาน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* ส่วนเลือกประเภทรายงานและช่วงวันที่ */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">ตัวเลือกรายงาน</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* เลือกประเภทรายงาน */}
                <div>
                  <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-1">
                    ประเภทรายงาน
                  </label>
                  <select
                    id="reportType"
                    name="reportType"
                    value={reportType}
                    onChange={handleReportTypeChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="attendance">รายงานการลงเวลา</option>
                    <option value="leave">รายงานการลา</option>
                    <option value="overtime">รายงานการทำงานล่วงเวลา</option>
                  </select>
                </div>
                
                {/* เลือกวันที่เริ่มต้น */}
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่เริ่มต้น
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                {/* เลือกวันที่สิ้นสุด */}
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    วันที่สิ้นสุด
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
              
              {/* ปุ่มสร้างรายงาน */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 bg-[#2A7F7F] text-white rounded-md hover:bg-[#236565] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'กำลังสร้างรายงาน...' : 'สร้างรายงาน'}
                </button>
              </div>
            </form>
          </div>
          
          {/* ส่วนแสดงรายงานและกราฟ */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {reportType === 'attendance' && 'รายงานการลงเวลาทำงาน'}
                {reportType === 'leave' && 'รายงานการลาแยกตามประเภท'}
                {reportType === 'overtime' && 'รายงานการทำงานล่วงเวลาแยกตามแผนก'}
              </h2>
              
              {/* ปุ่มดาวน์โหลดรายงาน */}
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                ดาวน์โหลด PDF
              </button>
            </div>
            
            {/* แสดงกราฟตามประเภทที่เลือก */}
            <div className="h-[400px]">
              <Chart
                width="100%"
                height="100%"
                chartType={getChartType()}
                loader={<div className="flex justify-center items-center h-full">กำลังโหลดข้อมูล...</div>}
                data={getChartData()}
                options={chartOptions}
              />
            </div>
            
            {/* คำอธิบายเพิ่มเติมสำหรับรายงาน */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">คำอธิบายเพิ่มเติม</h3>
              <p className="text-sm text-gray-600">
                {reportType === 'attendance' && 'รายงานนี้แสดงข้อมูลการมาทำงานของพนักงานทั้งหมดในช่วงวันที่ที่เลือก โดยแบ่งเป็นจำนวนพนักงานที่มาทำงาน, ขาดงาน และมาทำงานสาย'}
                {reportType === 'leave' && 'รายงานนี้แสดงสัดส่วนของการลาแยกตามประเภทต่างๆ ในช่วงวันที่ที่เลือก'}
                {reportType === 'overtime' && 'รายงานนี้แสดงจำนวนชั่วโมงทำงานล่วงเวลาทั้งหมดของแต่ละแผนกในช่วงวันที่ที่เลือก'}
              </p>
            </div>
          </div>
          
          {/* ส่วนรายงานสรุปตัวเลขสำคัญ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* บัตรสรุปจำนวนพนักงานมาทำงาน */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">พนักงานมาทำงาน</p>
                  <p className="text-2xl font-semibold mt-1">92%</p>
                  <p className="text-xs text-green-600 mt-1">+2.5% จากเดือนที่แล้ว</p>
                </div>
                <div className="p-2 rounded-full bg-green-100 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* บัตรสรุปจำนวนการลา */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">วันลาทั้งหมด</p>
                  <p className="text-2xl font-semibold mt-1">42 วัน</p>
                  <p className="text-xs text-red-600 mt-1">+10.2% จากเดือนที่แล้ว</p>
                </div>
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* บัตรสรุปชั่วโมงทำงานล่วงเวลา */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 font-medium">ชั่วโมงล่วงเวลา</p>
                  <p className="text-2xl font-semibold mt-1">210 ชม.</p>
                  <p className="text-xs text-red-600 mt-1">-5.3% จากเดือนที่แล้ว</p>
                </div>
                <div className="p-2 rounded-full bg-blue-100 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 