"use client";

import { LinkItem } from "@/lib/types";
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gold-light pb-2 mb-4">
        {TABS.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm lg:text-lg rounded-t ${
              activeTab === tab.id
                ? "text-gold-light font-semibold"
                : "text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mx-12 py-6">
        {activeTab === "view" && <EditProject />}
        {activeTab === "add" && <CreateProjects />}
        {activeTab === "about" && <EditProfile />}
      </div>
    </>
  );
};
