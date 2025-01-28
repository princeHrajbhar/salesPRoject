import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Dashboard</title>
        <meta name="description" content="A versatile dashboard for various industries" />
      </head>
      <body className="bg-gray-100 text-gray-800 h-screen flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 md:ml-64 "> {/* md:ml-64 ensures offset only on larger screens */}
          <main className="flex-1 p-6 mt-4 overflow-auto">
            <div className="max-h-full overflow-y-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
