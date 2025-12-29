import { Star, MapPin, ArrowRight, Building2, Plane, Home, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { SearchResult } from "@shared/schema";

interface ResultCardProps {
  result: SearchResult;
  index: number;
  onSelect: (result: SearchResult) => void;
}

export function ResultCard({ result, index, onSelect }: ResultCardProps) {
  const Icon = result.type === 'Flight' ? Plane : result.type === 'Rental' ? Home : Building2;

  const handleViewDeal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (result.bookingUrl) {
      window.open(result.bookingUrl, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => onSelect(result)}
      className="flex-shrink-0 w-[280px] sm:w-[320px] group cursor-pointer"
      data-testid={`card-hotel-${result.id}`}
    >
      <div className="h-full glass-panel rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          {/* Badge */}
          <div className="absolute top-3 left-3 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
              <Icon className="w-3 h-3" />
              {result.type}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              {result.price}
            </span>
          </div>

          <img 
            src={result.image} 
            alt={result.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-display font-bold text-lg text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                {result.name}
              </h3>
              <div className="flex items-center text-muted-foreground text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                {result.location}
              </div>
            </div>
            <div className="flex items-center bg-white/5 px-2 py-1 rounded-lg border border-white/5">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-xs font-bold text-white">{result.rating}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {result.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {result.amenities.slice(0, 3).map((amenity, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                {amenity}
              </span>
            ))}
            {result.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                +{result.amenities.length - 3}
              </span>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              via <span className="text-white font-medium">{result.source}</span>
            </span>
            <button 
              onClick={handleViewDeal}
              className="text-xs font-bold text-primary flex items-center hover:underline gap-1"
              data-testid={`button-view-deal-${result.id}`}
            >
              View Deal <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
