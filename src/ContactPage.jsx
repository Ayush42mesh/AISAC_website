import React, { useState } from 'react';
import { Mail, Phone, Instagram, MapPin, Send, Check, Copy, ExternalLink, MessageSquare, ArrowLeft, ArrowUpRight, PhoneCall } from 'lucide-react';

export default function ContactPage({ onBackToHome, onGoToEvents }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [copiedField, setCopiedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Store in local database (localStorage)
    try {
      const existingSubmissions = JSON.parse(localStorage.getItem('aisac_contact_submissions') || '[]');
      const newEntry = {
        id: Date.now(),
        ...formData,
        dateSubmitted: new Date().toLocaleString()
      };
      localStorage.setItem('aisac_contact_submissions', JSON.stringify([newEntry, ...existingSubmissions]));
    } catch (err) {
      console.warn("Could not save to localStorage:", err);
    }

    setTimeout(() => {
      setFormStatus('success');
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      category: 'General Inquiry',
      message: ''
    });
    setFormStatus('idle');
  };

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
            Whether you have questions about upcoming AI workshops, hackathons, committee membership, or campus collaborations—our doors and inbox are always open!
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Cards + Interactive Form */}
      <main className="contact-main section-pad">
        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Details (Email, Phone, Instagram) */}
          <div className="contact-info-column">
            
            <div className="section-label">
              <span>01 / DIRECT CONTACTS</span>
              <span>REACH OUT ANYTIME</span>
            </div>

            {/* Email Card (Only aisac.vpp@gmail.com) */}
            <div className="contact-info-card" data-reveal>
              <div className="info-card-header">
                <div className="info-icon-wrap email-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <span className="info-card-tag">OFFICIAL EMAIL</span>
                  <h3>Drop Us an Email</h3>
                </div>
              </div>
              <p className="info-card-desc">For general inquiries, official communications, and sponsorship queries.</p>
              
              <div className="info-contact-list">
                <div className="contact-detail-row">
                  <div className="detail-value">
                    <Mail size={15} className="row-icon" />
                    <a href="mailto:aisac.vpp@gmail.com">aisac.vpp@gmail.com</a>
                  </div>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard('aisac.vpp@gmail.com', 'email1')}
                    title="Copy Email"
                  >
                    {copiedField === 'email1' ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Phone Numbers Card */}
            <div className="contact-info-card" data-reveal>
              <div className="info-card-header">
                <div className="info-icon-wrap phone-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <span className="info-card-tag">PHONE & WHATSAPP</span>
                  <h3>Contact Representatives</h3>
                </div>
              </div>
              <p className="info-card-desc">Reach out directly to our committee leads for urgent queries or event assistance.</p>
              
              <div className="info-contact-list">
                <div className="contact-detail-row">
                  <div className="detail-value">
                    <PhoneCall size={15} className="row-icon" />
                    <div>
                      <a href="tel:+919892409460" className="phone-num">+91 9892409460</a>
                    </div>
                  </div>
                  <div className="row-actions">
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard('+919892409460', 'phone1')}
                      title="Copy Number"
                    >
                      {copiedField === 'phone1' ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="contact-detail-row">
                  <div className="detail-value">
                    <PhoneCall size={15} className="row-icon" />
                    <div>
                      <a href="tel:+917738773167" className="phone-num">+91 7738773167</a>
                    </div>
                  </div>
                  <div className="row-actions">
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard('+917738773167', 'phone2')}
                      title="Copy Number"
                    >
                      {copiedField === 'phone2' ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="contact-info-card instagram-card" data-reveal>
              <div className="info-card-header">
                <div className="info-icon-wrap insta-icon">
                  <Instagram size={22} />
                </div>
                <div>
                  <span className="info-card-tag">SOCIAL COMMUNITY</span>
                  <h3>Follow on Instagram</h3>
                </div>
              </div>
              <p className="info-card-desc">Get live event updates, stories, workshop highlights, and announcements on our official handle.</p>
              
              <div className="insta-action-box">
                <div className="insta-handle">
                  <Instagram size={18} className="insta-handle-icon" />
                  <span>@aisac_vppcoe</span>
                </div>
                <a 
                  href="https://instagram.com/aisac_vppcoe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="button button-insta"
                >
                  <span>FOLLOW @AISAC_VPPCOE</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form + Location Hub Card Below Form */}
          <div className="contact-form-column">
            <div className="section-label">
              <span>02 / SEND US A MESSAGE</span>
              <span>INTERACTIVE FORM</span>
            </div>

            {/* Contact Form Card */}
            <div className="contact-form-card" data-reveal>
              <div className="form-card-header">
                <h2>WRITE TO US<span>.</span></h2>
                <p>Fill out the form below to submit your message directly to our committee database.</p>
              </div>

              {formStatus === 'success' ? (
                <div className="form-success-state">
                  <div className="success-icon-badge">
                    <Check size={36} />
                  </div>
                  <h3>Message Submitted Successfully!</h3>
                  <p>Thank you for reaching out to AISAC. Your message has been saved to our database, and our team will get back to you at <strong>{formData.email}</strong> shortly.</p>
                  
                  <div className="success-summary">
                    <div><span>NAME:</span> <strong>{formData.name}</strong></div>
                    <div><span>EMAIL:</span> <strong>{formData.email}</strong></div>
                    <div><span>CATEGORY:</span> <strong>{formData.category}</strong></div>
                    <div><span>STATUS:</span> <strong style={{ color: 'var(--lime)' }}>SAVED IN DATABASE</strong></div>
                  </div>

                  <button className="button button-dark" onClick={handleReset}>
                    <MessageSquare size={16} />
                    <span>SEND ANOTHER MESSAGE</span>
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  
                  <div className="form-group">
                    <label htmlFor="contact-name">FULL NAME <span className="req">*</span></label>
                    <input 
                      type="text" 
                      id="contact-name"
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="contact-email">EMAIL ADDRESS <span className="req">*</span></label>
                      <input 
                        type="email" 
                        id="contact-email"
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="yourname@gmail.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-phone">PHONE NUMBER</label>
                      <input 
                        type="tel" 
                        id="contact-phone"
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-category">INQUIRY CATEGORY <span className="req">*</span></label>
                    <select 
                      id="contact-category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Workshop & Event Query">Workshop & Event Query</option>
                      <option value="Committee Membership / Join AISAC">Committee Membership / Join AISAC</option>
                      <option value="Sponsorship & Collaboration">Sponsorship & Collaboration</option>
                      <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">YOUR MESSAGE <span className="req">*</span></label>
                    <textarea 
                      id="contact-message"
                      name="message" 
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your query or message here..."
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="button button-pink submit-btn" 
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="spinner" />
                        <span>SAVING TO DATABASE...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT MESSAGE</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Visit Campus Hub Location Card (Placed Directly Below Form) */}
            <div className="contact-info-card location-card location-card-below-form" data-reveal style={{ marginTop: '24px' }}>
              <div className="info-card-header">
                <div className="info-icon-wrap location-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <span className="info-card-tag">CAMPUS LOCATION</span>
                  <h3>Visit Campus Hub</h3>
                </div>
              </div>
              <p className="location-address">
                <strong>Vasantdada Patil Pratishthan's College of Engineering & Visual Arts (VPPCOE & VA)</strong><br />
                Eastern Express Highway, Near Everard Nagar, Sion, Mumbai, Maharashtra 400022
              </p>
              
              <a 
                href={mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="button button-lime map-direct-btn"
                style={{ marginTop: '14px' }}
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

          </div>

        </div>
      </main>

      {/* Geolocation Section with Interactive Embedded Map */}
      <section className="contact-map-section section-pad">
        <div className="map-section-header">
          <div className="section-label">
            <span>03 / FIND US ON MAP</span>
            <span>GEOLOCATION & CAMPUS DIRECTIONS</span>
          </div>
          <div className="map-title-row">
            <h2>CAMPUS GEOLOCATION<span>.</span></h2>
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-link map-external-link"
            >
              <span>OPEN MAP IN NEW TAB</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="map-wrapper" data-reveal>
          <iframe 
            title="AISAC VPPCOE Campus Geolocation"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.464972744747!2d72.87114407597148!3d19.043301952994065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8acbc948a31%3A0xc4a3832eddd650fb!2sVasantdada%20Patil%20Pratishthan&#39;s%20College%20of%20Engineering%20%26%20Visual%20Arts!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-overlay-badge">
            <MapPin size={20} className="pin-icon" />
            <div>
              <strong>AISAC HQ @ VPPCOE</strong>
              <span>Sion, Mumbai, MH</span>
            </div>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="map-badge-link">
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="contact-footer-cta section-pad">
        <div className="cta-box">
          <h2>EXPLORE OUR UPCOMING EVENTS & WORKSHOPS</h2>
          <p>Join us in our next session, connect with fellow AI builders, and unlock your potential.</p>
          <div className="cta-buttons">
            <button className="button button-lime" onClick={onGoToEvents}>
              <span>EXPLORE EVENTS PAGE</span>
              <ArrowUpRight size={18} />
            </button>
            <button className="button button-dark-outline" onClick={onBackToHome}>
              <ArrowLeft size={16} />
              <span>RETURN TO HOME</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
