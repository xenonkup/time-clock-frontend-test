"use client";

import { useState } from "react";
import AdminHeader from "../../../../components/AdminHeader";

// คอมโพเนนต์หลักสำหรับหน้าจัดการตารางเวลา
export default function SchedulePage() {
  // สร้าง state สำหรับเก็บเดือนปัจจุบันที่กำลังแสดงในปฏิทิน
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // ข้อมูลจำลองของกิจกรรมต่างๆ
  const events = [
    { id: 1, title: "ประชุมทีม", start: new Date(2023, currentMonth.getMonth(), 10, 10, 0), end: new Date(2023, currentMonth.getMonth(), 10, 11, 30), type: "meeting" },
    { id: 2, title: "กำหนดส่งงานโปรเจค", start: new Date(2023, currentMonth.getMonth(), 15), end: new Date(2023, currentMonth.getMonth(), 15), type: "deadline" },
    { id: 3, title: "วันหยุดบริษัท", start: new Date(2023, currentMonth.getMonth(), 25), end: new Date(2023, currentMonth.getMonth(), 25), type: "holiday" },
    { id: 4, title: "อบรมพนักงาน", start: new Date(2023, currentMonth.getMonth(), 18, 14, 0), end: new Date(2023, currentMonth.getMonth(), 18, 16, 0), type: "training" },
  ];

  // ฟังก์ชันสำหรับรับวันทั้งหมดในเดือนที่ระบุ
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // หาจำนวนวันในเดือน
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // สร้างอาร์เรย์เก็บวันที่ทั้งหมดในเดือน
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    
    return days;
  };

  // ฟังก์ชันสำหรับรับวันในสัปดาห์ (0-6, โดย 0 คือวันอาทิตย์)
  const getDayOfWeek = (date) => {
    return date.getDay();
  };

  // ฟังก์ชันเปลี่ยนไปแสดงเดือนก่อนหน้า
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // ฟังก์ชันเปลี่ยนไปแสดงเดือนถัดไป
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // ฟังก์ชันจัดรูปแบบวันที่ให้แสดงเฉพาะชื่อเดือนและปี
  const formatMonthYear = (date) => {
    // แปลงเป็นภาษาไทย
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543; // แปลงเป็นปี พ.ศ.
    return `${month} ${year}`;
  };

  // ฟังก์ชันรับกิจกรรมทั้งหมดของวันที่ระบุ
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      // ตรวจสอบว่ากิจกรรมอยู่ในวันที่ระบุหรือไม่
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() && 
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  // สร้างข้อมูลสำหรับแสดงปฏิทิน
  const calendarDays = getDaysInMonth(currentMonth);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startingDayOfWeek = getDayOfWeek(firstDayOfMonth);

  // สร้างช่องว่างสำหรับวันว่างก่อนวันแรกของเดือน
  const emptyCells = Array.from({ length: startingDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="border bg-gray-50 min-h-[100px]"></div>
  ));

  // สร้างช่องวันสำหรับแต่ละวันในเดือน
  const dayCells = calendarDays.map((day) => {
    // รับกิจกรรมของวันนี้
    const dayEvents = getEventsForDay(day);
    // ตรวจสอบว่าเป็นวันปัจจุบันหรือไม่
    const isToday = new Date().toDateString() === day.toDateString();
    
    return (
      <div key={day.toISOString()} className={`border p-2 min-h-[100px] ${isToday ? 'bg-blue-50' : ''}`}>
        {/* แสดงวันที่ */}
        <div className={`text-right ${isToday ? 'font-bold text-blue-600' : ''}`}>
          {day.getDate()}
        </div>
        
        {/* แสดงกิจกรรมของวัน */}
        <div className="mt-1 space-y-1">
          {dayEvents.map((event) => (
            <div 
              key={event.id} 
              className={`text-xs p-1 rounded truncate ${
                event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :  // ประชุม
                event.type === 'deadline' ? 'bg-red-100 text-red-800' :    // กำหนดส่ง
                event.type === 'holiday' ? 'bg-green-100 text-green-800' : // วันหยุด
                'bg-yellow-100 text-yellow-800'                            // อบรม
              }`}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>
    );
  });

  return (
    <>
      <AdminHeader title="ตารางเวลา" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* ส่วนควบคุมปฏิทิน */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{formatMonthYear(currentMonth)}</h2>
            </div>
            
            <div className="flex space-x-2">
              {/* ปุ่มเดือนก่อนหน้า */}
              <button 
                onClick={prevMonth}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* ปุ่มกลับมาเดือนปัจจุบัน */}
              <button 
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                วันนี้
              </button>
              
              {/* ปุ่มเดือนถัดไป */}
              <button 
                onClick={nextMonth}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* ปุ่มเพิ่มกิจกรรม */}
            <button className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565] transition-colors">
              เพิ่มกิจกรรม
            </button>
          </div>
          
          {/* ตารางปฏิทิน */}
          <div className="grid grid-cols-7 gap-px">
            {/* หัวตาราง (ชื่อวัน) */}
            {['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'].map((day) => (
              <div key={day} className="font-medium text-center p-2 bg-gray-50">
                {day}
              </div>
            ))}
            
            {/* ช่องของปฏิทิน */}
            {emptyCells}
            {dayCells}
          </div>
        </div>
        
        {/* รายการกิจกรรมที่จะเกิดขึ้น */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">กิจกรรมที่กำลังจะมาถึง</h3>
          
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex border-l-4 pl-4 py-2 border-[#2A7F7F]">
                <div className="w-24 flex-shrink-0">
                  {/* แสดงวันที่ของกิจกรรม */}
                  <div className="text-sm font-medium">
                    {event.start.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                  </div>
                  {/* แสดงเวลาของกิจกรรม */}
                  <div className="text-xs text-gray-500">
                    {event.start.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <div>
                  {/* แสดงชื่อกิจกรรม */}
                  <div className="font-medium">{event.title}</div>
                  {/* แสดงประเภทกิจกรรม */}
                  <div className="text-sm text-gray-500">
                    {
                      event.type === 'meeting' ? 'ประชุม' :
                      event.type === 'deadline' ? 'กำหนดส่ง' :
                      event.type === 'holiday' ? 'วันหยุด' :
                      'อบรม'
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
} 