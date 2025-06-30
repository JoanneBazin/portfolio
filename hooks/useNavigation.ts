"use client";

import { LinkItem } from "@/types";
import { useEffect, useState } from "react";

const LINKS: LinkItem[] = [
  { id: "projects", label: "Projets" },
  { id: "about", label: "À propos" },
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

  return { activeLink, hideSidebar, LINKS };
};
