import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer'

export const metadata = {
  title: 'MyApp',
  description: 'Authentication with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}


