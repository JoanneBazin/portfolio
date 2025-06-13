"use client";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Form submitted : ", formData.name);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <section
      id="contact"
      className="min-h-screen m-10 sm:m-15 lg:m-20 flex flex-col justify-center"
    >
      <h3 className="font-montserrat text-xl">Une questions ? Un projet ?</h3>
      <form action="" className="flex flex-col gap-4 my-10">
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          required
          className="bg-gray-800"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
        />
        <label htmlFor="email"></label>
        <input
          type="text"
          id="email"
          required
          className="bg-gray-800"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          value={formData.email}
        />
        <label htmlFor="message"></label>
        <textarea
          id="message"
          rows={5}
          required
          className="bg-gray-800"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          value={formData.message}
        ></textarea>
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="bg-gold-light text-foreground p-2 rounded"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
};
