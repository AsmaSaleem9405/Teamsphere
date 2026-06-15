"use client";

import Image from "next/image";

export default function Sidebar({
  open,
  setOpen
}) {
  return (
    <>
      {/* Mobile Overlay */}

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
        h-screen
        border-r
        transition-all
        duration-300
        ${open ? "left-0" : "-left-64"}
        lg:left-0
      `}
      >
        <div className="p-4">

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
            + Start a Meeting
          </button>

          <div className="mt-10 space-y-6">

            <SidebarItem icon="home.png" title="Home" />
            <SidebarItem icon="calendar.png" title="Meetings" />
            <SidebarItem icon="tag.png" title="Join with ID" />
            <SidebarItem icon="users.png" title="Contacts" />
            <SidebarItem icon="chat.png" title="Chat" />

          </div>

          <div className="mt-10 border-t pt-6">

            <SidebarItem icon="settings.png" title="Settings" />
            <SidebarItem icon="question.png" title="Help & Support" />

          </div>

        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  icon,
  title
}) {
  return (
    <div className="flex items-center gap-3 cursor-pointer hover:text-indigo-600">
      <Image
        src={`/icons/${icon}`}
        width={18}
        height={18}
        alt=""
      />
      <span>{title}</span>
    </div>
  );
}