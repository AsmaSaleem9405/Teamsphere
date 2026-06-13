import { supabase } from "./client";

export const signUp = async (
  email: string,
  password: string,
  fullName: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
};

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const signInWithMicrosoft = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "azure",
  });
};