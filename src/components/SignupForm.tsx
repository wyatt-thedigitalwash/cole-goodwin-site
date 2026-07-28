"use client";

import { useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SMS_COUNTRIES } from "@/lib/subscribe-validation";

interface SignupFormProps {
  inputIdPrefix?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "phone" | "";

const DEFAULT_SUCCESS_HEAD = "You’re on the list.";
const DEFAULT_SUCCESS_SUB =
  "Check your inbox, and your phone for a text you can reply to and confirm SMS updates.";

const bodyFont: React.CSSProperties = { fontFamily: "var(--font-body)" };

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

const inputBase =
  "w-full rounded-md border bg-cream px-4 py-3 text-brown placeholder:text-brown/40 focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/50";

export default function SignupForm({
  inputIdPrefix = "signup",
}: SignupFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorField, setErrorField] = useState<ErrorField>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successHead, setSuccessHead] = useState(DEFAULT_SUCCESS_HEAD);
  const [successSub, setSuccessSub] = useState(DEFAULT_SUCCESS_SUB);

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // US/Canada get the +1 auto-formatted REQUIRED phone; elsewhere it's optional
  // because Laylo can only text North American numbers.
  const isNorthAmerica = SMS_COUNTRIES.has(country);
  const errorId = `${inputIdPrefix}-error`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard double-submit
    setStatus("loading");
    setErrorField("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          zipCode,
          country,
          website,
        }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        if (data?.message) {
          setSuccessHead("Thanks.");
          setSuccessSub(data.message);
        }
        setStatus("success");
        return;
      }

      const field: ErrorField =
        data?.field === "email" || data?.field === "phone" ? data.field : "";
      setErrorField(field);
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => {
        if (field === "email") emailRef.current?.focus();
        else if (field === "phone") phoneRef.current?.focus();
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto max-w-md text-center"
      >
        <h3 className="text-brown" style={{ transformOrigin: "center center" }}>
          {successHead}
        </h3>
        <p
          className="mt-3 text-sm leading-relaxed text-brown/70 md:text-base"
          style={bodyFont}
        >
          {successSub}
        </p>
      </div>
    );
  }

  const fieldClass = (invalid: boolean) =>
    `${inputBase} ${invalid ? "border-rust" : "border-brown/30"}`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-md flex-col gap-3 text-left"
    >
      {/* Honeypot — visually hidden, off-screen; catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${inputIdPrefix}-website`}>Website</label>
        <input
          id={`${inputIdPrefix}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${inputIdPrefix}-first`} className="sr-only">
            First Name
          </label>
          <input
            id={`${inputIdPrefix}-first`}
            name="firstName"
            placeholder="First Name"
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass(false)}
            style={bodyFont}
          />
        </div>
        <div>
          <label htmlFor={`${inputIdPrefix}-last`} className="sr-only">
            Last Name
          </label>
          <input
            id={`${inputIdPrefix}-last`}
            name="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass(false)}
            style={bodyFont}
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor={`${inputIdPrefix}-email`} className="sr-only">
          Email
        </label>
        <input
          ref={emailRef}
          id={`${inputIdPrefix}-email`}
          type="email"
          name="email"
          placeholder="Email*"
          required
          aria-required="true"
          aria-invalid={errorField === "email"}
          aria-describedby={status === "error" ? errorId : undefined}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass(errorField === "email")}
          style={bodyFont}
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor={`${inputIdPrefix}-phone`} className="sr-only">
          Phone Number{isNorthAmerica ? "" : " (optional)"}
        </label>
        {isNorthAmerica ? (
          <div
            className={`flex items-stretch overflow-hidden rounded-md border bg-cream focus-within:border-brown focus-within:ring-2 focus-within:ring-brown/50 ${
              errorField === "phone" ? "border-rust" : "border-brown/30"
            }`}
          >
            <span
              className="flex select-none items-center pl-4 pr-2 text-sm text-brown/40"
              aria-hidden="true"
              style={bodyFont}
            >
              +1
            </span>
            <input
              ref={phoneRef}
              id={`${inputIdPrefix}-phone`}
              type="tel"
              name="phone"
              inputMode="numeric"
              placeholder="555-555-5555"
              required
              aria-required="true"
              aria-invalid={errorField === "phone"}
              aria-describedby={status === "error" ? errorId : undefined}
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatUsPhone(e.target.value))}
              className="w-full border-0 bg-transparent py-3 pr-4 text-brown placeholder:text-brown/40 focus:outline-none focus:ring-0"
              style={bodyFont}
            />
          </div>
        ) : (
          <input
            ref={phoneRef}
            id={`${inputIdPrefix}-phone`}
            type="tel"
            name="phone"
            inputMode="tel"
            placeholder="Phone Number (optional)"
            aria-invalid={errorField === "phone"}
            aria-describedby={status === "error" ? errorId : undefined}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={fieldClass(errorField === "phone")}
            style={bodyFont}
          />
        )}
      </div>

      {/* Country + Zip row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${inputIdPrefix}-country`} className="sr-only">
            Country
          </label>
          <select
            id={`${inputIdPrefix}-country`}
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`${fieldClass(false)} appearance-none`}
            style={bodyFont}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${inputIdPrefix}-zip`} className="sr-only">
            Zip Code
          </label>
          <input
            id={`${inputIdPrefix}-zip`}
            name="zipCode"
            inputMode="numeric"
            placeholder="Zip Code"
            maxLength={20}
            autoComplete="postal-code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={fieldClass(false)}
            style={bodyFont}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className="btn-listen mt-1 w-full"
      >
        {status === "loading" ? "Signing up..." : "Sign Up"}
      </button>

      {/* Legally required SMS consent copy — keep both Laylo links + label privacy link. */}
      <p
        className="mx-auto mt-4 max-w-md text-center leading-relaxed text-brown/60"
        style={{ ...bodyFont, fontSize: "11px" }}
      >
        By submitting this form you agree to receive email and recurring
        automated marketing text messages. We will text you once to confirm your
        number, reply to opt in. Consent is not a condition of purchase. Message
        and data rates may apply. See the{" "}
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
          Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>

      {status === "error" && (
        <p
          id={errorId}
          role="alert"
          className="text-center text-sm text-rust"
          style={bodyFont}
        >
          {errorMessage || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
