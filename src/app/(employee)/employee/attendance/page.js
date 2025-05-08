"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";
import EmployeeHeader from "../../../../components/EmployeeHeader";

export default function AttendanceHistory() {
  const { user, hasRole } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  
  useEffect(() => {
    // Skip if not authorized
    if (!user || !hasRole('employee')) {
      return;
    }
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate data loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock attendance data
        const mockAttendance = [
          { date: '2023-10-01', clockIn: '08:55', clockOut: '17:05', status: 'present', workHours: 8.17 },
          { date: '2023-10-02', clockIn: '08:45', clockOut: '17:00', status: 'present', workHours: 8.25 },
          { date: '2023-10-03', clockIn: '09:10', clockOut: '17:15', status: 'late', workHours: 8.08 },
          { date: '2023-10-04', clockIn: '08:50', clockOut: '17:10', status: 'present', workHours: 8.33 },
          { date: '2023-10-05', clockIn: '08:48', clockOut: '17:02', status: 'present', workHours: 8.23 },
          { date: '2023-10-08', clockIn: '08:57', clockOut: '17:08', status: 'present', workHours: 8.18 },
          { date: '2023-10-09', clockIn: '09:15', clockOut: '17:20', status: 'late', workHours: 8.08 },
          { date: '2023-10-10', clockIn: '08:53', clockOut: '17:05', status: 'present', workHours: 8.20 },
        ];
        
        setAttendanceRecords(mockAttendance);
      } catch (error) {
        console.error("Error loading attendance data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user, hasRole]);
  
  // Role verification - after all hook calls
  if (!user || !hasRole('employee')) {
    return <UnauthorizedAccess />;
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <>
      <EmployeeHeader title="Attendance History" />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A7F7F]"></div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Clock In
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Clock Out
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Work Hours
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendanceRecords.map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formatDate(record.date)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.clockIn}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.clockOut}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{record.workHours} hrs</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {record.status === 'present' ? 'On Time' : 'Late'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 