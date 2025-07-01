"use client";

import { LinkItem } from "@/types";
import { useEffect, useState } from "react";

const LINKS: LinkItem[] = [
  { id: "projects", label: "Projets" },
  { id: "about", label: "A propos" },
  { id: "contact", label: "Contact" },
];

export const useNavigation = () => {
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
          if (LINKS.some((link) => link.id === id) && id !== activeLink) {
            setActiveLink(id);
          }
        }
      },

      { threshold: [0.1], rootMargin: "-35% 0px -40% 0px" }
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
  }, [hideSidebar, activeLink]);

  return { activeLink, hideSidebar, LINKS, setActiveLink };
};
