import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Heart, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const GREET: Message = {
  id: "greet",
  role: "bot",
  text: "👋 Hello! I'm ShaadiBot, your personal Tamil matrimony assistant. I can help you with:\n• Finding compatible profiles\n• Understanding membership plans\n• How to create your profile\n• Tips for a great matrimony experience\n\nHow can I help you today?",
};

const FAQ_RESPONSES: Record<string, string> = {
  register: "📝 Registering is completely free! Click 'Register Free' in the navbar or visit /signup. You'll need your name, email, and a few profile details. It takes less than 3 minutes!",
  login: "🔑 To login, click the 'Login' button in the top navigation bar or go to /login. Enter your registered email and password.",
  premium: "⭐ Our Premium plan is ₹2,999/month and includes unlimited messaging, priority listing, and verified badge. The Gold plan at ₹4,999/month adds exclusive matches and a dedicated relationship manager.",
  free: "✅ The Free plan lets you create a profile, browse matches, and send up to 5 connection requests per month. Upgrade to Premium for unlimited access!",
  verify: "✔️ Profile verification is done by our team within 24–48 hours. You'll need to submit a valid ID proof. Verified profiles get a special badge and more trust from matches.",
  profile: "📸 A great profile has a clear photo, complete bio, and honest details about your career and family. Profiles with photos get 8x more interest!",
  match: "💝 Our matching algorithm considers age, location, community, education, and lifestyle preferences. You can also use the Search page to filter profiles yourself.",
  privacy: "🔒 Your privacy is our priority. You control who sees your contact details. Photos are only visible to registered members. Read our full Privacy Policy at /privacy.",
  contact: "📞 You can reach us at +91 98765 43210 or email support@shaaditamil.com. Our team is available Mon–Sat, 9am–7pm.",
  community: "🏛️ We serve all Tamil communities including Iyengar, Mudaliar, Chettiar, Nadar, Gounder, Pillai, and more. We celebrate Tamil culture across all traditions.",
};

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("register") || lower.includes("signup") || lower.includes("sign up") || lower.includes("create")) return FAQ_RESPONSES.register;
  if (lower.includes("login") || lower.includes("sign in") || lower.includes("log in")) return FAQ_RESPONSES.login;
  if (lower.includes("premium") || lower.includes("gold") || lower.includes("plan") || lower.includes("price") || lower.includes("cost")) return FAQ_RESPONSES.premium;
  if (lower.includes("free")) return FAQ_RESPONSES.free;
  if (lower.includes("verif")) return FAQ_RESPONSES.verify;
  if (lower.includes("profile") || lower.includes("photo") || lower.includes("bio")) return FAQ_RESPONSES.profile;
  if (lower.includes("match") || lower.includes("algorithm") || lower.includes("suggest") || lower.includes("compatible")) return FAQ_RESPONSES.match;
  if (lower.includes("privacy") || lower.includes("secure") || lower.includes("safe") || lower.includes("data")) return FAQ_RESPONSES.privacy;
  if (lower.includes("contact") || lower.includes("support") || lower.includes("help") || lower.includes("phone") || lower.includes("email")) return FAQ_RESPONSES.contact;
  if (lower.includes("community") || lower.includes("caste") || lower.includes("iyengar") || lower.includes("mudaliar") || lower.includes("chetiar")) return FAQ_RESPONSES.community;
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("namaste")) return "Vanakkam! 🙏 Great to meet you! I'm here to help you find your perfect Tamil life partner. What would you like to know?";
  if (lower.includes("thank")) return "You're welcome! 😊 Feel free to ask anything else. We're here to make your matrimony journey wonderful!";
  return "That's a great question! 😊 For detailed assistance, please contact our team at +91 98765 43210 or support@shaaditamil.com. You can also explore our website sections for more information. Is there anything else I can help you with?";
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREET]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = getBotReply(userMsg.text);
      setMessages((prev) => [...prev, { id: Date.now().toString() + "b", role: "bot", text: reply }]);
      setLoading(false);
      if (!open) setUnread((n) => n + 1);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const QUICK = ["How to register?", "Membership plans", "How verification works", "Privacy & security"];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-[150] w-14 h-14 gradient-primary rounded-full shadow-brand-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${open ? "hidden" : "flex"}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground fill-current" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full text-xs text-accent-foreground font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[150] w-[340px] md:w-[380px] flex flex-col bg-card rounded-2xl shadow-brand-lg border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-300" style={{ maxHeight: "80vh", height: "520px" }}>
          {/* Header */}
          <div className="gradient-primary px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-sans font-semibold text-primary-foreground text-sm">ShaadiBot</div>
              <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(142,71%,75%)] inline-block" />
                Always here to help
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center hover:bg-primary-foreground/25 transition-colors"
            >
              <X className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-brand">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-sans leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "gradient-primary text-primary-foreground rounded-br-sm shadow-brand"
                      : "bg-card text-foreground border border-border rounded-bl-sm shadow-card"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 shadow-brand">
                  <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-card">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-border bg-card flex-shrink-0">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => { setInput(q); }}
                  className="text-xs font-sans px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-pink-light transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-card flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 h-10 text-sm font-sans rounded-full border-border focus-visible:ring-primary"
                disabled={loading}
              />
              <Button
                onClick={send}
                disabled={!input.trim() || loading}
                size="icon"
                className="w-10 h-10 gradient-primary text-primary-foreground border-0 shadow-brand rounded-full flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
