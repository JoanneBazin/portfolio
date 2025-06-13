"use client";

import { useEffect, useState } from "react";

type LinkItem = {
  id: string;
  label: string;
};

const LINKS: LinkItem[] = [
  { id: "projects", label: "Projets" },
  { id: "about", label: "A propos" },
  { id: "contact", label: "Contact" },
];

export const SideBar = () => {
  const [hideSidebar, setHideSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("projects");

  useEffect(() => {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "hero") {
            const shouldHide = entry.isIntersecting;
            if (shouldHide !== hideSidebar) {
              setTimeout(() => setHideSidebar(shouldHide), 100);
            }
          }
        });
      },
      { threshold: [0, 0.1, 0.9, 1], rootMargin: "-50px 0px 0px 0px" }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.intersectionRatio > prev.intersectionRatio
              ? current
              : prev;
          });

          const id = mostVisible.target.id;
          if (LINKS.some((link) => link.id === id)) {
            setActiveLink(id);
          }
        }
      },

      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -20% 0px" }
    );

    const heroElement = document.getElementById("hero");
    if (heroElement) heroObserver.observe(heroElement);

    LINKS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [hideSidebar]);

  const activeIndex = LINKS.findIndex((link) => link.id === activeLink);

  const topLinks = LINKS.filter((_, index) => index <= activeIndex);
  const bottomLinks = LINKS.filter((_, index) => index > activeIndex);

  if (hideSidebar) return null;

  return (
    <nav className="hidden lg:flex fixed right right-8 top-0 h-[calc(100vh-80px)] py-8 flex-col justify-between items-center z-40">
      <ul className="flex flex-col gap-8">
        {topLinks.map((link, index) => (
          <li
            key={index}
            className={`text-center text-montserrat ${
              activeLink === link.id
                ? "text-2xl text-accent font-bold"
                : "text-xl border-b border-gold-light py-4 hover:text-accent transition-colors duration-300"
            }`}
          >
            <a href={`#${link.id}`}>{link.label}</a>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col ">
        {bottomLinks.map((link, index) => (
          <li
            key={index}
            className="text-center text-montserrat text-xl border-t border-gold-light py-4 hover:text-accent transition-colors duration-300"
          >
            <a href={`#${link.id}`}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
