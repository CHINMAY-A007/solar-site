import React from "react";
import companyData from "@/data/company-data.json";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const { products } = companyData;
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="eyebrow">Products</p>
          <h1>Our products</h1>
          <p style={{ color: "var(--muted)", marginTop: "12px" }}>
            Panels, inverters, batteries and mounting hardware. All prices are sample ranges.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: "48px" }}>
            <h2 style={{ marginBottom: "24px" }}>
              <span className="h2-wrap">
                {cat}
                <span className="h2-line" />
              </span>
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {products
                .filter((p) => p.category === cat)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
