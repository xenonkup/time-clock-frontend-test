"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import AdminHeader from "../../../../components/AdminHeader";
import UnauthorizedAccess from "../../../../components/UnauthorizedAccess";

export default function AdminProfilePage() {
  // นำเข้าข้อมูลผู้ใช้และฟังก์ชันตรวจสอบสิทธิ์จาก AuthContext
  const { user, hasRole } = useAuth();
  
  // ตรวจสอบสิทธิ์การเข้าถึงหน้านี้ (ต้องเป็นแอดมิน)
  if (!user || !hasRole('admin')) {
    return <UnauthorizedAccess />;
  }
  
  // สร้าง state สำหรับการแก้ไขข้อมูลส่วนตัว
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || 'admin@timeclock.com', // ข้อมูลจำลอง
    phone: '099-888-7777', // ข้อมูลจำลอง
    position: user?.position || 'System Administrator',
    department: 'IT',
    hireDate: '2020-01-15' // ข้อมูลจำลอง
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // จัดการการเปลี่ยนแปลงข้อมูลในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // บันทึกข้อมูลส่วนตัวหลังการแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ในระบบจริงจะส่ง API request เพื่ออัพเดทข้อมูล
      
      // จำลองการเรียก API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // แสดงข้อความสำเร็จและปิดโหมดแก้ไข
      setSuccessMessage('อัพเดทข้อมูลส่วนตัวเรียบร้อยแล้ว');
      setIsEditing(false);
      
      // ล้างข้อความสำเร็จหลังจาก 3 วินาที
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // รีเซ็ตข้อมูลฟอร์มเมื่อยกเลิกการแก้ไข
  const handleCancel = () => {
    // คืนค่าข้อมูลเดิมจาก user object
    setFormData({
      name: user?.name || '',
      email: user?.email || 'admin@timeclock.com',
      phone: '099-888-7777',
      position: user?.position || 'System Administrator',
      department: 'IT',
      hireDate: '2020-01-15'
    });
    setIsEditing(false);
  };

  return (
    <>
      <AdminHeader title="โปรไฟล์ของฉัน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* แสดงข้อความสำเร็จเมื่อมีการอัพเดทข้อมูล */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
          
          {/* ส่วนแสดงข้อมูลส่วนตัว */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-900">ข้อมูลส่วนตัว</h2>
                {/* ปุ่มแก้ไขข้อมูล แสดงเฉพาะเมื่อไม่ได้อยู่ในโหมดแก้ไข */}
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-[#2A7F7F] text-white rounded-md hover:bg-[#236565]"
                  >
                    แก้ไขข้อมูล
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              {/* โหมดแก้ไขข้อมูล */}
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ฟอร์มกรอกชื่อ-นามสกุล */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        ชื่อ-นามสกุล
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกอีเมล */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        อีเมล
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกเบอร์โทรศัพท์ */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        เบอร์โทรศัพท์
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกตำแหน่ง */}
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        ตำแหน่ง
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกแผนก */}
                    <div>
                      <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                        แผนก
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกวันที่เริ่มงาน */}
                    <div>
                      <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700 mb-1">
                        วันที่เริ่มงาน
                      </label>
                      <input
                        type="date"
                        id="hireDate"
                        name="hireDate"
                        value={formData.hireDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                  
                  {/* ปุ่มยกเลิกและบันทึกข้อมูล */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-4 py-2 bg-[#2A7F7F] text-white rounded-md hover:bg-[#236565] ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                    </button>
                  </div>
                </form>
              ) : (
                // โหมดแสดงข้อมูล (ไม่ได้แก้ไข)
                <div className="space-y-6">
                  {/* แสดงชื่อผู้ใช้ */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ชื่อผู้ใช้:</div>
                    <div>{user?.username || 'admin'}</div>
                  </div>
                  
                  {/* แสดงชื่อ-นามสกุล */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ชื่อ-นามสกุล:</div>
                    <div>{formData.name}</div>
                  </div>
                  
                  {/* แสดงตำแหน่ง */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ตำแหน่ง:</div>
                    <div>{formData.position}</div>
                  </div>
                  
                  {/* แสดงแผนก */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">แผนก:</div>
                    <div>{formData.department}</div>
                  </div>
                  
                  {/* แสดงอีเมล */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">อีเมล:</div>
                    <div>{formData.email}</div>
                  </div>
                  
                  {/* แสดงเบอร์โทรศัพท์ */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">เบอร์โทรศัพท์:</div>
                    <div>{formData.phone}</div>
                  </div>
                  
                  {/* แสดงวันที่เริ่มงาน */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">วันที่เริ่มงาน:</div>
                    <div>
                      {new Date(formData.hireDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  {/* แสดงสิทธิ์ในระบบ */}
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">สิทธิ์ในระบบ:</div>
                    <div className="inline-flex items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-semibold">
                        ผู้ดูแลระบบ
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* ส่วนแสดงข้อมูลความปลอดภัย */}
          <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-900">ข้อมูลความปลอดภัย</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {/* แสดงข้อมูลรหัสผ่านและลิงก์เปลี่ยนรหัสผ่าน */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 font-medium text-gray-500">รหัสผ่าน:</div>
                  <div className="flex items-center">
                    <span className="mr-3">••••••••</span>
                    <a 
                      href="/admin/settings?tab=security" 
                      className="text-[#2A7F7F] hover:underline text-sm"
                    >
                      เปลี่ยนรหัสผ่าน
                    </a>
                  </div>
                </div>
                
                {/* แสดงข้อมูลการเข้าสู่ระบบล่าสุด */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 font-medium text-gray-500">การเข้าสู่ระบบล่าสุด:</div>
                  <div>{new Date().toLocaleString('th-TH')}</div>
                </div>
                
                {/* แสดงข้อมูลอุปกรณ์ที่ใช้งาน */}
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 font-medium text-gray-500">อุปกรณ์ที่ใช้งาน:</div>
                  <div>MacOS - Chrome</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}