"use client";

import { useNavigation } from "@/hooks/useNavigation";

export const SideBar = () => {
  const { activeLink, hideSidebar, LINKS } = useNavigation();

  const activeIndex = LINKS.findIndex((link) => link.id === activeLink);
  const topLinks = LINKS.filter((_, index) => index <= activeIndex);
  const bottomLinks = LINKS.filter((_, index) => index > activeIndex);

  if (hideSidebar) return null;

  return (
    <nav className="hidden lg:flex fixed right right-8 top-0 h-[calc(100vh-80px)] py-8 flex-col justify-between items-center z-40">
      <ul className="flex flex-col">
        {topLinks.map((link, index) => (
          <li
            key={index}
            aria-current={activeLink === link.id ? "true" : undefined}
            className={`text-center font-montserrat p-4 transition-colors duration-300 ${
              activeLink === link.id
                ? "text-xl font-medium"
                : "text-lg border-b border-accent-50"
            }`}
          >
            <a
              href={`#${link.id}`}
              className={`${
                activeLink === link.id
                  ? "text-accent"
                  : "text-foreground hover:text-accent-50"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col">
        {bottomLinks.map((link, index) => (
          <li
            key={index}
            className="text-center font-montserrat text-lg border-t border-accent-50 p-4 transition-colors duration-300"
          >
            <a
              href={`#${link.id}`}
              className="text-foreground hover:text-accent-50"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
