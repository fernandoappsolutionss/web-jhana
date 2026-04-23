'use client';

import { useEffect } from 'react';

/**
 * Client-side enhancements for the landing page:
 *   · nav scroll state
 *   · reveal-on-scroll animation
 *   · smooth scroll for in-page anchors
 *   · waitlist form: prevent default + show thanks
 *
 * These are all non-critical progressive enhancements — the page
 * works fully without JS (text is visible, links navigate).
 */
export default function ClientEnhancements() {
  useEffect(() => {
    // ——— Nav scroll state ———
    const nav = document.getElementById('nav');
    const onScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ——— Reveal on scroll ———
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // ——— Smooth scroll for anchor links ———
    const anchorHandler = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const id = a.getAttribute('href');
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        document.querySelector(id)!.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]'
    );
    anchors.forEach((a) => a.addEventListener('click', anchorHandler));

    // ——— Expansión waitlist form ———
    const form = document.getElementById('exp-waitlist-form');
    const formSubmit = (e: Event) => {
      e.preventDefault();
      const f = e.currentTarget as HTMLFormElement;
      f.reset();
      f.querySelector('.thanks')?.classList.add('show');
    };
    form?.addEventListener('submit', formSubmit);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      anchors.forEach((a) => a.removeEventListener('click', anchorHandler));
      form?.removeEventListener('submit', formSubmit);
    };
  }, []);

  return null;
}
