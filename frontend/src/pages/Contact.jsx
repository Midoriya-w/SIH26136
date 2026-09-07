import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import { CheckCircle2, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';

const Contact = ({ currentUser, onRoleChange }) => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onRoleChange={onRoleChange} />
      <main className="main-content public-page">
        <section className="public-page-hero">
          <div>
            <span className="public-page-label"><Mail size={16} /> We are here to help</span>
            <h1>Contact Samarth</h1>
            <p>Connect with the portal team for onboarding support, challenge guidance, pilot procurement, or partnership enquiries.</p>
          </div>
          <div className="public-page-icon" aria-hidden="true"><Mail size={72} strokeWidth={1.2} /></div>
        </section>

        <section className="contact-page-grid">
          <div className="contact-details-panel">
            <div className="public-section-heading"><span>Support channels</span><h2>Let&apos;s solve it together</h2></div>
            <div className="contact-detail"><Mail size={20} /><div><strong>Email support</strong><a href="mailto:support@mahabridge.gov.in">support@mahabridge.gov.in</a><small>For portal, account, and application questions</small></div></div>
            <div className="contact-detail"><Phone size={20} /><div><strong>Helpline</strong><span>1800-XXX-XXXX</span><small>Monday to Friday, 9:30 AM to 6:00 PM</small></div></div>
            <div className="contact-detail"><MapPin size={20} /><div><strong>Office</strong><span>State Innovation Society</span><small>Mumbai, Maharashtra</small></div></div>
            <div className="contact-detail"><Clock3 size={20} /><div><strong>Response time</strong><span>Within two working days</span><small>Urgent procurement queries are prioritised</small></div></div>
          </div>

          <div className="contact-form-panel">
            {sent ? (
              <div className="contact-success"><CheckCircle2 size={48} color="#138808" /><h2>Enquiry sent</h2><p>Thank you. The Samarth team will respond to your message within two working days.</p><button type="button" className="btn btn-outline" onClick={() => setSent(false)}>Send another enquiry</button></div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>Send an enquiry</h2>
                <p className="contact-form-intro">Tell us what you need help with and our team will get back to you.</p>
                <label>Name<input required type="text" placeholder="Your full name" /></label>
                <label>Email<input required type="email" placeholder="you@organisation.in" /></label>
                <label>Organisation<input type="text" placeholder="Organisation or startup name" /></label>
                <label>Message<textarea required rows="5" placeholder="How can we help?" /></label>
                <button className="btn btn-apply" type="submit"><Send size={16} /> Send message</button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;