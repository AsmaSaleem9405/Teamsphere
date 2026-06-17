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

  // SEARCH (debounced)
 useEffect(() => {
  if (!user) return;

  const run = async () => {
    // 1. try get profile
    let { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    // 2. if missing → create it
    if (!data) {
      const { data: inserted } = await supabase
        .from("user_profiles")
        .insert({
          id: user.id,
          full_name: user.user_metadata?.full_name || user.email.split("@")[0],
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

  // PROFILE (LIVE + REALTIME)
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
        (payload) => {
          setProfile(payload.new);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 16px",
      borderBottom: "1px solid #eee",
      background: "#fff",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "18px",
    },
    searchBox: {
      position: "relative",
      width: "350px",
    },
    input: {
      width: "100%",
      padding: "7px 12px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      outline: "none",
    },
    dropdown: {
      position: "absolute",
      top: "42px",
      left: 0,
      right: 0,
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "8px",
      zIndex: 10,
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    },
    item: {
      padding: "8px",
      cursor: "pointer",
    },
    right: {
      display: "flex",
      gap: "18px",
      alignItems: "center",
    },
    notifBox: {
      position: "absolute",
      right: 0,
      top: "40px",
      width: "260px",
      background: "#fff",
      border: "1px solid #eee",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      zIndex: 20,
    },
    notifItem: {
      padding: "10px",
      borderBottom: "1px solid #f3f3f3",
      fontSize: "13px",
    },
  };

  return (
    <nav style={styles.nav}>
      {/* LEFT */}
      <div style={styles.logo}>Acme</div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={styles.input}
        />

        {query && results.length > 0 && (
          <div style={styles.dropdown}>
            {results.map((item) => (
              <div key={item.id} style={styles.item}>
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div style={styles.right}>
        {/* NOTIFICATIONS */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowNotif(!showNotif)}>
            🔔 {notifications.length}
          </button>

          {showNotif && (
            <div style={styles.notifBox}>
              {notifications.map((n) => (
                <div key={n.id} style={styles.notifItem}>
                  {n.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AUTH */}
        {!user ? (
          <>
            <a href="/sign-in">Login</a>
            <a href="/sign-up">Sign Up</a>
          </>
        ) : (
          <div style={{ position: "relative" }}>
            {/* PROFILE BUTTON */}
            <div
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                padding: "6px 10px",
                borderRadius: "10px",
              }}
            >
              {/* AVATAR */}
              <div style={{ position: "relative" }}>
                <img
                  src={profile?.avatar_url || "https://i.pravatar.cc/100"}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                {/* ONLINE DOT */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px",
                    width: "10px",
                    height: "10px",
                    background: "#00c853",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              </div>

              {/* NAME */}
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>
                  {profile?.full_name || "User"}
                </div>

                <div style={{ fontSize: "12px", color: "#666" }}>
                  {profile?.status || "Available"}
                </div>
              </div>
            </div>

            {/* DROPDOWN */}
            {showProfileMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "55px",
                  right: 0,
                  width: "200px",
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #eee",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  zIndex: 100,
                }}
              >
                <a
                  href="/profile"
                  style={{
                    display: "block",
                    padding: "12px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #f3f3f3",
                  }}
                >
                  👤 Profile
                </a>

                <button
                  onClick={signOut}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "none",
                    background: "white",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "red",
                  }}
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