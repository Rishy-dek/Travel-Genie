import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto w-full">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-md" />
        <div className="relative flex items-center glass-panel rounded-2xl p-2 pr-2">
          <div className="pl-4 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Where do you want to go next?"
            className="flex-1 bg-transparent border-none focus:ring-0 text-foreground placeholder:text-muted-foreground/50 px-4 py-3 text-base md:text-lg"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 disabled:opacity-50 disabled:shadow-none hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              </motion.div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="hover:text-primary cursor-pointer transition-colors">Find cheap flights</span>
        <span className="w-1 h-1 rounded-full bg-white/20 my-auto" />
        <span className="hover:text-primary cursor-pointer transition-colors">Book a hotel</span>
        <span className="w-1 h-1 rounded-full bg-white/20 my-auto" />
        <span className="hover:text-primary cursor-pointer transition-colors">Weekend getaways</span>
      </div>
    </form>
  );
}
