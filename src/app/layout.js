import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata = {
  title: 'Time Clock System',
  description: 'Employee Time Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}