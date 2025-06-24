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
            className={`text-center font-montserrat p-4 ${
              activeLink === link.id
                ? "text-3xl text-accent font-medium"
                : "text-xl border-b border-accent hover:text-accent transition-colors duration-300"
            }`}
          >
            <a href={`#${link.id}`}>{link.label}</a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col">
        {bottomLinks.map((link, index) => (
          <li
            key={index}
            className="text-center font-montserrat text-xl border-t border-accent p-4 hover:text-accent transition-colors duration-300"
          >
            <a href={`#${link.id}`}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
