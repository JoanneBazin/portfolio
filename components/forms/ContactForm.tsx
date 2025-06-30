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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

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
      className="space-y-4 sm:space-y-6 w-full max-w-3xl p-4 sm:p-6"
    >
      <div>
        {success && (
          <p
            className="text-center text-xs sm:text-base font-medium my-4"
            data-testid="success-message"
          >
            {success}
          </p>
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
          name="name"
          onChange={handleChange}
          value={form.name}
        />
        {errorMessages.name && (
          <p className="error-message">{errorMessages.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        {errorMessages.email && (
          <p className="error-message">{errorMessages.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          onChange={handleChange}
          value={form.message}
        ></textarea>
        {errorMessages.message && (
          <p className="error-message">{errorMessages.message}</p>
        )}
      </div>
      <div>
        <button type="submit" className="form-btn" disabled={isLoading}>
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </div>
    </form>
  );
};
