"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static
          z-50
          bg-white
          w-64
          min-h-screen
          border-r border-gray-200
          transition-all duration-300
          ${open ? "left-0" : "-left-64"}
          lg:left-0
        `}
      >
        <div className="p-4">
          <Link href="/meeting">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
              + Start a Meeting
            </button>
          </Link>

          <div className="mt-10 space-y-2">
            <SidebarItem
              icon="home.png"
              title="Home"
              href="/"
            />

            <SidebarItem
              icon="calendar.png"
              title="Meetings"
              href="/meeting"
            />

            <SidebarItem
              icon="tag.png"
              title="Join with ID"
              href="/join"
            />

            <SidebarItem
              icon="users.png"
              title="Contacts"
              href="/contacts"
            />

            <SidebarItem
              icon="chat.png"
              title="Chat"
              href="/chat"
            />
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 space-y-2">
            <SidebarItem
              icon="settings.png"
              title="Settings"
              href="/settings"
            />

            <SidebarItem
              icon="question.png"
              title="Help & Support"
              href="/support"
            />
          </div>
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ icon, title, href }) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href === "/meeting" && pathname.startsWith("/meeting"));

  return (
    <Link href={href}>
      <div
        className={`
          flex items-center gap-3
          px-3 py-3 rounded-xl
          cursor-pointer transition-all duration-200
          ${
            active
              ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          }
        `}
      >
        <Image
          src={`/icons/${icon}`}
          width={18}
          height={18}
          alt={title}
        />

        <span>{title}</span>
      </div>
    </Link>
  );
}