import { useCalendarState } from "@/hooks/useCalendarState";
import { useNotes } from "@/hooks/useNotes";
import { format } from "date-fns";
import { HeroImage } from "./HeroImage";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

export function WallCalendar() {
  const {
    currentDate,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
    handleDateClick,
    clearSelection,
  } = useCalendarState();

  const monthKey = format(currentDate, "yyyy-MM");
  const { rangeNotes } = useNotes(monthKey);

  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl shadow-2xl bg-background flex flex-col lg:flex-row overflow-hidden min-h-[800px] border border-border">
      {/* Left / Top Side: Hero Image & Grid */}
      <div className="flex flex-col lg:flex-row w-full lg:w-3/4 bg-card relative">
        <div className="w-full lg:w-1/2">
          <HeroImage
            currentDate={currentDate}
            onPrev={prevMonth}
            onNext={nextMonth}
          />
        </div>
        <div className="w-full lg:w-1/2">
          <CalendarGrid
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            onDateClick={handleDateClick}
            rangeNotes={rangeNotes}
          />
        </div>
      </div>

      {/* Right / Bottom Side: Notes Panel */}
      <div className="w-full lg:w-1/4 min-h-[400px]">
        <NotesPanel
          currentDate={currentDate}
          startDate={startDate}
          endDate={endDate}
          clearSelection={clearSelection}
        />
      </div>
    </div>
  );
}
