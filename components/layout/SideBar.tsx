"use client";

import { useEffect, useState } from "react";

export const SideBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return isVisible ? (
    <nav className="hidden lg:flex fixed right right-0 top-0 h-screen w-16 flex-col z-40 transition-opacity duration-500 ease-in-out opacity-100">
      <ul className="flex flex-col h-full">
        <li>
          <a href="#hero">Hero</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  ) : null;
};
