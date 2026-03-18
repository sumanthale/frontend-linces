import { Search, Bell } from 'lucide-react';
import { useState } from 'react';

const AdminNavbar = ({ title }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">

      {/* LEFT - TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* 🔍 SEARCH */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-gray-300 transition-all">
          <Search size={16} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-40"
          />
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-700" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* 👤 PROFILE */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold shadow-sm">
            A
          </div>

          {/* Optional name (hidden on small screens) */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;