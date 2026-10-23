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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="placeholder-block">
              <Icon name="panel" size={40} />
              <p style={{ marginTop: "8px" }}>Site photo placeholder</p>
            </div>
            <div style={{ display: "grid", gap: "16px" }}>
              <div className="placeholder-block">
                <Icon name="inverter" size={32} />
                <p style={{ marginTop: "8px" }}>Site photo placeholder</p>
              </div>
              <div className="placeholder-block">
                <Icon name="battery" size={32} />
                <p style={{ marginTop: "8px" }}>Site photo placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
