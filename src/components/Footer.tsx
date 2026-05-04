import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="border-t pt-16 pb-8 px-8 lg:px-16" style={{ borderColor: 'rgba(29,58,40,0.2)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-12 border-b" style={{ borderColor: 'rgba(29,58,40,0.12)' }}>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0, duration: 0.6 }}
          >
            <h3 className="font-serif mb-1" style={{ fontSize: '1.6rem', color: 'var(--color-forest)' }}>
              Bella Osteria
            </h3>
            <div className="flex items-center gap-1.5 mb-5">
              {[1].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
                </svg>
              ))}
              <span className="font-sans text-xs ml-1" style={{ color: 'var(--color-sage)' }}>Michelin Star</span>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm leading-relaxed block mb-4 anim-underline"
              style={{ color: 'var(--color-dark)', opacity: 0.75 }}
            >
              Via dei Tornabuoni, 22<br />
              50123 · Firenze · Italy
            </a>
            <ul className="space-y-1 font-sans text-sm" style={{ color: 'var(--color-dark)', opacity: 0.75 }}>
              <li>T. <a href="tel:+39055123456" className="anim-underline">+39 055 123 456</a></li>
              <li>M. <a href="mailto:info@bellaosteria.it" className="anim-underline">info@bellaosteria.it</a></li>
            </ul>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="font-sans text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--color-forest)' }}>
              Menu
            </h4>
            <ul className="space-y-2 font-sans text-sm" style={{ color: 'var(--color-dark)', opacity: 0.75 }}>
              {['About', 'Chef', 'Menu', 'Reservation', 'Shop', 'Gift Cards'].map(l => (
                <li key={l}><a href="#" className="anim-underline hover:opacity-100 transition-opacity">{l}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-sans text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--color-forest)' }}>
              Locations
            </h4>
            <ul className="space-y-2 font-sans text-sm" style={{ color: 'var(--color-dark)', opacity: 0.75 }}>
              {['Florence — Italy', 'Milan — Italy', 'Rome — Italy'].map(l => (
                <li key={l}><a href="#" className="anim-underline">{l}</a></li>
              ))}
            </ul>
          </motion.div>

          {/* Social + Language */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="font-sans text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--color-forest)' }}>
              Follow Us
            </h4>
            <div className="flex gap-4 mb-8">
              {['Instagram', 'Facebook'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="font-serif italic text-sm anim-underline"
                  style={{ color: 'var(--color-forest)' }}
                >
                  {s}
                </a>
              ))}
            </div>
            <h4 className="font-sans text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: 'var(--color-forest)' }}>
              Language
            </h4>
            <div className="flex gap-3 font-sans text-sm" style={{ color: 'var(--color-dark)', opacity: 0.75 }}>
              <a href="#" className="anim-underline font-medium" style={{ color: 'var(--color-forest)', opacity: 1 }}>English</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="#" className="anim-underline">Italiano</a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 font-sans text-xs" style={{ color: 'var(--color-dark)', opacity: 0.5 }}>
          <p>© Bella Osteria 2024 · IT07812340481</p>
          <div className="flex gap-5">
            {['Terms & Conditions', 'Privacy & Cookies', 'Accessibility'].map(l => (
              <a key={l} href="#" className="anim-underline">{l}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Pine cone decoration */}
      <div className="flex justify-center mt-8">
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" opacity="0.3">
          <ellipse cx="10" cy="15" rx="6" ry="14" stroke="var(--color-forest)" strokeWidth="1" />
          <line x1="10" y1="1" x2="10" y2="29" stroke="var(--color-forest)" strokeWidth="0.8" />
          <line x1="4" y1="10" x2="16" y2="10" stroke="var(--color-forest)" strokeWidth="0.8" />
          <line x1="4" y1="15" x2="16" y2="15" stroke="var(--color-forest)" strokeWidth="0.8" />
          <line x1="4" y1="20" x2="16" y2="20" stroke="var(--color-forest)" strokeWidth="0.8" />
        </svg>
      </div>
    </footer>
  );
}