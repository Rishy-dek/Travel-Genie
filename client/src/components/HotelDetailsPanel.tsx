import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MapPin, Star, Clock, DollarSign, Utensils, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHotelDetails } from "@/hooks/use-chat";
import type { SearchResult } from "@shared/schema";

interface HotelDetailsPanelProps {
  hotel: SearchResult;
  onClose: () => void;
}

export function HotelDetailsPanel({ hotel, onClose }: HotelDetailsPanelProps) {
  const { mutate: fetchDetails, isPending, data: detailsData } = useHotelDetails();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchDetails({
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      fromLocation: "Your Current Location"
    });
  }, [hotel.id, fetchDetails]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const details = detailsData?.details;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 bottom-4 md:bottom-6 md:inset-x-6 max-h-[90vh] z-50 bg-gradient-to-br from-slate-900 via-[#0a0f1c] to-black rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="relative h-48 md:h-64 flex-shrink-0 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img 
                src={details?.image || hotel.image} 
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white hover:bg-black/70 transition-all flex items-center justify-center"
                data-testid="button-close-details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 z-20">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{details?.name || hotel.name}</h2>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{details?.location || hotel.location}</span>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="flex-1 overflow-y-auto p-6">
              {isPending ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="flex gap-1 justify-center mb-3">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    </div>
                    <p className="text-sm text-muted-foreground">Loading details...</p>
                  </div>
                </div>
              ) : details ? (
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="travel">Travel</TabsTrigger>
                    <TabsTrigger value="food">Food</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-white/5 p-3 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-lg">{details.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                      <div className="rounded-xl bg-white/5 p-3 text-center">
                        <p className="font-bold text-lg text-primary mb-1">{details.price}</p>
                        <p className="text-xs text-muted-foreground">Per Night</p>
                      </div>
                      <div className="rounded-xl bg-white/5 p-3 text-center">
                        <p className="text-xs font-bold text-white mb-1">Via</p>
                        <p className="text-xs text-muted-foreground">{details.source}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{details.description}</p>
                    </div>

                    <div>
                      <h3 className="font-bold mb-3">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {details.amenities.map((amenity, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-sm text-primary">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Price Breakdown
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Room per night</span>
                          <span className="font-bold">{details.priceBreakdown.roomPerNight}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Taxes & Fees</span>
                          <span className="font-bold">{details.priceBreakdown.taxes}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/10">
                          <span className="font-bold">Estimated Total (3 nights)</span>
                          <span className="font-bold text-primary text-lg">{details.priceBreakdown.estimatedTotal}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Travel Tab */}
                  <TabsContent value="travel" className="space-y-4">
                    <div>
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Travel Time from {details.travelTime.fromLocation}
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="font-medium">Flight</span>
                          <span className="text-primary font-bold">{details.travelTime.flyingHours}h</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="font-medium">Driving</span>
                          <span className="text-primary font-bold">{details.travelTime.drivingHours}h</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="font-medium">Public Transit</span>
                          <span className="text-primary font-bold">{details.travelTime.publicTransitHours}h</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Food Tab */}
                  <TabsContent value="food" className="space-y-4">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Utensils className="w-4 h-4" />
                      Recommended Restaurants
                    </h3>
                    <div className="space-y-3">
                      {details.foodRecommendations.map((restaurant, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold">{restaurant.name}</h4>
                              <p className="text-xs text-muted-foreground">{restaurant.cuisine}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs font-bold">{restaurant.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{restaurant.distance} away</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Activities Tab */}
                  <TabsContent value="activities" className="space-y-4">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Compass className="w-4 h-4" />
                      Things to Do Nearby
                    </h3>
                    <div className="space-y-3">
                      {details.thingsToDoNearby.map((activity, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold">{activity.name}</h4>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">
                              {activity.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{activity.distance} away</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : null}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 p-4 flex gap-3 flex-shrink-0 bg-gradient-to-t from-black/50">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleClose}
                data-testid="button-close-details-footer"
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => window.open(details?.bookingUrl || hotel.bookingUrl, '_blank')}
                data-testid="button-book-now"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Book Now
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
