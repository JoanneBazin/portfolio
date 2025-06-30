"use client";

import { LoginForm } from "@/components/forms/LoginForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const AdminLogin = () => {
  return (
    <section className="min-h-screen py-4">
      <div className="w-full h-full relative">
        <Link
          href="/"
          aria-label="Retourner à l'accueil"
          className="absolute top-4 left-6"
        >
          <ChevronLeft color="var(--accent)" size={50} />
        </Link>
      </div>
      <div className="flex flex-col items-center py-24">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold font-montserrat">
            Connexion Admin
          </h2>
        </div>
        <LoginForm />
      </div>
    </section>
  );
};

export default AdminLogin;
