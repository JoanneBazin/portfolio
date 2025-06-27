"use client";

import { AboutFormProps } from "@/app/types";
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
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-4 w-full">
      <label htmlFor="about" className="sr-only">
        Présentation
      </label>
      <textarea
        id="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        rows={13}
        className="w-full text-base bg-background text-foreground min-h-[300px] border rounded-lg p-4"
      />
      <button type="submit" className="form-btn">
        {isLoading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </form>
  );
};
