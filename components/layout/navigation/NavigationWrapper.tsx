"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { BottomNav } from "./BottomNav";
import { SideBar } from "./SideBar";
import { TopNav } from "./TopNav";

export const NavigationWrapper = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case "desktop":
      return <SideBar />;
    case "tablet":
      return <TopNav />;
    case "mobile":
      return <BottomNav />;
    default:
      return null;
  }
};
