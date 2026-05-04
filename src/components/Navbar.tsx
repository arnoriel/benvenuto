import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LEFT = [
  { label: 'Shop', href: '#shop', sub: ['All Products', 'Food & Wine', 'Experiences'] },
  { label: 'Gift Cards', href: '#gift' },
  { label: 'Menu', href: '#menu' },
  { label: 'Reserve', href: '#reservation' },
];

const NAV_RIGHT = [
  { label: 'About', href: '#about' },
  { label: 'Chef', href: '#chef' },
  { label: 'Giardino', href: '#giardino', sub: ['About', 'Menu', 'Gift Cards', 'Experiences', 'Contact'] },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 100);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50"
        animate={{ y: hidden ? '-100%' : 0 }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <div
          className="flex items-stretch border-b transition-colors duration-500"
          style={{
            background: scrolled ? 'rgba(244,240,232,0.97)' : 'var(--color-cream)',
            borderColor: 'rgba(29,58,40,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Left nav */}
          <div className="hidden lg:flex items-center flex-1 pl-8">
            {NAV_LEFT.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Logo center */}
          <div className="flex items-center justify-center px-8 py-4 border-l border-r" style={{ borderColor: 'rgba(29,58,40,0.15)' }}>
            <a href="#" className="flex flex-col items-center group">
              <div className="relative">
                <svg width="130" height="50" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="100" y="28"
                    textAnchor="middle"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, fill: 'var(--color-forest)', letterSpacing: '3px' }}
                  >
                    BELLA
                  </text>
                  <text
                    x="100" y="48"
                    textAnchor="middle"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', fontStyle: 'italic', fill: 'var(--color-forest)', letterSpacing: '6px' }}
                  >
                    osteria
                  </text>
                </svg>
              </div>
            </a>
          </div>

          {/* Right nav */}
          <div className="hidden lg:flex items-center flex-1 justify-end pr-8">
            {NAV_RIGHT.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden ml-auto px-6 py-4 flex flex-col justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-px w-7"
              style={{ background: 'var(--color-forest)' }}
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-px w-7"
              style={{ background: 'var(--color-forest)' }}
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col pt-20 px-8 pb-8"
            style={{ background: 'var(--color-cream)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <nav className="flex flex-col gap-2 mt-8">
              {[...NAV_LEFT, ...NAV_RIGHT].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="font-serif text-5xl border-b py-3"
                  style={{ borderColor: 'rgba(29,58,40,0.1)', color: 'var(--color-forest)' }}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ item }: { item: { label: string; href: string; sub?: string[] } }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="nav-item relative px-5 py-5 cursor-pointer group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href={item.href} className="relative font-sans text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--color-forest)' }}>
        <svg
          className="nav-oval absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-visible"
          width="calc(100% + 40px)" height="calc(100% + 24px)"
          style={{ position: 'absolute', width: 'calc(100% + 40px)', height: 'calc(100% + 24px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          viewBox="0 0 120 40" preserveAspectRatio="none" fill="none"
        >
          <path
            d="M12,5 C30,1 90,1 108,5 C118,8 120,15 120,20 C120,25 118,32 108,35 C90,39 30,39 12,35 C2,32 0,25 0,20 C0,15 2,8 12,5"
            stroke="var(--color-forest)" strokeWidth="1" vectorEffect="non-scaling-stroke"
          />
        </svg>
        {item.label}
      </a>

      {item.sub && open && (
        <motion.div
          className="absolute top-full left-0 border border-t-0 min-w-40 z-50"
          style={{ background: 'var(--color-cream)', borderColor: 'rgba(29,58,40,0.15)' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.sub.map((s) => (
            <a
              key={s}
              href="#"
              className="block px-5 py-2.5 text-xs tracking-widest uppercase hover:bg-mist transition-colors"
              style={{ color: 'var(--color-forest)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-mist)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {s}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
}