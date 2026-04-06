// Messages.tsx — OgaLandlord Messaging System
// Three states: empty (no messages), conversation list, open conversation

import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  status?: "sent" | "delivered" | "read";
  attachment?: { type: "file" | "image"; name: string; url?: string };
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  property: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Chioma Okafor",
    initials: "CO",
    property: "3 Bedroom Flat in Lekki",
    lastMessage: "Is the apartment still available?",
    time: "2m ago",
    unread: 2,
    online: true,
    messages: [
      { id: "m1", text: "Hello, I'm interested in the 3 bedroom flat", sender: "them", time: "10:30 AM" },
      { id: "m2", text: "Good morning! Yes, the property is available. Would you like to schedule a viewing?", sender: "me", time: "10:32 AM", status: "read" },
      { id: "m3", text: "Yes! Is the apartment still available?", sender: "them", time: "10:35 AM" },
      { id: "m4", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
      { id: "m5", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
    ],
  },
  {
    id: "2",
    name: "Immanuel",
    initials: "IM",
    property: "3 Bedroom Flat in Lekki",
    lastMessage: "Is the apartment still available?",
    time: "2m ago",
    unread: 0,
    online: false,
    messages: [
      { id: "m1", text: "Hi, I saw your listing for the 3 bedroom flat in Lekki.", sender: "them", time: "9:00 AM" },
      { id: "m2", text: "Hello Immanuel! Yes, it's still listed. What would you like to know?", sender: "me", time: "9:05 AM", status: "delivered" },
      { id: "m3", text: "What's the price and when can I come for inspection?", sender: "them", time: "9:10 AM" },
      { id: "m4", text: "The rent is ₦800,000/yr. You can come any weekday between 10am - 4pm. Inspection fee is ₦10,000.", sender: "me", time: "9:15 AM", status: "read" },
      { id: "m5", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
    ],
  },
  {
    id: "3",
    name: "Bayo Aborisade",
    initials: "BA",
    property: "3 Bedroom Flat in Lekki",
    lastMessage: "Is the apartment still available?",
    time: "2m ago",
    unread: 2,
    online: false,
    messages: [
      { id: "m1", text: "Good day, I want to know more about the 3 bedroom flat.", sender: "them", time: "Yesterday" },
      { id: "m2", text: "Good day Bayo! The apartment is fully tiled with built-in wardrobes and POP ceiling. It's in Central Park Estate.", sender: "me", time: "Yesterday", status: "read" },
      { id: "m3", text: "Sounds great! Does it have a constant water supply?", sender: "them", time: "Yesterday" },
      { id: "m4", text: "Yes, there's a borehole and overhead tank. No water issues at all.", sender: "me", time: "Yesterday", status: "read" },
      { id: "m5", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
    ],
  },
  {
    id: "4",
    name: "Dolabomi Akinsuyi",
    initials: "DO",
    property: "3 Bedroom Flat in Lekki",
    lastMessage: "Is the apartment still available?",
    time: "2m ago",
    unread: 2,
    online: false,
    messages: [
      { id: "m1", text: "Hello, I'm looking for a 3 bedroom apartment for my family.", sender: "them", time: "Mon" },
      { id: "m2", text: "Hi Dolabomi! This property would be perfect for a family. It's in a secure estate with 24hr security.", sender: "me", time: "Mon", status: "read" },
      { id: "m3", text: "Are there schools nearby? We have two kids.", sender: "them", time: "Mon" },
      { id: "m4", text: "Yes! There are 3 good schools within 10 minutes drive — Greenfield Academy, Lekki British School, and Corona Primary.", sender: "me", time: "Mon", status: "read" },
      { id: "m5", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
    ],
  },
  {
    id: "5",
    name: "Faith Adewole",
    initials: "FA",
    property: "3 Bedroom Flat in Lekki",
    lastMessage: "Is the apartment still available?",
    time: "2m ago",
    unread: 2,
    online: false,
    messages: [
      { id: "m1", text: "Hi! I came across your listing on OgaLandlord. Is it still available?", sender: "them", time: "Sun" },
      { id: "m2", text: "Yes Faith, the property is still available! Would you like to book an inspection?", sender: "me", time: "Sun", status: "read" },
      { id: "m3", text: "Yes please. What do I need to bring?", sender: "them", time: "Sun" },
      { id: "m4", text: "Just a valid ID and the inspection fee of ₦10,000. I'll send you the estate address.", sender: "me", time: "Sun", status: "read" },
      { id: "m5", text: "Is the apartment still available?", sender: "them", time: "2m ago" },
    ],
  },
];

// ─── Avatar initials circle ───────────────────────────────────────────────────

function Avatar({ initials, size = 44, online = false }: { initials: string; size?: number; online?: boolean }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "#1a1a1a",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: size * 0.33, fontWeight: 700,
        letterSpacing: "0.02em",
      }}>
        {initials}
      </div>
      {online && (
        <div style={{
          position: "absolute", bottom: 1, right: 1,
          width: 11, height: 11, borderRadius: "50%",
          background: "#22c55e", border: "2px solid #fff",
        }} />
      )}
    </div>
  );
}

