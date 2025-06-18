"use client";

import { AboutFormProps } from "@/lib/types";
import { useState } from "react";

export const AboutForm: React.FC<AboutFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
}) => {
  const [about, setAbout] = useState(initialData || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(about);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 max-w-xl">
      <label htmlFor="about" className="sr-only">
        Présentation
      </label>
      <textarea
        id="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        rows={6}
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="text-sm bg-gold-light text-background px-4 py-2 hover:bg-gold-dark"
      >
        {isLoading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
};
