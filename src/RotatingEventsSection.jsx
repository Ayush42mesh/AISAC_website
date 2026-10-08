import React, { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { CalendarDays, MapPin, ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Trophy, Compass, Users, Play, Pause } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from './events';
import Poster from './Poster';

gsap.registerPlugin(ScrollTrigger);

export default function RotatingEventsSection({ onSelectEvent }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
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

  const updateWheelPosition = (targetIndex, animate = true) => {
    if (totalEvents === 0) return;
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const radiusX = isMobile ? Math.min(screenWidth * 0.38, 280) : Math.min(screenWidth * 0.44, 480);
    const radiusZ = isMobile ? 220 : 340;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;

      // Relative offset from current active card
      let offset = idx - targetIndex;
      while (offset > totalEvents / 2) offset -= totalEvents;
      while (offset < -totalEvents / 2) offset += totalEvents;

      // Calculate angle: active card (offset = 0) has normAngle = 0 -> x = 0 (CENTERED IN MIDDLE)
      const normAngle = offset * 36;
      const rad = (normAngle * Math.PI) / 180;
      const cosVal = Math.cos(rad);

      const x = Math.sin(rad) * radiusX;
      const y = -20;
      const z = cosVal * radiusZ - radiusZ;

      const rotateY = normAngle * 0.5;
      const scale = isMobile ? (0.8 + 0.2 * cosVal) : (0.75 + 0.25 * cosVal);
      const opacity = Math.abs(offset) > 3 ? 0 : (cosVal > -0.3 ? Math.pow((cosVal + 0.3) / 1.3, 0.6) : 0);
      const zIndex = 1000 - Math.round(Math.abs(offset) * 20);

      const targetProps = {
        x,
        y,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        pointerEvents: offset === 0 ? 'auto' : (Math.abs(offset) === 1 ? 'auto' : 'none')
      };

      if (animate) {
        gsap.to(card, {
          ...targetProps,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.set(card, targetProps);
      }
    });
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    if (!section || !wheel || totalEvents === 0) return;

    const ctx = gsap.context(() => {
      // Initial wheel render with active card dead center
      updateWheelPosition(activeIndex, false);

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 20px',
        end: () => `+=${Math.max(window.innerHeight * 0.9, totalEvents * 140)}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const targetIdx = Math.min(totalEvents - 1, Math.max(0, Math.floor(self.progress * totalEvents)));
          setActiveIndex(targetIdx);
        }
      });

      return () => st.kill();
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [filteredEvents, totalEvents]);

  // Update wheel whenever activeIndex or category changes
  useEffect(() => {
    updateWheelPosition(activeIndex, true);
  }, [activeIndex, activeCategory]);

  const rotateStep = (direction) => {
    setActiveIndex((prev) => {
      const nextIdx = direction === 'next'
        ? (prev + 1) % totalEvents
        : (prev - 1 + totalEvents) % totalEvents;
      return nextIdx;
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

  // Optional auto-rotate continuous animation when toggled on by user
  useEffect(() => {
    if (!isAutoPlay || !isVisible || totalEvents === 0) return;

    const timer = setInterval(() => {
      rotateStep('next');
    }, 4000);

    return () => {
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
    </section>
  );
}
