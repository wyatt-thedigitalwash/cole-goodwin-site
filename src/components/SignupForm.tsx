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
    return <p className="text-lg text-brown">You&rsquo;re on the list.</p>;
  }

  const inputBase =
    "w-full rounded-md border bg-cream px-4 py-3 text-brown placeholder:text-brown/40 focus:border-brown focus:outline-none";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-md flex-col gap-3"
      >
        {/* Email */}
        <div>
          <label htmlFor={`${inputIdPrefix}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${inputIdPrefix}-email`}
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className={`${inputBase} ${fieldErrors.email ? "border-rust" : "border-brown/30"}`}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        {/* Zip */}
        <div>
          <label htmlFor={`${inputIdPrefix}-zip`} className="sr-only">
            Zip or postal code
          </label>
          <input
            id={`${inputIdPrefix}-zip`}
            type="text"
            required
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Zip or postal code"
            maxLength={10}
            className={`${inputBase} ${fieldErrors.zip ? "border-rust" : "border-brown/30"}`}
            style={{ fontFamily: "var(--font-body)" }}
          />
        </div>

        {/* Country */}
        <div>
          <label htmlFor={`${inputIdPrefix}-country`} className="sr-only">
            Country
          </label>
          <select
            id={`${inputIdPrefix}-country`}
            required
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
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
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
          <a
            href="https://www.bigmachinelabelgroup.com/privacy-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust underline"
          >
            Big Machine Records Privacy Policy
          </a>
          , and Laylo&rsquo;s{" "}
          <a
            href="https://docs.laylo.com/en/articles/6497431-terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rust underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </form>

      {status === "error" && (
        <p className="mt-3 text-center text-sm text-rust">{errorMsg}</p>
      )}
    </div>
  );
}
