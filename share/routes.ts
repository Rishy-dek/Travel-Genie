import { z } from 'zod';
import { insertMessageSchema, messages } from './schema';

export const api = {
  chat: {
    send: {
      method: 'POST' as const,
      path: '/api/chat',
      input: z.object({ message: z.string() }),
      responses: {
        200: z.object({
          message: z.string(),
          results: z.array(z.object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
            price: z.string(),
            rating: z.number(),
            location: z.string(),
            image: z.string(),
            amenities: z.array(z.string()),
            source: z.string(),
            description: z.string(),
            bookingUrl: z.string().optional()
          })).optional()
        })
      }
    },
    history: {
      method: 'GET' as const,
      path: '/api/chat/history',
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>())
      }
    },
    details: {
      method: 'POST' as const,
      path: '/api/chat/details',
      input: z.object({ 
        hotelId: z.string(),
        hotelName: z.string(),
        location: z.string(),
        fromLocation: z.string()
      }),
      responses: {
        200: z.object({
          message: z.string(),
          details: z.object({
            id: z.string(),
            name: z.string(),
            location: z.string(),
            image: z.string(),
            price: z.string(),
            rating: z.number(),
            source: z.string(),
            description: z.string(),
            bookingUrl: z.string(),
            amenities: z.array(z.string()),
            thingsToDoNearby: z.array(z.object({
              name: z.string(),
              distance: z.string(),
              category: z.string()
            })),
            foodRecommendations: z.array(z.object({
              name: z.string(),
              cuisine: z.string(),
              rating: z.number(),
              distance: z.string()
            })),
            travelTime: z.object({
              fromLocation: z.string(),
              drivingHours: z.number(),
              flyingHours: z.number(),
              publicTransitHours: z.number()
            }),
            priceBreakdown: z.object({
              roomPerNight: z.string(),
              taxes: z.string(),
              estimatedTotal: z.string()
            })
          }).optional()
        })
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
