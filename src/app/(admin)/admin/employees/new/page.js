"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../context/AuthContext";
import AdminHeader from "../../../../../components/AdminHeader";
import UnauthorizedAccess from "../../../../../components/UnauthorizedAccess";

export default function AddEmployeePage() {
  const router = useRouter();
  const { user, hasRole } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    position: "",
    department: "Engineering",
    role: "employee",
    status: "active"
  });
  
  // Role verification
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!formData.password.trim()) newErrors.password = "กรุณากรอกรหัสผ่าน";
    if (formData.password.trim().length < 6) newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
    if (!formData.name.trim()) newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!formData.position.trim()) newErrors.position = "กรุณากรอกตำแหน่ง";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // ในระบบจริงจะส่ง API request เพื่อสร้างผู้ใช้ใหม่
      // แต่ในตัวอย่างนี้จะจำลองการสร้างผู้ใช้สำเร็จ
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(`สร้างบัญชีสำหรับ ${formData.name} เรียบร้อยแล้ว`);
      
      // Reset form after successful submission
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        position: "",
        department: "Engineering",
        role: "employee",
        status: "active"
      });
      
      // Redirect to employees list after short delay
      setTimeout(() => {
        router.push("/admin/employees");
      }, 2000);
      
    } catch (error) {
      setErrors({ submit: "เกิดข้อผิดพลาดในการสร้างบัญชี กรุณาลองอีกครั้ง" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader title="เพิ่มพนักงานใหม่" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                {successMessage}
              </div>
            )}
            
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    รหัสผ่าน <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
                
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
                  {isLoading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
} 