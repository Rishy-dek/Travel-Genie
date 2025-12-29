import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResultCard } from "./ResultCard";
import { HotelDetailsPanel } from "./HotelDetailsPanel";
import type { Message, SearchResult } from "@shared/schema";

interface ChatMessageProps {
  message: Message;
  isLast?: boolean;
}

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const [selectedHotel, setSelectedHotel] = useState<SearchResult | null>(null);
  const isBot = message.role === "assistant";
  
  // Safe parsing of results if they exist
  const results = message.results as SearchResult[] | undefined;
  const hasResults = Array.isArray(results) && results.length > 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex w-full mb-8",
          isBot ? "justify-start" : "justify-end"
        )}
      >
        <div className={cn(
          "flex max-w-[90%] md:max-w-[80%] gap-4",
          isBot ? "flex-row" : "flex-row-reverse"
        )}>
          {/* Avatar */}
          <div className={cn(
            "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
            isBot 
              ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground" 
              : "bg-secondary text-secondary-foreground border border-white/10"
          )}>
            {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </div>

          <div className="flex flex-col gap-4 overflow-hidden">
            {/* Message Bubble */}
            <div className={cn(
              "p-4 md:p-6 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap",
              isBot 
                ? "glass-panel rounded-tl-none text-foreground/90" 
                : "bg-primary text-primary-foreground rounded-tr-none shadow-primary/20 shadow-lg"
            )}>
              {message.content}
            </div>

            {/* Results Carousel */}
            {isBot && hasResults && (
              <div className="w-full">
                <div className="overflow-x-auto pb-2 -mx-4 px-4 md:px-0 scroll-smooth">
                  <div className="flex gap-4 w-max">
                    {results.map((result, idx) => (
                      <ResultCard 
                        key={result.id} 
                        result={result} 
                        index={idx}
                        onSelect={setSelectedHotel}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 px-4 md:px-0">Scroll to see all {results.length} options →</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Hotel Details Panel */}
      {selectedHotel && (
        <HotelDetailsPanel
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </>
  );
}
