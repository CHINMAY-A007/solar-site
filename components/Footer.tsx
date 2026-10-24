import React from "react";
import companyData from "@/data/company-data.json";

export default function Footer() {
  const { contact } = companyData.company;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__col">
            <h4>MSM Bharat Solar systems</h4>
            <p>{companyData.company.about}</p>
          </div>
          <div className="footer__col">
            <h4>Links</h4>
            <a href="/products">Products</a>
            <a href="/services">Services</a>
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact</a>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms and Conditions</a>
            <a href="/cookie-policy">Cookie Policy</a>
            <a href="#" id="manage-cookies">
              Manage cookie preferences
            </a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <p>{contact.address}</p>
            <p>{contact.phone}</p>
            <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}>
              WhatsApp: {contact.whatsapp}
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>{contact.hours}</p>
          </div>
        </div>
        <div className="footer__bottom">
          &copy; {new Date().getFullYear()} MSM Bharat Solar systems. All rights reserved.
          <br />
          Sample site for demo purposes.
        </div>
      </div>
    </footer>
  );
}
