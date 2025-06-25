"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export const AdminHeader = () => {
  return (
    <header className="fixed top-0 left-0 z-50">
      <nav className="flex flex-col text-lg lg:text-2xl gap-2 lg:gap-6 p-2">
        <Link href="/">
          <i className="fa-solid fa-house"></i>
        </Link>
        <Link href="/admin/dashboard">
          <i className="fa-solid fa-pen-to-square"></i>
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </nav>
    </header>
  );
};
