import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MapPin,
  Camera,
  Signature,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TrackingStep {
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  time?: string;
}

const trackingSteps: TrackingStep[] = [
  {
    icon: Package,
    title: 'Auftrag erfasst',
    description: 'Sendung im System registriert',
    status: 'completed',
    time: '08:30',
  },
  {
    icon: MapPin,
    title: 'Abholung',
    description: 'Ware beim Versender abgeholt',
    status: 'completed',
    time: '09:15',
  },
  {
    icon: Camera,
    title: 'Foto-Dokumentation',
    description: 'Zustandsprotokoll erstellt',
    status: 'completed',
    time: '09:22',
  },
  {
    icon: CheckCircle,
    title: 'In Transit',
    description: 'Sendung auf dem Weg zum Ziel',
    status: 'active',
    time: '10:45',
  },
  {
    icon: MapPin,
    title: 'Ankunft',
    description: 'Ware am Zielort eingetroffen',
    status: 'pending',
  },
  {
    icon: Signature,
    title: 'Zustellung',
    description: 'Übergabe mit digitaler Unterschrift',
    status: 'pending',
  },
];

const Tracking: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.tracking-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Timeline animation
      const steps = timelineRef.current?.querySelectorAll('.timeline-step');
      if (steps) {
        gsap.fromTo(
          steps,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tracking"
      className="relative w-full overflow-hidden bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="tracking-bg absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Content */}
          <div data-aos="fade-right">
            <span className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400">
              Tracking & Proof
            </span>
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Echtzeit-Tracking
              <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                mit Beweissicherung
              </span>
            </h2>
            <p className="mb-8 text-lg text-slate-400">
              Jede Sendung ist jederzeit nachvollziehbar. Von der Abholung bis
              zur Zustellung – mit Fotos, Zeitstempeln und digitaler
              Unterschrift.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: MapPin,
                  title: 'GPS-Ortung',
                  description: 'Live-Position aller Fahrzeuge',
                },
                {
                  icon: Camera,
                  title: 'Foto-Protokoll',
                  description: 'Bilddokumentation bei jedem Statuswechsel',
                },
                {
                  icon: Signature,
                  title: 'Digitale Unterschrift',
                  description: 'Rechtssichere POD mit Zeitstempel',
                },
                {
                  icon: Clock,
                  title: 'Historie',
                  description: 'Vollständiger Verlauf aller Aktivitäten',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                      <Icon className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Timeline */}
          <div ref={timelineRef} className="relative" data-aos="fade-left">
            {/* Timeline Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    Sendung #2847-2024
                  </h3>
                  <p className="text-sm text-slate-400">
                    Hamburg → München
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
                  In Transit
                </span>
              </div>

              {/* Timeline Steps */}
              <div className="relative space-y-0">
                {/* Vertical Line */}
                <div className="absolute left-5 top-4 bottom-4 w-px bg-slate-800" />

                {trackingSteps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = step.status === 'completed';
                  const isActive = step.status === 'active';

                  return (
                    <div
                      key={step.title}
                      className="timeline-step relative flex gap-4 pb-6 last:pb-0"
                    >
                      {/* Icon */}
                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          isCompleted
                            ? 'bg-green-500/20 text-green-400'
                            : isActive
                            ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4
                              className={`font-medium ${
                                isCompleted || isActive
                                  ? 'text-white'
                                  : 'text-slate-500'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <p className="text-sm text-slate-400">
                              {step.description}
                            </p>
                          </div>
                          {step.time && (
                            <span className="text-sm text-slate-500">
                              {step.time}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ETA */}
              <div className="mt-6 rounded-xl bg-slate-800/50 p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      Geschätzte Ankunft
                    </p>
                    <p className="text-sm text-slate-400">
                      Heute, 16:30 - 17:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
