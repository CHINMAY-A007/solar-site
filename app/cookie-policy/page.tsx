import React from "react";

export default function CookiePolicy() {
  return (
    <section className="section">
      <div className="container">
        <h1>Cookie Policy</h1>
        <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "14px" }}>
          Sample text for a demo. Have a lawyer review before launch. Effective date: 2026.
        </p>

        <div style={{ marginTop: "32px", display: "grid", gap: "24px" }}>
          <div>
            <h2>What cookies we use</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <th style={{ textAlign: "left", padding: "8px 0", fontSize: "14px" }}>Cookie</th>
                  <th style={{ textAlign: "left", padding: "8px 0", fontSize: "14px" }}>Purpose</th>
                  <th style={{ textAlign: "left", padding: "8px 0", fontSize: "14px" }}>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>cookie-consent</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Stores your cookie preference</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Necessary</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>analytics</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Usage analytics (sample, off by default)</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Analytics</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>marketing</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Marketing (sample, off by default)</td>
                  <td style={{ padding: "8px 0", fontSize: "14px", color: "var(--muted)" }}>Marketing</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Managing preferences</h2>
            <p style={{ color: "var(--muted)", marginTop: "8px" }}>
              You can change your cookie preferences at any time using the "Manage cookie preferences" link in the footer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
