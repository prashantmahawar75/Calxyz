import { useState, useEffect, useCallback } from "react";

export interface RangeNote {
  id: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  note: string;
  color?: string;
}

export function useNotes(monthKey: string) {
  const [monthNote, setMonthNote] = useState(() => {
    return localStorage.getItem(`notes-${monthKey}`) || "";
  });

  // When the month changes, load the note for the new month from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`notes-${monthKey}`);
    setMonthNote(saved || "");
  }, [monthKey]);

  // Debounced auto-save month note per month key
  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem(`notes-${monthKey}`, monthNote);
    }, 500);
    return () => clearTimeout(handler);
  }, [monthNote, monthKey]);

  // Range notes
  const [rangeNotes, setRangeNotes] = useState<RangeNote[]>(() => {
    const saved = localStorage.getItem("range-notes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("range-notes", JSON.stringify(rangeNotes));
  }, [rangeNotes]);

  const addRangeNote = useCallback((startDate: string, endDate: string, note: string) => {
    setRangeNotes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        startDate,
        endDate,
        note,
      },
    ]);
  }, []);

  const deleteRangeNote = useCallback((id: string) => {
    setRangeNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    monthNote,
    setMonthNote,
    rangeNotes,
    addRangeNote,
    deleteRangeNote,
  };
}
