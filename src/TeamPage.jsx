import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Sparkles, ShieldCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heads, members } from './teamData';

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage({ isEmbedded = false }) {
  const [activeCategory, setActiveCategory] = useState('heads'); // 'heads' | 'members'

  const shellRef = useRef(null);
  const railRef = useRef(null);
  const progressFillRef = useRef(null);
  const currentOffsetRef = useRef(0);

  const displayedList = useMemo(() => {
    return activeCategory === 'heads' ? heads : members;
  }, [activeCategory]);

  const handleManualMove = (direction) => {
    const rail = railRef.current;
    const shell = shellRef.current;
    if (!rail || !shell) return;

    const railWidth = rail.scrollWidth;
    const containerWidth = shell.clientWidth;
    const maxDistance = Math.max(0, railWidth - containerWidth + 60);
    const cardStep = 285; // card width + gap

    let targetX = direction === 'next' 
      ? currentOffsetRef.current + cardStep 
      : currentOffsetRef.current - cardStep;

    targetX = Math.max(0, Math.min(targetX, maxDistance));
    currentOffsetRef.current = targetX;

    gsap.to(rail, {
      x: -targetX,
      duration: 0.45,
      ease: 'power2.out'
    });

    if (progressFillRef.current && maxDistance > 0) {
      progressFillRef.current.style.width = `${Math.min(100, (targetX / maxDistance) * 100)}%`;
    }
  };

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const rail = railRef.current;
    if (!shell || !rail || displayedList.length === 0) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        const railWidth = rail.scrollWidth;
        const containerWidth = shell.clientWidth;
        return Math.max(0, railWidth - containerWidth + 60);
      };

      const distance = getDistance();
      if (distance <= 0) return;

      const st = ScrollTrigger.create({
        trigger: shell,
        start: isEmbedded ? 'top 20px' : 'top top',
        end: () => `+=${Math.max(distance * 0.9, 600)}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: self => {
          const currentX = self.progress * distance;
          currentOffsetRef.current = currentX;
          gsap.set(rail, { x: -currentX });
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
          }
        }
      });

      return () => st.kill();
    }, shellRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [displayedList, activeCategory]);

  const totalCount = displayedList.length;

  return (
    <div className={`team-page-pinned ${isEmbedded ? 'embedded' : ''}`} ref={shellRef}>
      <div className="team-hero-header">
        <div className="section-label">
          <span>03 / COMMITTEE TEAMS</span>
          <span>{totalCount} {activeCategory.toUpperCase()} ACTIVE · SCROLL OR USE ARROWS TO SLIDE</span>
        </div>

        <div className="team-hero-title-row">
          <div className="team-title-left">
            <h2 className="team-heading">
              <span>MEET THE</span> <span className="pink">LEADERS & CREATORS.</span>
            </h2>
            <p className="team-hero-desc">
              The visionary minds, engineers, organizers, and creators behind our association.
            </p>
          </div>

          {/* Controls Bar: Heads/Members and Manual Move Buttons */}
          <div className="team-controls-bar">
            <div className="committee-tabs" role="tablist" aria-label="Team View Selector">
              <button
                role="tab"
                aria-selected={activeCategory === 'heads'}
                className={`committee-tab ${activeCategory === 'heads' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('heads'); currentOffsetRef.current = 0; }}
              >
                <ShieldCheck size={16} />
                <span>HEADS</span>
              </button>

              <button
                role="tab"
                aria-selected={activeCategory === 'members'}
                className={`committee-tab ${activeCategory === 'members' ? 'active' : ''}`}
                onClick={() => { setActiveCategory('members'); currentOffsetRef.current = 0; }}
              >
                <Users size={16} />
                <span>MEMBERS</span>
              </button>
            </div>

            {/* Manual Navigation Buttons Beside Scroll */}
            <div className="team-manual-nav-group">
              <button
                className="team-manual-btn prev-btn"
                onClick={() => handleManualMove('prev')}
                aria-label="Previous members"
                title="Slide Left"
              >
                <ChevronLeft size={17} />
                <span>PREV</span>
              </button>
              <button
                className="team-manual-btn next-btn"
                onClick={() => handleManualMove('next')}
                aria-label="Next members"
                title="Slide Right"
              >
                <span>NEXT</span>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar Indicator */}
        <div className="team-rail-progress-track">
          <div className="team-rail-progress-fill" ref={progressFillRef} />
        </div>
      </div>

      {/* HORIZONTAL RAIL OF RECTANGULAR CARDS */}
      <div className="team-rail-wrapper">
        {/* Floating Side Move Buttons on edges */}
        <button
          className="team-floating-btn prev-btn"
          onClick={() => handleManualMove('prev')}
          aria-label="Slide Left"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          className="team-floating-btn next-btn"
          onClick={() => handleManualMove('next')}
          aria-label="Slide Right"
        >
          <ChevronRight size={22} />
        </button>

        <div className="team-rail" ref={railRef}>
          {displayedList.map((m, idx) => (
            <div key={m.id || idx} className="team-rail-card">
              <div className="card-top-accent" style={{ background: m.avatarColor || 'linear-gradient(135deg, #f667c5, #85e3ed)' }} />
              
              <div className="card-header-line">
                <span className="card-dept-badge">{m.dept || 'AISAC'}</span>
                <span className="card-year-badge">{m.year}</span>
              </div>

              <div className="card-photo-wrap">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="card-photo"
                    style={{
                      objectPosition: m.photoPos || 'top center',
                      transform: m.photoTransform || 'none'
                    }}
                    loading="lazy"
                  />
                ) : (
                  <div className="card-avatar-placeholder" style={{ background: m.avatarColor }}>
                    <span className="avatar-initials">{m.initials}</span>
                  </div>
                )}
              </div>

              <div className="card-info">
                <h3 className="card-name">{m.name}</h3>
                <p className="card-role">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
