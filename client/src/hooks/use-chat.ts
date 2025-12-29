import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type Message, type SearchResult } from "@shared/routes";
import type { Message as SchemaMessage } from "@shared/schema";

export function useChatHistory() {
  return useQuery({
    queryKey: [api.chat.history.path],
    queryFn: async () => {
      const res = await fetch(api.chat.history.path);
      if (!res.ok) throw new Error("Failed to fetch chat history");
      return api.chat.history.responses[200].parse(await res.json());
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      return api.chat.send.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.chat.history.path] });
    },
  });
}

export function useHotelDetails() {
  return useMutation({
    mutationFn: async (params: { hotelId: string; hotelName: string; location: string; fromLocation: string }) => {
      const res = await fetch(api.chat.details.path, {
        method: api.chat.details.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      });
      
      if (!res.ok) throw new Error("Failed to fetch hotel details");
      return api.chat.details.responses[200].parse(await res.json());
    },
  });
}
