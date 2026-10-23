import React from "react";
import companyData from "@/data/company-data.json";
import QuoteForm from "@/components/QuoteForm";

export default function Contact() {
  const { contact } = companyData.company;

  return (
    <section className="section" id="quote">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Contact</p>
          <h1>Request a free quote</h1>
          <p style={{ color: "var(--muted)", marginTop: "12px" }}>
            Fill in the form and our team will get back to you within 1 working day.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
        >
          <QuoteForm />
          <div>
            <h3 style={{ marginBottom: "16px" }}>Direct contact</h3>
            <p style={{ color: "var(--muted)", marginBottom: "8px" }}>{contact.address}</p>
            <p style={{ color: "var(--muted)", marginBottom: "8px" }}>{contact.phone}</p>
            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
              style={{ color: "var(--accent)", display: "block", marginBottom: "8px" }}
            >
              WhatsApp: {contact.whatsapp}
            </a>
            <a
              href={`mailto:${contact.email}`}
              style={{ color: "var(--accent)", display: "block", marginBottom: "8px" }}
            >
              {contact.email}
            </a>
            <p style={{ color: "var(--muted)" }}>{contact.hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
