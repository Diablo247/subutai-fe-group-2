"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiFileText, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-[100] bg-indigo-600 text-white p-2 rounded-md shadow-md"
        onClick={() => setOpen(true)}
      >
        <FiMenu size={20} />
      </button>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-[#D7D5FA] shadow-inner
          flex flex-col py-8 px-6 z-[99]
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 text-indigo-900"
          onClick={() => setOpen(false)}
        >
          <FiX size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mt-12 mb-12">
          <img src="/logo.svg" alt="logo" />
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
                onClick={() => setOpen(false)} // close menu on mobile
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
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
            onClick={() => setOpen(false)}
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
    </>
  );
}
