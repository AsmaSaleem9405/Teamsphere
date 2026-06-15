import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const { data, error } =
      await adminSupabase.auth.admin.listUsers();

    if (error) {
      return NextResponse.json(
        { exists: false },
        { status: 500 }
      );
    }

    const exists = data.users.some(
      (user) =>
        user.email?.toLowerCase() === email.toLowerCase()
    );

    return NextResponse.json({ exists });
  } catch {
    return NextResponse.json(
      { exists: false },
      { status: 500 }
    );
  }
}