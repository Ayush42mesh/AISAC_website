import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, Plus, Minus, X, Check, Menu, MoveUpRight, MapPin, CalendarDays, Mail, Phone, BrainCircuit, Target, Rocket, Zap, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { events } from './events';
import Poster from './Poster';
import ArcadeObject from './ArcadeObject';
import useScrollMotion from './useScrollMotion';
import TeamPage from './TeamPage';
import EventsPage from './EventsPage';
import ContactPage from './ContactPage';
import RotatingEventsSection from './RotatingEventsSection';
import ScrollingEventsMarquee from './ScrollingEventsMarquee';
import './style.css';

const featured = [events[0], events[1], events[2], events[3], events[8], events[11]];
const faqs = [
  ['Do I need to be good at AI or programming?', 'Absolutely not. AISAC welcomes students from all backgrounds and years! Our workshops and events are structured for beginners and experts alike.'],
  ['Who can join AISAC events?', 'Every student on campus is welcome. Bring your friends, join a project team, or drop in solo to learn and network with fellow tech enthusiasts.'],
  ['What should I bring to workshops?', 'Your student ID, a laptop if you want to follow along with live code modules, and an open mind. We provide guidance and learning resources.'],
  ['How do I join the official committee?', 'Check out the Team page to see our committee departments. Executive and head applications open at the start of every academic season.']
];

const staffMembers = [
  {
    id: 1,
    name: 'Prof. Gitanjali Korgaonkar',
    role: 'Staff Co-ordinator',
    image: '/assets/prof-gitanjali.png',
    bio: 'Guiding AISAC student leadership, driving academic excellence, and coordinating student development initiatives.'
  },
  {
    id: 2,
    name: 'Prof. Rohan Shetty',
    role: 'Staff Co-ordinator',
    image: '/assets/prof-rohan.png',
    bio: 'Mentoring project teams, technical workshops, hackathons, and fostering student industry interaction.'
  },
  {
    id: 3,
    name: 'Dr. Mahavir Devmane',
    role: 'Head of Department',
    image: '/assets/dr-mahavir.png',
    bio: 'Leading the AI & Computer Engineering department towards research excellence, innovation, and cutting-edge labs.'
  },
  {
    id: 4,
    name: 'Dr. Alam Shaikh',
    role: 'Principal',
    image: '/assets/dr-alam.png',
    bio: 'Visionary educational leader championing technological innovation, academic brilliance, and student leadership.'
  }
];

function Star({ className = '' }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true"><path d="M50 0L58 30L80 10L70 40L100 50L70 58L90 80L60 70L50 100L42 70L20 90L30 60L0 50L30 42L10 20L40 30Z" fill="currentColor" /></svg>;
}

