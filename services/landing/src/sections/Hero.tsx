import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Truck, Globe, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 40,
      });
      gsap.set(statsRef.current?.children || [], {
        opacity: 0,
        y: 30,
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 1.1,
      });

      // Hero entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .to(
          statsRef.current?.children || [],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .to(
          imageRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1'
        );

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, {
              y: self.progress * 100,
            });
          }
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: self.progress * 50,
            });
          }
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.2)_0%,transparent_50%)]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 flex-col items-center justify-center py-20 lg:flex-row lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2"
              data-aos="fade-down"
            >
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Neutrales Logistik-Portal
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              SWISS
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CONNECT
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 lg:mx-0"
            >
              Das mandantenfähige Logistik-Portal für professionelle
              Transportabwicklung. Von der Auftragsannahme bis zur
              Rechnungsstellung – alles in einer Plattform.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25"
                onClick={() => scrollToSection('contact')}
              >
                Demo anfordern
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all hover:bg-slate-800 hover:text-white"
                onClick={() => scrollToSection('capabilities')}
              >
                Funktionen entdecken
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-700/50 pt-8"
            >
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <span className="text-2xl font-bold text-white">20+</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">Prozesse</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-2xl font-bold text-white">100%</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">Tracking</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center gap-2 lg:justify-start">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span className="text-2xl font-bold text-white">EU</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">Abdeckung</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div
            ref={imageRef}
            className="relative mt-12 flex-1 lg:mt-0"
          >
            <div className="relative mx-auto aspect-square max-w-lg lg:max-w-none">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl" />

              {/* Main Visual */}
              <div className="relative rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
                <div className="grid gap-4">
                  {/* Status Cards */}
                  <div className="flex items-center gap-4 rounded-xl bg-slate-700/50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                      <Truck className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Auftrag #2847</p>
                      <p className="text-sm text-slate-400">In Zustellung</p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                        Live
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl bg-slate-700/50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">POD erhalten</p>
                      <p className="text-sm text-slate-400">14:32 Uhr</p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
                        Bestätigt
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-xl bg-slate-700/50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20">
                      <Globe className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Zollabfertigung</p>
                      <p className="text-sm text-slate-400">Abgeschlossen</p>
                    </div>
                    <div className="ml-auto">
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
                        OK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-500/10 blur-xl" />
                <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-purple-500/10 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default Hero;
