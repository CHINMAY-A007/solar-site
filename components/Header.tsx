"use client";

import React, { useState } from "react";
import { Icon } from "./Icon";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="logo">
          SolarNova
        </a>
        <nav className="nav">
          <a href="/products" className="nav__link">
            Products
          </a>
          <a href="/services" className="nav__link">
            Services
          </a>
          <a href="/about" className="nav__link">
            About
          </a>
          <a href="/faq" className="nav__link">
            FAQ
          </a>
          <a href="/contact" className="nav__link">
            Contact
          </a>
        </nav>
        <a href="/contact#quote" className="btn btn--primary">
          Request a free quote
        </a>
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="container">
          <a href="/products">Products</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/contact">Contact</a>
          <a href="/contact#quote" className="btn btn--primary">
            Request a free quote
          </a>
        </div>
      </div>
    </header>
  );
}
