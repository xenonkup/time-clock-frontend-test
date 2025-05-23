"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../../context/AuthContext";
import AdminHeader from "../../../../../../components/AdminHeader";
import UnauthorizedAccess from "../../../../../../components/UnauthorizedAccess";
import { use } from "react";

// คอมโพเนนต์หลักสำหรับหน้าแก้ไขข้อมูลพนักงาน
export default function EditEmployeePage({ params }) {
  const router = useRouter();
  // ใช้ฟังก์ชัน use เพื่อดึงค่า params ที่ส่งมาจาก URL (ID ของพนักงาน)
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  // ดึงข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก Context
  const { user, hasRole } = useAuth();
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ (ต้องเป็นแอดมิน)
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  // สร้าง state สำหรับเก็บข้อมูลในฟอร์ม
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    position: "",
    department: "",
    role: "",
    status: "active"
  });
  
  // สร้าง state สำหรับจัดการข้อความแจ้งเตือนและสถานะต่างๆ
  const [errors, setErrors] = useState({});  // เก็บข้อความแจ้งเตือนข้อผิดพลาด
  const [isLoading, setIsLoading] = useState(false);  // สถานะกำลังบันทึกข้อมูล
  const [isLoadingData, setIsLoadingData] = useState(true);  // สถานะกำลังโหลดข้อมูล
  const [successMessage, setSuccessMessage] = useState("");  // ข้อความแจ้งเตือนสำเร็จ

  // ดึงข้อมูลพนักงานเมื่อคอมโพเนนต์ถูกโหลด (ข้อมูลจำลอง)
  useEffect(() => {
    // ฟังก์ชันสำหรับดึงข้อมูลพนักงานตาม ID
    const fetchEmployeeData = async () => {
      try {
        // ในระบบจริงจะเป็นการส่ง API request
        await new Promise(resolve => setTimeout(resolve, 500)); // จำลองการรอ API
        
        // จำลองข้อมูลพนักงานตาม ID
        const mockEmployeeData = {
          1: { id: 1, username: "johndoe", name: "John Doe", email: "john@example.com", position: "Software Developer", department: "Engineering", role: "employee", status: "active" },
          2: { id: 2, username: "janesmith", name: "Jane Smith", email: "jane@example.com", position: "Designer", department: "Design", role: "employee", status: "active" },
          3: { id: 3, username: "robert", name: "Robert Johnson", email: "robert@example.com", position: "Project Manager", department: "Management", role: "manager", status: "active" },
        };
        
        // ดึงข้อมูลพนักงานตาม ID ที่ระบุ
        const employeeData = mockEmployeeData[id];
        
        // ถ้าพบข้อมูลพนักงาน ให้อัพเดต state
        if (employeeData) {
          setFormData(employeeData);
        } else {
          // ถ้าไม่พบข้อมูล ให้แสดงข้อความแจ้งเตือนและนำทางกลับ
          setErrors({ general: "ไม่พบข้อมูลพนักงาน" });
          setTimeout(() => {
            router.push("/admin/employees");
          }, 2000);
        }
      } catch (error) {
        // แสดงข้อความแจ้งเตือนกรณีเกิดข้อผิดพลาด
        setErrors({ general: "เกิดข้อผิดพลาดในการโหลดข้อมูล" });
      } finally {
        // ตั้งค่าสถานะการโหลดข้อมูลเป็นเสร็จสิ้น
        setIsLoadingData(false);
      }
    };

    // เรียกฟังก์ชันเพื่อดึงข้อมูล
    fetchEmployeeData();
  }, [id, router]);

  // ฟังก์ชันจัดการการเปลี่ยนแปลงค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    // อัพเดต state ของข้อมูลในฟอร์ม
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // ล้างข้อความแจ้งเตือนข้อผิดพลาดเมื่อมีการแก้ไขข้อมูล
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // ฟังก์ชันตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
  const validateForm = () => {
    const newErrors = {};
    
    // ตรวจสอบว่าชื่อผู้ใช้ไม่เป็นค่าว่าง
    if (!formData.username.trim()) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    // ตรวจสอบว่าชื่อ-นามสกุลไม่เป็นค่าว่าง
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    // ตรวจสอบว่าอีเมลไม่เป็นค่าว่าง
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    // ตรวจสอบรูปแบบอีเมลให้ถูกต้อง
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    // ตรวจสอบว่าตำแหน่งไม่เป็นค่าว่าง
    if (!formData.position.trim()) newErrors.position = "กรุณากรอกตำแหน่ง";
    
    // อัพเดตข้อความแจ้งเตือนข้อผิดพลาด
    setErrors(newErrors);
    // คืนค่า true ถ้าไม่มีข้อผิดพลาด, false ถ้ามี
    return Object.keys(newErrors).length === 0;
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก
    if (!validateForm()) return;
    
    // แสดงสถานะกำลังบันทึกข้อมูล
    setIsLoading(true);
    
    try {
      // ในระบบจริงจะส่ง API request เพื่ออัพเดทข้อมูลพนักงาน
      
      // จำลองการส่งข้อมูลไปยัง API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // แสดงข้อความแจ้งเตือนสำเร็จ
      setSuccessMessage(`อัพเดทข้อมูลของ ${formData.name} เรียบร้อยแล้ว`);
      
      // นำทางกลับไปหน้ารายการพนักงานหลังจากแสดงข้อความสำเร็จ
      setTimeout(() => {
        router.push("/admin/employees");
      }, 2000);
      
    } catch (error) {
      // แสดงข้อความแจ้งเตือนกรณีเกิดข้อผิดพลาด
      setErrors({ submit: "เกิดข้อผิดพลาดในการอัพเดทข้อมูล กรุณาลองอีกครั้ง" });
    } finally {
      // ตั้งค่าสถานะการบันทึกข้อมูลเป็นเสร็จสิ้น
      setIsLoading(false);
    }
  };

  // แสดง loading spinner ระหว่างโหลดข้อมูล
  if (isLoadingData) {
    return (
      <>
        <AdminHeader title="กำลังโหลดข้อมูล..." />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A7F7F]"></div>
          </div>
        </main>
      </>
    );
  }

  // แสดงหน้าแจ้งเตือนข้อผิดพลาดหากไม่พบข้อมูลพนักงาน
  if (errors.general) {
    return (
      <>
        <AdminHeader title="ข้อผิดพลาด" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-red-500 text-lg mb-4">{errors.general}</div>
            <p>กำลังนำทางกลับไปหน้ารายการพนักงาน...</p>
          </div>
        </main>
      </>
    );
  }

  // แสดงหน้าแก้ไขข้อมูลพนักงาน
  return (
    <>
      {/* แสดงส่วนหัวของหน้า */}
      <AdminHeader title={`แก้ไขข้อมูล - ${formData.name}`} />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            {/* แสดงข้อความแจ้งเตือนสำเร็จ (ถ้ามี) */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
            
            {/* แสดงข้อความแจ้งเตือนข้อผิดพลาดเมื่อบันทึกข้อมูล (ถ้ามี) */}
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}
            
            {/* ฟอร์มแก้ไขข้อมูลพนักงาน */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ช่องกรอกชื่อผู้ใช้ */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อผู้ใช้ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>
                
                {/* ช่องกรอกชื่อ-นามสกุล */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                {/* ช่องกรอกอีเมล */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                {/* ช่องกรอกตำแหน่ง */}
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    ตำแหน่ง <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`w-full border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  />
                  {errors.position && <p className="mt-1 text-sm text-red-500">{errors.position}</p>}
                </div>
                
                {/* ช่องเลือกแผนก */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                    แผนก
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Engineering">วิศวกรรม</option>
                    <option value="Design">ออกแบบ</option>
                    <option value="Marketing">การตลาด</option>
                    <option value="Sales">ขาย</option>
                    <option value="Human Resources">ทรัพยากรบุคคล</option>
                    <option value="Finance">การเงิน</option>
                    <option value="Management">ผู้บริหาร</option>
                    <option value="Support">สนับสนุน</option>
                  </select>
                </div>
                
                {/* ช่องเลือกบทบาท */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    บทบาท
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="employee">พนักงาน</option>
                    <option value="manager">ผู้จัดการ</option>
                    <option value="admin">ผู้ดูแลระบบ</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500">
                    <span className="text-amber-600">หมายเหตุ:</span> ผู้ดูแลระบบสามารถจัดการพนักงานและข้อมูลทั้งหมดในระบบได้
                  </p>
                </div>
                
                {/* ช่องเลือกสถานะ */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    สถานะ
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="active">ใช้งาน</option>
                    <option value="inactive">ไม่ใช้งาน</option>
                  </select>
                </div>
              </div>
              
              {/* ส่วนรีเซ็ตรหัสผ่าน */}
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">รีเซ็ตรหัสผ่าน</h3>
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-gray-700">
                    ในฐานะผู้ดูแลระบบ คุณสามารถรีเซ็ตรหัสผ่านของพนักงานได้ในกรณีที่พนักงานลืมรหัสผ่าน
                  </p>
                </div>
                
                {/* ปุ่มรีเซ็ตรหัสผ่าน */}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`คุณต้องการรีเซ็ตรหัสผ่านของ ${formData.name} ใช่หรือไม่?`)) {
                      // ในระบบจริงจะส่ง API request เพื่อรีเซ็ตรหัสผ่าน
                      alert(`รหัสผ่านใหม่ของ ${formData.name} คือ: emp${Math.floor(1000 + Math.random() * 9000)}`);
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                >
                  รีเซ็ตรหัสผ่าน
                </button>
              </div>
              
              {/* ปุ่มยกเลิกและบันทึกการเปลี่ยนแปลง */}
              <div className="mt-8 flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/admin/employees")}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 bg-[#2A7F7F] text-white rounded-md hover:bg-[#236565] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
} 