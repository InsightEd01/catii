"use server";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: boolean;
    email?: boolean;
    message?: boolean;
  };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactRequest(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot: bots fill every field; humans never see this one.
  if (formData.get("website")) {
    return { status: "success" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors = {
    name: name.length < 2,
    email: !EMAIL_RE.test(email),
    message: message.length < 5,
  };
  if (fieldErrors.name || fieldErrors.email || fieldErrors.message) {
    return { status: "error", fieldErrors };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "hallo@catii.ch";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Local development fallback: no email provider configured yet.
    console.log("[contact] RESEND_API_KEY not set — logging request instead:", {
      name,
      email,
      service,
      message,
    });
    return { status: "success" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "catii <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `catii contact request — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || "—"}`,
        "",
        message,
      ].join("\n"),
    });
    if (error) {
      console.error("[contact] Resend error:", error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return { status: "error" };
  }
}
