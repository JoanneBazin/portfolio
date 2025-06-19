"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
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
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-accent font-montserrat">
        Connexion Admin
      </h2>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-900 text-sm text-center">{error}</div>
        )}

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminLogin;
