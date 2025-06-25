"use client";
import { contactSchema, validateWithSchema } from "@/lib/schemas";
import { useState } from "react";

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setErrorMessages({});

    const validation = validateWithSchema(contactSchema, form);
    if (!validation.success) {
      setErrorMessages(validation.errors!);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok)
        throw new Error("Une erreur est survenue. Veuillez réessayer.");

      setSuccess("Message envoyé !");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-8 w-full max-w-3xl p-4 sm:p-6"
    >
      <div>
        {success && (
          <p className="text-center sm:text-lg font-medium my-4 ">{success}</p>
        )}
        {error && (
          <p className="text-center sm:text-lg text-red my-4">{error}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
        />
        {errorMessages.name && (
          <p className="text-red text-xs sm:text-base">{errorMessages.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
        />
        {errorMessages.email && (
          <p className="text-red text-xs sm:text-base">{errorMessages.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          value={form.message}
        ></textarea>
        {errorMessages.message && (
          <p className="text-red text-xs sm:text-base">
            {errorMessages.message}
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="mt-8 border border-accent text-base sm:text-xl font-semibold py-2 px-4 rounded-xl"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </div>
    </form>
  );
};