// ─── Top header bar ───────────────────────────────────────────────────────────

function TopHeader() {
  return (
    <div style={{
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "16px 32px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1a4d2e", margin: 0 }}>Welcome Back, John</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "3px 0 0" }}>Here's your business overview</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Notification bell */}
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "#f3f4f6", border: "1px solid #e5e7eb",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 01-3.46 0" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{
            position: "absolute", top: 6, right: 6,
            width: 8, height: 8, borderRadius: "50%",
            background: "#ef4444", border: "1.5px solid #fff",
          }} />
        </div>

        {/* User avatar + info */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg,#d1fae5,#a7f3d0)",
            overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>
            <img src="/assets/john-avatar.jpg" alt="John"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            👤
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: 0 }}>John Doe</p>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>Johndoe@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom tab bar ───────────────────────────────────────────────────────────

function BottomNav({ active, navigate }: { active: string; navigate: ReturnType<typeof useNavigate> }) {
  const tabs = [
    {
      key: "home", label: "Home", path: "/home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      key: "listings", label: "Listings", path: "/listings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      key: "messages", label: "Messages", path: "/messages",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      key: "settings", label: "Settings", path: "/settings",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      background: "#fff", borderTop: "1px solid #e5e7eb",
      padding: "10px 0 14px",
      display: "flex", justifyContent: "space-around", alignItems: "center",
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.key;
        return (
          <button key={tab.key}
            onClick={() => {
              if (tab.key === "home") navigate("/home");
              else if (tab.key === "listings") navigate("/listings");
              // messages and settings stay in this page / can be wired later
            }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer", padding: "4px 16px",
              color: isActive ? "#1a4d2e" : "#9ca3af",
              fontFamily: "inherit",
              transition: "color 0.15s",
            }}
          >
            {tab.icon}
            <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 400 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyMessages() {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 16, padding: 40,
    }}>
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1a4d2e", marginBottom: 6 }}>No Messages Yet</h3>
        <p style={{ fontSize: 13, color: "#9ca3af" }}>Your conversations with tenants will appear here</p>
      </div>
      <div style={{
        border: "1.5px solid #e5e7eb", borderRadius: 12,
        padding: "14px 24px", maxWidth: 340, textAlign: "center",
        background: "#fff",
      }}>
        <p style={{ fontSize: 13, color: "#3b82f6", margin: 0 }}>
          💡 Respond to tenant inquiries within 24 hours to maintain your trust score
        </p>
      </div>
    </div>
  );
}

// ─── Conversation list ────────────────────────────────────────────────────────

