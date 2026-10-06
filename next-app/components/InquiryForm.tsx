"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { contactInfo } from "@/lib/contact";

export default function InquiryForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{
    id: string;
    confirmationSent: boolean;
  } | null>(null);
  const requestRef = useRef<{ fingerprint: string; id: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const fingerprint = JSON.stringify(values);
    if (requestRef.current?.fingerprint !== fingerprint)
      requestRef.current = { fingerprint, id: crypto.randomUUID() };
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          consent: form.get("consent") === "on",
          requestId: requestRef.current.id,
        }),
        signal: AbortSignal.timeout(25000),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "We couldn’t send your inquiry. Please try again.",
        );
      setSuccess({
        id: result.reference,
        confirmationSent: result.confirmationSent,
      });
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "Your connection timed out. Please try again; we’ll avoid creating a duplicate inquiry.",
      );
    } finally {
      setPending(false);
    }
  }
  if (success)
    return (
      <div
        className="form-success"
        role="status"
        tabIndex={-1}
        ref={(element) => element?.focus()}
      >
        <Check size={27} />
        <h3>
          Thank you.
          <br />
          We have your inquiry.
        </h3>
        <p>
          A designer will review your property details and contact you as soon
          as possible to discuss your staging needs and prepare a quote.
        </p>
        <p>
          {success.confirmationSent
            ? "Your confirmation email is on its way. Please check your spam folder if it doesn’t arrive."
            : "Your inquiry is safely recorded. Your email confirmation is still being processed."}
        </p>
        <small>Reference: {success.id}</small>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="inquiry-form"
      aria-label="Request a staging quote"
    >
      <label className="form-field span-full">
        <span>Property address *</span>
        <input
          required
          name="address"
          autoComplete="street-address"
          maxLength={300}
          placeholder="Street address, city and postal code"
        />
      </label>
      <label className="form-field mobile-full">
        <span>
          Your name <small>optional</small>
        </span>
        <input
          name="name"
          autoComplete="name"
          maxLength={100}
          placeholder="Full name"
        />
      </label>
      <label className="form-field mobile-full">
        <span>Staging budget (CAD) *</span>
        <select required name="budget" defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          <option value="under-2000">Under $2,000</option>
          <option value="2000-4000">$2,000–$4,000</option>
          <option value="4000-7000">$4,000–$7,000</option>
          <option value="7000-plus">$7,000+</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </label>
      <label className="form-field mobile-full">
        <span>Email address *</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
        />
      </label>
      <label className="form-field mobile-full">
        <span>Phone number *</span>
        <input
          required
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          minLength={7}
          placeholder="(416) 555-0123"
        />
      </label>
      <label className="form-field span-full">
        <span>
          Anything else we should know? <small>optional</small>
        </span>
        <textarea
          name="message"
          rows={3}
          maxLength={2000}
          placeholder="Your timeline, the rooms you’d like staged, or any questions…"
        />
      </label>
      <label className="honey-field" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent span-full">
        <input required type="checkbox" name="consent" />
        <span>
          I agree that Oaktime Staging may use these details to respond to my
          inquiry. <Link href="/privacy">Privacy notice</Link>.
        </span>
      </label>
      {error && (
        <p className="form-error span-full" role="alert">
          {error} You can also email{" "}
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
        </p>
      )}
      <div className="form-bottom span-full">
        <small>* Required fields · No commitment to book</small>
        <button type="submit" className="button button-dark" disabled={pending}>
          {pending ? "Sending your inquiry…" : "Request a quote"}
          <ArrowUpRight size={17} />
        </button>
      </div>
    </form>
  );
}
