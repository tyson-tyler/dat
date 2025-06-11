// components/ContactForm.tsx
"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

export default function ContactForm() {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_v69k3fw", // e.g., service_xxxxxx
        "template_8hd7y69", // e.g., template_xxxxxx
        form.current!,
        "IUi1A9UICuYBvtJdd" // e.g., Y0URPubl1cK3y
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.text);
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f172a] px-4">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="bg-slate-800 p-8 rounded-lg shadow-md max-w-2xl w-full text-white"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">Contact Us</h2>
        <p className="text-center mb-6 text-gray-300">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            className="p-3 rounded bg-slate-700 border border-slate-600"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            className="p-3 rounded bg-slate-700 border border-slate-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="email"
            name="user_email"
            placeholder="Your email"
            required
            className="p-3 rounded bg-slate-700 border border-slate-600"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="p-3 rounded bg-slate-700 border border-slate-600"
          />
        </div>

        <textarea
          name="message"
          rows={5}
          placeholder="Leave a comment..."
          className="w-full p-3 rounded bg-slate-700 border border-slate-600 mb-4"
        ></textarea>

        <p className="text-sm text-gray-400 mb-4">
          By submitting this form you agree to our{" "}
          <Link href="#" className="underline text-blue-400">
            terms and conditions
          </Link>{" "}
          and our{" "}
          <Link href="#" className="underline text-blue-400">
            privacy policy
          </Link>
          .
        </p>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send message"}
        </button>

        {success && (
          <p className="text-green-400 text-center mt-4">
            Message sent successfully!
          </p>
        )}
      </form>
    </div>
  );
}
