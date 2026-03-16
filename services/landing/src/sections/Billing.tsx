import React from 'react';
import {
  Receipt,
  CreditCard,
  AlertTriangle,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Euro,
  Calendar,
  ArrowRight,
} from 'lucide-react';

interface InvoiceStatus {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'overdue' | 'reminder';
}

const invoices: InvoiceStatus[] = [
  {
    id: 'RE-2024-001',
    customer: 'Muster GmbH',
    amount: '3.450,00 €',
    date: '15.01.2024',
    status: 'paid',
  },
  {
    id: 'RE-2024-002',
    customer: 'Beispiel AG',
    amount: '7.820,00 €',
    date: '22.01.2024',
    status: 'pending',
  },
  {
    id: 'RE-2024-003',
    customer: 'Transport Logistik',
    amount: '1.230,00 €',
    date: '05.01.2024',
    status: 'overdue',
  },
  {
    id: 'RE-2024-004',
    customer: 'Cargo Solutions',
    amount: '5.670,00 €',
    date: '28.01.2024',
    status: 'reminder',
  },
];

const getStatusConfig = (status: InvoiceStatus['status']) => {
  switch (status) {
    case 'paid':
      return {
        icon: CheckCircle,
        label: 'Bezahlt',
        className: 'bg-green-500/10 text-green-400',
      };
    case 'pending':
      return {
        icon: Clock,
        label: 'Offen',
        className: 'bg-amber-500/10 text-amber-400',
      };
    case 'overdue':
      return {
        icon: AlertCircle,
        label: 'Überfällig',
        className: 'bg-red-500/10 text-red-400',
      };
    case 'reminder':
      return {
        icon: AlertTriangle,
        label: 'Mahnung',
        className: 'bg-orange-500/10 text-orange-400',
      };
  }
};

const Billing: React.FC = () => {
  return (
    <section
      id="billing"
      className="relative w-full bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08)_0%,transparent_50%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-sm font-medium text-amber-400">
            Billing & Mahnwesen
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Rechnungsstellung
            <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              automatisiert & transparent
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Von der Sammelrechnung bis zum Mahnwesen – alle Finanzprozesse
            effizient und fehlerfrei abgewickelt.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Features */}
          <div data-aos="fade-right">
            <div className="grid gap-6">
              {[
                {
                  icon: Receipt,
                  title: 'Sammelrechnung',
                  description:
                    'Automatische Zusammenfassung aller Aufträge pro Kunde und Abrechnungsperiode.',
                  color: 'blue',
                },
                {
                  icon: CreditCard,
                  title: 'Zahlungsabwicklung',
                  description:
                    'Integration mit Zahlungsdienstleistern für schnelle und sichere Zahlungen.',
                  color: 'green',
                },
                {
                  icon: AlertTriangle,
                  title: 'Automatisches Mahnwesen',
                  description:
                    'Eskalationsgesteuerte Mahnungen mit konfigurierbaren Fristen und Texten.',
                  color: 'amber',
                },
                {
                  icon: TrendingUp,
                  title: 'Finanz-Reports',
                  description:
                    'Umfassende Auswertungen für Umsatz, Offene Posten und Zahlungsfluss.',
                  color: 'purple',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                const colorMap: Record<string, string> = {
                  blue: 'from-blue-500/20 to-blue-600/20 text-blue-400',
                  green: 'from-green-500/20 to-green-600/20 text-green-400',
                  amber: 'from-amber-500/20 to-orange-500/20 text-amber-400',
                  purple: 'from-purple-500/20 to-purple-600/20 text-purple-400',
                };

                return (
                  <div
                    key={feature.title}
                    className="flex gap-5 rounded-xl border border-slate-800 bg-slate-800/30 p-5 transition-all hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-800/50"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${colorMap[feature.color]}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div
              className="mt-8 grid grid-cols-3 gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
                <Euro className="mx-auto mb-2 h-6 w-6 text-green-400" />
                <span className="block text-xl font-bold text-white">
                  2.4M
                </span>
                <span className="text-xs text-slate-400">Umsatz p.a.</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
                <Calendar className="mx-auto mb-2 h-6 w-6 text-blue-400" />
                <span className="block text-xl font-bold text-white">14</span>
                <span className="text-xs text-slate-400">Tage Ziel</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-800/30 p-4 text-center">
                <FileText className="mx-auto mb-2 h-6 w-6 text-amber-400" />
                <span className="block text-xl font-bold text-white">98%</span>
                <span className="text-xs text-slate-400">Automatisierung</span>
              </div>
            </div>
          </div>

          {/* Right - Invoice Dashboard */}
          <div data-aos="fade-left">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    Rechnungsübersicht
                  </h3>
                  <p className="text-sm text-slate-400">
                    Februar 2024
                  </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                  <Receipt className="h-4 w-4" />
                  Neue Rechnung
                </button>
              </div>

              {/* Invoice List */}
              <div className="space-y-3">
                {invoices.map((invoice, index) => {
                  const statusConfig = getStatusConfig(invoice.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div
                      key={invoice.id}
                      className="flex items-center gap-4 rounded-xl bg-slate-800/50 p-4 transition-colors hover:bg-slate-800"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-700/50">
                        <FileText className="h-5 w-5 text-slate-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {invoice.id}
                          </span>
                          <span className="truncate text-sm text-slate-400">
                            {invoice.customer}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span>{invoice.date}</span>
                          <span>•</span>
                          <span className="font-medium text-white">
                            {invoice.amount}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusConfig.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {statusConfig.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="mt-6 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Gesamt offen</p>
                    <p className="text-2xl font-bold text-white">
                      14.720,00 €
                    </p>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                    Alle anzeigen
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute right-8 top-1/3 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Billing;
