import React from 'react';
import {
  ClipboardList,
  Route,
  Package,
  Truck,
  Barcode,
  Camera,
  FileCheck,
  FileText,
  Receipt,
  CreditCard,
  AlertCircle,
  TrendingUp,
  Users,
  Settings,
  Shield,
  Zap,
  Globe,
  Clock,
  MessageSquare,
  Database,
} from 'lucide-react';

interface Capability {
  icon: React.ElementType;
  title: string;
  description: string;
  category: string;
}

const capabilities: Capability[] = [
  {
    icon: ClipboardList,
    title: 'Auftragsannahme',
    description: 'Automatische Erfassung und Validierung eingehender Transportaufträge',
    category: 'Auftrag',
  },
  {
    icon: Route,
    title: 'Tourenplanung',
    description: 'Optimale Routenberechnung mit Berücksichtigung aller Parameter',
    category: 'Planung',
  },
  {
    icon: Package,
    title: 'Sendungsverfolgung',
    description: 'Echtzeit-Tracking aller Sendungen mit Status-Updates',
    category: 'Tracking',
  },
  {
    icon: Truck,
    title: 'Fahrzeugmanagement',
    description: 'Verwaltung von Fuhrpark, Fahrern und Kapazitäten',
    category: 'Ressourcen',
  },
  {
    icon: Barcode,
    title: 'Barcode-Scanning',
    description: 'Digitale Erfassung und Kontrolle aller Sendungen',
    category: 'Tracking',
  },
  {
    icon: Camera,
    title: 'Foto-Dokumentation',
    description: 'Bildbasierte Beweissicherung bei Annahme und Übergabe',
    category: 'Dokumentation',
  },
  {
    icon: FileCheck,
    title: 'Digitale Unterschrift',
    description: 'POD mit elektronischer Signatur und Zeitstempel',
    category: 'Dokumentation',
  },
  {
    icon: FileText,
    title: 'CMR-Verwaltung',
    description: 'Digitale Erstellung und Verwaltung von Frachtbriefen',
    category: 'Dokumente',
  },
  {
    icon: Receipt,
    title: 'Sammelrechnung',
    description: 'Automatische Zusammenfassung und Rechnungserstellung',
    category: 'Billing',
  },
  {
    icon: CreditCard,
    title: 'Zahlungsabwicklung',
    description: 'Integration mit Zahlungsdienstleistern und Buchhaltung',
    category: 'Billing',
  },
  {
    icon: AlertCircle,
    title: 'Mahnwesen',
    description: 'Automatisiertes Mahnverfahren mit Eskalationsstufen',
    category: 'Billing',
  },
  {
    icon: TrendingUp,
    title: 'Berichtswesen',
    description: 'Umfassende Reports und Analysen für alle Kennzahlen',
    category: 'Analyse',
  },
  {
    icon: Users,
    title: 'Kundenportal',
    description: 'Self-Service-Portal für Auftraggeber mit Echtzeit-Infos',
    category: 'Portal',
  },
  {
    icon: Settings,
    title: 'Mandantenfähigkeit',
    description: 'Multi-Tenant-Architektur für unabhängige Unternehmen',
    category: 'System',
  },
  {
    icon: Shield,
    title: 'Berechtigungen',
    description: 'Granulares Rollen- und Rechtesystem',
    category: 'Sicherheit',
  },
  {
    icon: Zap,
    title: 'API-Integration',
    description: 'RESTful APIs für nahtlose Systemanbindungen',
    category: 'Integration',
  },
  {
    icon: Globe,
    title: 'Zollabfertigung',
    description: 'Unterstützung bei Export- und Zollprozessen',
    category: 'Zoll',
  },
  {
    icon: Clock,
    title: 'Zeitfenster',
    description: 'Verwaltung von Lieferzeitfenstern und Terminen',
    category: 'Planung',
  },
  {
    icon: MessageSquare,
    title: 'Benachrichtigungen',
    description: 'Automatische Alerts per E-Mail, SMS oder Push',
    category: 'Kommunikation',
  },
  {
    icon: Database,
    title: 'Dokumentenarchiv',
    description: 'Langfristige Speicherung aller Belege und Nachweise',
    category: 'Archiv',
  },
];

const categories = Array.from(new Set(capabilities.map((c) => c.category)));

const Capabilities: React.FC = () => {
  return (
    <section
      id="capabilities"
      className="relative w-full bg-slate-900 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
            Funktionsumfang
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            20+ Prozesse
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              End-to-End abgedeckt
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Von der Auftragsannahme bis zur Rechnungsstellung – alle
            kritischen Prozesse in einer integrierten Plattform.
          </p>
        </div>

        {/* Category Pills */}
        <div
          className="mb-12 flex flex-wrap justify-center gap-2"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-blue-500/50 hover:text-blue-400"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Capabilities Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="group relative rounded-xl border border-slate-800 bg-slate-800/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-500/10"
                data-aos="fade-up"
                data-aos-delay={Math.min(index * 50, 500)}
              >
                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>

                {/* Content */}
                <h3 className="mb-2 font-semibold text-white">
                  {capability.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {capability.description}
                </p>

                {/* Category Badge */}
                <span className="absolute right-4 top-4 text-xs text-slate-600">
                  {capability.category}
                </span>

                {/* Hover Glow */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-16 text-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p className="mb-4 text-slate-400">
            Benötigen Sie eine spezielle Funktion?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-blue-400 transition-colors hover:text-blue-300"
          >
            Kontaktieren Sie uns
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
