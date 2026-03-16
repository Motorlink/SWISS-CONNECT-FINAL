import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Building2,
  User,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-slate-950 py-24"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
            Kontakt
          </span>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Bereit für den nächsten Schritt?
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Lassen Sie uns sprechen
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Fordern Sie eine persönliche Demo an und erleben Sie, wie SWISS
            CONNECT Ihre Logistikprozesse transformieren kann.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Contact Info */}
          <div data-aos="fade-right">
            <div className="mb-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Warum SWISS CONNECT?
              </h3>
              <ul className="space-y-4">
                {[
                  '20+ integrierte Logistikprozesse',
                  'Echtzeit-Tracking mit Beweissicherung',
                  'Automatisierte Rechnungsstellung',
                  'Mandantenfähige Architektur',
                  'Nahtlose Zollintegration',
                  'Enterprise-Grade Security',
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <h4 className="font-semibold text-white">Kontaktdaten</h4>
              
              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">E-Mail</p>
                  <a
                    href="mailto:info@masters-of-transport.de"
                    className="font-medium text-white transition-colors hover:text-blue-400"
                  >
                    info@masters-of-transport.de
                  </a>
                </div>
              </div>

              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Telefon</p>
                  <a
                    href="tel:+491234567890"
                    className="font-medium text-white transition-colors hover:text-green-400"
                  >
                    +49 (0) 123 456 789-0
                  </a>
                </div>
              </div>

              <div
                className="flex items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Adresse</p>
                  <p className="font-medium text-white">
                    Motorlink GmbH<br />
                    Musterstraße 123<br />
                    12345 Hamburg
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div data-aos="fade-left">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-sm">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Vielen Dank!
                  </h3>
                  <p className="mb-6 text-slate-400">
                    Wir haben Ihre Anfrage erhalten und melden uns innerhalb
                    von 24 Stunden bei Ihnen.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        message: '',
                      });
                    }}
                  >
                    Neue Anfrage
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        <User className="mr-2 inline h-4 w-4 text-slate-400" />
                        Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Max Mustermann"
                        required
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-white">
                        <Building2 className="mr-2 inline h-4 w-4 text-slate-400" />
                        Unternehmen
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Muster GmbH"
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        <Mail className="mr-2 inline h-4 w-4 text-slate-400" />
                        E-Mail *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="max@beispiel.de"
                        required
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">
                        <Phone className="mr-2 inline h-4 w-4 text-slate-400" />
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+49 (0) 123 456 789"
                        className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">
                      <MessageSquare className="mr-2 inline h-4 w-4 text-slate-400" />
                      Nachricht *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Beschreiben Sie kurz Ihre Anforderungen..."
                      required
                      rows={5}
                      className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="group w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-6 text-lg font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    Demo anfordern
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <p className="text-center text-xs text-slate-500">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="#" className="text-blue-400 hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
