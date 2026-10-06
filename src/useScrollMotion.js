import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollMotion(root) {
  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const heroLine = scope.querySelectorAll('.hero-line>span');
        if (heroLine.length) {
          gsap.from('.hero-line>span', { yPercent: 110, rotation: 3, duration: 1.15, stagger: 0.13, ease: 'power4.out', delay: 0.1 });
        }
        const fadeIns = scope.querySelectorAll('.hero .fade-in');
        if (fadeIns.length) {
          gsap.from('.hero .fade-in', { opacity: 0, y: 18, duration: 0.8, stagger: 0.1, delay: 0.4 });
        }
        if (scope.querySelector('.hero-photo')) {
          gsap.to('.hero-photo', { yPercent: 18, scale: 1.16, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        }
        if (scope.querySelector('.hero-copy')) {
          gsap.to('.hero-copy', { y: -90, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: '.hero', start: '25% top', end: 'bottom top', scrub: true } });
        }
        if (scope.querySelector('.hero-sticker')) {
          gsap.to('.hero-sticker', { rotation: 65, y: 100, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        }
        if (scope.querySelector('.ticker-track')) {
          gsap.to('.ticker-track', { xPercent: -24, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
        if (scope.querySelector('.manifesto-word')) {
          gsap.fromTo('.manifesto-word', { color: '#cbc8bc' }, { color: '#22211c', stagger: 0.16, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } });
        }
        if (scope.querySelector('.about-stamp')) {
          gsap.to('.about-stamp', { rotation: 36, y: -75, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
        }

        const reveals = scope.querySelectorAll('[data-reveal]');
        if (reveals.length) {
          gsap.utils.toArray(reveals).forEach(el => gsap.from(el, { y: 45, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
        }

        if (scope.querySelector('.interlude-text')) {
          gsap.to('.interlude-text', { xPercent: -15, ease: 'none', scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
        if (scope.querySelector('.interlude-icon')) {
          gsap.to('.interlude-icon', { rotation: 120, y: -90, ease: 'none', scrollTrigger: { trigger: '.interlude', start: 'top bottom', end: 'bottom top', scrub: true } });
        }
        if (scope.querySelector('.closing-title')) {
          gsap.from('.closing-title .title-line>span', { yPercent: 110, rotation: 3, stagger: 0.12, duration: 1.05, ease: 'power4.out', scrollTrigger: { trigger: '.closing-title', start: 'top 88%', once: true } });
        }
      }, scope);
      return () => ctx.revert();
    });

    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const rail = scope.querySelector('.event-rail');
      const shell = scope.querySelector('.lineup-shell');
      if (!rail || !shell) return;
      const progressFill = scope.querySelector('.rail-progress-fill');

      const distance = () => Math.max(0, rail.scrollWidth - shell.clientWidth + parseFloat(getComputedStyle(rail).paddingLeft));
      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: shell,
          start: 'top top',
          end: () => `+=${distance() * 1.2}`,
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => {
            if (progressFill) progressFill.style.width = `${self.progress * 100}%`;
          }
        }
      });

      const focus = e => {
        const card = e.target.closest('.event-tile');
        if (!card) return;
        const travel = distance();
        const target = Math.min(travel, Math.max(0, card.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft)));
        const st = tween.scrollTrigger;
        if (st) window.scrollTo({ top: st.start + (target / Math.max(travel, 1)) * (st.end - st.start), behavior: 'instant' });
      };
      rail.addEventListener('focusin', focus);
      return () => {
        rail.removeEventListener('focusin', focus);
        tween.scrollTrigger?.kill();
        tween.revert();
      };
    });

    const progress = gsap.to('.page-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: () => ScrollTrigger.maxScroll(window), scrub: true, invalidateOnRefresh: true } });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const timer = setTimeout(refresh, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refresh);
      progress.scrollTrigger?.kill();
      progress.revert();
      mm.revert();
    };
  }, []);
}
