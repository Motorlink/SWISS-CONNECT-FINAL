import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import Capabilities from './sections/Capabilities';
import Tracking from './sections/Tracking';
import ExportCustoms from './sections/ExportCustoms';
import Billing from './sections/Billing';
import Reference from './sections/Reference';
import Contact from './sections/Contact';

/**
 * SWISS CONNECT - Frontend v1
 * 
 * Mandantenfähiges Logistik-Portal
 * Tech Stack: React + TypeScript + Tailwind CSS + AOS + GSAP
 */
function App() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // Refresh AOS on window resize
    const handleResize = () => {
      AOS.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero Section - Value Proposition */}
        <Hero />

        {/* Capabilities Section - 20+ Processes */}
        <Capabilities />

        {/* Tracking & Proof Section */}
        <Tracking />

        {/* Export & Customs Section */}
        <ExportCustoms />

        {/* Billing & Mahnwesen Section */}
        <Billing />

        {/* Reference Section */}
        <Reference />

        {/* Contact CTA Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
