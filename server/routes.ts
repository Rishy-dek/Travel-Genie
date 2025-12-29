import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const openai = new OpenAI({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
  });

  // Seed
  const existing = await storage.getMessages();
  if (existing.length === 0) {
    await storage.createMessage({
      role: "assistant",
      content: "Hello! I'm your AI travel concierge. I can help you find hotels, rentals, flights, and more across TripIt, Hopper, Kayak, Skyscanner, Airbnb, Vrbo, Booking.com, and Hotels.com. Where would you like to go?",
      results: null
    });
  }

  app.get(api.chat.history.path, async (req, res) => {
    const history = await storage.getMessages();
    res.json(history);
  });

  app.post(api.chat.send.path, async (req, res) => {
    try {
      const { message } = api.chat.send.input.parse(req.body);

      // Save user message
      await storage.createMessage({
        role: "user",
        content: message,
        results: null
      });

      // Get history for context
      const history = await storage.getMessages();
      const messages = history.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      }));

      // System prompt
      const systemPrompt = `You are a sophisticated AI travel assistant connected to TripIt, Hopper, Kayak, Skyscanner, Airbnb, Vrbo, Booking.com, and Hotels.com.
      
      Your goal is to help the user find the perfect travel option (hotel, rental, flight, etc.).
      
      Process:
      1. Analyze the user's request.
      2. If you need more information (location, dates, guests, amenities, price range, view preference), ask for it ONE by ONE or in small groups.
      3. If the user provides enough information, "search" for options.
      4. Since you cannot truly search, GENERATE 10 realistic, high-quality options that match their criteria exactly.
      5. Assign each option to a specific source (e.g., "Booking.com", "Airbnb").
      
      Response Format:
      You must ALWAYS return a JSON object. Do not return markdown blocks.
      {
        "message": "Your text response to the user (e.g. asking clarifying questions or introducing the results)",
        "results": [ ... ] // Array of 10 options if you have enough info, otherwise null or empty array.
      }
      
      Result Object Structure:
      {
        "id": "unique_id_like_hotel_123",
        "name": "Hotel Name",
        "type": "Hotel" | "Rental",
        "price": "$XXX/night",
        "rating": 4.5,
        "location": "City, Country",
        "image": "https://images.unsplash.com/photo-...",
        "amenities": ["Wifi", "Pool", ...],
        "source": "Booking.com",
        "description": "Short description",
        "bookingUrl": "https://booking.com/hotel/123"
      }

      For images, use specific Unsplash keywords in the URL like 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'. Try to vary them.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
          { role: "user", content: message }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No response from AI");

      const parsedResponse = JSON.parse(content);

      // Save assistant message
      await storage.createMessage({
        role: "assistant",
        content: parsedResponse.message,
        results: parsedResponse.results || null
      });

      res.json(parsedResponse);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.chat.details.path, async (req, res) => {
    try {
      const { hotelId, hotelName, location, fromLocation } = api.chat.details.input.parse(req.body);

      const detailsPrompt = `You are a travel expert. Generate comprehensive travel information for the hotel "${hotelName}" in "${location}". 
      
      The user is traveling from "${fromLocation}".
      
      Return ONLY a valid JSON object (no markdown, no extra text). Structure:
      {
        "id": "${hotelId}",
        "name": "${hotelName}",
        "location": "${location}",
        "image": "https://images.unsplash.com/photo-hotel-image-url",
        "price": "$150/night",
        "rating": 4.5,
        "source": "Booking.com",
        "description": "Luxurious hotel with stunning views...",
        "bookingUrl": "https://booking.com/hotel/${hotelId}",
        "amenities": ["Free WiFi", "Swimming Pool", "Fitness Center", "Restaurant", "Spa"],
        "thingsToDoNearby": [
          {"name": "Museum Name", "distance": "0.5 km", "category": "Culture"},
          {"name": "Beach", "distance": "2 km", "category": "Nature"},
          {"name": "Shopping District", "distance": "1 km", "category": "Shopping"}
        ],
        "foodRecommendations": [
          {"name": "Restaurant 1", "cuisine": "Italian", "rating": 4.8, "distance": "0.3 km"},
          {"name": "Restaurant 2", "cuisine": "Local Cuisine", "rating": 4.6, "distance": "0.5 km"},
          {"name": "Cafe", "cuisine": "Cafe", "rating": 4.4, "distance": "0.2 km"}
        ],
        "travelTime": {
          "fromLocation": "${fromLocation}",
          "drivingHours": 2,
          "flyingHours": 1.5,
          "publicTransitHours": 3
        },
        "priceBreakdown": {
          "roomPerNight": "$150",
          "taxes": "$20",
          "estimatedTotal": "$1700"
        }
      }`;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [{ role: "user", content: detailsPrompt }],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      if (!content) throw new Error("No response from AI");

      const details = JSON.parse(content);

      const message = `Great choice! Here's everything you need to know about ${hotelName}. You can book directly using the link on the details panel.`;

      res.json({ message, details });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch hotel details" });
    }
  });

  return httpServer;
}
