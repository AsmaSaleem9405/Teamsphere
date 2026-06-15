import { supabase } from "./client";

export const signUp = async (
  email: string,
  password: string,
  fullName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { data, error };
  }

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      email: email,
      full_name: fullName,
    });
  }

  return { data, error };
};

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};