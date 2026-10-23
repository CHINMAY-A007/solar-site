import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="section">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "14px" }}>
          Sample text for a demo. Have a lawyer review before launch. Effective date: 2026.
        </p>

        <div style={{ marginTop: "32px", display: "grid", gap: "24px" }}>
          <div>
            <h2>What we collect</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              When you request a quote or contact us, we collect your name, phone number, email address, city, property type, monthly bill range and message.
            </p>
          </div>
          <div>
            <h2>How we use it</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              We use your details to respond to your enquiry and to prepare a quote. We do not sell your data or use it for advertising.
            </p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              We use cookies to run the site and, with your permission, to understand how it is used. See our Cookie Policy for details.
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
