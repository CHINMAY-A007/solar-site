import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center" }}>
        <h1>Page not found</h1>
        <p style={{ color: "var(--muted)", marginTop: "12px" }}>
          The page you are looking for does not exist.
        </p>
        <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/" className="btn btn--primary">
            Go home
          </Link>
          <Link href="/contact" className="btn btn--secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
