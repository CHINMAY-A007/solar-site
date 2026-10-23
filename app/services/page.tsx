import React from "react";
import companyData from "@/data/company-data.json";

export default function Services() {
  const { services } = companyData;

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Services</p>
          <h1>Our services</h1>
          <p style={{ color: "var(--muted)", marginTop: "12px" }}>
            From survey to grid connection and beyond.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((s, i) => (
            <div className="card" key={i}>
              <h3>{s.name}</h3>
              <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "15px" }}>
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
