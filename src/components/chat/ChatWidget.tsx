"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, ChevronDown, Bot } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const INITIAL_MESSAGE: Message = {
  id: "initial",
  role: "assistant",
  content:
    "Hi! I'm Bob, AWS SBG at SRMIST's assistant. Ask me about our domains, projects, team, or how to join. How can I help?",
};

const SUGGESTED_ACTIONS = [
  { label: "Our Domains", message: "What domains does AWS SBG at SRMIST have?" },
  { label: "Our Projects", message: "What projects has AWS SBG at SRMIST built?" },
  { label: "Join the Club", message: "How can I join AWS SBG at SRMIST?" },
  { label: "Meet the Team", message: "Who's on the AWS SBG at SRMIST team?" },
  { label: "Contact Us", message: "How can I contact AWS SBG at SRMIST?" },
];

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
      return <strong key={i} className="font-semibold text-on-surface">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
      return <em key={i}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
      return <code key={i} className="text-[0.8em] bg-primary/15 text-primary px-1 font-mono">{part.slice(1, -1)}</code>;
    return part || null;
  });
}

function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  const lines = text.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      if (out.length > 0) out.push(<div key={`sp-${i}`} className="h-2" />);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      out.push(<p key={i} className="font-semibold mt-1 text-on-surface">{renderInline(line.slice(4))}</p>);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      out.push(<p key={i} className="font-bold mt-2 text-on-surface">{renderInline(line.slice(3))}</p>);
      i++;
      continue;
    }

    if (/^[*-] /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[*-] /.test(lines[i])) {
        items.push(<li key={i}>{renderInline(lines[i].slice(2))}</li>);
        i++;
      }
      out.push(<ul key={`ul-${i}`} className="list-disc list-outside pl-4 space-y-0.5 my-1">{items}</ul>);
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(<li key={i}>{renderInline(lines[i].replace(/^\d+\. /, ""))}</li>);
        i++;
      }
      out.push(<ol key={`ol-${i}`} className="list-decimal list-outside pl-4 space-y-0.5 my-1">{items}</ol>);
      continue;
    }

    out.push(<p key={i} className="leading-relaxed">{renderInline(line)}</p>);
    i++;
  }

  return <div className="space-y-0.5 text-sm text-on-surface">{out}</div>;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
        scrollToBottom("instant");
      }, 320);
    }
  }, [isOpen, scrollToBottom]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollDown(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  }, []);

  function adjustHeight() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }

  async function handleSend(messageText?: string) {
    const text = (messageText ?? input).trim();
    if (!text || isLoading) return;

    setShowSuggestions(false);
    const history = messages.slice(1).filter((m) => !m.isError);

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const assistantMsg: Message = { id: `a-${Date.now()}`, role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsLoading(true);

    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok || !res.body) throw new Error("Bad response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = { ...last, content: last.content + chunk };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "Sorry, something went wrong. Please try again or email us at **awssbg.srmist@gmail.com**.",
          isError: true,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const lastMsg = messages[messages.length - 1];
  const isTyping = isLoading && lastMsg?.role === "assistant" && !lastMsg.content;
  const isStreaming = isLoading && lastMsg?.role === "assistant" && !!lastMsg.content;
  const canSend = input.trim().length > 0 && !isLoading;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            style={{ transformOrigin: "bottom right" }}
            className="absolute right-0 bottom-[68px] w-[min(340px,calc(100vw-40px))] sm:w-[380px]"
          >
            <div
              className="flex flex-col overflow-hidden border-2 border-primary/35 bg-surface-container-lowest shadow-[0_8px_48px_rgba(168,85,247,0.15),0_2px_12px_rgba(0,0,0,0.5)]"
              style={{ height: "min(560px, calc(100dvh - 96px))" }}
            >
              {/* Header */}
              <div className="shrink-0 px-4 py-3 flex items-center justify-between bg-surface-container border-b-2 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="h-8 w-8 bg-primary/15 border border-primary/30 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-emerald-400 border border-surface-container" />
                  </div>
                  <div>
                    <p className="text-on-surface font-bold text-sm leading-snug tracking-widest uppercase">Bob</p>
                    <p className="text-on-surface-variant text-[10px] leading-snug mt-0.5 tracking-wide">AWS SBG at SRMIST · Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all p-1.5 border border-transparent hover:border-primary/25"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>

              {/* Messages + scroll-down */}
              <div className="relative flex-1 min-h-0">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="h-full overflow-y-auto px-4 py-4"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(168,85,247,0.25) transparent" }}
                >
                  <div className="flex flex-col gap-2">
                    {messages.map((msg, i) => {
                      const isEmpty = msg.role === "assistant" && !msg.content;
                      if (isEmpty) return null;

                      const prevRole = i > 0 ? messages[i - 1].role : null;
                      const isGrouped = prevRole === msg.role;

                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} ${isGrouped ? "mt-0.5" : "mt-1"}`}
                        >
                          {msg.role === "assistant" && (
                            <div className={`shrink-0 mb-0.5 h-6 w-6 bg-primary/10 border border-primary/25 flex items-center justify-center ${isGrouped ? "invisible" : ""}`}>
                              <Bot className="h-3.5 w-3.5 text-primary" />
                            </div>
                          )}

                          <div
                            className={`max-w-[78%] px-3.5 py-2.5 ${
                              msg.role === "user"
                                ? "bg-primary text-on-primary"
                                : msg.isError
                                ? "bg-red-950/40 text-red-300 border border-red-800/40"
                                : "bg-surface-container border border-on-surface/10 text-on-surface-variant"
                            }`}
                          >
                            {msg.role === "assistant" ? renderMarkdown(msg.content) : (
                              <p className="text-sm leading-relaxed">{msg.content}</p>
                            )}

                            {isStreaming && i === messages.length - 1 && (
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.9, repeat: Infinity }}
                                className="inline-block w-[2px] h-[13px] bg-current ml-0.5 align-middle"
                              />
                            )}
                          </div>
                        </motion.div>
                      );
                    })}

                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-end gap-2 justify-start mt-1"
                        >
                          <div className="shrink-0 mb-0.5 h-6 w-6 bg-primary/10 border border-primary/25 flex items-center justify-center">
                            <Bot className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="bg-surface-container border border-on-surface/10 px-4 py-3">
                            <div className="flex items-center gap-[5px]">
                              {[0, 1, 2].map((j) => (
                                <motion.span
                                  key={j}
                                  className="h-[5px] w-[5px] bg-primary/50"
                                  animate={{ y: ["0%", "-60%", "0%"] }}
                                  transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.13, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {showSuggestions && messages.length === 1 && !isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.12 }}
                          className="flex flex-wrap gap-1.5 mt-2 ml-8"
                        >
                          {SUGGESTED_ACTIONS.map((action) => (
                            <button
                              key={action.label}
                              onClick={() => handleSend(action.message)}
                              className="text-[10px] font-bold px-3 py-1.5 border border-primary/35 text-primary hover:bg-primary hover:text-on-primary focus-visible:outline-none transition-all duration-150 uppercase tracking-widest"
                            >
                              {action.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div ref={bottomRef} className="h-1 shrink-0" />
                  </div>
                </div>

                <AnimatePresence>
                  {showScrollDown && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      onClick={() => scrollToBottom()}
                      className="absolute bottom-3 right-3 h-7 w-7 bg-surface-container border border-on-surface/15 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/35 transition-colors"
                      aria-label="Scroll to latest message"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {showScrollDown && (
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface-container-lowest to-transparent" />
                )}
              </div>

              {/* Input */}
              <div className="shrink-0 border-t-2 border-primary/15 px-3 pt-2.5 pb-3 bg-surface-container">
                <div className="flex items-end gap-2 border border-on-surface/15 bg-surface-container-lowest px-3 py-2 transition-colors focus-within:border-primary/50">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => { setInput(e.target.value); adjustHeight(); }}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about AWS SBG…"
                    disabled={isLoading}
                    rows={1}
                    maxLength={500}
                    aria-label="Message"
                    className="flex-1 bg-transparent text-sm text-on-surface resize-none outline-none placeholder:text-on-surface-variant/35 disabled:opacity-50 leading-relaxed py-0.5 min-h-[22px] max-h-[96px]"
                    style={{ scrollbarWidth: "none" }}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!canSend}
                    aria-label="Send message"
                    className={`shrink-0 h-8 w-8 flex items-center justify-center transition-all duration-150 ${
                      canSend
                        ? "bg-primary text-on-primary hover:bg-primary/90"
                        : "bg-transparent text-on-surface-variant/25 cursor-not-allowed"
                    }`}
                  >
                    <Send className="h-[15px] w-[15px]" />
                  </button>
                </div>
                <p className="text-[10px] text-on-surface-variant/30 text-center mt-1.5 select-none uppercase tracking-widest">
                  Enter to send · Shift+Enter for new line
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher — square, on-brand */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="h-13 w-13 bg-primary text-on-primary flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-[0_4px_24px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_32px_rgba(168,85,247,0.55)] transition-shadow"
        style={{ height: "52px", width: "52px" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
