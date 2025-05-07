"use client";

import { useState } from "react";
import AdminHeader from "../../../../components/AdminHeader";

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Mock events data
  const events = [
    { id: 1, title: "Team Meeting", start: new Date(2023, currentMonth.getMonth(), 10, 10, 0), end: new Date(2023, currentMonth.getMonth(), 10, 11, 30), type: "meeting" },
    { id: 2, title: "Project Deadline", start: new Date(2023, currentMonth.getMonth(), 15), end: new Date(2023, currentMonth.getMonth(), 15), type: "deadline" },
    { id: 3, title: "Company Holiday", start: new Date(2023, currentMonth.getMonth(), 25), end: new Date(2023, currentMonth.getMonth(), 25), type: "holiday" },
    { id: 4, title: "Training Session", start: new Date(2023, currentMonth.getMonth(), 18, 14, 0), end: new Date(2023, currentMonth.getMonth(), 18, 16, 0), type: "training" },
  ];

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    
    return days;
  };

  // Get day of week (0-6, where 0 is Sunday)
  const getDayOfWeek = (date) => {
    return date.getDay();
  };

  // Move to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Move to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format date to display month and year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get events for a specific day
  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day.getDate() && 
             eventDate.getMonth() === day.getMonth() && 
             eventDate.getFullYear() === day.getFullYear();
    });
  };

  // Generate calendar grid
  const calendarDays = getDaysInMonth(currentMonth);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const startingDayOfWeek = getDayOfWeek(firstDayOfMonth);

  // Empty cells for days before the first day of month
  const emptyCells = Array.from({ length: startingDayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="border bg-gray-50 min-h-[100px]"></div>
  ));

  // Day cells
  const dayCells = calendarDays.map((day) => {
    const dayEvents = getEventsForDay(day);
    const isToday = new Date().toDateString() === day.toDateString();
    
    return (
      <div key={day.toISOString()} className={`border p-2 min-h-[100px] ${isToday ? 'bg-blue-50' : ''}`}>
        <div className={`text-right ${isToday ? 'font-bold text-blue-600' : ''}`}>
          {day.getDate()}
        </div>
        
        <div className="mt-1 space-y-1">
          {dayEvents.map((event) => (
            <div 
              key={event.id} 
              className={`text-xs p-1 rounded truncate ${
                event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                event.type === 'holiday' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
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
      <AdminHeader title="Schedule" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Calendar controls */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{formatMonthYear(currentMonth)}</h2>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={prevMonth}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Today
              </button>
              
              <button 
                onClick={nextMonth}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <button className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md hover:bg-[#236565] transition-colors">
              Add Event
            </button>
          </div>
          
          {/* Calendar */}
          <div className="grid grid-cols-7 gap-px">
            {/* Day labels */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="font-medium text-center p-2 bg-gray-50">
                {day}
              </div>
            ))}
            
            {/* Calendar cells */}
            {emptyCells}
            {dayCells}
          </div>
        </div>
        
        {/* Event list */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex border-l-4 pl-4 py-2 border-[#2A7F7F]">
                <div className="w-24 flex-shrink-0">
                  <div className="text-sm font-medium">
                    {event.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
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