import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure to register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollOptions {
  trigger?: RefObject<HTMLElement>;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  toggleActions?: string;
}

const useSmoothScroll = (
  element: RefObject<HTMLElement>,
  options: SmoothScrollOptions = {}
) => {
  useEffect(() => {
    if (!element.current) return;

    const {
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      pin = false,
      markers = false,
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      toggleActions = 'play none none reverse',
    } = options;

    // Create animation
    const animation = gsap.fromTo(
      element.current,
      from,
      {
        ...to,
        duration: 1,
        ease: 'power2.out',
      }
    );

    // Create scroll trigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger?.current || element.current,
      start,
      end,
      scrub,
      pin,
      markers,
      toggleActions,
      animation,
    });

    // Cleanup function
    return () => {
      scrollTrigger.kill();
    };
  }, [element, options]);
};

export default useSmoothScroll;
