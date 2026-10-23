"use client";

import React from "react";
import { Icon } from "./Icon";
import companyData from "@/data/company-data.json";

type Product = (typeof companyData.products)[number];

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card product-card">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Icon name="panel" size={24} />
        <span className="product-card__audience">{product.audience}</span>
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <p style={{ fontSize: "14px", color: "var(--muted)" }}>{product.category}</p>
      <ul className="product-card__specs">
        {product.specs.map((spec, i) => (
          <li key={i}>{spec}</li>
        ))}
      </ul>
      <p className="product-card__price">{product.priceRange}</p>
      <button
        className="btn btn--secondary"
        style={{ alignSelf: "start", marginTop: "8px" }}
        onClick={() => {
          const w = window as unknown as { openChat?: (q?: string) => void };
          w.openChat?.(`Tell me about ${product.name}`);
        }}
      >
        Ask the assistant about this
      </button>
    </div>
  );
}