function App() {
  const root = useRef();
  const dialog = useRef();
  const lastFocus = useRef();

  const [modal, setModal] = useState(null);
  const [chosen, setChosen] = useState(events[0]);
  const [saved, setSaved] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [filter, setFilter] = useState('All nights');
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState('home');

  useScrollMotion(root);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#team') {
        setPage('home');
        setTimeout(() => {
          const el = document.getElementById('team');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (window.location.hash === '#contact') {
        setPage('home');
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else if (window.location.hash === '#events-home' || window.location.hash === '#events-page' || window.location.hash === '#events') {
        setPage('home');
        setTimeout(() => {
          const el = document.getElementById('events-home');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        setPage('home');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const d = dialog.current;
    d.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      d.close();
      document.body.style.overflow = previous;
      lastFocus.current?.focus({ preventScroll: true });
    };
  }, [!!modal]);

  const open = (type, event) => {
    lastFocus.current = document.activeElement;
    if (event) setChosen(event);
    setSaved(false);
    setModal(type);
  };

  const close = () => setModal(null);

  const goTo = (targetPage, sectionId) => {
    setMenu(false);
    if (targetPage === 'team') {
      setPage('home');
      window.location.hash = '#team';
      setTimeout(() => {
        const el = document.getElementById('team');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (targetPage === 'contact') {
      setPage('home');
      window.location.hash = '#contact';
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (targetPage === 'events') {
      setPage('home');
      window.location.hash = '#events-home';
      setTimeout(() => {
        const el = document.getElementById('events-home');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      setPage('home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.location.hash = '#top';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const shownEvents = events.filter(e => filter === 'All nights' || e.category === filter);

  return (
    <div ref={root} className="site">
      <a className="skip-link" href="#about">Skip to content</a>
      <div className="page-progress" aria-hidden="true" />

      <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); goTo('home'); }}>
          <img src="/assets/aisac-logo.png" alt="AISAC Logo" className="brand-logo" />
          AISAC<span className="trademark">™</span>
        </a>

        <nav className={menu ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
          <a href="#top" onClick={() => goTo('home')} className={page === 'home' && (!window.location.hash || window.location.hash === '#top') ? 'active-nav' : ''}>HOME<span></span></a>
          <a href="#about" onClick={() => goTo('home', 'about')}>ABOUT<span></span></a>
          <a href="#staff" onClick={() => goTo('home', 'staff')}>STAFF<span></span></a>
          <a href="#team" onClick={() => goTo('team')} className={page === 'home' && window.location.hash === '#team' ? 'active-nav' : ''}>TEAM<span></span></a>
          <a href="#events-home" onClick={(e) => { e.preventDefault(); goTo('events'); }}>EVENTS<span></span></a>
          <a href="#contact" onClick={() => goTo('contact')} className={page === 'home' && window.location.hash === '#contact' ? 'active-nav' : ''}>CONTACT<span></span></a>
        </nav>

        <a className="header-cta" href="#events-page" onClick={(e) => { e.preventDefault(); goTo('events'); }}>
          EXPLORE EVENTS <ArrowUpRight size={17} />
        </a>

        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>

        <main>
          <section className="hero" id="top" aria-labelledby="hero-heading">
            <div className="hero-media">
              <img className="hero-photo" src="/assets/arcade-night.png" alt="Neon-lit arcade cabinets reflected across the floor, with friends playing in the distance" fetchPriority="high" />
              <div className="hero-shade" />
              <div className="film-grain" />
            </div>

            <div className="hero-topline fade-in">
              <span><i /> Together We Innovate.</span>
              <span>SEASON 2026-2027</span>
            </div>

            <div className="hero-copy">
              <p className="hero-kicker fade-in">Connect. Create. Conquer.</p>
              <h1 id="hero-heading">
                <span className="hero-line"><span>AISAC</span></span>
                <span className="hero-line pink"><span>Artificial Intelligence Students Association Committee</span></span>
              </h1>
              <div className="hero-description fade-in">
                <p>Empowering Minds, Inspiring Innovation, Building Leaders.<br />Creating a Future Driven by Technology, Creativity, and Collaboration.</p>
              </div>
            </div>

            <div className="hero-collectible">
              <ArcadeObject type="cabinet" hero />
              <span className="collectible-caption">01 / THE ORIGINAL PLAY STATION</span>
            </div>

            <div className="hero-bottom">
              <a className="scroll-cue" href="#about">
                <span className="scroll-circle"><ArrowDown size={18} /></span>
                <span>EXPLORE AISAC</span>
              </a>

              <div className="hero-coordinates">
                <span>HEADQUARTERS</span><br />
                CAMPUS TECH HUB
              </div>
            </div>
          </section>

          <section className="ticker" aria-label="Keywords stream">
            <div className="ticker-track">
              <span>WORKSHOPS</span> <Star />
              <span>HACKATHONS</span> <Star />
              <span>AI RESEARCH</span> <Star />
              <span>COMMUNITY</span> <Star />
              <span>INNOVATION</span> <Star />
              <span>WORKSHOPS</span> <Star />
              <span>HACKATHONS</span> <Star />
              <span>AI RESEARCH</span> <Star />
            </div>
          </section>

          <section className="about section-pad" id="about" aria-labelledby="about-heading">
            <div className="section-label">
              <span>01 / WHO WE ARE</span>
              <span>DRIVING AI EXCELLENCE & COLLABORATION</span>
            </div>

            <div className="about-hero-header" data-reveal>
              <div className="about-badge-pill">
                <BrainCircuit size={16} className="badge-icon" />
                <span>AISAC & CSI STUDENT CHAPTER</span>
              </div>
              <h2 id="about-heading" className="about-title">
                PIONEERING <span className="pink">ARTIFICIAL INTELLIGENCE</span><br />
                FOR TOMORROW'S LEADERS.
              </h2>
              <p className="about-subtitle">
                Where theoretical machine learning meets real-world execution. We provide students with cut-edge AI labs, high-stakes hackathons, and a thriving community of tech innovators.
              </p>
            </div>

            <div className="about-pro-grid">
              {/* Card 1: Identity */}
              <div className="about-pro-card identity-card" data-reveal>
                <div className="card-topline">
                  <span className="card-index">01</span>
                  <span className="card-tag"><Sparkles size={13} /> OUR IDENTITY</span>
                </div>
                <div className="card-icon-header">
                  <BrainCircuit size={32} className="card-feature-icon" />
                  <h3 className="card-title">Vibrant Student AI Community</h3>
                </div>
                <p className="card-body">
                  <strong>AISAC</strong> is a student-driven ecosystem dedicated to advancing AI knowledge, fostering technical creativity, and inspiring real-world innovation across research, software engineering, and outreach.
                </p>
                <div className="card-pill-tags">
                  <span>#Research</span>
                  <span>#Development</span>
                  <span>#Community</span>
                </div>
                <div className="card-footer-accent">
                  <span className="accent-dot lime" />
                  <span>RESEARCH · DEVELOPMENT · OUTREACH</span>
                </div>
              </div>

              {/* Card 2: Mission */}
              <div className="about-pro-card highlight-card mission-card" data-reveal>
                <div className="card-topline">
                  <span className="card-index">02</span>
                  <span className="card-tag"><Target size={13} /> OUR MISSION</span>
                </div>
                <div className="card-icon-header">
                  <Target size={32} className="card-feature-icon pink" />
                  <h3 className="card-title">Bridge Theory & Real-World AI</h3>
                </div>
                <p className="card-body">
                  We bridge the gap between academic algorithms and industry deployment through hands-on hackathons, intensive ML workshops, and collaborative open-source AI projects.
                </p>
                <div className="card-pill-tags">
                  <span>#Hackathons</span>
                  <span>#ML-Modules</span>
                  <span>#NeuralNets</span>
                </div>
                <div className="card-footer-accent">
                  <span className="accent-dot pink" />
                  <span>WORKSHOPS · HACKATHONS · ML MODULES</span>
                </div>
              </div>

              {/* Card 3: Vision */}
              <div className="about-pro-card vision-card" data-reveal>
                <div className="card-topline">
                  <span className="card-index">03</span>
                  <span className="card-tag"><Rocket size={13} /> OUR VISION</span>
                </div>
                <div className="card-icon-header">
                  <Rocket size={32} className="card-feature-icon cyan" />
                  <h3 className="card-title">Future-Ready Tech Leaders</h3>
                </div>
                <p className="card-body">
                  Empowering every student with cutting-edge artificial intelligence capabilities, ethical technology awareness, and the leadership mindset to shape the technological future.
                </p>
                <div className="card-pill-tags">
                  <span>#EthicalAI</span>
                  <span>#Leadership</span>
                  <span>#Innovation</span>
                </div>
                <div className="card-footer-accent">
                  <span className="accent-dot cyan" />
                  <span>ETHICAL AI · INNOVATION · LEADERSHIP</span>
                </div>
              </div>
            </div>

            {/* Dynamic Pillars Grid */}
            <div className="about-pillars-grid" data-reveal>
              <div className="pillar-item">
                <Zap size={22} className="pillar-icon lime" />
                <div>
                  <h4>Hands-on AI Workshops</h4>
                  <p>Master PyTorch, Transformers, LLMs, and Computer Vision with live coding.</p>
                </div>
              </div>
              <div className="pillar-item">
                <Award size={22} className="pillar-icon pink" />
                <div>
                  <h4>Hackathons & Sprints</h4>
                  <p>Compete, build working prototypes, and win prizes in 24-hour hackathons.</p>
                </div>
              </div>
              <div className="pillar-item">
                <ShieldCheck size={22} className="pillar-icon cyan" />
                <div>
                  <h4>Industry & Faculty Mentorship</h4>
                  <p>Learn directly from expert professors, industry engineers, and alum leaders.</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats" data-reveal>
              <div className="stat-box">
                <strong>15+</strong>
                <p>MAJOR EVENTS HOSTED</p>
              </div>
              <div className="stat-box">
                <strong>500+</strong>
                <p>ACTIVE PARTICIPANTS</p>
              </div>
              <div className="stat-box">
                <strong>10+</strong>
                <p>HANDS-ON WORKSHOPS</p>
              </div>
              <div className="stat-box">
                <strong className="pink">∞</strong>
                <p>INNOVATIONS AHEAD.</p>
              </div>
            </div>
          </section>

          <section className="lineup section-pad" id="staff" aria-labelledby="staff-heading">
            <div className="lineup-shell">
              <div className="lineup-head">
                <div className="section-label">
                  <span>02 / LEADERSHIP & MENTORSHIP</span>
                  <span>FACULTY COORDINATORS & INSTITUTION HEADS</span>
                </div>

                <div className="lineup-title">
                  <h2 id="staff-heading">OUR FACULTY &<br /><span>STAFF MENTORS.</span></h2>
                  <div className="lineup-description">
                    <p>Empowering minds and inspiring technological innovation under the guidance of our esteemed faculty.</p>
                  </div>
                </div>

                <div className="staff-grid">
                  {staffMembers.map(staff => (
                    <div className="staff-card" key={staff.id} data-reveal>
                      <div className="staff-photo-wrap">
                        <img src={staff.image} alt={staff.name} className="staff-photo" />
                        <span className="staff-badge">{staff.role}</span>
                      </div>
                      <div className="staff-info">
                        <div>
                          <span className="staff-index">0{staff.id}</span>
                          <h3>{staff.name}</h3>
                          <p className="staff-role">{staff.role}</p>
                        </div>
                        <p className="staff-bio">{staff.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="interlude" aria-label="Good company, great stories">
            <img src="/assets/arcade-night.png" alt="" loading="lazy" />
            <div className="interlude-overlay" />
            <Star className="interlude-icon" />
            <div className="interlude-caption">
              <span>THE REAL HIGH SCORE?</span>
              <span>THE PEOPLE YOU MEET.</span>
            </div>
            <div className="interlude-text">Don’t just be a spectator—be part of the action!</div>
          </section>

          {/* Integrated Animated Team Section */}
          <section className="team-home-wrap section-pad" id="team">
            <TeamPage onBackToHome={() => goTo('home')} isEmbedded={true} />
          </section>

          {/* 3D Circular Rotating Events Section */}
          <RotatingEventsSection onSelectEvent={(e) => open('detail', e)} />

          {/* <section className="schedule section-pad" id="schedule" aria-labelledby="schedule-heading">
            <div className="section-label">
              <span>04 / MAKE SOME PLANS</span>
              <span>OCTOBER 2026. AFTER CLASS.</span>
            </div>

            <div className="schedule-head" data-reveal>
              <h2 id="schedule-heading">CLEAR YOUR<br /><span>CALENDAR.</span></h2>
              <p>All nights kick off at 6 PM.<br />Bring your student ID and your people.<br />We’ll take care of the rest.</p>
            </div>

            <div className="schedule-table">
              {events.slice(0, 6).map(e => (
                <button className="schedule-row" data-reveal key={e.id} onClick={() => open('detail', e)} aria-label={`${e.date}, ${e.title}, view event`}>
                  <span className="schedule-date">
                    <strong>{e.date.slice(0, 2)}</strong>
                    <span>OCT<br />FRIENDS WELCOME</span>
                  </span>

                  <span className="schedule-event">
                    <strong>{e.title}</strong>
                    <span>{e.subtheme}</span>
                  </span>

                  <span className="schedule-venue">{e.venue}</span>
                  <span className="schedule-time">6:00 PM</span>
                  <span className="schedule-arrow"><ArrowUpRight size={24} /></span>
                </button>
              ))}
            </div>

            <div className="schedule-bottom">
              <span>EXPLORE ALL AISAC & CSI INITIATIVES.</span>
              <button className="inline-link" onClick={() => goTo('events')}>EXPLORE EVENTS PAGE <ArrowRight size={18} /></button>
            </div>
          </section> */}

          <section className="faq section-pad" aria-labelledby="faq-heading">
            <div className="faq-intro">
              <div className="section-label">A FEW THINGS TO KNOW</div>
              <h2 id="faq-heading">NEW HERE?<br />SO IS EVERYONE.</h2>
              <Star />
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], i) => (
                <div className="faq-item" key={question}>
                  <h3>
                    <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i} aria-controls={`faq-${i}`}>
                      {question}
                      {openFaq === i ? <Minus size={18} /> : <Plus size={18} />}
                    </button>
                  </h3>
                  <div id={`faq-${i}`} hidden={openFaq !== i}>
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Integrated Contact Section Above Reserve Closing */}
          <section className="contact-home-wrap" id="contact">
            <ContactPage onBackToHome={() => goTo('home')} onGoToEvents={() => goTo('events')} />
          </section>

          <section className="closing section-pad" id="reserve" aria-labelledby="reserve-heading">
            <div className="section-label">
              <span>05 / COME AS YOU ARE</span>
              <span>GO HOME WITH A STORY.</span>
            </div>

            <div className="closing-body">
              <div className="closing-title">
                <h2 id="reserve-heading">
                  <span className="title-line"><span>YOUR ENERGY.</span></span>
                  <span className="title-line"><span>YOUR MOMENT.</span></span>
                  <span className="title-line outline"><span>YOUR MOVE.</span></span>
                </h2>
              </div>

              <div className="closing-action" data-reveal>
                <p>DON’T JUST WATCH<br />THE MOMENT. LIVE IT HERE.</p>
                <button className="reserve-button" onClick={() => goTo('events')}>
                  <span>EXPLORE<br />EVENTS</span>
                  <MoveUpRight size={50} strokeWidth={1.5} />
                </button>
                <span className="closing-small">OPEN TO EVERY STUDENT.<br />GOOD VIBES INCLUDED.</span>
              </div>
            </div>

            <div className="closing-bottom">
              <span>NO EXPERIENCE NEEDED.</span>
              <Star />
              <span>JUST PRESS START.</span>
            </div>
          </section>
        </main>

      <footer className="site-footer section-pad">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <a className="footer-logo" href="#top" onClick={(e) => { e.preventDefault(); goTo('home'); }}>
              <img src="/assets/aisac-logo.png" alt="AISAC Logo" className="footer-brand-logo" />
              AISAC<span>™</span>
            </a>
            <p className="footer-brand-desc">
              Artificial Intelligence Students Association Committee.<br />
              Empowering Minds, Inspiring Innovation, Building Leaders.
            </p>
          </div>

          <div className="footer-col nav-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-nav-list">
              <li><a href="#top" onClick={(e) => { e.preventDefault(); goTo('home'); }}>HOME</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); goTo('home', 'about'); }}>ABOUT</a></li>
              <li><a href="#staff" onClick={(e) => { e.preventDefault(); goTo('home', 'staff'); }}>STAFF</a></li>
              <li><a href="#events-page" onClick={(e) => { e.preventDefault(); goTo('events'); }}>EVENTS</a></li>
              <li><a href="#team" onClick={(e) => { e.preventDefault(); goTo('team'); }}>THE TEAM</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); goTo('contact'); }}>CONTACT</a></li>
            </ul>
          </div>

          <div className="footer-col contact-col">
            <h4 className="footer-col-title">GET IN TOUCH</h4>
            <div className="footer-contact-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:aisac.vpp@gmail.com">aisac.vpp@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <Phone size={16} className="contact-icon" />
              <div className="phone-numbers">
                <a href="tel:+919892409460">+91 9892409460</a>
                <a href="tel:+917738773167">+91 7738773167</a>
              </div>
            </div>
          </div>

          <div className="footer-col top-col">
            <a className="back-to-top" href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              BACK TO TOP <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AISAC. ALL RIGHTS RESERVED.</span>
          <span>TOGETHER WE INNOVATE.</span>
          <span>SEASON 2026 — 2027</span>
        </div>
      </footer>

      {modal && (
        <dialog
          ref={dialog}
          aria-labelledby="dialog-heading"
          className={`modal modal-${modal}`}
          onCancel={e => { e.preventDefault(); close(); }}
          onClick={e => {
            if (e.target === dialog.current) {
              const r = e.currentTarget.getBoundingClientRect();
              if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close();
            }
          }}
        >
          <button className="modal-close" onClick={close} aria-label="Close dialog">
            <X size={22} />
          </button>

          {modal === 'detail' && (
            <div className="detail-layout">
              <div className="detail-poster">
                <Poster event={chosen} />
                <span className="detail-poster-label">WORLD {String(chosen.id + 1).padStart(2, '0')} / {chosen.subtheme}</span>
              </div>

              <div className="detail-copy">
                <span className="section-label">FULL EVENT DETAILS & DESCRIPTION</span>
                <h2 id="dialog-heading">{chosen.title}<span>.</span></h2>
                <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#dedcd2', marginTop: '14px' }}>
                  {chosen.description}
                </p>
                <dl className="detail-meta">
                  <div>
                    <dt><CalendarDays size={16} /> WHEN</dt>
                    <dd>{chosen.date} 2026 · {chosen.time}</dd>
                  </div>
                  <div>
                    <dt><MapPin size={16} /> WHERE</dt>
                    <dd>{chosen.venue}</dd>
                  </div>
                </dl>
                <button className="button button-dark" onClick={() => { setSaved(false); setModal('reserve'); }}>
                  SAVE ME A SPOT <ArrowUpRight size={20} />
                </button>
                <button className="detail-back" onClick={close}>
                  <ArrowLeft size={15} /> BACK TO EXPLORING
                </button>

                {/* SCROLLING ANIMATION OF EVENTS BELOW DETAILS */}
                <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', width: '100%' }}>
                  <ScrollingEventsMarquee onSelectEvent={(e) => setChosen(e)} title="MORE EVENTS STREAM" compact={true} />
                </div>
              </div>
            </div>
          )}

          {modal === 'reserve' && (
            <div className="detail-layout">
              <div className="detail-copy" style={{ width: '100%', maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
                <span className="section-label" style={{ justifyContent: 'center' }}>🎉 RESERVATION CONFIRMED</span>
                <h2 id="dialog-heading" style={{ fontSize: '38px', marginTop: '12px' }}>YOU'RE REGISTERED FOR {chosen.title}!<span>.</span></h2>
                <p style={{ marginTop: '16px', fontSize: '15px', color: '#dedcd2', lineHeight: '1.7' }}>
                  Your spot has been successfully reserved for <strong>{chosen.title} ({chosen.subtheme})</strong> on <strong>{chosen.date} 2026 at {chosen.time}</strong> located at <strong>{chosen.venue}</strong>.
                </p>
                <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button className="button button-lime" onClick={close}>
                    DONE / CLOSE POPUP <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </dialog>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
