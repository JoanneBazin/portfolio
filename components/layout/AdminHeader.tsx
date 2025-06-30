"use client";

import { House, LogOut, SquarePen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const AdminHeader = () => {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <header className="fixed top-4 left-0" style={{ zIndex: 999 }}>
      <nav className="flex flex-col gap-3 lg:gap-6 p-2">
        <Link href="/" aria-label="Page d'accueil">
          <House size={24} />
        </Link>
        <Link href="/admin/dashboard" aria-label="Dashboard">
          <SquarePen size={24} />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          aria-label="Déconnexion"
        >
          <LogOut size={24} />
        </button>
      </nav>
    </header>
  );
};
