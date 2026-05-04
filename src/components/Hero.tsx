import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Cover exits at: delay(1.0) + duration(0.65) ≈ 1.65s
// Hero cascade starts at ~1.6s (slight overlap for smoothness)
const COVER_EXIT = 1.6;
const S = 0.15; // stagger step

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 lg:pt-32"
    >
      {/* ── Michelin badge ── */}
      <motion.div
        className="flex items-center gap-2 mb-6 z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: COVER_EXIT, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ opacity }}
      >
        <StarSVG />
        <span className="font-sans text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--color-forest)' }}>
          1 Stella Michelin
        </span>
        <StarSVG />
      </motion.div>

      {/* ── Main title ── */}
      <motion.div className="z-10 text-center px-4 overflow-hidden" style={{ y: titleY, opacity }}>
        {/* Clip reveal wrapper */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="font-serif leading-none mb-0 select-none"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', color: 'var(--color-forest)' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1.0, delay: COVER_EXIT + S, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <em>Benvenuto</em>
          </motion.h1>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <motion.p
            className="font-serif italic"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 4rem)', color: 'var(--color-forest)', letterSpacing: '0.05em' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: COVER_EXIT + S * 2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            da{' '}
            <span
              style={{
                textDecoration: 'none',
                backgroundImage: 'linear-gradient(var(--color-forest), var(--color-forest))',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '1px 1px',
                backgroundPosition: '0 1.05em',
              }}
            >
              Bella
            </span>{' '}
            <em>Osteria</em>
          </motion.p>
        </div>
      </motion.div>

      {/* ── Arch image with green curtain reveal ── */}
      <motion.div
        className="relative z-0 mt-8"
        style={{
          width: 'clamp(260px, 28vw, 460px)',
          height: 'clamp(380px, 42vw, 700px)',
          y: imgY,
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: COVER_EXIT + S * 2.5, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Arch shape with overflow hidden for curtain */}
        <div
          className="shape-arch w-full h-full overflow-hidden relative"
          style={{ border: '3px solid var(--color-forest)' }}
        >
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
            alt="Bella Osteria restaurant interior"
            className="w-full h-full object-cover"
            style={{ transform: 'scale(1.1)' }}
          />
          {/* Green curtain slides right to reveal image */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ background: 'var(--color-forest)' }}
            initial={{ x: '0%' }}
            animate={{ x: '101%' }}
            transition={{
              duration: 0.85,
              delay: COVER_EXIT + S * 2.5 + 0.35,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </div>

        {/* Reserve CTA floating badge */}
        <motion.a
          href="#reservation"
          className="absolute -bottom-4 -right-4 flex items-center justify-center rounded-full font-sans text-[10px] tracking-widest uppercase cursor-pointer"
          style={{
            width: 80,
            height: 80,
            background: 'var(--color-gold)',
            color: 'var(--color-forest)',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.3,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: COVER_EXIT + S * 6, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ scale: 1.1 }}
        >
          Reserve<br />Table
        </motion.a>
      </motion.div>

      {/* ── Side texts (desktop) ── */}
      <motion.p
        className="absolute left-12 bottom-32 hidden xl:block font-sans text-xs leading-relaxed max-w-[160px]"
        style={{ color: 'var(--color-sage)', letterSpacing: '0.03em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: COVER_EXIT + S * 5, duration: 0.7 }}
      >
        In the heart of Florence, where Tuscan tradition meets contemporary artistry.
      </motion.p>
      <motion.p
        className="absolute right-12 bottom-32 hidden xl:block font-sans text-xs leading-relaxed max-w-[160px] text-right"
        style={{ color: 'var(--color-sage)', letterSpacing: '0.03em' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: COVER_EXIT + S * 5, duration: 0.7 }}
      >
        Celebrating 6 years of passion, creativity and the finest Italian cuisine.
      </motion.p>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: COVER_EXIT + S * 7, duration: 0.6 }}
      >
        <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-sage)' }}>Scroll</span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'var(--color-sage)' }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: COVER_EXIT + S * 7 }}
        />
      </motion.div>
    </section>
  );
}

function StarSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
        fill="var(--color-gold)"
      />
    </svg>
  );
}
