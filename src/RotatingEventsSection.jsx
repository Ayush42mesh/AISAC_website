import React, { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { CalendarDays, MapPin, ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Compass, Users, Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from './events';
import Poster from './Poster';
import ScrollingEventsMarquee from './ScrollingEventsMarquee';

gsap.registerPlugin(ScrollTrigger);

export default function RotatingEventsSection({ onSelectEvent }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const cardRefs = useRef([]);
  const rotObjRef = useRef({ angle: 0 });

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'All') return events;
    return events.filter(e => e.category === activeCategory);
  }, [activeCategory]);

  const totalEvents = filteredEvents.length;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    if (!section || !wheel || totalEvents === 0) return;

    const ctx = gsap.context(() => {
      const rotObj = rotObjRef.current;
      const anglePerItem = 360 / totalEvents;

      const updateWheel = () => {
        const currentRot = rotObj.angle;
        // Determine closest item to front (0 deg)
        const normalizedAngle = ((currentRot % 360) + 360) % 360;
        const frontIdx = Math.round((360 - normalizedAngle) / anglePerItem) % totalEvents;
        setActiveIndex((frontIdx + totalEvents) % totalEvents);

        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 768;
        // Wide horizontal orbital radius to give generous spacing between cards across screen
        const radiusX = isMobile ? Math.min(screenWidth * 0.42, 340) : Math.min(screenWidth * 0.48, 820);
        const radiusZ = isMobile ? 220 : 380;

        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const rawAngle = (idx * anglePerItem + currentRot) % 360;
          let normAngle = (rawAngle + 180) % 360 - 180;
          if (normAngle < -180) normAngle += 360;

          const rad = (normAngle * Math.PI) / 180;
          const cosVal = Math.cos(rad);

          // 3D Orbital Coordinates - starting slightly up (y: -25)
          const x = Math.sin(rad) * radiusX;
          const y = -25;
          const z = cosVal * radiusZ - radiusZ;

          // Gentle 3D rotation so side cards face comfortably towards user
          const rotateY = normAngle * 0.55;

          // Depth scaling and opacity
          const scale = isMobile ? (0.78 + 0.22 * cosVal) : (0.72 + 0.32 * cosVal);
          const opacity = cosVal > -0.4 ? Math.pow((cosVal + 0.4) / 1.4, 0.5) : 0;
          const zIndex = Math.round(z + 1000);

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            rotateY: rotateY,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex,
            pointerEvents: opacity > 0.4 ? 'auto' : 'none'
          });
        });
      };

      // Initial layout setup
      updateWheel();

      /* TEMPORARILY COMMENTED OUT SCROLL-DRIVEN ROTATION ANIMATION WHILE SCROLLING AS REQUESTED
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${totalEvents * 300}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          rotObj.angle = self.progress * 360 * 1.5;
          updateWheel();
        }
      });

      return () => st.kill();
      */
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [filteredEvents, totalEvents]);

  const rotateStep = (direction) => {
    const anglePerItem = 360 / totalEvents;
    const targetAngle = rotObjRef.current.angle + (direction === 'next' ? -anglePerItem : anglePerItem);

    gsap.to(rotObjRef.current, {
      angle: targetAngle,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: () => {
        const currentRot = rotObjRef.current.angle;
        const normalizedAngle = ((currentRot % 360) + 360) % 360;
        const frontIdx = Math.round((360 - normalizedAngle) / anglePerItem) % totalEvents;
        setActiveIndex((frontIdx + totalEvents) % totalEvents);

        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 768;
        const radiusX = isMobile ? Math.min(screenWidth * 0.42, 340) : Math.min(screenWidth * 0.48, 820);
        const radiusZ = isMobile ? 220 : 380;

        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const rawAngle = (idx * anglePerItem + currentRot) % 360;
          let normAngle = (rawAngle + 180) % 360 - 180;
          if (normAngle < -180) normAngle += 360;

          const rad = (normAngle * Math.PI) / 180;
          const cosVal = Math.cos(rad);

          const x = Math.sin(rad) * radiusX;
          const y = -25;
          const z = cosVal * radiusZ - radiusZ;
          const rotateY = normAngle * 0.55;
          const scale = isMobile ? (0.78 + 0.22 * cosVal) : (0.72 + 0.32 * cosVal);
          const opacity = cosVal > -0.4 ? Math.pow((cosVal + 0.4) / 1.4, 0.5) : 0;
          const zIndex = Math.round(z + 1000);

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            rotateY: rotateY,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex,
            pointerEvents: opacity > 0.4 ? 'auto' : 'none'
          });
        });
      }
    });
  };

  // Detect when the section / featured event box enters the viewport
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate continuous animation starts IMMEDIATELY when section becomes visible
  useEffect(() => {
    if (!isAutoPlay || !isVisible || totalEvents === 0) return;

    // Trigger smooth immediate rotation step as soon as section becomes visible
    const initialDelay = setTimeout(() => {
      rotateStep('next');
    }, 300);

    const timer = setInterval(() => {
      rotateStep('next');
    }, 4000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timer);
    };
  }, [isAutoPlay, isVisible, totalEvents]);

  const activeEvent = filteredEvents[activeIndex] || filteredEvents[0];

  return (
    <section className="rotating-events-section" id="events-home" ref={sectionRef}>
      {/* Ambient Radial Glow */}
      <div className="events-glow-bg" aria-hidden="true" />

      {/* Section Header */}
      <div className="events-section-header">
        <div className="section-label">
          <span>04 / UPCOMING EVENTS & COMPETITIONS</span>
          <span>SCROLL DOWN TO ROTATE OR USE NAV ARROWS · {totalEvents} EVENTS</span>
        </div>

        <div className="events-title-row">
          <div className="events-title-left">
            <h2 className="events-heading">
              EXPLORE OUR <br />
              <span className="pink">EVENT LINEUP.</span>
            </h2>
          </div>

          <div className="events-title-right">
            <p className="events-desc">
              Hackathons, AI coding sprints, competitive gaming, and hands-on workshops hosted by <strong>AISAC & CSI</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3D CIRCULAR / ELLIPTICAL CAROUSEL DISPLAY */}
      <div className="events-3d-stage">
        {/* Navigation Arrow Controls */}
        <button
          className="stage-nav-btn prev-btn"
          onClick={() => rotateStep('prev')}
          aria-label="Previous event"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="stage-nav-btn next-btn"
          onClick={() => rotateStep('next')}
          aria-label="Next event"
        >
          <ChevronRight size={24} />
        </button>

        <div className="events-3d-wheel" ref={wheelRef}>
          {filteredEvents.map((e, idx) => {
            const isFront = idx === activeIndex;
            return (
              <div
                key={e.id}
                ref={el => (cardRefs.current[idx] = el)}
                className={`event-3d-card ${isFront ? 'is-front' : ''}`}
                onClick={() => onSelectEvent && onSelectEvent(e)}
              >
                {/* Top Glowing Color Accent Bar */}
                <div
                  className="card-accent-bar"
                  style={{ background: e.accentColor || 'var(--pink)' }}
                />

                {/* Card Top Metadata */}
                <div className="event-card-header">
                  <span className="event-cat-badge">
                    {e.category}
                  </span>
                  <span className="event-date-badge">
                    <CalendarDays size={12} />
                    {e.date}
                  </span>
                </div>

                {/* Visual Poster Frame */}
                <div className="event-poster-container">
                  <Poster event={e} compact={true} />
                  <span className="event-poster-overlay-label">{e.subtheme}</span>
                </div>

                {/* Event Title & Brief Description */}
                <div className="event-card-body">
                  <h3 className="event-card-title">{e.title}</h3>
                  <p className="event-card-desc">{e.description}</p>
                </div>

                {/* Event Footer - Fully Visible with DETAILS Button */}
                <div className="event-card-footer">
                  <div className="event-venue-info">
                    <MapPin size={13} className="venue-icon" />
                    <span>{e.venue}</span>
                  </div>
                  <button
                    className="event-action-btn"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      onSelectEvent && onSelectEvent(e);
                    }}
                  >
                    <span>DETAILS</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Event Spotlight Bar */}
      {activeEvent && (
        <div className="events-active-spotlight">
          <div className="spotlight-indicator">
            <span className="spotlight-dot" />
            <span className="spotlight-label">FEATURED EVENT {String(activeIndex + 1).padStart(2, '0')} / {totalEvents}</span>
          </div>
          <div className="spotlight-content">
            <span className="spotlight-title">{activeEvent.title}</span>
            <span className="spotlight-meta">{activeEvent.subtheme} · {activeEvent.date} · {activeEvent.venue}</span>
          </div>
          <div className="spotlight-actions">
            <button
              className="autoplay-toggle-btn"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              title={isAutoPlay ? "Pause 3D Auto-Rotate" : "Start 3D Auto-Rotate"}
            >
              {isAutoPlay ? <Pause size={15} /> : <Play size={15} />}
              <span>{isAutoPlay ? "AUTO-ROTATE ON" : "AUTO-ROTATE OFF"}</span>
            </button>
            <button
              className="spotlight-btn button-lime"
              onClick={() => onSelectEvent && onSelectEvent(activeEvent)}
            >
              <span>RESERVE SPOT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* CONTINUOUS SCROLLING ANIMATION OF EVENTS BELOW CARDS */}
      <ScrollingEventsMarquee onSelectEvent={onSelectEvent} title="CONTINUOUS LIVE EVENTS STREAM" />
    </section>
  );
}
