"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useAuth } from "@/app/context/AuthContext";
import { useSearch } from "@/app/hooks/useSearch";

export default function Navbar() {
  const { user } = useAuth();
  const { results, search } = useSearch();

  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const [profile, setProfile] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!user) return;

    const run = async () => {
      let { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (!data) {
        const { data: inserted } = await supabase
          .from("user_profiles")
          .insert({
            id: user.id,
            full_name:
              user.user_metadata?.full_name || user.email.split("@")[0],
            avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,
            status: "Available",
          })
          .select()
          .single();

        data = inserted;
      }

      setProfile(data);
    };

    run();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    let channel;

    const loadProfile = async () => {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(data);
    };

    loadProfile();

    channel = supabase
      .channel("profile-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profiles",
          filter: `id=eq.${user.id}`,
        },
        (payload) => setProfile(payload.new),
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const loadNotifications = async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setNotifications(data || []);
    };

    loadNotifications();

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev]);
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-white">
      {/* LEFT LOGO */}
      <a
        href="/"
        className="flex items-center gap-2 text-black font-bold text-xl no-underline"
      >
        <img
          src="/images/logo.png"
          alt="TeamSphere"
          className="w-10 h-10 object-contain"
        />
        TeamSphere
      </a>

      {/* SEARCH */}
      <div className="relative w-[350px]">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none"
        />

        {query && results.length > 0 && (
          <div className="absolute top-[42px] left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {results.map((item) => (
              <a
                key={item.id}
                href={`/items/${item.id}`}
                className="block px-3 py-2 text-black border-b border-gray-100 no-underline"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative text-xl bg-transparent border-none cursor-pointer"
          >
            🔔
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white w-[18px] h-[18px] rounded-full flex items-center justify-center text-[11px]">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 top-10 w-[260px] bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="p-2 border-b border-gray-100 text-sm"
                >
                  {n.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AUTH */}
        {!user ? (
          <div className="flex gap-3">
            <a href="/sign-in" className="text-black no-underline">
              Login
            </a>
            <a href="/sign-up" className="text-black no-underline">
              Sign Up
            </a>
          </div>
        ) : (
          <div className="relative">

  {/* PROFILE */}
  <div
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-lg"
  >

    <div className="relative">
      <img
        src={profile?.avatar_url || "https://i.pravatar.cc/100"}
        className="w-10 h-10 rounded-full object-cover"
      />

      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
    </div>

    {/* 👇 UPDATED PART (name + dropdown icon inline) */}
    <div className="leading-tight">
      <div className="flex items-center gap-1 font-semibold text-black text-sm">
        {profile?.full_name || "User"}

        {/* dropdown icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            showProfileMenu ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="text-xs text-gray-500">
        {profile?.status || "Available"}
      </div>
    </div>
  </div>

  {/* DROPDOWN */}
  {showProfileMenu && (
    <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

      <a
        href="/profile"
        className="block px-3 py-3 text-gray-700 no-underline border-b border-gray-100 hover:bg-gray-100"
      >
        👤 Profile
      </a>

      <button
        onClick={signOut}
        className="w-full px-3 py-3 text-left text-red-500 bg-white border-none cursor-pointer hover:bg-gray-100"
      >
        🚪 Logout
      </button>
    </div>
  )}
</div>
         
        )}
      </div>
    </nav>
  );
}
