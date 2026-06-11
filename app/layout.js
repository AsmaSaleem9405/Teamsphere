import "./globals.css";

export const metadata = {
  title: "Teams Landing Page",
  description: "Modern responsive landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}