"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import AdminHeader from "../../../../components/AdminHeader";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";

export default function EmployeesPage() {
  const { user, hasRole } = useAuth();
  
  // Role verification
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        // จำลองการรอ API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // จำลองข้อมูลพนักงาน
        const mockEmployees = [
          { id: 1, name: "สมชาย ใจดี", position: "โปรแกรมเมอร์", department: "Engineering", status: "active" },
          { id: 2, name: "สมหญิง รักดี", position: "นักออกแบบ UI", department: "Engineering", status: "active" },
          { id: 3, name: "ประเสริฐ ดีงาม", position: "วิศวกรเครือข่าย", department: "Engineering", status: "active" },
          { id: 4, name: "กรกนก มากมี", position: "โปรแกรมเมอร์ Full-stack", department: "Engineering", status: "inactive" },
          { id: 5, name: "วิชัย ชัยมงคล", position: "พนักงานขาย", department: "Sales", status: "active" },
          { id: 6, name: "นารี ดีนัก", position: "ผู้จัดการฝ่ายขาย", department: "Sales", status: "active" },
          { id: 7, name: "สมศรี มีชัย", position: "พนักงานขาย", department: "Sales", status: "inactive" },
          { id: 8, name: "วิเชียร เพียรดี", position: "นักการตลาดออนไลน์", department: "Marketing", status: "active" },
          { id: 9, name: "พรทิพย์ ทิพย์โสภา", position: "กราฟิกดีไซน์", department: "Marketing", status: "active" },
          { id: 10, name: "อนุชา ชาญชัย", position: "ผู้จัดการการตลาด", department: "Marketing", status: "active" },
          { id: 11, name: "จินดา ดารินทร์", position: "เจ้าหน้าที่ HR", department: "HR", status: "active" },
          { id: 12, name: "ชูชาติ ชาติชาย", position: "ผู้จัดการ HR", department: "HR", status: "active" },
          { id: 13, name: "ปรีชา ชาญยิ่ง", position: "นักบัญชี", department: "Finance", status: "active" },
          { id: 14, name: "สุชาดา ดาราทิพย์", position: "ผู้จัดการการเงิน", department: "Finance", status: "active" },
          { id: 15, name: "อภิชาติ ชาติไทย", position: "เจ้าหน้าที่การเงิน", department: "Finance", status: "inactive" },
        ];
        
        setEmployees(mockEmployees);
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการโหลดข้อมูลพนักงาน:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  // Filter employees based on search term and current filter
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.department?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (currentFilter === "all") {
      return matchesSearch;
    } else {
      return matchesSearch && employee.status === currentFilter;
    }
  });

  const handleDeleteEmployee = (employeeId, employeeName) => {
    if (confirm(`คุณต้องการลบข้อมูลของ ${employeeName} ใช่หรือไม่?`)) {
      // ในระบบจริงจะส่ง API request เพื่อลบข้อมูล
      // จำลองการลบข้อมูลโดยใช้ state
      setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId));
      alert(`ลบข้อมูลของ ${employeeName} เรียบร้อยแล้ว`);
    }
  };

  return (
    <>
      <AdminHeader title="จัดการพนักงาน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        {/* Search and filter bar */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="ค้นหาพนักงาน..." 
              className="w-full border border-gray-300 rounded-md p-2 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-sm">สถานะ:</span>
              <select 
                className="border border-gray-300 rounded-md p-2"
                value={currentFilter}
                onChange={(e) => setCurrentFilter(e.target.value)}
              >
                <option value="all">ทั้งหมด</option>
                <option value="active">ใช้งาน</option>
                <option value="inactive">ไม่ใช้งาน</option>
              </select>
            </div>
            
            <Link href="/admin/employees/new" className="bg-[#2A7F7F] text-white px-4 py-2 rounded-md shadow hover:bg-[#236565] transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              เพิ่มพนักงาน
            </Link>
          </div>
        </div>
        
        {/* Employee list */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A7F7F]"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      พนักงาน
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ตำแหน่ง
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      แผนก
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      สถานะ
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      จัดการ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                              {employee.imageUrl ? (
                                <img className="h-10 w-10 rounded-full" src={employee.imageUrl} alt="" />
                              ) : (
                                employee.name?.charAt(0)
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">รหัสพนักงาน: {employee.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{employee.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status === 'active' ? 'กำลังใช้งาน' : 'ไม่ใช้งาน'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/employees/${employee.id}/edit`}
                          className="text-[#2A7F7F] hover:text-[#236565] mr-4"
                        >
                          แก้ไข
                        </Link>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!isLoading && filteredEmployees.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              ไม่พบข้อมูลพนักงานที่ตรงกับเงื่อนไขการค้นหา
            </div>
          )}
          
          {!isLoading && filteredEmployees.length > 0 && (
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                  ก่อนหน้า
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
                  ถัดไป
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    แสดง <span className="font-medium">1</span> ถึง <span className="font-medium">{filteredEmployees.length}</span> จาก <span className="font-medium">{filteredEmployees.length}</span> รายการ
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-[#2A7F7F]">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 