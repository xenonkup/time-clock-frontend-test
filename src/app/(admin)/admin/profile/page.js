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
    email: user?.email || '',
    phone: '099-999-9999', // Mock data
    position: user?.position || 'System Administrator',
    department: 'IT Management',
    accessLevel: 'Full Access'
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
      
      // Simulating API call
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
      email: user?.email || '',
      phone: '099-999-9999',
      position: user?.position || 'System Administrator',
      department: 'IT Management',
      accessLevel: 'Full Access'
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
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">ข้อมูลส่วนตัว</h2>
                {/* ปุ่มแก้ไขข้อมูล แสดงเฉพาะเมื่อไม่ได้อยู่ในโหมดแก้ไข */}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#2A7F7F] text-white px-4 py-2 rounded hover:bg-[#236565] transition-colors"
                  >
                    แก้ไขข้อมูล
                  </button>
                )}
              </div>
              
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
                        disabled
                      />
                    </div>
                    
                    {/* ฟอร์มกรอกระดับการเข้าถึง */}
                    <div>
                      <label htmlFor="accessLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        ระดับการเข้าถึง
                      </label>
                      <input
                        type="text"
                        id="accessLevel"
                        name="accessLevel"
                        value={formData.accessLevel}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        disabled
                      />
                    </div>
                  </div>
                  
                  {/* ปุ่มยกเลิกและบันทึกข้อมูล */}
                  <div className="flex space-x-4 mt-6">
                    <button
                      type="submit"
                      className="bg-[#2A7F7F] text-white px-4 py-2 rounded hover:bg-[#236565] transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              ) : (
                // โหมดแสดงข้อมูล (ไม่ได้แก้ไข)
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* แสดงชื่อผู้ใช้ */}
                  <div>
                    <p className="text-sm text-gray-500">ชื่อผู้ใช้:</p>
                    <p className="font-medium">{user?.username || 'admin'}</p>
                  </div>
                  
                  {/* แสดงชื่อ-นามสกุล */}
                  <div>
                    <p className="text-sm text-gray-500">ชื่อ-นามสกุล:</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  
                  {/* แสดงตำแหน่ง */}
                  <div>
                    <p className="text-sm text-gray-500">ตำแหน่ง:</p>
                    <p className="font-medium">{formData.position}</p>
                  </div>
                  
                  {/* แสดงแผนก */}
                  <div>
                    <p className="text-sm text-gray-500">แผนก:</p>
                    <p className="font-medium">{formData.department}</p>
                  </div>
                  
                  {/* แสดงอีเมล */}
                  <div>
                    <p className="text-sm text-gray-500">อีเมล:</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  
                  {/* แสดงเบอร์โทรศัพท์ */}
                  <div>
                    <p className="text-sm text-gray-500">เบอร์โทรศัพท์:</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  
                  {/* แสดงระดับการเข้าถึง */}
                  <div>
                    <p className="text-sm text-gray-500">ระดับการเข้าถึง:</p>
                    <p className="font-medium">{formData.accessLevel}</p>
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