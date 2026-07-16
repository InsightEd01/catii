"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import {
  sendContactRequest,
  type ContactFormState,
} from "@/lib/actions/contact";

const SERVICE_KEYS = ["grooming", "sitting", "smartHome", "health", "other"] as const;

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-2xl border border-line bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus:border-clay";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, pending] = useActionState(
    sendContactRequest,
    initialState
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-moss/30 bg-moss/10 p-8 text-center"
      >
        <p className="font-display text-xl font-semibold text-moss">
          {t("success")}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Honeypot — hidden from humans, tempting for bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            {t("name")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
          />
          {state.fieldErrors?.name && (
            <p className="mt-1.5 text-xs text-clay-deep">{t("validation.name")}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            {t("email")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
          {state.fieldErrors?.email && (
            <p className="mt-1.5 text-xs text-clay-deep">{t("validation.email")}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
          {t("service")}
        </label>
        <select id="service" name="service" defaultValue="" className={inputClasses}>
          <option value="" disabled>
            {t("servicePlaceholder")}
          </option>
          {SERVICE_KEYS.map((key) => (
            <option key={key} value={key}>
              {t(`serviceOptions.${key}`)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          className={inputClasses}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1.5 text-xs text-clay-deep">{t("validation.message")}</p>
        )}
      </div>

      {state.status === "error" && !state.fieldErrors && (
        <p role="alert" className="rounded-2xl bg-clay/10 px-4 py-3 text-sm text-clay-deep">
          {t("error")}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-clay-deep disabled:opacity-60 sm:w-auto"
      >
        {pending ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
