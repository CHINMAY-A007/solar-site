import React from "react";
import Hero from "@/components/Hero";
import companyData from "@/data/company-data.json";
import ProductCard from "@/components/ProductCard";
import StepList from "@/components/StepList";
import FaqList from "@/components/FaqList";

export default function Home() {
  const { company, products, process, warranty, faqs } = companyData;

  return (
    <>
      <Hero />

      {/* Product overview */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Products</p>
            <h2>
              <span className="h2-wrap">
                What we supply
                <span className="h2-line" />
              </span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">How it works</p>
            <h2>
              <span className="h2-wrap">
                From survey to switch-on
                <span className="h2-line" />
              </span>
            </h2>
          </div>
          <StepList steps={process} />
        </div>
      </section>

      {/* Why us */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Why us</p>
            <h2>
              <span className="h2-wrap">
                Warranty and support
                <span className="h2-line" />
              </span>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            <div className="card">
              <h3>Panels</h3>
              <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "15px" }}>
                {warranty.panels}
              </p>
            </div>
            <div className="card">
              <h3>Inverter</h3>
              <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "15px" }}>
                {warranty.inverter}
              </p>
            </div>
            <div className="card">
              <h3>Battery</h3>
              <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "15px" }}>
                {warranty.battery}
              </p>
            </div>
            <div className="card">
              <h3>Workmanship</h3>
              <p style={{ color: "var(--muted)", marginTop: "8px", fontSize: "15px" }}>
                {warranty.workmanship}
              </p>
            </div>
          </div>
          <div style={{ marginTop: "32px" }}>
            <p style={{ color: "var(--muted)", fontSize: "15px" }}>
              Certified installers. After-sales support. {company.certifications.join(", ")}.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">FAQ</p>
            <h2>
              <span className="h2-wrap">
                Common questions
                <span className="h2-line" />
              </span>
            </h2>
          </div>
          <FaqList faqs={faqs.slice(0, 5)} />
          <div style={{ marginTop: "24px" }}>
            <a href="/faq" className="btn btn--secondary">
              See all questions
            </a>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Ready to go solar?</h2>
          <p style={{ color: "var(--muted)", marginTop: "12px", margin: "12px auto 0" }}>
            Book a free site survey. No obligation, no pressure.
          </p>
          <div style={{ marginTop: "24px" }}>
            <a href="/contact#quote" className="btn btn--primary">
              Request a free quote
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
