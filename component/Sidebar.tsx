"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiFileText, FiSettings, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <FiGrid size={20} />,
    },
    {
      name: "Tours",
      href: "/tours",
      icon: <FiFileText size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-[#D7D5FA] h-full flex flex-col py-8 px-6 shadow-inner">
      
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 bg-indigo-700 rounded-md" />
        <h1 className="text-xl font-bold text-indigo-900">TOURLY</h1>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium 
                transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-indigo-900 hover:bg-indigo-200/70"
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="mt-auto flex flex-col gap-6">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 text-indigo-900 hover:bg-indigo-200/60 rounded-lg"
        >
          <FiSettings size={18} />
          Settings
        </Link>

        <button
          className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg font-medium"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
