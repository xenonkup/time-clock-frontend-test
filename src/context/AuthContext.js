"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// สร้าง Context สำหรับจัดการการยืนยันตัวตนและสิทธิ์ผู้ใช้
const AuthContext = createContext();

// ข้อมูลผู้ใช้จำลองสำหรับการสาธิต
const MOCK_USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', position: 'System Administrator' },
  { id: 2, username: 'employee1', password: 'emp123', role: 'employee', name: 'Employee User', position: 'Staff Member' },
];

// คอมโพเนนต์ Provider สำหรับจัดการและส่งผ่านข้อมูลการยืนยันตัวตนไปยังคอมโพเนนต์ลูก
export function AuthProvider({ children }) {
  // สร้าง state สำหรับเก็บข้อมูลผู้ใช้ที่ล็อกอินอยู่
  const [user, setUser] = useState(null);
  // สร้าง state สำหรับแสดงสถานะการโหลดข้อมูล
  const [loading, setLoading] = useState(true);
  // สร้าง state เพื่อควบคุมการนำทางอัตโนมัติ (สำหรับการพัฒนา)
  const [autoNavigate, setAutoNavigate] = useState(false);
  const router = useRouter();

  // ตรวจสอบการเข้าสู่ระบบเดิมเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    // ตรวจสอบข้อมูลผู้ใช้ที่บันทึกไว้ใน localStorage
    const savedUser = localStorage.getItem('timeClockUser');
    // ตรวจสอบการตั้งค่าการนำทางอัตโนมัติ
    const savedAutoNavigate = localStorage.getItem('autoNavigate') === 'true';
    
    // อัปเดตค่า autoNavigate
    setAutoNavigate(savedAutoNavigate);
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // เปลี่ยนเส้นทางไปตามบทบาทถ้าอยู่ที่หน้าหลักและตั้งค่าให้นำทางอัตโนมัติ
        if (window.location.pathname === '/' && savedAutoNavigate) {
          if (parsedUser.role === 'admin') {
            router.push('/admin');
          } else if (parsedUser.role === 'employee') {
            router.push('/employee');
          }
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('timeClockUser');
      }
    }
    setLoading(false);
  }, [router]);

  // ฟังก์ชันสำหรับเข้าสู่ระบบ
  const login = (username, password, remember = false) => {
    // ค้นหาผู้ใช้ที่ตรงกับชื่อผู้ใช้และรหัสผ่าน
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // ลบรหัสผ่านออกก่อนเก็บข้อมูลผู้ใช้
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // เก็บข้อมูลผู้ใช้ไว้ใน localStorage
      localStorage.setItem('timeClockUser', JSON.stringify(userWithoutPassword));
      
      // ตั้งค่าการนำทางอัตโนมัติตามการจดจำการเข้าสู่ระบบ
      setAutoNavigate(remember);
      localStorage.setItem('autoNavigate', remember.toString());
      
      // นำทางไปยังหน้าที่เหมาะสมตามสิทธิ์ผู้ใช้
      if (foundUser.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/employee');
      }
      return true;
    }
    return false;
  };

  // ฟังก์ชันสำหรับออกจากระบบ
  const logout = () => {
    setUser(null);
    setAutoNavigate(false);
    localStorage.removeItem('timeClockUser');
    localStorage.removeItem('autoNavigate');
    router.push('/');
  };

  // ฟังก์ชันตรวจสอบว่าผู้ใช้มีสิทธิ์ที่ต้องการหรือไม่
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole, autoNavigate }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook สำหรับใช้งาน AuthContext จากคอมโพเนนต์อื่นๆ
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 