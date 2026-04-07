import { useState } from "react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, StickyNote } from "lucide-react";
import { useNotes } from "@/hooks/useNotes";
import { RangeNoteCard } from "./RangeNoteCard";

interface NotesPanelProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  clearSelection: () => void;
}

export function NotesPanel({ currentDate, startDate, endDate, clearSelection }: NotesPanelProps) {
  const monthKey = format(currentDate, "yyyy-MM");
  const { monthNote, setMonthNote, rangeNotes, addRangeNote, deleteRangeNote } = useNotes(monthKey);

  const [newRangeNoteText, setNewRangeNoteText] = useState("");

  const handleAddNote = () => {
    if (startDate && newRangeNoteText.trim()) {
      addRangeNote(
        startDate.toISOString(),
        endDate ? endDate.toISOString() : startDate.toISOString(),
        newRangeNoteText.trim()
      );
      setNewRangeNoteText("");
      clearSelection();
    }
  };

  const isRangeSelected = !!startDate;

  const rangeStr =
    startDate && endDate
      ? `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`
      : startDate
      ? format(startDate, "MMM d, yyyy")
      : "";

  return (
    <div className="w-full flex flex-col gap-6 p-6 bg-[#fdfbf7] dark:bg-[#201d1a] border-l border-border border-t md:border-t-0 border-dashed rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none h-full overflow-y-auto">
      {/* Month Memo */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-foreground/80">
          <StickyNote className="w-4 h-4 text-primary" />
          <h3 className="font-serif text-lg font-medium">{format(currentDate, "MMMM")} Notes</h3>
        </div>
        <Textarea
          placeholder="Jot down notes for this month..."
          value={monthNote}
          onChange={(e) => setMonthNote(e.target.value)}
          className="min-h-[120px] resize-y bg-transparent border-border/60 focus-visible:ring-1 text-sm shadow-sm"
          data-testid="month-note-textarea"
        />
      </div>

      <div className="w-full h-px bg-border/50" />

      {/* Range Selection Note Input */}
      <div className="space-y-4 flex-1">
        <h3 className="font-serif text-lg font-medium text-foreground/80">Event Notes</h3>

        <div className="bg-card rounded-lg p-4 border border-border shadow-sm space-y-3 relative overflow-hidden">
          {!isRangeSelected ? (
            <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px] flex items-center justify-center p-4 text-center text-sm text-muted-foreground">
              Select a date or range to add a note
            </div>
          ) : null}

          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            {rangeStr || "Select Date"}
          </div>

          <Textarea
            placeholder="What's happening?"
            value={newRangeNoteText}
            onChange={(e) => setNewRangeNoteText(e.target.value)}
            className="min-h-[80px] bg-transparent resize-none text-sm border-border/60"
            data-testid="range-note-textarea"
          />

          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleAddNote}
              disabled={!newRangeNoteText.trim() || !isRangeSelected}
              className="gap-1 shadow-sm"
              data-testid="add-range-note-btn"
            >
              <Plus className="w-4 h-4" /> Add Note
            </Button>
          </div>
        </div>

        {/* Existing Range Notes */}
        <div className="space-y-3 mt-6">
          {rangeNotes.length > 0 ? (
            rangeNotes.map((note) => (
              <RangeNoteCard key={note.id} note={note} onDelete={deleteRangeNote} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4 italic">No event notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
