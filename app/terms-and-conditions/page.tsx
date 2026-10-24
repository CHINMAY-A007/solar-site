import React from "react";

export default function TermsAndConditions() {
  return (
    <section className="section">
      <div className="container">
        <h1>Terms and Conditions</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "14px" }}>
          Sample text for a demo. Have a lawyer review before launch. Effective date: 2026.
        </p>

        <div style={{ marginTop: "32px", display: "grid", gap: "24px" }}>
          <div>
            <h2>General</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              By using this website you agree to these terms. The content is provided for information about MSM Bharat Solar systems products and services.
            </p>
          </div>
          <div>
            <h2>Quotes and pricing</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Prices shown are sample ranges. A fixed quote is provided after a free site survey. Quotes are valid for 30 days unless stated otherwise.
            </p>
          </div>
          <div>
            <h2>Warranty</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Warranty terms are as stated on the product pages. Damage from misuse, unauthorised modification, flooding and natural disasters is not covered.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              Email: hello@solarnova.example. Phone: +91 80 5555 0100.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
