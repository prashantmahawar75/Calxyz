import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { monthImages } from "@/lib/monthImages";
import { motion, AnimatePresence } from "framer-motion";

interface HeroImageProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export function HeroImage({ currentDate, onPrev, onNext }: HeroImageProps) {
  const monthIndex = currentDate.getMonth();
  const imageSrc = monthImages[monthIndex] || monthImages[6];

  return (
    <div className="relative w-full h-64 md:h-full min-h-[250px] lg:min-h-[600px] overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none shadow-md group">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={imageSrc}
          src={imageSrc}
          alt={`Hero image for ${format(currentDate, "MMMM")}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

      {/* Navigation Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          className="bg-white/20 hover:bg-white/40 backdrop-blur-md border-white/30 text-white"
          data-testid="prev-month-btn"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="bg-white/20 hover:bg-white/40 backdrop-blur-md border-white/30 text-white"
          data-testid="next-month-btn"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="absolute bottom-6 left-6 text-white text-shadow-sm">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
          {format(currentDate, "MMMM")}
        </h1>
        <p className="text-lg md:text-xl font-medium opacity-90 mt-1">
          {format(currentDate, "yyyy")}
        </p>
      </div>
    </div>
  );
}
