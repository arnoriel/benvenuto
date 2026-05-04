import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useAnimation } from 'framer-motion';

interface PictureTextProps {
  eyelet: string;
  title: string;
  paragraph: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl: string;
  imageAlt?: string;
  imageShape?: 'arch' | 'pill' | 'oval';
  direction?: 'left' | 'right';
  hasBorder?: boolean;
}

export default function PictureText({
  eyelet, title, paragraph, ctaLabel = 'DISCOVER', ctaHref = '#',
  imageUrl, imageAlt = '', imageShape = 'arch', direction = 'left', hasBorder = true,
}: PictureTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const curtainControls = useAnimation();

  const curtainFrom = direction === 'right' ? '-101%' : '101%';
  const curtainExit = direction === 'right' ? '101%' : '-101%';

  useEffect(() => {
    if (inView) {
      curtainControls.start({
        x: [curtainFrom, '0%', curtainExit],
        transition: {
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.4, 1],
          delay: 0.05,
        },
      });
    }
  }, [inView, curtainFrom, curtainExit, curtainControls]);

  const shapeClass = imageShape === 'arch' ? 'shape-arch' : imageShape === 'pill' ? 'shape-pill' : 'shape-oval';

  const textContent = (
    <motion.div
      className="flex flex-col justify-center py-8 lg:py-0"
      initial={{ opacity: 0, x: direction === 'left' ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.85, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }}
    >
      <div style={{ overflow: 'hidden' }}>
        <motion.p
          className="font-sans text-xs tracking-[0.25em] uppercase mb-3"
          style={{ color: 'var(--color-sage)' }}
          initial={{ y: '100%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }}
        >
          {eyelet}
        </motion.p>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          className="font-serif mb-5"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', color: 'var(--color-forest)', lineHeight: 1 }}
          initial={{ y: '100%' }}
          animate={inView ? { y: '0%' } : {}}
          transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1], delay: 0.3 }}
        >
          {title}
        </motion.h2>
      </div>

      <motion.p
        className="font-sans text-sm leading-relaxed mb-8 max-w-sm"
        style={{ color: 'var(--color-dark)', opacity: 0.8 }}
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 0.8, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.42 }}
      >
        {paragraph}
      </motion.p>

      <motion.a
        href={ctaHref}
        className="anim-underline inline-flex items-center gap-3 font-sans text-xs tracking-widest uppercase font-medium self-start"
        style={{ color: 'var(--color-forest)' }}
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: 0.54 }}
      >
        {ctaLabel}
        <svg width="50" height="16" viewBox="0 0 60 16" fill="none">
          <line x1="0" y1="8" x2="48" y2="8" stroke="var(--color-forest)" strokeWidth="1.5" />
          <path d="M44 4 L52 8 L44 12" stroke="var(--color-forest)" strokeWidth="1.5" fill="none" />
        </svg>
      </motion.a>
    </motion.div>
  );

  const imageContent = (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1], delay: 0.05 }}
    >
      <div
        className={`${shapeClass} relative overflow-hidden`}
        style={{
          width: 'clamp(200px, 22vw, 380px)',
          height: imageShape === 'arch' ? 'clamp(300px, 32vw, 560px)' : 'clamp(240px, 26vw, 440px)',
          border: hasBorder ? '2.5px solid var(--color-forest)' : 'none',
        }}
      >
        <motion.img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
          style={{ y: imgY, scale: 1.12 }}
        />

        {/* ── Green curtain: sweeps through image to reveal it ── */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ background: 'var(--color-forest)', x: curtainFrom }}
          animate={curtainControls}
        />
      </div>
    </motion.div>
  );

  return (
    <section
      ref={ref}
      className="border-b py-16 lg:py-24 px-8 lg:px-16"
      style={{ borderColor: 'rgba(29,58,40,0.12)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className={`flex flex-col-reverse ${direction === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
          <div className="flex-1 flex justify-center">
            <div className="max-w-md w-full">{textContent}</div>
          </div>
          <div className="hidden lg:block w-px self-stretch" style={{ background: 'rgba(29,58,40,0.12)' }} />
          <div className="flex-1 flex justify-center">{imageContent}</div>
        </div>
      </div>
    </section>
  );
}
