import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  results: jsonb("results"), // Optional search results
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type SearchResult = {
  id: string;
  name: string;
  type: string; // 'Hotel', 'Rental', 'Flight'
  price: string;
  rating: number;
  location: string;
  image: string;
  amenities: string[];
  source: string; // "TripIt", "Hopper", etc.
  description: string;
  bookingUrl?: string; // URL to book the hotel
};

export type HotelDetail = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  source: string;
  description: string;
  bookingUrl: string;
  amenities: string[];
  thingsToDoNearby: {
    name: string;
    distance: string;
    category: string;
  }[];
  foodRecommendations: {
    name: string;
    cuisine: string;
    rating: number;
    distance: string;
  }[];
  travelTime: {
    fromLocation: string;
    drivingHours: number;
    flyingHours: number;
    publicTransitHours: number;
  };
  priceBreakdown: {
    roomPerNight: string;
    taxes: string;
    estimatedTotal: string;
  };
};
