"use client";
import { contactSchema, validateWithSchema } from "@/lib/schemas";
import { useState } from "react";

export const Contact = () => {
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
    <section
      id="contact"
      className="min-h-screen m-10 sm:m-15 lg:m-20 flex flex-col justify-center"
    >
      <h3 className="font-montserrat text-xl">Une questions ? Un projet ?</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-10">
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          required
          className="bg-gray-800"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form.name}
        />
        {errorMessages.name && (
          <p className="text-center">{errorMessages.name}</p>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          required
          className="bg-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
        />
        {errorMessages.email && (
          <p className="text-center">{errorMessages.email}</p>
        )}

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows={5}
          required
          className="bg-gray-800"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          value={form.message}
        ></textarea>
        {errorMessages.message && (
          <p className="text-center">{errorMessages.message}</p>
        )}

        <button
          type="submit"
          className="bg-gold-light text-background p-2 rounded"
        >
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      {success && <p className="text-center text-lg">{success}</p>}
      {error && <p className="text-center text-lg text-red-900">{error}</p>}
    </section>
  );
};
