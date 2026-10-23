"use client";

import React from "react";
import { Icon } from "./Icon";

export default function Hero() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <h1>Solar panels, inverters and batteries, supplied and installed.</h1>
            <p style={{ marginTop: "16px", color: "var(--muted)" }}>
              We help homes, businesses and small factories cut their electricity bills with rooftop solar. Free site survey, fixed quote, certified installation.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
              <a href="/contact#quote" className="btn btn--primary">
                Request a free quote
              </a>
              <button
                className="btn btn--secondary"
                onClick={() => {
                  const w = window as unknown as { openChat?: (q?: string) => void };
                  w.openChat?.();
                }}
              >
                Ask our assistant
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gap: "16px" }}>
            <div className="placeholder-block" style={{ minHeight: "120px" }}>
              <svg viewBox="0 0 200 80" width="160" height="64" style={{ margin: "0 auto" }}>
                <rect x="10" y="10" width="180" height="60" rx="4" fill="none" stroke="var(--accent)" strokeWidth="2" />
                <line x1="10" y1="30" x2="190" y2="30" stroke="var(--line)" strokeWidth="1" />
                <line x1="10" y1="50" x2="190" y2="50" stroke="var(--line)" strokeWidth="1" />
                <line x1="70" y1="10" x2="70" y2="70" stroke="var(--line)" strokeWidth="1" />
                <line x1="130" y1="10" x2="130" y2="70" stroke="var(--line)" strokeWidth="1" />
              </svg>
              <p style={{ marginTop: "8px" }}>Solar panel diagram</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="placeholder-block" style={{ minHeight: "80px" }}>
                <Icon name="inverter" size={32} />
                <p style={{ marginTop: "8px", fontSize: "12px" }}>Inverter</p>
              </div>
              <div className="placeholder-block" style={{ minHeight: "80px" }}>
                <Icon name="battery" size={32} />
                <p style={{ marginTop: "8px", fontSize: "12px" }}>Battery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
