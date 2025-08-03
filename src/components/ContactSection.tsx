"use client";
import { useState } from "react";
import EmailIcon from "./EmailIcon";
import InstagramIcon from "./InstagramIcon";
import { useTranslations } from "@/hooks/useTranslations";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const t = useTranslations();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(fd)),
    });
    setSent(true);
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-md mx-auto">
        {/* Minimal section indicator */}
        <div className="text-xs font-moderat font-medium tracking-wider text-muted/60 uppercase mb-12">
          {t.contact}
        </div>

        {sent ? (
          <p className="text-sm font-moderat text-artistic-red">{t.messageSent}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="name"
              placeholder={t.name}
              required
              className="w-full p-4 bg-transparent border-b border-border/30 focus:border-artistic-red outline-none text-sm font-moderat transition-colors duration-300"
            />
            <input
              name="email"
              type="email"
              placeholder={t.email}
              required
              className="w-full p-4 bg-transparent border-b border-border/30 focus:border-artistic-red outline-none text-sm font-moderat transition-colors duration-300"
            />
            <textarea
              name="message"
              rows={4}
              placeholder={t.message}
              required
              className="w-full p-4 bg-transparent border-b border-border/30 focus:border-artistic-red outline-none text-sm font-moderat resize-none transition-colors duration-300"
            />
            <button
              type="submit"
              className="text-sm font-moderat font-medium text-muted hover:text-artistic-red transition-colors duration-300 uppercase tracking-wider"
            >
              {t.sendMessage}
            </button>
          </form>
        )}
        <div className="mt-12 flex justify-center space-x-6">
          <a
            href="mailto:mehdiasadi1995@gmail.com"
            className="text-muted hover:text-artistic-red transition-colors duration-300"
          >
            <EmailIcon className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/mehdi_assadii/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-artistic-red transition-colors duration-300"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
