/** @type {import('next').NextConfig} */
const nextConfig = {
  // กำหนดให้ Next.js ใช้ src เป็นไดเรกทอรีหลัก
  // เช่น src/app, src/pages เป็นต้น
  distDir: '.next',
  // ไม่ใช้ trailingSlash เพื่อป้องกันปัญหาการเข้าถึงเส้นทาง
  trailingSlash: false,
  // กำหนดค่า base path เป็นค่าว่างเพื่อให้ routing ทำงานได้ถูกต้อง
  basePath: '',
  // ไม่ต้องใช้ assetPrefix ในการพัฒนาแบบ local
  // assetPrefix: '',
  // ใน Next.js เวอร์ชัน 15.3.1 ใช้ App Router เป็นค่าเริ่มต้นแล้ว
  // ไม่จำเป็นต้องกำหนด experimental.appDir
  eslint: {
    // Warning: ปิดการตรวจสอบเฉพาะตอน build เท่านั้น ควรแก้ไขปัญหาใน code ในภายหลัง
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
