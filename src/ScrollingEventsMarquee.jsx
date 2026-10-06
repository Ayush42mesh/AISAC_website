import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, MapPin, ArrowUpRight, Sparkles, Flame } from 'lucide-react';

export default function ScrollingEventsMarquee({ onSelectEvent, title = 'CONTINUOUS LIVE EVENTS STREAM', compact = false }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const feOrientationEvent = {
    id: 'fe-orientation',
    title: 'FE Orientation 2026',
    subtheme: 'CONTINUOUS LIVE EVENT',
    description: 'Welcoming First-Year Engineering students into the world of AI, tech innovation, coding workshops, and campus community leadership.',
    category: 'Live Event',
    date: 'October 2026',
    time: '10:00 AM - 4:00 PM',
    venue: 'Main Auditorium & AI Hub',
    squadLimit: 'FE Students',
    entryFee: 'Open Access',
    prizePool: 'Starter Kits & Certificates',
    contacts: 'AISAC Student Mentors',
    statusLabel: 'LIVE CONTINUOUS EVENT'
  };

  // Repeat FE Orientation event across all marquee boxes
  const marqueeItems = Array(12).fill(feOrientationEvent);

  return (
    <div ref={containerRef} className={`events-marquee-wrapper ${compact ? 'compact' : ''} ${isVisible ? 'is-visible' : ''}`}>
      <div className="marquee-header">
        <div className="marquee-title-badge">
          <span className="live-dot-pulse" />
          <Sparkles size={14} className="sparkle-icon" />
          <span>{title}</span>
        </div>
        <span className="marquee-subtext">HOVER TO PAUSE · CLICK FOR FULL DETAILS</span>
      </div>

      <div className="events-marquee-track-container">
        <div className={`events-marquee-track ${isVisible ? 'is-running' : 'is-paused'}`}>
          {marqueeItems.map((evt, index) => (
            <div
              key={`fe-${index}`}
              className="marquee-event-card"
              onClick={() => onSelectEvent && onSelectEvent(evt)}
            >
              <div className="card-top-row">
                <span className="marquee-badge">
                  <Flame size={11} /> {evt.statusLabel || 'LIVE'}
                </span>
                <span className="marquee-date">
                  <CalendarDays size={11} /> {evt.date}
                </span>
              </div>

              <h4 className="marquee-card-title">{evt.title}</h4>

              <div className="card-bottom-row">
                <span className="marquee-venue">
                  <MapPin size={11} /> {evt.venue}
                </span>
                <button
                  className="marquee-details-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent && onSelectEvent(evt);
                  }}
                  aria-label={`View details for ${evt.title}`}
                >
                  DETAILS <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
