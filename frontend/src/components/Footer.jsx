import { useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Heart } from 'lucide-react';
import './Footer.css';

function Footer() {
  const footerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!footerRef.current) return;

    // Efecto hover en los enlaces sociales
    itemsRef.current.forEach((item) => {
      if (item?.classList.contains('social-link')) {
        item.addEventListener('mouseenter', function () {
          this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        item.addEventListener('mouseleave', function () {
          this.style.transform = 'scale(1) rotate(0deg)';
        });
      }
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item?.classList.contains('social-link')) {
          item.removeEventListener('mouseenter', null);
          item.removeEventListener('mouseleave', null);
        }
      });
    };
  }, []);

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Producto',
      links: ['Características', 'Precios', 'Demos']
    },
    {
      title: 'Empresa',
      links: ['Sobre nosotros', 'Blog', 'Contacto']
    },
    {
      title: 'Legal',
      links: ['Términos y Condiciones', 'Política de Privacidad']
    }
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: '#' }
  ];

  return (
    <footer ref={footerRef} className="footer">
      {/* Decorative gradient background */}
      <div className="footer__background">
        <div className="footer__gradient-1"></div>
        <div className="footer__gradient-2"></div>
      </div>

      <div className="footer__content">
        {/* Top Section - Newsletter */}
        <div className="footer__newsletter" ref={(el) => itemsRef.current.push(el)}>
          <div className="footer__newsletter-content">
            <h3 className="footer__newsletter-title">
              Mantente actualizado con las últimas novedades
            </h3>
            <p className="footer__newsletter-subtitle">
              Recibe updates exclusivos directamente en tu inbox
            </p>
          </div>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="tu@email.com"
              className="footer__input"
            />
            <button className="footer__subscribe-btn">
              Suscribirse
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider"></div>

        {/* Main Footer Content */}
        <div className="footer__grid">
          {/* Brand Section */}
          <div className="footer__brand" ref={(el) => itemsRef.current.push(el)}>
            <div className="footer__logo">
              <div className="footer__logo-icon">C</div>
              <span className="footer__logo-text">Coaxios</span>
            </div>
            <p className="footer__brand-description">
              Stack de desarrollo moderno con FastAPI + React. Construido para desarrolladores que buscan calidad.
            </p>
            <div className="footer__social">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="footer__social-link social-link"
                    aria-label={social.label}
                    ref={(el) => itemsRef.current.push(el)}
                    title={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <div
              key={idx}
              className="footer__section"
              ref={(el) => itemsRef.current.push(el)}
            >
              <h4 className="footer__section-title">{section.title}</h4>
              <ul className="footer__links">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer__divider"></div>

        {/* Bottom Section */}
        <div className="footer__bottom" ref={(el) => itemsRef.current.push(el)}>
          <div className="footer__legal">
            <p>
              &copy; {currentYear} Coaxios. Todos los derechos reservados.
            </p>
            <div className="footer__legal-links">
              <a href="#" className="footer__legal-link">Privacidad</a>
              <a href="#" className="footer__legal-link">Términos</a>
              <a href="#" className="footer__legal-link">Cookies</a>
            </div>
          </div>
          <div className="footer__made-with">
            Made with <Heart size={16} className="footer__heart-icon" /> by the community
          </div>
        </div>
      </div>

      {/* Floating Elements - Animated background decoration */}
      <div className="footer__floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
    </footer>
  );
}

export default Footer;
