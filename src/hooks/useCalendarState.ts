import { useState, useCallback } from "react";
import { addMonths, subMonths, isSameDay } from "date-fns";

export function useCalendarState() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const nextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!startDate) {
        setStartDate(date);
        setEndDate(null);
      } else if (startDate && !endDate) {
        if (isSameDay(date, startDate)) {
          // click same day again to clear
          setStartDate(null);
          setEndDate(null);
        } else if (date < startDate) {
          // If clicked date is before start date, swap them
          setEndDate(startDate);
          setStartDate(date);
        } else {
          setEndDate(date);
        }
      } else if (startDate && endDate) {
        if (isSameDay(date, startDate) || isSameDay(date, endDate)) {
          // click to clear if matching start or end
          setStartDate(null);
          setEndDate(null);
        } else {
          // Start new range
          setStartDate(date);
          setEndDate(null);
        }
      }
    },
    [startDate, endDate]
  );

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  return {
    currentDate,
    startDate,
    endDate,
    nextMonth,
    prevMonth,
    handleDateClick,
    clearSelection,
  };
}
