import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import { Sparkles, ShieldCheck, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heads, members } from './teamData';

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage({ isEmbedded = false }) {
  const [activeCategory, setActiveCategory] = useState('heads'); // 'heads' | 'members'

  const shellRef = useRef(null);
  const railRef = useRef(null);
  const progressFillRef = useRef(null);

  const displayedList = useMemo(() => {
    return activeCategory === 'heads' ? heads : members;
  }, [activeCategory]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const rail = railRef.current;
    if (!shell || !rail || displayedList.length === 0) return;

    const ctx = gsap.context(() => {
      const getDistance = () => {
        const railWidth = rail.scrollWidth;
        const containerWidth = shell.clientWidth;
        return Math.max(0, railWidth - containerWidth + 100);
      };

      const distance = getDistance();
      if (distance <= 0) return;

      const st = ScrollTrigger.create({
        trigger: shell,
        start: 'top top-=200',
        end: () => `+=${getDistance() * 1.3}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: self => {
          gsap.set(rail, { x: -self.progress * distance });
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
          <span>{totalCount} {activeCategory.toUpperCase()} ACTIVE · SCROLL DOWN TO SLIDE CARDS</span>
        </div>

        <div className="team-hero-title-row">
          <h2 className="team-heading">
            <span>MEET THE</span><br />
            <span className="pink">LEADERS & CREATORS.</span>
          </h2>
          <p className="team-hero-desc">
            The visionary minds, engineers, organizers, and creators behind our association.
          </p>
        </div>

        {/* Controls Bar: Only Heads & Members Options */}
        <div className="team-controls-bar" style={{ justifyContent: 'center' }}>
          <div className="committee-tabs" role="tablist" aria-label="Team View Selector">
            <button
              role="tab"
              aria-selected={activeCategory === 'heads'}
              className={`committee-tab ${activeCategory === 'heads' ? 'active' : ''}`}
              onClick={() => setActiveCategory('heads')}
            >
              <ShieldCheck size={18} />
              <span>HEADS</span>
            </button>

            <button
              role="tab"
              aria-selected={activeCategory === 'members'}
              className={`committee-tab ${activeCategory === 'members' ? 'active' : ''}`}
              onClick={() => setActiveCategory('members')}
            >
              <Users size={18} />
              <span>MEMBERS</span>
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar Indicator */}
        <div className="team-rail-progress-track">
          <div className="team-rail-progress-fill" ref={progressFillRef} />
        </div>
      </div>

      {/* HORIZONTAL RAIL OF RECTANGULAR CARDS */}
      <div className="team-rail-wrapper">
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
