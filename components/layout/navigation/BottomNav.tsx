"use client";

import { useNavigation } from "@/hooks/useNavigation";
import { Code, MessageCircle, User } from "lucide-react";

export const BottomNav = () => {
  const { activeLink, hideSidebar, LINKS } = useNavigation();

  if (hideSidebar) return null;

  return (
    <nav className="sm:hidden flex fixed bottom left-0 bottom-0 w-screen py-3 z-40 bg-background">
      <ul className="flex items-center justify-around w-full px-4">
        {LINKS.map((link, index) => (
          <li
            key={index}
            aria-current={activeLink === link.id ? "true" : undefined}
            className="transition-colors duration-300"
          >
            <a
              href={`#${link.id}`}
              className={`flex flex-col items-center gap-2 ${
                activeLink === link.id ? "text-accent" : "text-foreground"
              }`}
            >
              {link.id === "projects" ? (
                <Code size={24} />
              ) : link.id === "about" ? (
                <User size={24} />
              ) : (
                <MessageCircle size={24} />
              )}

              <p className="text-xs">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
