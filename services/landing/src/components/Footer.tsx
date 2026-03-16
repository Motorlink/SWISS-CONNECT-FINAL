import React from 'react';
import { Truck, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Produkt: [
      { label: 'Funktionen', href: '#capabilities' },
      { label: 'Tracking', href: '#tracking' },
      { label: 'Export & Zoll', href: '#export' },
      { label: 'Billing', href: '#billing' },
    ],
    Unternehmen: [
      { label: 'Über uns', href: '#' },
      { label: 'Karriere', href: '#' },
      { label: 'Presse', href: '#' },
      { label: 'Kontakt', href: '#contact' },
    ],
    Rechtliches: [
      { label: 'Impressum', href: '#' },
      { label: 'Datenschutz', href: '#' },
      { label: 'AGB', href: '#' },
      { label: 'Cookie-Einstellungen', href: '#' },
    ],
  };

  return (
    <footer className="relative w-full border-t border-slate-800 bg-slate-950">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="mb-6 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                SWISS CONNECT
              </span>
            </a>
            <p className="mb-6 max-w-sm text-slate-400">
              Das mandantenfähige Logistik-Portal für professionelle
              Transportabwicklung. Entwickelt von Motorlink.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@swiss-connect.ch"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                info@swiss-connect.ch
              </a>
              <a
                href="tel:+491234567890"
                className="flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                +49 (0) 123 456 789-0
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  SWISS CONNECT GmbH<br />
                  Bösch 69<br />
                  6331 Hünenberg (Zug)
                </span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 font-semibold text-white">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            {currentYear} SWISS CONNECT GmbH. Alle Rechte vorbehalten.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
