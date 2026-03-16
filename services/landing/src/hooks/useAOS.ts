import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * useAOS Hook
 * 
 * Initializes Animate On Scroll library
 * Call this once in your main App component
 */
export const useAOS = () => {
  useEffect(() => {
    AOS.init({
      // Global settings
      offset: 120,          // offset (in px) from the original trigger point
      delay: 0,             // values from 0 to 3000, with step 50ms
      duration: 800,        // values from 0 to 3000, with step 50ms
      easing: 'ease-out-cubic', // default easing for AOS animations
      once: true,           // whether animation should happen only once
      mirror: false,        // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
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
};

export default useAOS;
