import { RangeNote } from "@/hooks/useNotes";
import { format, parseISO, isSameDay } from "date-fns";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RangeNoteCardProps {
  note: RangeNote;
  onDelete: (id: string) => void;
}

export function RangeNoteCard({ note, onDelete }: RangeNoteCardProps) {
  const sDate = parseISO(note.startDate);
  const eDate = parseISO(note.endDate);

  const dateStr = isSameDay(sDate, eDate)
    ? format(sDate, "MMM d, yyyy")
    : `${format(sDate, "MMM d, yyyy")} - ${format(eDate, "MMM d, yyyy")}`;

  return (
    <div className="relative p-4 rounded-md shadow-sm border border-border bg-card hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          {dateStr}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(note.id)}
          data-testid={`delete-note-${note.id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-sm text-card-foreground whitespace-pre-wrap leading-relaxed">
        {note.note}
      </p>
    </div>
  );
}
