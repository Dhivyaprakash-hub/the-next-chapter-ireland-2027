# The Next Chapter — Ireland 2027

A personal mission-control dashboard and countdown lock-screen wallpaper studio for a future University of Limerick MSc in Business Analytics journey.

![Ireland 2027 lock-screen design](public/assets/ireland-lockscreen.jpg)

## What it includes

- Live countdown to a configurable target date and timezone.
- Editable milestones, suggested timeline, and daily focus tasks.
- Three atmospheric themes inspired by the River Shannon and Limerick.
- Wallpaper Studio with downloadable lock-screen artwork.
- Calendar reminders exported as a standard `.ics` file.
- Browser-local persistence; no account, backend, or paid service required.
- Responsive layout, reduced-motion setting, and keyboard-friendly controls.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Data and privacy

This is a personal planning project. All changes are stored in the current browser using local storage. Do not enter sensitive financial, identity, or immigration-document details. The bundled calendar file contains suggested milestone reminders; verify all dates and requirements with the relevant official sources before relying on them.

The countdown and milestones are personal planning aids, not university, immigration, financial, or legal advice. Dates can be edited in Settings.

## Project files

- `src/App.tsx` — dashboard, planner, wallpaper studio, and calendar export.
- `public/assets/ireland-lockscreen.jpg` — supplied portrait wallpaper reference.
- `public/assets/ireland-mission-control.png` — supplied mission-control concept image.
- `public/assets/ireland-2027-milestones.ics` — supplied calendar milestone export.

## License

MIT. See [LICENSE](LICENSE).
