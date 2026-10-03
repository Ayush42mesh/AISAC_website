import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Users, ArrowUpRight, Search, Sparkles, 
  Flame, CheckCircle2, Rocket, Award, ExternalLink, ChevronRight, X, ShieldAlert 
} from 'lucide-react';

export const eventsList = [
  // ONGOING EVENTS
  {
    id: 'ongoing-1',
    status: 'ongoing',
    statusLabel: 'LIVE NOW',
    title: 'GenAI Prompt Battle 2026',
    category: 'Hackathon & AI Challenge',
    date: 'Oct 02 - Oct 04, 2026',
    time: '24/7 Active Arena',
    venue: 'AI Innovation Lab & Online Discord',
    organizer: 'AISAC Tech Team',
    participants: '180+ Active Coders',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Compete live in real-time LLM prompt crafting, synthetic art generation, and prompt injection defense.',
    description: 'The flagship real-time generative AI showdown. Students hack LLM prompts, design generative art pipelines, and test vulnerabilities in automated AI agents. Top 3 teams win cash prizes and AISAC certificates.',
    highlights: ['Live Leaderboard', 'Free AWS & OpenAI API credits', 'Industry mentors on standby'],
    speakers: ['Prof. Rohan Shetty', 'Devansh Patil (Technical Lead)']
  },
  {
    id: 'ongoing-2',
    status: 'ongoing',
    statusLabel: 'LIVE NOW',
    title: 'CSI CodeSprint 4.0',
    category: 'Competitive Programming',
    date: 'Oct 02 - Oct 03, 2026',
    time: '4:00 PM - 8:00 PM',
    venue: 'Computer Center Lab 3',
    organizer: 'CSI Committee',
    participants: '140 Competitors',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'A fast-paced algorithmic sprint solving dynamic programming, graph theory, and data structures challenges.',
    description: 'Annual flagship competitive coding contest organized by CSI. Test your speed and algorithmic accuracy over 4 intense hours.',
    highlights: ['Unrated Speed Rounds', 'LeetCode style judging system', 'Swag bags for top 10 finish'],
    speakers: ['Chirag Parekh (CSI Tech Head)']
  },

  // UPCOMING EVENTS
  {
    id: 'upcoming-1',
    status: 'upcoming',
    statusLabel: 'UPCOMING',
    title: 'National AI & Autonomous Robotics Expo',
    category: 'Flagship Tech Summit',
    date: 'Oct 15 - Oct 16, 2026',
    time: '10:00 AM - 5:00 PM',
    venue: 'Main College Auditorium & Quadrangle',
    organizer: 'AISAC & CSI Joint Committee',
    participants: '500+ Registrations Expected',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Keynotes from AI industry leaders, live humanoid robot demos, autonomous drone races, and research paper presentations.',
    description: 'The biggest technological showcase of the academic year. Featuring research projects, startup booths, hardware demos, and interactive workshops with leading AI researchers.',
    highlights: ['Keynote by Industry Experts', 'Live Autonomous Robot Track', 'Research Paper Awards'],
    speakers: ['Dr. Alam Shaikh (Principal)', 'Dr. Mahavir Devmane (HOD)', 'Guest Speakers from IIT & Tech Giants']
  },
  {
    id: 'upcoming-2',
    status: 'upcoming',
    statusLabel: 'UPCOMING',
    title: 'Computer Vision & YOLOv11 Bootcamp',
    category: 'Hands-on Workshop',
    date: 'Oct 22, 2026',
    time: '2:00 PM - 6:00 PM',
    venue: 'Seminar Hall B',
    organizer: 'AISAC Technical Wing',
    participants: 'Limited 60 Seats',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Master object detection, real-time video tracking, and edge AI deployment using YOLO and OpenCV.',
    description: 'Comprehensive practical session where students build custom object detection models for surveillance, medical imaging, and robotics.',
    highlights: ['Hands-on GPU notebooks', 'Certificate of Completion', 'Take-home dataset starter pack'],
    speakers: ['Prof. Gitanjali Korgaonkar', 'Sneha Rao (AI/ML Lead)']
  },
  {
    id: 'upcoming-3',
    status: 'upcoming',
    statusLabel: 'UPCOMING',
    title: 'Neural Architecture & Transformer Deep Dive',
    category: 'Masterclass Series',
    date: 'Nov 05, 2026',
    time: '3:00 PM - 5:30 PM',
    venue: 'Virtual & Seminar Hall A',
    organizer: 'AISAC Research Group',
    participants: '120 Registered',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Understand Attention Mechanisms, PyTorch model training from scratch, and fine-tuning Open-Source LLMs.',
    description: 'Deep mathematical breakdown and coding session on Transformer architectures (Attention Is All You Need) and custom model fine-tuning.',
    highlights: ['PyTorch implementation guide', 'HuggingFace ecosystem overview', 'Q&A session with ML researchers'],
    speakers: ['Devansh Patil', 'Ayush Meshram']
  },

  // HOSTED / PAST EVENTS
  {
    id: 'hosted-1',
    status: 'hosted',
    statusLabel: 'COMPLETED',
    title: 'Deep Learning & Neural Networks 101',
    category: 'Workshops',
    date: 'Sep 12, 2026',
    time: 'Full Day Event',
    venue: 'Central Computer Center',
    organizer: 'AISAC Committee',
    participants: '150 Participants Attended',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Foundational workshop introducing backpropagation, multi-layer perceptrons, and PyTorch tensors.',
    description: 'An introductory workshop designed to get 2nd & 3rd-year students started with deep learning fundamentals. Covered binary classification, loss functions, and PyTorch optimization routines.',
    highlights: ['150+ Certificates Issued', 'Project Demo Showcase', '100% Positive Feedback'],
    speakers: ['Prof. Rohan Shetty', 'Ayush Meshram']
  },
  {
    id: 'hosted-2',
    status: 'hosted',
    statusLabel: 'COMPLETED',
    title: 'CSI Web3 & Decentralized Tech Fest 2026',
    category: 'Tech Fest',
    date: 'Aug 25, 2026',
    time: '2-Day Fest',
    venue: 'College Campus Grounds',
    organizer: 'CSI Committee',
    participants: '320 Participants',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Explored smart contracts, Solidity basics, decentralized finance, and zero-knowledge proofs.',
    description: 'A two-day tech extravaganza with hackathons, project displays, guest sessions from blockchain pioneers, and gaming tournaments.',
    highlights: ['Cash Prizes Worth ₹50,000', '12 Project Submissions', 'Industry Sponsorships'],
    speakers: ['Vikramaditya Shah (CSI Chair)', 'Guest Mentors']
  },
  {
    id: 'hosted-3',
    status: 'hosted',
    statusLabel: 'COMPLETED',
    title: 'AISAC Algorithmic Trading & ML Challenge',
    category: 'FinTech & ML Competition',
    date: 'Jul 18, 2026',
    time: 'Overnight Hackathon',
    venue: 'Innovation Hub Lab 1',
    organizer: 'AISAC & CSI Joint Team',
    participants: '95 Teams Participated',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    shortDesc: 'Built machine learning models to forecast financial time series, sentiment analysis, and risk management.',
    description: 'Participants developed automated trading algorithms utilizing historical stock market data, sentiment extraction from news APIs, and reinforcement learning strategies.',
    highlights: ['Winning Model Accuracy 84%', 'Mentorship by Financial Analysts', 'Inter-College Trophy'],
    speakers: ['Dr. Mahavir Devmane', 'Ayush Meshram']
  }
];

