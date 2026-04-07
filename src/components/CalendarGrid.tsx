import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  isWithinInterval,
} from "date-fns";
import { getHoliday } from "@/lib/holidays";
import { RangeNote } from "@/hooks/useNotes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date) => void;
  rangeNotes: RangeNote[];
}

export function CalendarGrid({
  currentDate,
  startDate,
  endDate,
  onDateClick,
  rangeNotes,
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateGrid = startOfWeek(monthStart);
  const endDateGrid = endOfWeek(monthEnd);
  const dateFormat = "d";
  const days = eachDayOfInterval({
    start: startDateGrid,
    end: endDateGrid,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const hasNoteForDay = (date: Date) => {
    return rangeNotes.some((note) => {
      const start = new Date(note.startDate);
      const end = new Date(note.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return date >= start && date <= end;
    });
  };

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-8 bg-card rounded-r-xl lg:rounded-l-none rounded-l-xl shadow-sm border border-border relative overflow-hidden">
      <div className="flex-1 flex flex-col h-full z-10">
        {/* Month Header */}
        <div className="mb-6 flex items-baseline gap-4">
          <h2 className="text-4xl sm:text-5xl font-serif text-foreground capitalize tracking-tight">
            {format(currentDate, "MMMM")}
          </h2>
          <span className="text-2xl text-muted-foreground font-serif italic">
            {format(currentDate, "yyyy")}
          </span>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 mb-2 border-b border-border/50 pb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid - animated wrapper */}
        <div className="flex-1 relative">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentDate.toString()}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-7 grid-rows-5 gap-1 sm:gap-2 h-full min-h-[350px] sm:min-h-[500px]"
            >
              {days.map((day, i) => {
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isDayToday = isToday(day);
                const isStart = startDate ? isSameDay(day, startDate) : false;
                const isEnd = endDate ? isSameDay(day, endDate) : false;
                const isInRange =
                  startDate && endDate
                    ? isWithinInterval(day, { start: startDate, end: endDate }) &&
                      !isStart &&
                      !isEnd
                    : false;
                const holiday = getHoliday(day);
                const hasNote = hasNoteForDay(day);

                let cellStyle = "text-foreground";
                if (!isCurrentMonth) cellStyle = "text-muted-foreground/50";

                let bgStyle = "bg-transparent hover:bg-secondary/50";
                if (isStart) bgStyle = "bg-primary text-primary-foreground hover:bg-primary/90";
                else if (isEnd) bgStyle = "bg-primary text-primary-foreground hover:bg-primary/90";
                else if (isInRange) bgStyle = "bg-primary/10 hover:bg-primary/20";

                return (
                  <div
                    key={day.toString()}
                    onClick={() => onDateClick(day)}
                    className={`relative flex flex-col items-center justify-start pt-2 cursor-pointer rounded-md transition-colors ${bgStyle} ${cellStyle}`}
                    data-testid={
                      isStart
                        ? "start-date"
                        : isEnd
                        ? "end-date"
                        : `day-${format(day, "yyyy-MM-dd")}`
                    }
                  >
                    <span
                      className={`text-sm sm:text-base font-medium flex items-center justify-center w-8 h-8 rounded-full ${
                        isDayToday && !isStart && !isEnd
                          ? "border border-primary text-primary bg-background"
                          : ""
                      }`}
                    >
                      {format(day, dateFormat)}
                    </span>

                    {/* Indicators area */}
                    <div className="flex gap-1 mt-1">
                      {holiday && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{holiday}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {hasNote && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
