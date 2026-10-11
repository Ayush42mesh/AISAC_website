import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { Sparkles, ShieldCheck, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heads, members } from './teamData';

gsap.registerPlugin(ScrollTrigger);

export default function TeamPage({ isEmbedded = false }) {
  const [activeCategory, setActiveCategory] = useState('heads'); // 'heads' | 'members'

  const shellRef = useRef(null);
  const wrapperRef = useRef(null);
  const railRef = useRef(null);
  const progressFillRef = useRef(null);
  const stRef = useRef(null);
  const distanceRef = useRef(0);
  const totalEndRef = useRef(0);

  const displayedList = useMemo(() => {
    return activeCategory === 'heads' ? heads : members;
  }, [activeCategory]);

  const handleTabSwitch = (category) => {
    if (category === activeCategory) return;
    setActiveCategory(category);

    // If the user has scrolled into the pinned section,
    // cleanly reset scroll back to the start of the section so they start at card 1
    if (stRef.current) {
      const st = stRef.current;
      if (window.scrollY > st.start + 10) {
        window.scrollTo({ top: st.start, behavior: 'instant' });
      }
    }
  };

  const handleManualMove = (direction) => {
    const st = stRef.current;
    const distance = distanceRef.current;
    const totalEnd = totalEndRef.current;
    if (!st || !distance || distance <= 0) return;

    const screenWidth = window.innerWidth;
    const cardStep = screenWidth < 768 ? 230 : 285;
    const scrollStep = (cardStep / distance) * (distance / (totalEnd || distance));

    let currentProgress = st.progress || 0;
    let targetProgress = direction === 'next'
      ? currentProgress + scrollStep
      : currentProgress - scrollStep;

    targetProgress = Math.max(0, Math.min(1, targetProgress));
    const targetScroll = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Responsive Scroll-Driven Horizontal Animation with ScrollTrigger
  useLayoutEffect(() => {
    const shell = shellRef.current;
    const rail = railRef.current;
    if (!shell || !rail || displayedList.length === 0) return;

    // Reset rail position initially
    gsap.set(rail, { x: 0, force3D: true });
    if (progressFillRef.current) {
      progressFillRef.current.style.width = '0%';
    }

    const ctx = gsap.context(() => {
      const calcDimensions = () => {
        const railWidth = rail.scrollWidth;
        const containerWidth = shell.clientWidth || window.innerWidth;
        const distance = Math.max(0, railWidth - containerWidth + 60);
        distanceRef.current = distance;

        // Generous resting buffer at the end so the final member cards stay stationary
        // and do NOT violently pop into the Events page during the animation
        const restBuffer = Math.max(window.innerHeight * 0.45, 400);
        const totalEnd = distance + restBuffer;
        totalEndRef.current = totalEnd;
        return { distance, totalEnd };
      };

      const { distance, totalEnd } = calcDimensions();
      if (distance <= 0) return;

      const st = ScrollTrigger.create({
        trigger: shell,
        start: isEmbedded ? 'top 15px' : 'top top',
        end: () => `+=${totalEndRef.current || totalEnd}`,
        pin: true,
        scrub: 0.35, // Responsive catch-up so animation never lags behind the scroll
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const currentDistance = distanceRef.current;
          const currentTotalEnd = totalEndRef.current;
          if (!currentDistance || !currentTotalEnd) return;

          // The horizontal translation covers 0 to distance
          // The rest of the scroll is the comfortable resting buffer at the end
          const animRatio = currentDistance / currentTotalEnd;
          const animProgress = Math.min(1, Math.max(0, self.progress / animRatio));

          const currentX = animProgress * currentDistance;
          gsap.set(rail, { x: -currentX, force3D: true });

          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${Math.min(100, animProgress * 100)}%`;
          }
        }
      });

      stRef.current = st;
      return () => {
        st.kill();
        stRef.current = null;
      };
    }, shellRef);

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', onResize);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [displayedList, activeCategory, isEmbedded]);

  // Touch and drag swipe support for member cards on mobile / trackpads
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let touchStartX = 0;
    let isTouch = false;

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      isTouch = true;
    };

    const onTouchMove = (e) => {
      if (!isTouch || !stRef.current) return;
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      if (Math.abs(diff) > 10) {
        const st = stRef.current;
        const targetScroll = window.scrollY + diff * 1.5;
        window.scrollTo({ top: Math.max(st.start, Math.min(st.end, targetScroll)), behavior: 'auto' });
        touchStartX = touchX;
      }
    };

    const onTouchEnd = () => {
      isTouch = false;
    };

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });
    wrapper.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
    };
  }, [displayedList, activeCategory]);

  const totalCount = displayedList.length;

  return (
    <div className={`team-page-pinned ${isEmbedded ? 'embedded' : ''}`} ref={shellRef}>
      <div className="team-hero-header">
        <div className="section-label">
          <span>03 / COMMITTEE TEAMS</span>
          <span className="team-status-count">{totalCount} {activeCategory.toUpperCase()} ACTIVE<span className="team-scroll-hint"> · SCROLL OR SLIDE</span></span>
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
                onClick={() => handleTabSwitch('heads')}
              >
                <ShieldCheck size={16} />
                <span>HEADS</span>
              </button>

              <button
                role="tab"
                aria-selected={activeCategory === 'members'}
                className={`committee-tab ${activeCategory === 'members' ? 'active' : ''}`}
                onClick={() => handleTabSwitch('members')}
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
      <div className="team-rail-wrapper" ref={wrapperRef}>
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
