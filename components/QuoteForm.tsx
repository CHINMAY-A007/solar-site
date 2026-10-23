"use client";

import React, { useState } from "react";
import companyData from "@/data/company-data.json";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  monthlyBill: string;
  message: string;
  consent: boolean;
};

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  city: "",
  propertyType: "home",
  monthlyBill: "",
  message: "",
  consent: false,
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\d{10,13}$/.test(form.phone.replace(/\D/g, ""))) e.phone = "Please enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.city.trim().length < 2) e.city = "Please enter your city.";
    if (!form.consent) e.consent = "Please accept the privacy policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "quote-form" }),
      });
      setSubmitted(true);
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success">
        <h3>Thank you</h3>
        <p style={{ color: "var(--muted)", marginTop: "8px" }}>
          We have received your request. Our team will contact you within 1 working day.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={`field__input ${errors.name ? "is-invalid" : ""}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        {errors.name && <span className="field__error is-visible">{errors.name}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="phone">
          Phone number
        </label>
        <input
          id="phone"
          type="tel"
          className={`field__input ${errors.phone ? "is-invalid" : ""}`}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        {errors.phone && <span className="field__error is-visible">{errors.phone}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="email">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          className={`field__input ${errors.email ? "is-invalid" : ""}`}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <span className="field__error is-visible">{errors.email}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="city">
          City
        </label>
        <input
          id="city"
          className={`field__input ${errors.city ? "is-invalid" : ""}`}
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        />
        {errors.city && <span className="field__error is-visible">{errors.city}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="propertyType">
          Property type
        </label>
        <select
          id="propertyType"
          className="field__input"
          value={form.propertyType}
          onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
        >
          <option value="home">Home</option>
          <option value="business">Business or shop</option>
          <option value="factory">Small factory</option>
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="monthlyBill">
          Monthly electricity bill (optional)
        </label>
        <select
          id="monthlyBill"
          className="field__input"
          value={form.monthlyBill}
          onChange={(e) => setForm({ ...form, monthlyBill: e.target.value })}
        >
          <option value="">Select a range</option>
          <option value="under-2000">Under INR 2,000</option>
          <option value="2000-5000">INR 2,000 to 5,000</option>
          <option value="5000-10000">INR 5,000 to 10,000</option>
          <option value="over-10000">Over INR 10,000</option>
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="message">
          Message (optional)
        </label>
        <textarea
          id="message"
          className="field__input field__input--area"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={4}
        />
      </div>

      <div className="checkbox-field">
        <input
          id="consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
        />
        <label htmlFor="consent">
          I agree to the{" "}
          <a href="/privacy-policy" style={{ color: "var(--accent)" }}>
            privacy policy
          </a>
          .
        </label>
      </div>
      {errors.consent && <span className="field__error is-visible">{errors.consent}</span>}

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? "Sending..." : "Request a free quote"}
      </button>
    </form>
  );
}