export default function EventsPage({ onBackToHome }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = eventsList.filter(e => {
    const matchesFilter = filter === 'all' ? true : e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const ongoingCount = eventsList.filter(e => e.status === 'ongoing').length;
  const upcomingCount = eventsList.filter(e => e.status === 'upcoming').length;
  const hostedCount = eventsList.filter(e => e.status === 'hosted').length;

  return (
    <div className="events-page">
      {/* Page Header Hero */}
      <section className="events-hero section-pad">
        <div className="events-hero-topline">
          <span><i className="live-dot" /> AISAC & CSI EVENTS DASHBOARD</span>
          <span>SEASON 2026 — 2027</span>
        </div>

        <div className="events-hero-title-row">
          <div>
            <h1 className="hero-heading">
              <span className="hero-line"><span>CAMPUS INITIATIVES &</span></span>
              <span className="hero-line lime"><span>HACKATHONS.</span></span>
            </h1>
            <p className="events-hero-desc">
              Discover active workshops, real-time AI competitions, upcoming tech expos, and past event archives hosted by <strong>AISAC & CSI</strong>.
            </p>
          </div>

          {/* Quick Counter Cards */}
          <div className="events-counter-grid">
            <div className="counter-box ongoing">
              <Flame size={20} className="counter-icon" />
              <div className="counter-num">{ongoingCount}</div>
              <div className="counter-label">LIVE NOW</div>
            </div>
            <div className="counter-box upcoming">
              <Rocket size={20} className="counter-icon" />
              <div className="counter-num">{upcomingCount}</div>
              <div className="counter-label">UPCOMING</div>
            </div>
            <div className="counter-box hosted">
              <Award size={20} className="counter-icon" />
              <div className="counter-num">{hostedCount}</div>
              <div className="counter-label">HOSTED</div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="events-filter-bar">
          <div className="filter-tabs" role="group" aria-label="Event Categories">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Sparkles size={14} />
              <span>All Events ({eventsList.length})</span>
            </button>
            <button
              className={`filter-btn ongoing-tab ${filter === 'ongoing' ? 'active' : ''}`}
              onClick={() => setFilter('ongoing')}
            >
              <Flame size={14} />
              <span>Ongoing ({ongoingCount})</span>
            </button>
            <button
              className={`filter-btn upcoming-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              <Rocket size={14} />
              <span>Upcoming ({upcomingCount})</span>
            </button>
            <button
              className={`filter-btn hosted-tab ${filter === 'hosted' ? 'active' : ''}`}
              onClick={() => setFilter('hosted')}
            >
              <Award size={14} />
              <span>Hosted ({hostedCount})</span>
            </button>
          </div>

          <div className="events-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by keyword, topic or workshop..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Events Grid */}
      <main className="events-content section-pad">
        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map(evt => (
              <article key={evt.id} className={`event-card status-${evt.status}`}>
                <div className="event-card-media">
                  <img src={evt.image} alt={evt.title} className="event-img" />
                  <div className="event-badge-wrap">
                    {evt.status === 'ongoing' && (
                      <span className="badge badge-ongoing">
                        <span className="pulse-ring" />
                        <Flame size={12} /> {evt.statusLabel}
                      </span>
                    )}
                    {evt.status === 'upcoming' && (
                      <span className="badge badge-upcoming">
                        <Rocket size={12} /> {evt.statusLabel}
                      </span>
                    )}
                    {evt.status === 'hosted' && (
                      <span className="badge badge-hosted">
                        <CheckCircle2 size={12} /> {evt.statusLabel}
                      </span>
                    )}
                    <span className="category-pill">{evt.category}</span>
                  </div>
                </div>

                <div className="event-card-body">
                  <div className="event-meta-line">
                    <span><Calendar size={13} /> {evt.date}</span>
                    <span><Clock size={13} /> {evt.time}</span>
                  </div>

                  <h3 className="event-card-title">{evt.title}</h3>
                  <p className="event-card-desc">{evt.shortDesc}</p>

                  <div className="event-venue-line">
                    <MapPin size={13} /> <span>{evt.venue}</span>
                  </div>

                  <div className="event-card-footer">
                    <span className="participants-count">
                      <Users size={13} /> {evt.participants}
                    </span>
                    <button
                      className="button-view-details"
                      onClick={() => setSelectedEvent(evt)}
                    >
                      DETAILS <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="events-empty">
            <ShieldAlert size={48} className="empty-icon" />
            <h3>No events found matching your search.</h3>
            <p>Try clearing your search query or selecting a different category filter.</p>
            <button className="button button-lime" onClick={() => { setFilter('all'); setSearchQuery(''); }}>
              RESET FILTERS
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="events-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="events-modal-content" onClick={e => e.stopPropagation()}>
            <button className="events-modal-close" onClick={() => setSelectedEvent(null)} aria-label="Close modal">
              <X size={20} />
            </button>

            <div className="events-modal-grid">
              <div className="modal-media-col">
                <img src={selectedEvent.image} alt={selectedEvent.title} />
                <div className="modal-quick-meta">
                  <div>
                    <strong>ORGANIZER</strong>
                    <span>{selectedEvent.organizer}</span>
                  </div>
                  <div>
                    <strong>PARTICIPANTS</strong>
                    <span>{selectedEvent.participants}</span>
                  </div>
                </div>
              </div>

              <div className="modal-info-col">
                <span className={`modal-status-badge status-${selectedEvent.status}`}>
                  {selectedEvent.statusLabel} · {selectedEvent.category}
                </span>

                <h2>{selectedEvent.title}</h2>
                <p className="modal-description">{selectedEvent.description}</p>

                <div className="modal-meta-grid">
                  <div>
                    <Calendar size={16} />
                    <div>
                      <strong>WHEN</strong>
                      <span>{selectedEvent.date} ({selectedEvent.time})</span>
                    </div>
                  </div>
                  <div>
                    <MapPin size={16} />
                    <div>
                      <strong>WHERE</strong>
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section-title">KEY HIGHLIGHTS</div>
                <ul className="modal-highlights-list">
                  {selectedEvent.highlights.map((h, idx) => (
                    <li key={idx}><CheckCircle2 size={14} className="check-icon" /> {h}</li>
                  ))}
                </ul>

                <div className="modal-section-title">SPEAKERS & MENTORS</div>
                <div className="modal-speakers-tags">
                  {selectedEvent.speakers.map((s, idx) => (
                    <span key={idx} className="speaker-tag">{s}</span>
                  ))}
                </div>

                <div className="modal-action-row">
                  {selectedEvent.status === 'ongoing' && (
                    <button className="button button-lime" onClick={() => alert('Redirecting to Live Event Workspace / Portal...')}>
                      ENTER LIVE ARENA <ArrowUpRight size={18} />
                    </button>
                  )}
                  {selectedEvent.status === 'upcoming' && (
                    <button className="button button-lime" onClick={() => alert('Demo Registration Saved! Official seat pass issued.')}>
                      REGISTER FOR EVENT <ArrowUpRight size={18} />
                    </button>
                  )}
                  {selectedEvent.status === 'hosted' && (
                    <button className="button button-dark" onClick={() => alert('Opening Event Media & Winners Gallery...')}>
                      VIEW HIGHLIGHTS GALLERY <ExternalLink size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <footer className="team-footer section-pad">
        <div className="team-footer-box">
          <h2>HAVE AN IDEA FOR AN EVENT?</h2>
          <p>AISAC & CSI encourage student initiatives! Pitch your technical workshop, hackathon topic, or guest seminar to our team.</p>
          <button className="button button-lime" onClick={onBackToHome}>
            BACK TO HOMEPAGE <ArrowUpRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
}
