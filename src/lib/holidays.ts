export const holidays: Record<string, string> = {
  "01-01": "New Year's Day",
  "01-20": "Martin Luther King Jr. Day",
  "02-14": "Valentine's Day",
  "02-17": "Presidents' Day",
  "03-17": "St. Patrick's Day",
  "04-20": "Easter Sunday",
  "05-11": "Mother's Day",
  "05-26": "Memorial Day",
  "06-15": "Father's Day",
  "07-04": "Independence Day",
  "09-01": "Labor Day",
  "10-13": "Columbus Day",
  "10-31": "Halloween",
  "11-11": "Veterans Day",
  "11-27": "Thanksgiving Day",
  "12-25": "Christmas Day",
};

export function getHoliday(date: Date): string | null {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return holidays[`${month}-${day}`] || null;
}
