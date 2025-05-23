"use client";

import { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import EmployeeHeader from "../../../../components/EmployeeHeader";

export default function EmployeeProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '099-999-9999', // Mock data
    address: '123/45 ถนนสุขุมวิท กรุงเทพมหานคร', // Mock data
    emergencyContact: 'นายสมศักดิ์ (พี่ชาย) - 088-888-8888', // Mock data
    birthDate: '1990-05-15' // Mock data
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ในระบบจริงจะส่ง API request เพื่ออัพเดทข้อมูล
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage('อัพเดทข้อมูลส่วนตัวเรียบร้อยแล้ว');
      setIsEditing(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset form data from user object
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '099-999-9999',
      address: '123/45 ถนนสุขุมวิท กรุงเทพมหานคร',
      emergencyContact: 'นายสมศักดิ์ (พี่ชาย) - 088-888-8888',
      birthDate: '1990-05-15'
    });
    setIsEditing(false);
  };

  return (
    <>
      <EmployeeHeader title="โปรไฟล์ของฉัน" />
      
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-gray-900">ข้อมูลส่วนตัว</h2>
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
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <div>
                      <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                        วันเกิด
                      </label>
                      <input
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        ที่อยู่
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                        ผู้ติดต่อกรณีฉุกเฉิน
                      </label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                  
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
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ชื่อผู้ใช้:</div>
                    <div>{user?.username || '-'}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ชื่อ-นามสกุล:</div>
                    <div>{formData.name}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ตำแหน่ง:</div>
                    <div>{user?.position || '-'}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">แผนก:</div>
                    <div>{user?.department || '-'}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">อีเมล:</div>
                    <div>{formData.email}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">เบอร์โทรศัพท์:</div>
                    <div>{formData.phone}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">วันเกิด:</div>
                    <div>
                      {new Date(formData.birthDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ที่อยู่:</div>
                    <div>{formData.address}</div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 font-medium text-gray-500">ผู้ติดต่อกรณีฉุกเฉิน:</div>
                    <div>{formData.emergencyContact}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 