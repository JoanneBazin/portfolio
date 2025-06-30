"use client";

import { useNavigation } from "@/hooks/useNavigation";

export const TopNav = () => {
  const { activeLink, hideSidebar, LINKS } = useNavigation();

  if (hideSidebar) return null;

  return (
    <nav className="hidden sm:flex lg:hidden fixed top left-0 top-0 w-screen p-8 z-50 bg-background">
      <ul className="flex items-center justify-between w-full px-8">
        {LINKS.map((link, index) => (
          <li
            key={index}
            aria-current={activeLink === link.id ? "true" : undefined}
            className={`text-xl font-montserrat ${
              activeLink === link.id
                ? "text-accent font-bold"
                : "hover:text-accent transition-colors duration-300"
            }`}
          >
            <a href={`#${link.id}`} className="">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
