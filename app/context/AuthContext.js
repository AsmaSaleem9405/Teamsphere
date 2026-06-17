"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase/client";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUserProfile = async (user) => {
    if (!user) return;

    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!existingProfile) {
      await supabase.from("user_profiles").insert({
        id: user.id,
        email: user.email,
        full_name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          user.email.split("@")[0],

        avatar_url:
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`,

        status: "Available",
      });
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const currentUser = data?.user || null;

      setUser(currentUser);

      if (currentUser) {
        await createUserProfile(currentUser);
      }
    });

    const { data } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user || null;

        setUser(currentUser);

        if (currentUser) {
          await createUserProfile(currentUser);
        }
      }
    );

    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);