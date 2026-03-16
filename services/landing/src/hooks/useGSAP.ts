import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * useGSAP Hook
 * 
 * Provides GSAP ScrollTrigger functionality
 * @returns ref to attach to element and gsap instance
 */
export const useGSAP = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    return () => {
      // Clean up only this component's triggers
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const createParallax = (
    speed: number = 0.5,
    start: string = 'top bottom',
    end: string = 'bottom top'
  ) => {
    if (!elementRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        if (elementRef.current) {
          gsap.set(elementRef.current, {
            y: self.progress * speed * 100,
          });
        }
      },
    });

    triggersRef.current.push(trigger);
  };

  const createFadeIn = (
    options: {
      y?: number;
      opacity?: number;
      duration?: number;
      start?: string;
    } = {}
  ) => {
    const {
      y = 30,
      opacity = 0,
      duration = 1,
      start = 'top 80%',
    } = options;

    if (!elementRef.current) return;

    // Set initial state
    gsap.set(elementRef.current, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: elementRef.current,
      start,
      once: true,
      onEnter: () => {
        if (elementRef.current) {
          gsap.to(elementRef.current, {
            y: 0,
            opacity: 1,
            duration,
            ease: 'power3.out',
          });
        }
      },
    });

    triggersRef.current.push(trigger);
  };

  return {
    ref: elementRef,
    createParallax,
    createFadeIn,
    gsap,
    ScrollTrigger,
  };
};

export default useGSAP;
