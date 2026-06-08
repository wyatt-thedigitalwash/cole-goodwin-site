"use client";

import { useState } from "react";
import { COUNTRIES } from "@/lib/countries";

interface SignupFormProps {
  inputIdPrefix?: string;
}

interface FieldErrors {
  email?: string;
  zip?: string;
  country?: string;
}

export default function SignupForm({
  inputIdPrefix = "signup",
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState("");

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!zip.trim()) {
      errors.zip = "Zip or postal code is required.";
    }
    if (!country) {
      errors.country = "Please select a country.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          zip: zip.trim(),
          country,
          website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-lg text-brown" role="status">
        You&rsquo;re on the list.
      </p>
    );
  }

  const inputBase =
    "w-full rounded-md border bg-cream px-4 py-3 text-brown placeholder:text-brown/40 focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/50";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-md flex-col gap-3"
        noValidate
      >
        {/* Honeypot — hidden from humans, catches bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${inputIdPrefix}-website`}>Website</label>
          <input
            id={`${inputIdPrefix}-website`}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${inputIdPrefix}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${inputIdPrefix}-email`}
            type="email"
            aria-required="true"
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={
              fieldErrors.email ? `${inputIdPrefix}-email-error` : undefined
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={`${inputBase} ${fieldErrors.email ? "border-rust" : "border-brown/30"}`}
            style={{ fontFamily: "var(--font-body)" }}
          />
          {fieldErrors.email && (
            <p
              id={`${inputIdPrefix}-email-error`}
              className="mt-1 text-sm text-rust"
              role="alert"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Zip */}
        <div>
          <label htmlFor={`${inputIdPrefix}-zip`} className="sr-only">
            Zip or postal code
          </label>
          <input
            id={`${inputIdPrefix}-zip`}
            type="text"
            aria-required="true"
            aria-invalid={fieldErrors.zip ? "true" : undefined}
            aria-describedby={
              fieldErrors.zip ? `${inputIdPrefix}-zip-error` : undefined
            }
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip or postal code"
            maxLength={10}
            className={`${inputBase} ${fieldErrors.zip ? "border-rust" : "border-brown/30"}`}
            style={{ fontFamily: "var(--font-body)" }}
          />
          {fieldErrors.zip && (
            <p
              id={`${inputIdPrefix}-zip-error`}
              className="mt-1 text-sm text-rust"
              role="alert"
            >
              {fieldErrors.zip}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor={`${inputIdPrefix}-country`} className="sr-only">
            Country
          </label>
          <select
            id={`${inputIdPrefix}-country`}
            aria-required="true"
            aria-invalid={fieldErrors.country ? "true" : undefined}
            aria-describedby={
              fieldErrors.country
                ? `${inputIdPrefix}-country-error`
                : undefined
            }
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`${inputBase} ${fieldErrors.country ? "border-rust" : "border-brown/30"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {fieldErrors.country && (
            <p
              id={`${inputIdPrefix}-country-error`}
              className="mt-1 text-sm text-rust"
              role="alert"
            >
              {fieldErrors.country}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          aria-busy={status === "loading"}
          className="btn-listen w-full"
        >
          {status === "loading" ? "Signing up..." : "Sign Up"}
        </button>

        {/* Legal disclaimer */}
        <p
          className="mx-auto mt-5 max-w-md text-center leading-relaxed text-brown/60"
          style={{ fontFamily: "var(--font-body)", fontSize: "11px" }}
        >
          By submitting this form, you agree to the{" "}
          <a href="/privacy" className="text-rust underline">
            Big Machine Records Privacy Policy
          </a>
          , and Laylo&rsquo;s{" "}
          <a
            href="https://docs.laylo.com/en/articles/6497431-terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust underline"
          >
            Terms<span className="sr-only"> (opens in a new tab)</span>
          </a>{" "}
          and{" "}
          <a
            href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust underline"
          >
            Privacy Policy
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </form>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-rust" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
