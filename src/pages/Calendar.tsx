import { WallCalendar } from "@/components/WallCalendar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CalendarPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background p-4 sm:p-8 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-6xl mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-serif font-medium text-foreground tracking-tight flex items-center gap-2">
          Wall Calendar
        </h1>
        <ThemeToggle />
      </div>
      
      <WallCalendar />
      
      <div className="mt-8 text-center text-sm text-muted-foreground pb-8">
        Click days to select ranges. Save notes for the month or specific events.
      </div>
    </div>
  );
}
