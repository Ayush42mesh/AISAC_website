import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, X, CalendarDays, MapPin, Users, Award, ShieldCheck, Flame } from 'lucide-react';
import { events } from './events';
import Poster from './Poster';
import RotatingEventsSection from './RotatingEventsSection';
import ScrollingEventsMarquee from './ScrollingEventsMarquee';

export default function EventsPage({ onBackToHome }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSelectEvent = (evt) => {
    setSelectedEvent(evt);
    setIsRegistered(false);
  };

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="events-page standalone-events-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Standalone Header */}
      <div className="section-pad" style={{ paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="section-label">
              <span><i className="live-dot" /> AISAC & AURORA EVENTS</span>
              <span>SEASON 2026 — 2027</span>
            </div>
            <h1 className="hero-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', margin: '12px 0 0 0' }}>
              <span className="hero-line"><span>AURORA & AISAC</span></span>
              <span className="hero-line lime"><span>ROTATING EVENT ARENA.</span></span>
            </h1>
          </div>

          <button className="button button-dark" onClick={onBackToHome} style={{ gap: '8px' }}>
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </button>
        </div>
      </div>

      {/* Main 3D Rotation Animation Events Section */}
      <RotatingEventsSection onSelectEvent={handleSelectEvent} />

      {/* Detailed Modal Popup for Selected Event */}
      {selectedEvent && (
        <div
          className="events-modal-overlay"
          onClick={() => setSelectedEvent(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="events-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              background: '#121311',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '20px',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)'
            }}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            {isRegistered ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(93, 232, 239, 0.15)', color: '#5de8ef', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <ShieldCheck size={36} />
                </div>
                <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px' }}>REGISTRATION ESTABLISHED!</h2>
                <p style={{ color: '#dedcd2', fontSize: '15px', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                  Your entry for <strong>{selectedEvent.title} ({selectedEvent.subtheme})</strong> has been logged. Get ready for an epic campus experience!
                </p>
                <button className="button button-lime" onClick={() => setSelectedEvent(null)}>
                  DONE / BACK TO ROTATION
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
                {/* Poster Frame */}
                <div>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Poster event={selectedEvent} />
                  </div>
                </div>

                {/* Info Details Column */}
                <div>
                  <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#5de8ef', fontWeight: 700, textTransform: 'uppercase' }}>
                    /// AURORA_CORE_ACCESS_GRANTED
                  </span>

                  <h2 style={{ fontSize: '32px', textTransform: 'uppercase', margin: '8px 0 12px 0', color: '#fff', lineHeight: '1.1' }}>
                    {selectedEvent.title}
                  </h2>

                  <p style={{ fontSize: '14px', color: '#b0b0b0', lineHeight: '1.6', marginBottom: '24px' }}>
                    {selectedEvent.description}
                  </p>

                  {/* Metadata Cards Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '11px', color: '#5de8ef', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                        <CalendarDays size={13} /> TIMELINE
                      </span>
                      <strong style={{ display: 'block', fontSize: '14px', marginTop: '4px', color: '#fff' }}>{selectedEvent.date}</strong>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '11px', color: '#5de8ef', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                        <Users size={13} /> SQUAD LIMIT
                      </span>
                      <strong style={{ display: 'block', fontSize: '14px', marginTop: '4px', color: '#fff' }}>{selectedEvent.squadLimit || '2-4 members'}</strong>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '11px', color: '#5de8ef', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                        <Award size={13} /> ENTRY FEE
                      </span>
                      <strong style={{ display: 'block', fontSize: '14px', marginTop: '4px', color: '#fff' }}>{selectedEvent.entryFee || '₹100 / Team'}</strong>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.04)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '11px', color: '#5de8ef', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                        <MapPin size={13} /> VENUE
                      </span>
                      <strong style={{ display: 'block', fontSize: '14px', marginTop: '4px', color: '#fff' }}>{selectedEvent.venue}</strong>
                    </div>
                  </div>

                  {/* Prize Pool & Contacts */}
                  {selectedEvent.prizePool && (
                    <div style={{ marginBottom: '16px', background: 'rgba(245, 219, 100, 0.08)', border: '1px solid rgba(245, 219, 100, 0.2)', padding: '12px 16px', borderRadius: '8px', color: '#f5db64', fontSize: '14px' }}>
                      <strong>TOTAL PRIZE POOL: </strong> {selectedEvent.prizePool}
                    </div>
                  )}

                  {selectedEvent.contacts && (
                    <div style={{ marginBottom: '24px', fontSize: '13px', color: '#a0a0a0', lineHeight: '1.5' }}>
                      <strong style={{ color: '#fff' }}>DETAILS / CONTACT: </strong> {selectedEvent.contacts}
                    </div>
                  )}

                  {/* Register CTA Button */}
                  <button
                    className="button button-lime"
                    onClick={handleRegister}
                    style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 700, letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>ESTABLISH_REGISTRATION</span>
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
