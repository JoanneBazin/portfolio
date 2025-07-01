"use client";

import { useNavigation } from "@/hooks/useNavigation";

export const TopNav = () => {
  const { activeLink, hideSidebar, LINKS, setActiveLink } = useNavigation();

  if (hideSidebar) return null;

  return (
    <nav className="hidden sm:flex lg:hidden fixed top left-0 top-0 w-screen p-8 z-50 bg-background">
      <ul className="flex items-center justify-between w-full px-8">
        {LINKS.map((link, index) => (
          <li
            key={index}
            aria-current={activeLink === link.id ? "true" : undefined}
            className={`text-lg font-montserrat transition-colors duration-300 ${
              activeLink === link.id
                ? "text-accent font-bold"
                : "text-foreground hover:text-accent"
            }`}
          >
            <a href={`#${link.id}`} onClick={() => setActiveLink(link.id)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
