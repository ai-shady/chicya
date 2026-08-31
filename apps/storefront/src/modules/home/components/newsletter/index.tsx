"use client"

import { useState } from "react"
import { useT } from "@i18n/use-t"

const Newsletter = () => {
  const { t } = useT()
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return
    }
    setDone(true)
  }

  return (
    <section
      aria-label={t("home.newsletter.aria")}
      className="w-full bg-chicya-ink py-16 small:py-24"
    >
      <div className="content-container flex flex-col items-center text-center gap-6">
        <p className="text-xs uppercase tracking-[0.35em] text-chicya-gold">
          {t("home.newsletter.eyebrow")}
        </p>
        <h2 className="text-3xl small:text-4xl text-white uppercase tracking-[0.15em]">
          {t("home.newsletter.title")}
        </h2>
        <p className="text-sm text-white/70 max-w-md leading-6">
          {t("home.newsletter.body")}{" "}
          <span className="text-chicya-gold">CHICYA10</span> at checkout.
        </p>

        {done ? (
          <p
            className="mt-2 text-sm uppercase tracking-[0.2em] text-chicya-gold"
            role="status"
          >
            {t("home.newsletter.success")}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-2 flex w-full max-w-md flex-col small:flex-row gap-3"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t("home.newsletter.emailLabel")}
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("home.newsletter.placeholder")}
              className="flex-1 bg-transparent border border-white/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-chicya-gold focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-chicya-gold px-8 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-chicya-ink hover:text-chicya-gold border border-chicya-gold transition-colors duration-300"
            >
              {t("home.newsletter.subscribe")}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default Newsletter