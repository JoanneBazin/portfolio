"use client";

import { LinkItem } from "@/lib/types";
import { CreateProjects } from "@/sections/Admin/CreateProject";
import { useState } from "react";

const TABS: LinkItem[] = [
  { id: "view", label: "Voir les projets" },
  { id: "add", label: "Ajouter un projet" },
  { id: "skill", label: "Compétences" },
  { id: "about", label: "A propos" },
];

export const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-gold-light pb-2 mb-4">
        {TABS.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm lg:text-lg rounded-t ${
              activeTab === tab.id
                ? "bg-gold-light text-background"
                : "text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="m-6">{activeTab === "add" && <CreateProjects />}</div>
    </>
  );
};
