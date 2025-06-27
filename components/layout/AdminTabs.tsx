"use client";

import { LinkItem } from "@/app/types";
import { CreateProjects } from "@/sections/Admin/CreateProject";
import { EditProfile } from "@/sections/Admin/EditProfile";
import { EditProject } from "@/sections/Admin/EditProject";
import { useState } from "react";

const TABS: LinkItem[] = [
  { id: "view", label: "Voir les projets" },
  { id: "add", label: "Ajouter un projet" },
  { id: "about", label: "Modifier le profil" },
];

export const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState("view");

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 mb-4">
        {TABS.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-4 rounded-t border-b border-accent mx-4 sm:mx-0 ${
              activeTab === tab.id
                ? "text-accent font-semibold text-base lg:text-xl"
                : "text-foreground text-sm lg:text-lg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-8 sm:mx-12 py-6">
        {activeTab === "view" && <EditProject />}
        {activeTab === "add" && <CreateProjects />}
        {activeTab === "about" && <EditProfile />}
      </div>
    </>
  );
};
