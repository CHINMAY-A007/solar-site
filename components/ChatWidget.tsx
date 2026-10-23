"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What products do you offer?",
  "How does installation work?",
  "What warranty do you give?",
  "How can I get a quote?",
  "How many panels do I need?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello, I am the SolarNova assistant. I can help with products, pricing ranges, installation, warranty, our policies and general solar questions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [showTeaser, setShowTeaser] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Expose openChat globally
    (window as unknown as { openChat?: (q?: string) => void }).openChat = (q?: string) => {
      setOpen(true);
      if (q) {
        sendMessage(q);
      }
    };

    // Teaser after 6 seconds on first visit
    try {
      if (!sessionStorage.getItem("chat-teaser-shown")) {
        const timer = setTimeout(() => {
          setShowTeaser(true);
          sessionStorage.setItem("chat-teaser-shown", "1");
        }, 6000);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setShowChips(false);
    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);

    // Add placeholder assistant message
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: "I am getting a lot of questions right now. Please try again in a minute.",
            };
            return updated;
          });
          setStreaming(false);
          return;
        }
        throw new Error("Request failed");
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: accumulated,
          };
          return updated;
        });
      }

      // Parse lead marker
      const leadMatch = accumulated.match(/\[\[LEAD name="([^"]*)" phone="([^"]*)" city="([^"]*)"\]\]/);
      if (leadMatch) {
        const [, name, phone, city] = leadMatch;
        // Remove marker from display
        const cleaned = accumulated.replace(/\[\[LEAD name="[^"]*" phone="[^"]*" city="[^"]*"\]\]/, "").trim();
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: cleaned };
          return updated;
        });
        // Save lead
        fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, city, source: "chatbot" }),
        }).catch(() => {});
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleChipClick(chip: string) {
    sendMessage(chip);
  }

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Hello, I am the SolarNova assistant. I can help with products, pricing ranges, installation, warranty, our policies and general solar questions.",
      },
    ]);
    setShowChips(true);
  }

  function renderMarkdown(text: string): React.ReactNode {
    // Simple markdown-lite: bold, lists, links
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold
      const bolded = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Links
      const linked = bolded.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--accent); text-decoration: underline;">$1</a>'
      );
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li
            key={i}
            dangerouslySetInnerHTML={{ __html: linked.slice(2) }}
            style={{ marginLeft: "16px" }}
          />
        );
      }
      return (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: linked }}
          style={{ margin: "4px 0" }}
        />
      );
    });
  }

  return (
    <>
      {/* Teaser */}
      {showTeaser && !open && (
        <div className="chat-teaser is-visible">
          <button
            onClick={() => setShowTeaser(false)}
            style={{
              position: "absolute",
              top: 4,
              right: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: 14,
            }}
            aria-label="Dismiss"
          >
            x
          </button>
          Questions about solar? Ask me.
        </div>
      )}

      {/* Launcher */}
      {!open && (
        <button
          className="chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open chat assistant"
          aria-expanded={open}
          style={{ width: "auto", padding: "0 20px", gap: "8px" }}
        >
          <Icon name="chat" size={20} />
          <span style={{ fontSize: "14px", fontWeight: 600 }}>Ask us</span>
        </button>
      )}

      {/* Window */}
      <div
        className={`chat-window ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="SolarNova assistant"
        aria-modal="true"
      >
        <div className="chat-header">
          <div>
            <div className="chat-header__title">SolarNova Energy</div>
            <div className="chat-header__subtitle">Sample assistant for demo</div>
          </div>
          <div className="chat-header__actions">
            <button className="chat-header__btn" onClick={clearChat} aria-label="Clear chat">
              <Icon name="clear" size={16} />
            </button>
            <button
              className="chat-header__btn"
              onClick={() => setOpen(false)}
              aria-label="Minimise chat"
            >
              <Icon name="minimise" size={16} />
            </button>
          </div>
        </div>

        <div className="chat-messages" aria-live="polite">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`chat-msg chat-msg--${msg.role}`}
            >
              {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
              {streaming && i === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                <span className="chat-msg--typing">Thinking...</span>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showChips && messages.length <= 1 && (
          <div className="chat-chips">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                className="chat-chip"
                onClick={() => handleChipClick(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            disabled={streaming}
            maxLength={1000}
          />
          <button
            type="submit"
            className="chat-send"
            disabled={streaming || !input.trim()}
            aria-label="Send message"
          >
            <Icon name="send" size={18} />
          </button>
        </form>

        <div className="chat-footer-note">
          Powered by AI. Answers are based on SolarNova sample information.
        </div>
      </div>
    </>
  );
}
