"use client";

import React, { useEffect, useState } from "react";

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  version: number;
  timestamp: string;
};

const STORAGE_KEY = "cookie-consent";
const VERSION = 1;

function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setVisible(true);
    }

    function openPrefs() {
      const c = readConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setPrefsOpen(true);
    }

    const btn = document.getElementById("manage-cookies");
    btn?.addEventListener("click", (e) => {
      e.preventDefault();
      openPrefs();
    });

    // listen for custom event from footer link
    window.addEventListener("open-cookie-prefs", openPrefs);

    return () => {
      window.removeEventListener("open-cookie-prefs", openPrefs);
    };
  }, []);

  function acceptAll() {
    writeConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      version: VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
    setPrefsOpen(false);
  }

  function rejectNonEssential() {
    writeConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      version: VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
    setPrefsOpen(false);
  }

  function savePrefs() {
    writeConsent({
      necessary: true,
      analytics,
      marketing,
      version: VERSION,
      timestamp: new Date().toISOString(),
    });
    setVisible(false);
    setPrefsOpen(false);
  }

  return (
    <>
      <div className={`cookie-banner ${visible ? "is-visible" : ""}`}>
        <div className="cookie-banner__inner">
          <p className="cookie-banner__text">
            We use cookies to run this site and, with your permission, to understand how it is used.
          </p>
          <div className="cookie-banner__actions">
            <button className="btn btn--secondary" onClick={rejectNonEssential}>
              Reject non-essential
            </button>
            <button className="btn btn--secondary" onClick={() => setPrefsOpen(true)}>
              Manage preferences
            </button>
            <button className="btn btn--primary" onClick={acceptAll}>
              Accept all
            </button>
          </div>
        </div>
      </div>

      {prefsOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setPrefsOpen(false)}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 8,
              padding: 24,
              maxWidth: 400,
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 16 }}>Cookie preferences</h3>
            <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" checked disabled /> Necessary (always on)
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />{" "}
                Analytics
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />{" "}
                Marketing
              </label>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn--secondary" onClick={() => setPrefsOpen(false)}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={savePrefs}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
