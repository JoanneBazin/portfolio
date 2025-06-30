"use client";

import { House, LogOut, SquarePen } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const AdminHeader = () => {
  const { data: session } = useSession();

  if (!session) return;

  return (
    <header className="fixed top-4 left-0" style={{ zIndex: 999 }}>
      <nav className="flex flex-col gap-4 lg:gap-8 p-2">
        <Link
          href="/"
          aria-label="Page d'accueil"
          className="text-accent-50 hover:text-accent"
        >
          <House size={20} />
        </Link>
        <Link
          href="/admin/dashboard"
          aria-label="Dashboard"
          className="text-accent-50 hover:text-accent"
        >
          <SquarePen size={20} />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          aria-label="Déconnexion"
          className="text-accent-50 hover:text-accent"
        >
          <LogOut size={20} />
        </button>
      </nav>
    </header>
  );
};