function ConversationList({
  conversations,
  onSelect,
  search,
  onSearchChange,
}: {
  conversations: Conversation[];
  onSelect: (c: Conversation) => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      flex: 1, background: "#fff",
      borderRadius: 16, margin: "20px 24px",
      border: "1px solid #e5e7eb",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "24px 28px 0" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#1a4d2e", marginBottom: 4 }}>Messages</h2>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 20 }}>{conversations.length} Conversations</p>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#f9fafb", border: "1px solid #e5e7eb",
          borderRadius: 10, padding: "10px 16px", marginBottom: 20,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="7" stroke="#9ca3af" strokeWidth="2"/>
            <path d="M15 15l5 5" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            style={{
              border: "none", background: "none", outline: "none",
              fontSize: 14, color: "#374151", flex: 1, fontFamily: "inherit",
            }}
          />
        </div>

        {/* Tip banner */}
        <div style={{
          border: "1.5px solid #e5e7eb", borderRadius: 10,
          padding: "12px 16px", marginBottom: 8,
          background: "#f8faff",
        }}>
          <p style={{ fontSize: 13, color: "#3b82f6", margin: 0 }}>
            💡 Respond to tenant inquiries within 24 hours to maintain your trust score
          </p>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
            No conversations match your search.
          </div>
        ) : (
          filtered.map((conv, i) => (
            <div key={conv.id}
              onClick={() => onSelect(conv)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 28px",
                borderTop: i === 0 ? "1px solid #f3f4f6" : "none",
                borderBottom: "1px solid #f3f4f6",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "#f9fafb"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
            >
              <Avatar initials={conv.initials} size={46} online={conv.online} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.name}
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 3px" }}>{conv.property}</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {conv.lastMessage}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{conv.time}</span>
                {conv.unread > 0 && (
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "#1a4d2e", color: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Chat view ────────────────────────────────────────────────────────────────

function ChatView({
  conversation,
  onBack,
  onSendMessage,
}: {
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (convId: string, text: string, attachment?: Message["attachment"]) => void;
}) {
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pendingAttachment, setPendingAttachment] = useState<Message["attachment"] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text && !pendingAttachment) return;
    onSendMessage(conversation.id, text || (pendingAttachment ? `Sent a ${pendingAttachment.type}` : ""), pendingAttachment ?? undefined);
    setInput("");
    setPendingAttachment(null);
    setImagePreview(null);
  }, [input, pendingAttachment, conversation.id, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "file" | "image") => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === "image") {
      const reader = new FileReader();
      reader.onload = ev => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
    setPendingAttachment({ type, name: file.name, url: type === "image" ? URL.createObjectURL(file) : undefined });
    e.target.value = "";
  };

  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      background: "#f3f4f6", overflow: "hidden",
    }}>
      {/* Chat header */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e5e7eb",
        padding: "14px 24px",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <button onClick={onBack}
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "#f3f4f6", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <Avatar initials={conversation.initials} size={44} online={conversation.online} />

        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#111827", margin: 0 }}>{conversation.name}</p>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>{conversation.property}</p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0111.63 19a19.5 19.5 0 01-6.09-6.09A19.79 19.79 0 013.12 4.2 2 2 0 015.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16l.92.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polygon points="23 7 16 12 23 17 23 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1" fill="currentColor"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
              <circle cx="12" cy="19" r="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 4 }}>
        {conversation.messages.map((msg) => {
          const isMe = msg.sender === "me";

          return (
            <div key={msg.id} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMe ? "flex-end" : "flex-start",
              marginBottom: 4,
            }}>
              <div style={{
                maxWidth: "55%",
                background: isMe ? "#2d7a4f" : "#fff",
                color: isMe ? "#fff" : "#111827",
                borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "12px 16px",
                fontSize: 14,
                lineHeight: 1.5,
                boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
              }}>
                {msg.attachment && (
                  <div style={{ marginBottom: msg.text && msg.text !== `Sent a ${msg.attachment.type}` ? 8 : 0 }}>
                    {msg.attachment.type === "image" && msg.attachment.url ? (
                      <img src={msg.attachment.url} alt="attachment"
                        style={{ maxWidth: 200, borderRadius: 8, display: "block" }} />
                    ) : (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        background: isMe ? "rgba(255,255,255,0.15)" : "#f3f4f6",
                        borderRadius: 8, padding: "8px 12px",
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" strokeWidth="2"/>
                          <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span style={{ fontSize: 12 }}>{msg.attachment.name}</span>
                      </div>
                    )}
                  </div>
                )}
                {msg.text && msg.text !== `Sent a ${msg.attachment?.type}` && msg.text}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3, paddingLeft: isMe ? 0 : 4, paddingRight: isMe ? 4 : 0 }}>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{msg.time}</span>
                {isMe && msg.status === "read" && (
                  <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                    <path d="M1 6l4 4L15 1" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 6l4 4" stroke="#1a4d2e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {isMe && msg.status === "delivered" && (
                  <svg width="14" height="10" viewBox="0 0 16 12" fill="none">
                    <path d="M1 6l4 4L15 1" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Image preview */}
      {imagePreview && (
        <div style={{
          padding: "8px 24px 0",
          display: "flex", alignItems: "center", gap: 10,
          background: "#fff",
        }}>
          <img src={imagePreview} alt="preview"
            style={{ height: 56, width: 56, objectFit: "cover", borderRadius: 8 }} />
          <span style={{ fontSize: 12, color: "#6b7280" }}>{pendingAttachment?.name}</span>
          <button onClick={() => { setImagePreview(null); setPendingAttachment(null); }}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18, lineHeight: 1 }}>
            ×
          </button>
        </div>
      )}
      {pendingAttachment && !imagePreview && (
        <div style={{
          padding: "8px 24px 0",
          display: "flex", alignItems: "center", gap: 10,
          background: "#fff",
        }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#f3f4f6", borderRadius: 8, padding: "6px 12px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="#6b7280" strokeWidth="2"/>
              <polyline points="13 2 13 9 20 9" stroke="#6b7280" strokeWidth="2"/>
            </svg>
            <span style={{ fontSize: 12, color: "#374151" }}>{pendingAttachment.name}</span>
          </div>
          <button onClick={() => setPendingAttachment(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18, lineHeight: 1 }}>
            ×
          </button>
        </div>
      )}

      {/* Input bar */}
      <div style={{
        background: "#fff", borderTop: "1px solid #e5e7eb",
        padding: "12px 20px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        {/* Hidden file inputs */}
        <input ref={fileInputRef} type="file" style={{ display: "none" }}
          onChange={e => handleFileChange(e, "file")} />
        <input ref={imageInputRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => handleFileChange(e, "image")} />

        {/* Attachment */}
        <button onClick={() => fileInputRef.current?.click()}
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: "#f3f4f6", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#e5e7eb"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6"}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Image */}
        <button onClick={() => imageInputRef.current?.click()}
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: "#f3f4f6", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#e5e7eb"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6"}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6b7280" strokeWidth="2"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="#6b7280" strokeWidth="2"/>
            <polyline points="21 15 16 10 5 21" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Text input */}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type Message..."
          style={{
            flex: 1, padding: "11px 16px",
            border: "1.5px solid #e5e7eb", borderRadius: 24,
            fontSize: 14, outline: "none", fontFamily: "inherit",
            background: "#f9fafb", color: "#111827",
            transition: "border-color 0.15s",
          }}
          onFocus={e => (e.target.style.borderColor = "#1a4d2e")}
          onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
        />

        {/* Send */}
        <button onClick={handleSend}
          style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "#1a4d2e", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(26,77,46,0.35)",
            transition: "transform 0.1s, background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "#155d38"}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "#1a4d2e"}
          onMouseDown={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.93)"}
          onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function Messages() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);
  const [search, setSearch] = useState("");

  // Toggle between empty / with messages via URL param or local toggle
  const [showEmpty, setShowEmpty] = useState(false);

  const handleSelectConv = (conv: Conversation) => {
    // Mark as read
    setConversations(prev =>
      prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)
    );
    setActiveConv(conv);
  };

  const handleSendMessage = useCallback((convId: string, text: string, attachment?: Message["attachment"]) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      text,
      sender: "me",
      time: timeStr,
      status: "sent",
      attachment,
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id !== convId) return c;
        const updated = { ...c, messages: [...c.messages, newMsg], lastMessage: text, time: "Just now" };
        return updated;
      })
    );
    setActiveConv(prev => prev?.id === convId
      ? { ...prev, messages: [...prev.messages, newMsg], lastMessage: text }
      : prev
    );
  }, []);

  const displayedConvs = showEmpty ? [] : conversations;

  return (
    <div style={{
      fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      background: "#f3f4f6",
    }}>
      {/* Top header — always visible */}
      {!activeConv && <TopHeader />}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        {activeConv ? (
          // ── Open conversation ──
          <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "calc(100vh - 0px)" }}>
            <ChatView
              conversation={activeConv}
              onBack={() => setActiveConv(null)}
              onSendMessage={handleSendMessage}
            />
          </div>
        ) : displayedConvs.length === 0 ? (
          // ── Empty state ──
          <>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <EmptyMessages />
            </div>
            <BottomNav active="messages" navigate={navigate} />
          </>
        ) : (
          // ── Conversation list ──
          <>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <ConversationList
                conversations={displayedConvs}
                onSelect={handleSelectConv}
                search={search}
                onSearchChange={setSearch}
              />
            </div>
            <BottomNav active="messages" navigate={navigate} />
          </>
        )}
      </div>

      {/* Dev toggle — remove before production */}
      <button
        onClick={() => setShowEmpty(p => !p)}
        style={{
          position: "fixed", bottom: 80, right: 16,
          padding: "6px 12px", background: "#374151", color: "#fff",
          border: "none", borderRadius: 8, fontSize: 11, cursor: "pointer",
          opacity: 0.6, fontFamily: "inherit",
          zIndex: 999,
        }}
      >
        Toggle empty
      </button>
    </div>
  );
}