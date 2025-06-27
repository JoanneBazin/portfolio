"use client";

import { authSchema, validateWithSchema } from "@/lib/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {}
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorMessages({});

    const validation = validateWithSchema(authSchema, form);
    if (!validation.success) {
      setErrorMessages(validation.errors!);
      setLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Essayez ultérieurement.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="max-w-64"
          value={form.email}
          onChange={handleChange}
        />
        {errorMessages.email && (
          <p className="error-message">{errorMessages.email}</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="password" className="sr-only">
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          className="max-w-64"
          value={form.password}
          onChange={handleChange}
        />
        {errorMessages.password && (
          <p className="error-message">{errorMessages.password}</p>
        )}
      </div>

      {error && <div className="error-message text-center">{error}</div>}

      <div className="flex justify-center">
        <button type="submit" disabled={loading} className="form-btn">
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </form>
  );
};
