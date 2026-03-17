const Contact = () => {
  return (
    <div className="contact-page" id="contact-page">
      <div className="breadcrumb">
        <a href="/">Home</a> / <span>Contact Us</span>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h1>Get in Touch</h1>
          <p>Have questions about your order or our products? We're here to help!</p>

          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <h4>Email</h4>
                <p>support@grocerify.com</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <h4>Address</h4>
                <p>123 Market Street, Mumbai, India 400001</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">⏰</span>
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="John Doe" id="contact-name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" id="contact-email" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" placeholder="Order inquiry" id="contact-subject" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Tell us how we can help..." rows="5" id="contact-message"></textarea>
          </div>
          <button type="submit" className="btn-primary" id="contact-submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
