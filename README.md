# Calxyz — Interactive Wall Calendar

A polished, interactive React + TypeScript wall calendar component with date range selection, integrated notes, seasonal imagery, and full responsive design.

## Features

- **Wall Calendar Aesthetic** — Beautiful seasonal hero images that change with each month
- **Date Range Selector** — Click to set a start date, click again to set an end date; clear by clicking again
- **Integrated Notes** — Per-month memo notes and event notes for selected date ranges, all persisted in `localStorage`
- **Holiday Markers** — US holidays highlighted with a dot; hover for the holiday name
- **Dark / Light Mode** — Toggle in the header, saved to `localStorage`
- **Month Navigation** — Smooth animated transitions between months
- **Fully Responsive** — Side-by-side three-panel layout on desktop; stacked on mobile

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- date-fns
- shadcn/ui components (Radix UI)
- wouter (routing)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Textarea, Tooltip, etc.)
│   ├── WallCalendar.tsx   # Root calendar layout
│   ├── CalendarGrid.tsx   # Date grid with selection logic
│   ├── HeroImage.tsx      # Month image panel with navigation
│   ├── NotesPanel.tsx     # Month + event notes
│   ├── RangeNoteCard.tsx  # Individual event note card
│   └── ThemeToggle.tsx    # Dark/light toggle
├── hooks/
│   ├── useCalendarState.ts  # Date range & month navigation state
│   └── useNotes.ts          # localStorage notes CRUD
├── lib/
│   ├── holidays.ts    # US holiday definitions
│   ├── monthImages.ts # Month image mapping
│   └── utils.ts       # Utility helpers
├── pages/
│   └── Calendar.tsx   # Main page
├── App.tsx
├── main.tsx
└── index.css          # Theme variables + Tailwind
public/
└── images/            # Month hero images (Jan–Jun generated, Jul–Dec Unsplash)
```

## License

MIT
