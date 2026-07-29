import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <div className="flex flex-1 relative">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 flex flex-col">
          <div className="max-w-7xl w-full mx-auto flex-1">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
