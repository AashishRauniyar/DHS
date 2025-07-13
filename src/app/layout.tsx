import "./globals.css";


export const metadata = {
  title: "Article Management System",
  description: "A comprehensive system for managing article content",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      {children}
      </body>
    </html>
  );
}