# react-pdf-report-engine

A React + Vite single-page application with multi-module data grids and client-side PDF report generation featuring custom branded headers and footers.

## Features

- **Multi-module data grids** — Work Orders, Assets, Inventory, Material Requests
- **Client-side PDF export** — no server required, runs entirely in the browser
- **Custom PDF header** — company logo, report title, and generated date on every page
- **Custom PDF footer** — confidentiality notice, timestamp, and page numbers (Page X of Y)
- **Search & filter** — instant search across all grid columns
- **Summary stats** — live KPI chips per module (totals, status counts, cost summaries)
- **Status badges** — color-coded priority and status indicators in both grid and PDF
- **Dark theme UI** — clean dark dashboard built with plain CSS and CSS variables

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite |
| PDF Generation | @react-pdf/renderer |
| Styling | Plain CSS with CSS variables |
| Build | Vite |

## Project Structure

```
src/
├── App.jsx          # Main SPA — sidebar, tabs, grids, export button
├── App.css          # Dark theme styles, badges, grid, layout
├── PDFReport.jsx    # PDF document — header, footer, tables per module
├── data.js          # Sample data (Work Orders, Assets, Inventory, MRs)
└── main.jsx         # Entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/pawie729/react-pdf-report-engine.git
cd react-pdf-report-engine
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` folder.

## PDF Report Structure

Each exported PDF contains four pages (landscape A4):

| Page | Content |
|---|---|
| 1 | Work Orders — priority, status, assignee, cost |
| 2 | Asset Register — category, location, service dates, value |
| 3 | Inventory — stock levels, reorder alerts, supplier |
| 4 | Material Requests — approval status, linked work orders |

Every page includes:
- **Header** — branded logo block + report title + date (right-aligned)
- **Footer** — confidentiality notice + generated timestamp + page X of Y

## Customisation

- **Logo / branding** — edit the `Header` component in `PDFReport.jsx`
- **Data source** — replace the arrays in `data.js` with your API calls
- **Add a module** — add a new `<Page>` component in `PDFReport.jsx` and a new tab in `App.jsx`

## License

MIT — see [LICENSE](LICENSE) for details.