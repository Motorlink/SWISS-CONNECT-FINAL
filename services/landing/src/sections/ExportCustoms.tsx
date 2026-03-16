import React from 'react';
import {
  FileText,
  Globe,
  Package,
  CheckCircle,
  ClipboardCheck,
  Truck,
  AlertCircle,
  FileSearch,
} from 'lucide-react';

interface DocumentType {
  icon: React.ElementType;
  name: string;
  description: string;
  required: boolean;
}

const documents: DocumentType[] = [
  {
    icon: FileText,
    name: 'CMR-Frachtbrief',
    description: 'Internationaler Frachtbrief für Straßentransporte',
    required: true,
  },
  {
    icon: ClipboardCheck,
    name: 'Zollanmeldung',
    description: 'Exportzollanmeldung mit ATLAS-Referenz',
    required: true,
  },
  {
    icon: Package,
    name: 'Packliste',
    description: 'Detaillierte Auflistung aller Sendungsinhalte',
    required: true,
  },
  {
    icon: FileSearch,
    name: 'Ursprungszeugnis',
    description: 'Nachweis des Warenursprungs',
    required: false,
  },
];

const ExportCustoms: React.FC = () => {
  return (
    <section
      id="export"
      className="relative w-full bg-slate-900 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Visual */}
          <div className="order-2 lg:order-1" data-aos="fade-right">
            {/* Document Pouch Visualization */}
            <div className="relative">
              <div className="rounded-2xl border border-slate-800 bg-slate-800/30 p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                    <Package className="h-7 w-7 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      Digitale Pouch
                    </h3>
                    <p className="text-sm text-slate-400">
                      Alle Dokumente zentral verwaltet
                    </p>
                  </div>
                </div>

                {/* Document List */}
                <div className="space-y-3">
                  {documents.map((doc, index) => {
                    const Icon = doc.icon;
                    return (
                      <div
                        key={doc.name}
                        className="flex items-center gap-4 rounded-xl bg-slate-700/30 p-4 transition-colors hover:bg-slate-700/50"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-600/30">
                          <Icon className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">
                              {doc.name}
                            </span>
                            {doc.required && (
                              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                                Pflicht
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400">
                            {doc.description}
                          </p>
                        </div>
                        <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
                      </div>
                    );
                  })}
                </div>

                {/* Status Bar */}
                <div className="mt-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium text-green-400">
                      Zollabfertigung abgeschlossen
                    </span>
                  </div>
                  <p className="mt-1 pl-8 text-sm text-slate-400">
                    MRN: 24DE1234567890AB12
                  </p>
                </div>
              </div>

              {/* Decorative */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2" data-aos="fade-left">
            <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm font-medium text-indigo-400">
              Export & Zoll
            </span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Zollabfertigung
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                digital & effizient
              </span>
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              Automatisierte Verwaltung aller Zolldokumente. Nahtlose
              Integration mit ATLAS und anderen Zollsystemen für reibungslose
              Grenzübertritte.
            </p>

            {/* Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Globe,
                  title: 'EU-Abdeckung',
                  description: 'Unterstützung für alle EU-Zollstellen',
                },
                {
                  icon: FileText,
                  title: 'Dokumentenpouch',
                  description: 'Zentrale Verwaltung aller Belege',
                },
                {
                  icon: Truck,
                  title: 'T1-Transit',
                  description: 'Digitale Transitverfahren',
                },
                {
                  icon: AlertCircle,
                  title: 'Status-Updates',
                  description: 'Echtzeit-Benachrichtigungen',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 transition-colors hover:border-indigo-500/30 hover:bg-slate-800/50"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <Icon className="mb-3 h-6 w-6 text-indigo-400" />
                    <h4 className="mb-1 font-semibold text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Stats */}
            <div
              className="mt-8 flex gap-8 border-t border-slate-800 pt-8"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div>
                <span className="text-3xl font-bold text-white">99.8%</span>
                <p className="text-sm text-slate-400">Zollklarheit</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-white">&lt;2h</span>
                <p className="text-sm text-slate-400">Durchlaufzeit</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-white">27</span>
                <p className="text-sm text-slate-400">EU-Länder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportCustoms;
