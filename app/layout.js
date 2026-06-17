import "./globals.css";
import Navbar from "@/app/components/Navbar";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata = {
  title: "Teams Landing Page",
  description: "Modern responsive landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
  {children}
</AuthProvider>
      </body>
    </html>
  );
}