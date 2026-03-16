import React from 'react';
import {
  CheckCircle,
  Building2,
  Users,
  TrendingUp,
  Clock,
  Award,
  Quote,
} from 'lucide-react';

const Reference: React.FC = () => {
  return (
    <section
      id="reference"
      className="relative w-full overflow-hidden bg-slate-900 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
            Referenz-Prinzip
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Bewährt in der Praxis
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              mandantenneutral & skalierbar
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Das Portal läuft produktiv bei führenden Logistikdienstleistern.
            Die Architektur ist dabei vollständig mandantenfähig – für jedes
            Unternehmen individualisierbar.
          </p>
        </div>

        {/* Reference Card */}
        <div
          className="mx-auto max-w-4xl"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute right-8 top-8 opacity-10">
              <Quote className="h-24 w-24 text-purple-400" />
            </div>

            <div className="relative">
              {/* Company Badge */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <Building2 className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Rush4you GmbH
                  </h3>
                  <p className="text-slate-400">
                    Express-Logistik & Same-Day Delivery
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mb-8">
                <p className="text-lg leading-relaxed text-slate-300 lg:text-xl">
                  „SWISS CONNECT hat unsere komplette Transportabwicklung
                  revolutioniert. Von der Auftragsannahme bis zur
                  Rechnungsstellung läuft alles in einem System. Die
                  mandantenfähige Architektur ermöglicht uns, das Portal für
                  unsere spezifischen Anforderungen zu konfigurieren – ohne
                  Kompromisse bei der Performance."
                </p>
              </blockquote>

              {/* Author */}
              <div className="mb-8 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                <div>
                  <p className="font-semibold text-white">Thomas Müller</p>
                  <p className="text-sm text-slate-400">
                    Geschäftsführer, Rush4you GmbH
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid gap-4 border-t border-slate-700/50 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: TrendingUp,
                    value: '+47%',
                    label: 'Effizienzsteigerung',
                  },
                  {
                    icon: Clock,
                    value: '-60%',
                    label: 'Bearbeitungszeit',
                  },
                  {
                    icon: Users,
                    value: '50+',
                    label: 'Fahrer im System',
                  },
                  {
                    icon: Award,
                    value: '99.2%',
                    label: 'Kundenzufriedenheit',
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="text-center"
                      data-aos="fade-up"
                      data-aos-delay={300 + index * 100}
                    >
                      <Icon className="mx-auto mb-2 h-5 w-5 text-purple-400" />
                      <span className="block text-2xl font-bold text-white">
                        {stat.value}
                      </span>
                      <span className="text-xs text-slate-400">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />
          </div>
        </div>

        {/* Key Points */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Mandantenfähig',
              description:
                'Jedes Unternehmen arbeitet in seiner eigenen isolierten Umgebung',
            },
            {
              title: 'White-Label',
              description:
                'Vollständige Branding-Anpassung an Ihr Corporate Design',
            },
            {
              title: 'Skalierbar',
              description:
                'Wächst mit Ihrem Unternehmen – von Startup bis Enterprise',
            },
            {
              title: 'Sicher',
              description:
                'Enterprise-Grade Security mit Rollen- und Rechtesystem',
            },
            {
              title: 'Integrierbar',
              description:
                'Offene APIs für nahtlose Anbindung bestehender Systeme',
            },
            {
              title: 'Support',
              description:
                'Dedizierter Support mit garantierten Reaktionszeiten',
            },
          ].map((point, index) => (
            <div
              key={point.title}
              className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-800/20 p-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
              <div>
                <h4 className="font-semibold text-white">{point.title}</h4>
                <p className="text-sm text-slate-400">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reference;
