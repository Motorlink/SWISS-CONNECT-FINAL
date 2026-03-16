# SWISS CONNECT - Frontend v1

Mandantenfähiges Logistik-Portal für professionelle Transportabwicklung.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 7
- **UI Components**: shadcn/ui
- **Animation**: AOS (Animate On Scroll) + GSAP (+ ScrollTrigger)
- **Icons**: Lucide React

## Projektstruktur

```
frontend/
├── public/
│   └── assets/           # Statische Assets (AVIF/WebP)
├── src/
│   ├── components/       # Wiederverwendbare Komponenten
│   │   ├── ResponsiveImage.tsx   # AVIF/WebP Support
│   │   ├── Navigation.tsx        # Hauptnavigation
│   │   └── Footer.tsx            # Footer
│   ├── sections/         # Page Sections
│   │   ├── Hero.tsx              # Value Proposition
│   │   ├── Capabilities.tsx      # 20+ Prozesse
│   │   ├── Tracking.tsx          # Tracking & Proof
│   │   ├── ExportCustoms.tsx     # Export & Zoll
│   │   ├── Billing.tsx           # Billing & Mahnwesen
│   │   ├── Reference.tsx         # Referenz-Prinzip
│   │   └── Contact.tsx           # CTA / Kontakt
│   ├── hooks/            # Custom React Hooks
│   │   ├── useAOS.ts             # AOS Initialisierung
│   │   └── useGSAP.ts            # GSAP ScrollTrigger
│   ├── types/            # TypeScript Definitionen
│   ├── App.tsx           # Hauptkomponente
│   └── main.tsx          # Entry Point
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Scripts

```bash
# Development
npm run dev

# Production Build
npm run build

# Linting
npm run lint

# Type Checking
npm run typecheck
```

## Asset Policy

### Bildformate

- **Primär**: AVIF (beste Kompression)
- **Fallback**: WebP (gute Browser-Unterstützung)
- **Legacy**: JPG/PNG (für ältere Browser)

### ResponsiveImage Komponente

```tsx
import { ResponsiveImage } from '@/components/ResponsiveImage';

<ResponsiveImage
  src="/assets/image.jpg"
  alt="Beschreibung"
  width={800}
  height={600}
/>
```

Die Komponente generiert automatisch:
- `image.avif` (AVIF Version)
- `image.webp` (WebP Version)
- `image.jpg` (Fallback)

## Animationen

### AOS (Animate On Scroll)

Globale Initialisierung in `App.tsx`:

```tsx
import AOS from 'aos';
import 'aos/dist/aos.css';

useEffect(() => {
  AOS.init({
    offset: 120,
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
  });
}, []);
```

Verwendung:
```tsx
<div data-aos="fade-up" data-aos-delay="100">
  Content
</div>
```

### GSAP + ScrollTrigger

Für komplexe Animationen:

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Component = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax
      gsap.to('.element', {
        yPercent: 20,
        scrollTrigger: {
          trigger: ref.current,
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <section ref={ref}>...</section>;
};
```

## Dark Mode

Vorbereitet für class-based Dark Mode:

```tsx
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
};
```

Aktivierung:
```tsx
document.documentElement.classList.add('dark');
```

## Mandantenfähigkeit

Das Portal ist vollständig mandantenfähig konzipiert:

- **Multi-Tenant Architektur**: Jeder Mandant arbeitet isoliert
- **White-Label**: Anpassbar an Corporate Design
- **Konfigurierbar**: Prozesse und Workflows pro Mandant
- **Skalierbar**: Von Startup bis Enterprise

## Browser Support

- Chrome/Edge (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Performance

- Tree-shaking für optimale Bundle-Größe
- Lazy Loading für Bilder
- CSS-Optimierung mit PurgeCSS
- Code-Splitting durch Vite

## Lizenz

© 2024 Motorlink GmbH. Alle Rechte vorbehalten.
