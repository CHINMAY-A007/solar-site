import React from "react";
import companyData from "@/data/company-data.json";
import FaqList from "@/components/FaqList";

export default function Faq() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">FAQ</p>
          <h1>Frequently asked questions</h1>
        </div>
        <FaqList faqs={companyData.faqs} />
      </div>
    </section>
  );
}
