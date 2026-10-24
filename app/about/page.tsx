import React from "react";
import companyData from "@/data/company-data.json";
import { Icon } from "@/components/Icon";

export default function About() {
  const { company } = companyData;

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">About</p>
          <h1>About MSM Bharat Solar systems</h1>
          <p style={{ color: "var(--muted)", marginTop: "12px" }}>
            {company.about}
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
          <div>
            <h2 style={{ marginBottom: "16px" }}>Company details</h2>
            <p style={{ color: "var(--muted)", marginBottom: "8px" }}>
              Founded: {company.founded}
            </p>
            <h3 style={{ marginTop: "24px", marginBottom: "8px" }}>Certifications</h3>
            <ul style={{ color: "var(--muted)", paddingLeft: "20px" }}>
              {company.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            <h3 style={{ marginTop: "24px", marginBottom: "8px" }}>Service areas</h3>
            <p style={{ color: "var(--muted)" }}>{company.serviceAreas.join(", ")}</p>
          </div>
          <div className="placeholder-block" style={{ minHeight: "240px" }}>
            <Icon name="house" size={48} />
            <p style={{ marginTop: "12px" }}>Site photo placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
