import { motion } from 'framer-motion';

export default function PageCover() {
  return (
    <>
      {/* Layer 3 — thin trailing strip (sage) */}
      <motion.div
        className="fixed inset-0 z-[997]"
        style={{ background: 'var(--color-sage)' }}
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.65, delay: 1.28, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Layer 2 — mid strip */}
      <motion.div
        className="fixed inset-0 z-[998]"
        style={{ background: '#2a5240' }}
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.65, delay: 1.14, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Layer 1 — main cover with logo */}
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center"
        style={{ background: 'var(--color-forest)' }}
        initial={{ y: 0 }}
        animate={{ y: '-100%' }}
        transition={{ duration: 0.65, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="absolute top-[15%] left-0 h-px w-full"
          style={{ background: 'rgba(196,164,90,0.25)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.1 }}
        />
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {[0, 1].map(i => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="var(--color-gold)">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
            ))}
          </motion.div>
          <motion.h1
            className="font-serif text-7xl md:text-8xl italic tracking-wide"
            style={{ color: 'var(--color-cream)', lineHeight: 1 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            Bella
          </motion.h1>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            <div className="w-16 h-px" style={{ background: 'var(--color-gold)' }} />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="var(--color-gold)">
              <polygon points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4" />
            </svg>
            <div className="w-16 h-px" style={{ background: 'var(--color-gold)' }} />
          </motion.div>
          <motion.p
            className="font-sans text-xs tracking-[0.65em] uppercase"
            style={{ color: 'var(--color-gold)', opacity: 0.85 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Osteria · Firenze
          </motion.p>
          <motion.p
            className="font-sans text-[10px] tracking-[0.4em] uppercase mt-1"
            style={{ color: 'rgba(244,240,232,0.3)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            Est. 2018
          </motion.p>
        </motion.div>
        <motion.div
          className="absolute bottom-[15%] left-0 h-px w-full"
          style={{ background: 'rgba(196,164,90,0.25)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.1 }}
        />
      </motion.div>
    </>
  );
}
