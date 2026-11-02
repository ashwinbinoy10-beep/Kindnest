import { Facebook, Instagram, Mail, Sprout, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <a href="#home" className="logo foot-logo" aria-label="KINDNEST Home">
            <Sprout size={22} aria-hidden="true" />
            <span>KINDNEST</span>
          </a>
          <p className="serif foot-tagline">Where Kindness Finds a Home.</p>
          <p className="foot-motto">
            Every act of kindness plants a seed. Together, we grow a kinder world.
          </p>
        </div>

        <nav className="foot-nav" aria-label="Footer navigation">
          <h4 className="foot-heading">Explore</h4>
          <a href="#mission">Our Mission</a>
          <a href="#wall">Kindness Wall</a>
          <a href="#tree">Kindness Tree</a>
          <a href="#explore">Kindness Match</a>
          <a href="#impact">My Impact</a>
        </nav>

        <div className="foot-contact">
          <h4 className="foot-heading">Connect</h4>
          <p className="foot-email">
            <Mail size={16} aria-hidden="true" />
            <span>hello@kindnest.example</span>
          </p>
          <div className="social" aria-label="Social media links">
            <a href="#home" aria-label="Instagram (placeholder)">
              <Instagram size={20} aria-hidden="true" />
            </a>
            <a href="#home" aria-label="Twitter (placeholder)">
              <Twitter size={20} aria-hidden="true" />
            </a>
            <a href="#home" aria-label="Facebook (placeholder)">
              <Facebook size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="wrap foot-bottom">
        <p className="copy">
          © 2026 KINDNEST. A frontend demo: stories, requests, and stats are sample data.
        </p>
      </div>
    </footer>
  )
}
