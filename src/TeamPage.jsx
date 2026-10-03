import React, { useState } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight, ShieldCheck, Cpu, FileText, Users, Wrench, Palette, Sparkles, Award } from 'lucide-react';
import { committees, teamSections, teamMembers } from './teamData';

const sectionIcons = {
  leadership: ShieldCheck,
  technical: Cpu,
  documentation: FileText,
  pro: Users,
  infra: Wrench,
  creativity: Palette
};

export default function TeamPage({ onBackToHome }) {
  const [activeTab, setActiveTab] = useState('aisac');
  const [activeSectionFilter, setActiveSectionFilter] = useState('all');

  const currentCommittee = committees.find(c => c.id === activeTab) || committees[0];
  const committeeData = teamMembers[activeTab] || {};

  const filteredSections = activeSectionFilter === 'all'
    ? teamSections
    : teamSections.filter(s => s.id === activeSectionFilter);

  return (
    <div className="team-page">
      {/* Team Page Hero Banner */}
      <section className="team-hero section-pad">
        <div className="team-hero-topline">
          <span><i /> THE PEOPLE OF AISAC & CSI & ISTE</span>
          <span>SEASON 2026 — 2027</span>
        </div>

        <div className="team-hero-title">
          <h1 className="hero-heading">
            <span className="hero-line"><span>MEET THE</span></span>
            <span className="hero-line pink"><span>LEADERS & CREATORS.</span></span>
          </h1>
          <p className="team-hero-desc">
            The visionary minds, engineers, organizers, and creators behind <strong>{currentCommittee.name}</strong> ({currentCommittee.fullName}).
          </p>
        </div>

        {/* Main Committee Switcher (AISAC vs CSI) */}
        <div className="committee-switcher-wrap">
          <div className="committee-tabs" role="tablist" aria-label="Committee Selector">
            {committees.map(c => (
              <button
                key={c.id}
                role="tab"
                aria-selected={activeTab === c.id}
                className={`committee-tab ${activeTab === c.id ? 'active' : ''}`}
                onClick={() => setActiveTab(c.id)}
              >
                <Sparkles size={16} />
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          {/* Sub-section Filter Pills */}
          <div className="section-filter-pills" role="group" aria-label="Section Filter">
            <button
              className={`pill ${activeSectionFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveSectionFilter('all')}
            >
              All Teams
            </button>
            {teamSections.map(s => {
              const Icon = sectionIcons[s.id] || Award;
              return (
                <button
                  key={s.id}
                  className={`pill ${activeSectionFilter === s.id ? 'active' : ''}`}
                  onClick={() => setActiveSectionFilter(s.id)}
                >
                  <Icon size={14} />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Team Content Sections */}
      <main className="team-content section-pad">
        {filteredSections.map(section => {
          const members = committeeData[section.id] || [];
          const Icon = sectionIcons[section.id] || Award;

          return (
            <section key={section.id} id={`team-${section.id}`} className="team-section-block">
              <div className="team-section-header">
                <div className="section-label">
                  <span>{section.kicker}</span>
                  <span>{members.length} MEMBERS</span>
                </div>
                <div className="team-section-title-row">
                  <h2>
                    <Icon size={32} className="section-title-icon" />
                    {section.title}
                  </h2>
                  <p>{section.desc}</p>
                </div>
              </div>

              {members.length > 0 ? (
                <div className="team-grid">
                  {members.map(m => (
                    <div key={m.id} className="team-card">
                      <div className="card-avatar-wrap">
                        {m.photo ? (
                          <img src={m.photo} alt={m.name} className="card-photo" />
                        ) : (
                          <div className="card-avatar-placeholder" style={{ background: m.avatarColor }}>
                            <span className="avatar-initials">{m.initials}</span>
                          </div>
                        )}
                        <span className="card-badge">{m.year}</span>
                      </div>

                      <div className="card-info">
                        <h3>{m.name}</h3>
                        <p className="card-role">{m.role}</p>

                        {/* <div className="card-socials">
                          <a href={m.linkedin || '#'} aria-label={`${m.name} LinkedIn`} target="_blank" rel="noreferrer" className="social-btn">
                            <Linkedin size={16} />
                          </a>
                          <a href={m.github || '#'} aria-label={`${m.name} GitHub`} target="_blank" rel="noreferrer" className="social-btn">
                            <Github size={16} />
                          </a>
                          <a href={m.instagram || '#'} aria-label={`${m.name} Instagram`} target="_blank" rel="noreferrer" className="social-btn">
                            <Instagram size={16} />
                          </a>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="team-empty">
                  <p>Members for this section will be announced soon.</p>
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* Footer Banner */}
      {/* <footer className="team-footer section-pad">
        <div className="team-footer-box">
          <h2>WANT TO JOIN THE TEAM?</h2>
          <p>Applications for committee heads and executive members open every academic season.</p>
          <button className="button button-lime" onClick={onBackToHome}>
            EXPLORE CAMPUS NIGHTS <ArrowUpRight size={20} />
          </button>
        </div>
      </footer> */}
    </div>
  );
}
