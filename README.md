# Mehdi Asadi — Visual Artist Portfolio

An experimental, spatial portfolio website for Tehran-based visual artist and researcher Mehdi Asadi. Inspired by Cargo sites and Tim Rodenbroeker's aesthetic approach, this site breaks away from traditional hierarchical layouts in favor of a more artistic, non-linear presentation.

## Design Philosophy

- **Spatial Layout**: Elements are positioned independently across the viewport rather than stacked vertically
- **Minimal Interaction**: Focus on essential content with plenty of white space
- **Experimental Navigation**: Space bar reveals navigation overlay; click elements to explore
- **Artistic Typography**: Using Inter as a Moderat alternative with custom artistic styling
- **Cultural Context**: Reflects contemporary Persian visual culture and experimental design research

## Features

- Custom cursor with mix-blend-mode effects
- Spatial element positioning inspired by experimental design
- Interactive work previews with detail overlays
- Experimental navigation system (press Space)
- Responsive design that maintains artistic integrity
- Framer Motion animations for smooth interactions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the spatial canvas.

## Navigation

- **Mouse**: Hover over elements to see interactions
- **Space Bar**: Open/close navigation overlay
- **Click**: Interact with work samples and elements
- **ESC**: Close overlays and return to main canvas

## Typography

Currently using Inter as a fallback for Moderat. To use the actual Moderat font:
1. Add Moderat font files to `src/fonts/`
2. Update the font configuration in `src/app/layout.tsx`

## Color Palette

- **Background**: Warm off-white (#faf9f7) / Deep black (#0f0f0f)
- **Artistic Red**: #c44536 (primary accent)
- **Artistic Blue**: #4a6fa5 (secondary accent)
- **Artistic Yellow**: #d4af37 (tertiary accent)
- **Muted**: #6b6b6b (text secondary)

## Structure

- `src/components/SpatialCanvas.tsx` - Main spatial layout component
- `src/data/artistic-works.json` - Work data with artistic descriptions
- `src/app/globals.css` - Custom artistic styling and utilities
