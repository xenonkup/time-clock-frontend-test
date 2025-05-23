"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdminHeader from "../../../components/AdminHeader";
import { Chart } from "react-google-charts";
import { useAuth } from "../../../context/AuthContext";
import UnauthorizedAccess from "../../../components/UnauthorizedAccess";

// คอมโพเนนต์หลักของหน้าแดชบอร์ดสำหรับแอดมิน
export default function AdminDashboard() {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก Context
  const { user, hasRole } = useAuth();
  
  // สร้าง state สำหรับเก็บข้อมูลสถิติต่างๆ บนแดชบอร์ด
  const [stats, setStats] = useState({
    totalEmployees: 0,     // จำนวนพนักงานทั้งหมด
    presentToday: 0,       // จำนวนพนักงานที่มาทำงานวันนี้
    onLeave: 0,            // จำนวนพนักงานที่ลางานวันนี้
    pendingApprovals: 0    // จำนวนคำขอที่รอการอนุมัติ
  });
  
  // state สำหรับเก็บข้อมูลกราฟ
  const [employeesByDept, setEmployeesByDept] = useState([]); // ข้อมูลพนักงานแยกตามแผนก (สำหรับกราฟวงกลม)
  const [weeklyAttendance, setWeeklyAttendance] = useState([]); // ข้อมูลการเข้างานรายสัปดาห์ (สำหรับกราฟเส้น)
  const [isLoading, setIsLoading] = useState(true); // แสดงสถานะการโหลดข้อมูล
  
  // ดึงข้อมูลสำหรับแสดงบนแดชบอร์ดเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ข้ามการดึงข้อมูลถ้าผู้ใช้ไม่มีสิทธิ์แอดมิน
    if (!user || !hasRole('admin')) {
      return;
    }
    
    // ฟังก์ชันดึงข้อมูลสำหรับแดชบอร์ด
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // จำลองการโหลดข้อมูล (ในระบบจริงจะเป็นการเรียก API)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // จำลองข้อมูลพนักงานสำหรับใช้คำนวณสถิติ
        const mockEmployees = [
          { id: 1, name: "สมชาย ใจดี", department: "Engineering", status: "active", attendance: "present" },
          { id: 2, name: "สมหญิง รักดี", department: "Engineering", status: "active", attendance: "present" },
          { id: 3, name: "ประเสริฐ ดีงาม", department: "Engineering", status: "active", attendance: "present" },
          { id: 4, name: "กรกนก มากมี", department: "Engineering", status: "active", attendance: "late" },
          { id: 5, name: "วิชัย ชัยมงคล", department: "Sales", status: "active", attendance: "present" },
          { id: 6, name: "นารี ดีนัก", department: "Sales", status: "active", attendance: "absent" },
          { id: 7, name: "สมศรี มีชัย", department: "Sales", status: "inactive", attendance: "absent" },
          { id: 8, name: "วิเชียร เพียรดี", department: "Marketing", status: "active", attendance: "present" },
          { id: 9, name: "พรทิพย์ ทิพย์โสภา", department: "Marketing", status: "active", attendance: "present" },
          { id: 10, name: "อนุชา ชาญชัย", department: "Marketing", status: "active", attendance: "present" },
          { id: 11, name: "จินดา ดารินทร์", department: "HR", status: "active", attendance: "present" },
          { id: 12, name: "ชูชาติ ชาติชาย", department: "HR", status: "active", attendance: "present" },
          { id: 13, name: "ปรีชา ชาญยิ่ง", department: "Finance", status: "active", attendance: "present" },
          { id: 14, name: "สุชาดา ดาราทิพย์", department: "Finance", status: "active", attendance: "present" },
          { id: 15, name: "อภิชาติ ชาติไทย", department: "Finance", status: "active", attendance: "late" },
        ];
        
        // คำนวณสถิติพนักงานจากข้อมูลจำลอง
        const activeEmployees = mockEmployees.filter(emp => emp.status === "active");
        const presentToday = mockEmployees.filter(emp => emp.attendance === "present").length;
        const onLeave = mockEmployees.filter(emp => emp.attendance === "absent").length;
        
        // คำนวณข้อมูลสำหรับกราฟแสดงจำนวนพนักงานแยกตามแผนก
        const departments = {};
        mockEmployees.forEach(emp => {
          if (emp.status === "active") {
            if (!departments[emp.department]) {
              departments[emp.department] = 0;
            }
            departments[emp.department] += 1;
          }
        });
        
        // แปลงข้อมูลให้อยู่ในรูปแบบที่ใช้กับกราฟ Google Charts
        const departmentData = [['Department', 'Employees']];
        Object.entries(departments).forEach(([dept, count]) => {
          departmentData.push([dept, count]);
        });
        
        // จำลองข้อมูลการเข้างานรายสัปดาห์สำหรับกราฟเส้น
        const weeklyData = [
          ['Day', 'มาทำงาน', 'ขาด/ลา', 'มาสาย'],
          ['จันทร์', 14, 1, 0],
          ['อังคาร', 13, 1, 1],
          ['พุธ', 12, 2, 1],
          ['พฤหัส', 13, 1, 1],
          ['ศุกร์', 14, 0, 1],
        ];
        
        // อัพเดต state ด้วยข้อมูลที่คำนวณได้
        setStats({
          totalEmployees: activeEmployees.length,
          presentToday: presentToday,
          onLeave: onLeave,
          pendingApprovals: 2, // จำลองข้อมูลคำขออนุมัติที่รอดำเนินการ
        });
        
        // อัพเดต state สำหรับกราฟ
        setEmployeesByDept(departmentData);
        setWeeklyAttendance(weeklyData);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล Dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // เรียกฟังก์ชันดึงข้อมูล
    fetchDashboardData();
  }, [user, hasRole]);
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ (ต้องเป็นแอดมิน)
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  // ฟังก์ชันจัดรูปแบบวันที่เป็นภาษาไทย
  const formatThaiDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('th-TH', options);
  };

  return (
    <>
      {/* ส่วนหัวของหน้า */}
      <AdminHeader title="แดชบอร์ด" />
      
      {/* เนื้อหาหลัก */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
        {/* แสดงวันที่ปัจจุบัน */}
        <div className="mb-4 text-sm text-gray-600">
          วันที่: {formatThaiDate()}
        </div>
        
        {/* แสดง loading spinner ระหว่างโหลดข้อมูล */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A7F7F]"></div>
          </div>
        ) : (
          <>
            {/* แถวบัตรแสดงสถิติสรุปข้อมูลพนักงาน */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* บัตรแสดงจำนวนพนักงานทั้งหมด */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">พนักงานทั้งหมด</p>
                    <p className="text-2xl font-semibold">{stats.totalEmployees}</p>
                  </div>
                </div>
              </div>
              
              {/* บัตรแสดงจำนวนพนักงานที่มาทำงานวันนี้ */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">มาทำงานวันนี้</p>
                    <p className="text-2xl font-semibold">{stats.presentToday}</p>
                  </div>
                </div>
              </div>
              
              {/* บัตรแสดงจำนวนพนักงานที่ลาวันนี้ */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">ลาวันนี้</p>
                    <p className="text-2xl font-semibold">{stats.onLeave}</p>
                  </div>
                </div>
              </div>
              
              {/* บัตรแสดงจำนวนคำขอที่รอการอนุมัติ */}
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-500 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">รอการอนุมัติ</p>
                    <p className="text-2xl font-semibold">{stats.pendingApprovals}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* พื้นที่แสดงกราฟวิเคราะห์ข้อมูล */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* กราฟเส้นแสดงข้อมูลการเข้างานรายสัปดาห์ */}
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">การเข้างานรายสัปดาห์</h2>
                <Chart
                  width={'100%'}
                  height={'300px'}
                  chartType="LineChart"
                  loader={<div>กำลังโหลดข้อมูล...</div>}
                  data={weeklyAttendance}
                  options={{
                    hAxis: { title: 'วัน' },
                    vAxis: { title: 'จำนวนพนักงาน' },
                    series: {
                      0: { color: '#2A7F7F' },  // สีเส้นกราฟสำหรับพนักงานที่มาทำงาน
                      1: { color: '#f56565' },  // สีเส้นกราฟสำหรับพนักงานที่ขาด/ลา
                      2: { color: '#F59E0B' },  // สีเส้นกราฟสำหรับพนักงานที่มาสาย
                    },
                    legend: { position: 'bottom' },  // ตำแหน่งของคำอธิบายกราฟ
                  }}
                />
              </div>
              
              {/* กราฟวงกลมแสดงจำนวนพนักงานแยกตามแผนก */}
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-lg font-semibold mb-4">พนักงานแยกตามแผนก</h2>
                <Chart
                  width={'100%'}
                  height={'300px'}
                  chartType="PieChart"
                  loader={<div>กำลังโหลดข้อมูล...</div>}
                  data={employeesByDept}
                  options={{
                    colors: ['#2A7F7F', '#3B82F6', '#F59E0B', '#10B981', '#6366F1'],  // สีต่างๆ สำหรับแต่ละส่วนของกราฟวงกลม
                    legend: { position: 'bottom' },  // ตำแหน่งของคำอธิบายกราฟ
                  }}
                />
              </div>
            </div>
            
            {/* ส่วนแสดงลิงก์ลัดไปยังฟังก์ชันสำคัญต่างๆ */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">การดำเนินการด่วน</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* ลิงก์ไปยังหน้าเพิ่มพนักงานใหม่ */}
                <Link href="/admin/employees/new" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-blue-100 text-blue-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span>เพิ่มพนักงานใหม่</span>
                </Link>
                
                {/* ลิงก์ไปยังหน้าจัดการพนักงาน */}
                <Link href="/admin/employees" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-green-100 text-green-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span>จัดการพนักงาน</span>
                </Link>
                
                {/* ลิงก์ไปยังหน้าจัดการตารางงาน */}
                <Link href="/admin/schedule" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-yellow-100 text-yellow-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>จัดการตารางงาน</span>
                </Link>
                
                {/* ลิงก์ไปยังหน้าตั้งค่าระบบ */}
                <Link href="/admin/settings" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <div className="p-2 rounded-full bg-purple-100 text-purple-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span>ตั้งค่าระบบ</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
} 