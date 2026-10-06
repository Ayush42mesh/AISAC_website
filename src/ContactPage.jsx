import React, { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Check, Copy, ExternalLink, ArrowUpRight, PhoneCall, Sparkles, Clock, Globe } from 'lucide-react';

export default function ContactPage({ onBackToHome, onGoToEvents }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const mapUrl = "https://maps.app.goo.gl/QKFHmRBYwHKwJC4v9";

  return (
    <div className="contact-page">
      {/* Contact Hero Banner */}
      <section className="contact-hero section-pad">
        <div className="contact-hero-topline">
          <span><i /> REACH OUT TO AISAC</span>
          <span>WE'RE HERE TO HELP</span>
        </div>

        <div className="contact-hero-title">
          <h1 className="hero-heading">
            <span className="hero-line"><span>GET IN TOUCH</span></span>
            <span className="hero-line pink"><span>WITH OUR TEAM.</span></span>
          </h1>
          <p className="contact-hero-desc">
            Whether you have questions about upcoming AI workshops, hackathons, committee membership, or campus collaborations—our team is always ready to connect!
          </p>
        </div>
      </section>

      {/* Main Contact Hub Grid */}
      <main className="contact-main section-pad" style={{ paddingTop: 0 }}>
        <div className="section-label">
          <span>01 / DIRECT CONTACT HUBS</span>
          <span>QUICK CONNECTIONS & CAMPUS LOCATION</span>
        </div>

        <div className="contact-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '20px' }}>

          {/* Email Card */}
          <div className="contact-info-card" data-reveal style={{ background: 'rgba(20, 21, 19, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '28px', borderRadius: '16px' }}>
            <div className="info-card-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="info-icon-wrap email-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(93, 232, 239, 0.12)', color: '#5de8ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} />
              </div>
              <div>
                <span className="info-card-tag" style={{ fontSize: '11px', letterSpacing: '1px', color: '#5de8ef', fontWeight: 600 }}>OFFICIAL EMAIL</span>
                <h3 style={{ fontSize: '20px', margin: '4px 0 0 0', color: '#fff' }}>Drop Us an Email</h3>
              </div>
            </div>
            <p className="info-card-desc" style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6', marginBottom: '20px' }}>
              For official inquiries, event sponsorships, academic collaborations, and general questions.
            </p>

            <div className="contact-detail-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: '#5de8ef' }} />
                <a href="mailto:aisac.vpp@gmail.com" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}>
                  aisac.vpp@gmail.com
                </a>
              </div>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard('aisac.vpp@gmail.com', 'email1')}
                style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', padding: '6px' }}
                title="Copy Email"
              >
                {copiedField === 'email1' ? <Check size={16} style={{ color: '#5de8ef' }} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Phone Numbers Card */}
          <div className="contact-info-card" data-reveal style={{ background: 'rgba(20, 21, 19, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '28px', borderRadius: '16px' }}>
            <div className="info-card-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="info-icon-wrap phone-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 219, 100, 0.12)', color: '#f5db64', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={24} />
              </div>
              <div>
                <span className="info-card-tag" style={{ fontSize: '11px', letterSpacing: '1px', color: '#f5db64', fontWeight: 600 }}>PHONE & WHATSAPP</span>
                <h3 style={{ fontSize: '20px', margin: '4px 0 0 0', color: '#fff' }}>Call Representatives</h3>
              </div>
            </div>
            <p className="info-card-desc" style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6', marginBottom: '20px' }}>
              Reach out directly to committee coordinators for event assistance and registration support.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="contact-detail-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PhoneCall size={16} style={{ color: '#f5db64' }} />
                  <a href="tel:+919892409460" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}>+91 9892409460</a>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('+919892409460', 'phone1')}
                  style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', padding: '6px' }}
                  title="Copy Number"
                >
                  {copiedField === 'phone1' ? <Check size={16} style={{ color: '#f5db64' }} /> : <Copy size={16} />}
                </button>
              </div>

              <div className="contact-detail-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.04)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="detail-value" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PhoneCall size={16} style={{ color: '#f5db64' }} />
                  <a href="tel:+917738773167" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '15px' }}>+91 7738773167</a>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard('+917738773167', 'phone2')}
                  style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer', padding: '6px' }}
                  title="Copy Number"
                >
                  {copiedField === 'phone2' ? <Check size={16} style={{ color: '#f5db64' }} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="contact-info-card instagram-card" data-reveal style={{ background: 'rgba(20, 21, 19, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '28px', borderRadius: '16px' }}>
            <div className="info-card-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="info-icon-wrap insta-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(250, 84, 189, 0.12)', color: '#fa54bd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Instagram size={24} />
              </div>
              <div>
                <span className="info-card-tag" style={{ fontSize: '11px', letterSpacing: '1px', color: '#fa54bd', fontWeight: 600 }}>SOCIAL HANDLE</span>
                <h3 style={{ fontSize: '20px', margin: '4px 0 0 0', color: '#fff' }}>Follow Instagram</h3>
              </div>
            </div>
            <p className="info-card-desc" style={{ fontSize: '14px', color: '#a0a0a0', lineHeight: '1.6', marginBottom: '20px' }}>
              Stay updated with real-time story highlights, event photos, announcements, and tech updates.
            </p>

            <a
              href="https://instagram.com/aisac_vppcoe"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-insta"
              style={{ display: 'inline-flex', alignItems: 'center', justifySelf: 'start', gap: '8px', padding: '12px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #fa54bd, #5de8ef)', color: '#000', fontWeight: 700, textDecoration: 'none' }}
            >
              <span>FOLLOW @AISAC_VPPCOE</span>
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Campus Location Card */}
          <div className="contact-info-card location-card" data-reveal style={{ background: 'rgba(20, 21, 19, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '28px', borderRadius: '16px', gridColumn: '1 / -1' }}>
            <div className="info-card-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div className="info-icon-wrap location-icon" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(93, 232, 239, 0.12)', color: '#5de8ef', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={24} />
              </div>
              <div>
                <span className="info-card-tag" style={{ fontSize: '11px', letterSpacing: '1px', color: '#5de8ef', fontWeight: 600 }}>HEADQUARTERS</span>
                <h3 style={{ fontSize: '22px', margin: '4px 0 0 0', color: '#fff' }}>VPPCOE & VA Campus</h3>
              </div>
            </div>

            <p style={{ fontSize: '15px', color: '#dedcd2', lineHeight: '1.7', marginBottom: '20px' }}>
              <strong>Vasantdada Patil Pratishthan's College of Engineering & Visual Arts</strong><br />
              Department of Artificial Intelligence & Data Science<br />
              Eastern Express Highway, Near Everard Nagar, Sion, Mumbai, Maharashtra 400022
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-lime"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '10px', background: '#5de8ef', color: '#000', fontWeight: 700, textDecoration: 'none' }}
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight size={18} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a0a0a0', fontSize: '14px' }}>
                <Clock size={16} style={{ color: '#5de8ef' }} />
                <span>Working Hours: Mon - Sat (9:00 AM - 5:00 PM)</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Geolocation Section with Interactive Embedded Map */}
      <section className="contact-map-section section-pad" style={{ paddingTop: '20px' }}>
        <div className="map-section-header" style={{ marginBottom: '20px' }}>
          <div className="section-label">
            <span>02 / FIND US ON MAP</span>
            <span>GEOLOCATION & CAMPUS DIRECTIONS</span>
          </div>
        </div>

        <div className="map-wrapper" data-reveal style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative' }}>
          <iframe
            title="AISAC VPPCOE Campus Geolocation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.464972744747!2d72.87114407597148!3d19.043301952994065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8acbc948a31%3A0xc4a3832eddd650fb!2sVasantdada%20Patil%20Pratishthan&#39;s%20College%20of%20Engineering%20%26%20Visual%20Arts!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* Quick Action Buttons Bar */}
      <section className="section-pad" style={{ paddingTop: 0, paddingBottom: '60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {onGoToEvents && (
            <button className="button button-lime" onClick={onGoToEvents}>
              <span>EXPLORE EVENTS</span>
              <ArrowUpRight size={18} />
            </button>
          )}
          {onBackToHome && (
            <button className="button button-dark" onClick={onBackToHome}>
              <span>RETURN TO HOME</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
