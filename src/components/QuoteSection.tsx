import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function QuoteSection({ text, small = false }: { text: string; small?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="border-b py-14 lg:py-20 px-8 lg:px-24 text-center"
      style={{ borderColor: 'rgba(29,58,40,0.12)' }}
    >
      {/* Decorative line */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="w-12 h-px" style={{ background: 'var(--color-gold)', opacity: 0.5 }} />
        <svg width="8" height="8" viewBox="0 0 8 8" fill="var(--color-gold)" opacity="0.6">
          <polygon points="4,0 5,3 8,4 5,5 4,8 3,5 0,4 3,3" />
        </svg>
        <div className="w-12 h-px" style={{ background: 'var(--color-gold)', opacity: 0.5 }} />
      </motion.div>

      <div style={{ overflow: 'hidden' }}>
        <motion.blockquote
          className={`font-serif leading-tight mx-auto ${small ? 'max-w-3xl' : 'max-w-5xl'}`}
          style={{
            fontSize: small ? 'clamp(1.2rem,2.2vw,1.8rem)' : 'clamp(1.8rem,3.5vw,3.2rem)',
            color: 'var(--color-forest)',
            fontStyle: 'italic',
            textAlign: small ? 'center' : 'center',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        >
          &ldquo;{text}&rdquo;
        </motion.blockquote>
      </div>
    </section>
  );
}

export function MarqueeBanner({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-t border-b py-4" style={{ borderColor: 'rgba(29,58,40,0.15)' }}>
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-serif italic whitespace-nowrap px-8"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)', color: 'var(--color-forest)' }}
          >
            {item}
            <span className="mx-6 inline-block" style={{ color: 'var(--color-gold)', transform: 'translateY(-4px)' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
