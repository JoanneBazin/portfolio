import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function requireAdminAuth() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const userId = session?.user?.id;

  if (!userId || userEmail !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return { session, userId };
}
