"use client";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export const Footer = ({ isAdmin }: { isAdmin: boolean }) => {
  const breakpoint = useBreakpoint();
  const { theme, toggleTheme } = useTheme();

  if (breakpoint === "mobile") {
    return null;
  }

  return (
    <footer className="hidden sm:flex justify-between items-center fixed bottom-0 left-0 w-full bg-transparent p-6">
      <div className="flex gap-6 items-center">
        {isAdmin ? null : (
          <Link href="/login" className="text-xs">
            Accès admin
          </Link>
        )}

        <button
          aria-label="Changer le thème"
          onClick={toggleTheme}
          className="text-accent hover:color-gold ml-10"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <div className="flex justify-end items-center gap-6">
        <a
          href="https://github.com/JoanneBazin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:color-foreground transition-colors duration-200"
          aria-label="Visiter ma page Github"
        >
          <i className="text-2xl">GITHUB</i>
        </a>
        <a
          href="https://fr.linkedin.com/in/joanne-bazin?trk=people-guest_people_search-card"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-foreground transition-colors duration-200"
          aria-label="Voir mon profil LinkedIn"
        >
          <i className="text-3xl">LKIN</i>
        </a>
      </div>
    </footer>
  );
};
