"use client";

import { useNavigation } from "@/hooks/useNavigation";

export const BottomNav = () => {
  const { activeLink, hideSidebar, LINKS } = useNavigation();

  if (hideSidebar) return null;

  return (
    <nav className="sm:hidden flex fixed bottom left-0 bottom-0 w-screen py-8 z-40">
      <ul className="flex items-center justify-around w-full px-4">
        {LINKS.map((link, index) => (
          <li
            key={index}
            className={`text-xl font-montserrat ${
              activeLink === link.id
                ? "text-accent font-bold"
                : "hover:text-accent transition-colors duration-300"
            }`}
          >
            <a
              href={`#${link.id}`}
              className="flex flex-col items-center gap-2"
            >
              <i
                className={`text-lg ${
                  link.id === "projects"
                    ? "fa-solid fa-laptop-code"
                    : link.id === "about"
                    ? "fa-regular fa-address-card"
                    : "fa-regular fa-comments"
                }`}
              ></i>
              <p className="text-sm">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
