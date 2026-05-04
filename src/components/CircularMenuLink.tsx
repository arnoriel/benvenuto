import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useAnimation } from 'framer-motion';

export default function CircularMenuLink() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const curtainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      curtainControls.start({
        y: ['101%', '0%', '-101%'],
        transition: {
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.38, 1],
          delay: 0.1,
        },
      });
    }
  }, [inView, curtainControls]);

  return (
    <section
      ref={ref}
      className="border-b py-16 lg:py-20 flex justify-center items-center"
      style={{ borderColor: 'rgba(29,58,40,0.12)' }}
    >
      <motion.a
        href="#menu"
        className="relative group cursor-pointer"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Rotating text ring */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ rotate }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path id="circle-path" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
            </defs>
            <text
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11.5px', fill: 'var(--color-forest)', letterSpacing: '2px' }}
            >
              <textPath href="#circle-path">
                MENU DEL GIORNO • TRADIZIONE ITALIANA • CREATIVITÀ •&nbsp;
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Circle image with green curtain */}
        <div
          className="shape-oval overflow-hidden relative"
          style={{ width: 'clamp(200px,22vw,340px)', height: 'clamp(200px,22vw,340px)' }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop"
            alt="Discover our menu"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />

          {/* Green curtain — slides bottom → center → top */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ background: 'var(--color-forest)', y: '101%' }}
            animate={curtainControls}
          />
        </div>

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            className="font-serif italic text-center leading-tight text-white"
            style={{ fontSize: 'clamp(1rem,2vw,1.4rem)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
            whileHover={{ scale: 1.05 }}
          >
            Scopri<br />il Menu
          </motion.p>
        </div>
      </motion.a>
    </section>
  );
}
