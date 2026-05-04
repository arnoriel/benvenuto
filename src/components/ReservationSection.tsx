import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
};

const TIME_SLOTS = [
  '12:00', '12:30', '13:00', '13:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
];

const OCCASIONS = ['', 'Birthday', 'Anniversary', 'Business Dinner', 'Romantic Evening', 'Other'];

export default function ReservationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormData>({
    name: '', email: '', date: '', time: '', guests: '2', occasion: '', notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.date) e.date = 'Date is required';
    if (!form.time) e.time = 'Time is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1800);
  };

  const inputBase =
    'w-full bg-transparent border-b py-3 font-sans text-sm outline-none transition-colors duration-300 focus:border-gold placeholder:text-white/30';
  const inputStyle = {
    borderColor: 'rgba(196,164,90,0.35)',
    color: 'var(--color-cream)',
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.215, 0.61, 0.355, 1] as [number,number,number,number] },
  });

  return (
    <section
      id="reservation"
      ref={ref}
      className="relative py-20 lg:py-28 px-8 lg:px-16 overflow-hidden"
      style={{ background: 'var(--color-forest)' }}
    >
      {/* Decorative grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          opacity: 0.4,
        }}
      />

      {/* Gold top border line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* ── Left: info block ── */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="font-sans text-xs tracking-[0.35em] uppercase mb-4"
              style={{ color: 'var(--color-gold)', opacity: 0.8 }}
              {...stagger(0)}
            >
              Bella Osteria · Firenze
            </motion.p>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                className="font-serif leading-none mb-6"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: 'var(--color-cream)' }}
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <em>Reserve<br />a Table</em>
              </motion.h2>
            </div>

            <motion.p
              className="font-sans text-sm leading-relaxed mb-10 max-w-sm"
              style={{ color: 'rgba(244,240,232,0.6)' }}
              {...stagger(2)}
            >
              Join us for an unforgettable Florentine dining experience. 
              For parties of 8 or more, please contact us directly.
            </motion.p>

            {/* Info cards */}
            {[
              { label: 'Address', value: 'Via dei Tornabuoni, 22\n50123 · Firenze · Italy' },
              { label: 'Phone', value: '+39 055 123 456' },
              { label: 'Hours', value: 'Lunch: 12:00–14:30\nDinner: 19:00–22:30' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="border-b py-4 flex gap-8"
                style={{ borderColor: 'rgba(196,164,90,0.15)' }}
                {...stagger(3 + i)}
              >
                <span className="font-sans text-xs tracking-widest uppercase w-20 shrink-0" style={{ color: 'var(--color-gold)', opacity: 0.7 }}>
                  {item.label}
                </span>
                <p className="font-sans text-sm whitespace-pre-line" style={{ color: 'rgba(244,240,232,0.7)' }}>
                  {item.value}
                </p>
              </motion.div>
            ))}

            {/* Decorative star */}
            <motion.div
              className="flex items-center gap-3 mt-8"
              {...stagger(7)}
            >
              <div className="w-8 h-px" style={{ background: 'var(--color-gold)', opacity: 0.4 }} />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-gold)">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
              <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-gold)', opacity: 0.6 }}>
                1 Stella Michelin
              </span>
              <div className="w-8 h-px" style={{ background: 'var(--color-gold)', opacity: 0.4 }} />
            </motion.div>
          </div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center h-full gap-6 py-16 text-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Animated checkmark ring */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    style={{ width: 100, height: 100 }}
                  >
                    <motion.svg
                      width="100" height="100" viewBox="0 0 100 100" fill="none"
                      initial={{ rotate: -90 }}
                      animate={{ rotate: 270 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    >
                      <circle cx="50" cy="50" r="44" stroke="var(--color-gold)" strokeWidth="1.5"
                        strokeDasharray="276.5" strokeDashoffset="0" />
                    </motion.svg>
                    <motion.svg
                      className="absolute"
                      width="36" height="36" viewBox="0 0 36 36" fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                    >
                      <motion.path
                        d="M8 18 L15 25 L28 11"
                        stroke="var(--color-gold)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      />
                    </motion.svg>
                  </motion.div>

                  <div>
                    <h3 className="font-serif text-4xl italic mb-3" style={{ color: 'var(--color-cream)' }}>
                      <em>Grazie!</em>
                    </h3>
                    <p className="font-sans text-sm leading-relaxed" style={{ color: 'rgba(244,240,232,0.65)' }}>
                      Your reservation request has been received.<br />
                      We'll confirm by email within 24 hours.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="w-12 h-px" style={{ background: 'var(--color-gold)', opacity: 0.4 }} />
                    <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-gold)', opacity: 0.6 }}>
                      {form.date} · {form.time} · {form.guests} guests
                    </span>
                    <div className="w-12 h-px" style={{ background: 'var(--color-gold)', opacity: 0.4 }} />
                  </div>

                  <motion.button
                    className="mt-4 font-sans text-xs tracking-widest uppercase border py-3 px-8 transition-colors duration-300"
                    style={{ borderColor: 'rgba(196,164,90,0.5)', color: 'var(--color-gold)' }}
                    onClick={() => { setStatus('idle'); setForm({ name:'', email:'', date:'', time:'', guests:'2', occasion:'', notes:'' }); }}
                    whileHover={{ borderColor: 'var(--color-gold)', backgroundColor: 'rgba(196,164,90,0.1)' }}
                  >
                    Make another reservation
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        name="name"
                        type="text"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                        style={inputStyle}
                      />
                      {errors.name && <p className="font-sans text-xs mt-1" style={{ color: '#e07070' }}>{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                        style={inputStyle}
                      />
                      {errors.email && <p className="font-sans text-xs mt-1" style={{ color: '#e07070' }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Date + Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className={inputBase}
                        style={{ ...inputStyle, colorScheme: 'dark' }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.date && <p className="font-sans text-xs mt-1" style={{ color: '#e07070' }}>{errors.date}</p>}
                    </div>
                    <div>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        className={inputBase}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                      >
                        {Array.from({ length: 7 }, (_, i) => i + 1).map(n => (
                          <option key={n} value={n} style={{ background: 'var(--color-forest)', color: 'var(--color-cream)' }}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value="8+" style={{ background: 'var(--color-forest)', color: 'var(--color-cream)' }}>
                          8+ Guests (contact us)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(196,164,90,0.6)' }}>
                      Select Time *
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => { setForm(p => ({ ...p, time: slot })); setErrors(p => ({ ...p, time: undefined })); }}
                          className="font-sans text-xs tracking-widest py-2 px-3 border transition-all duration-200"
                          style={{
                            borderColor: form.time === slot ? 'var(--color-gold)' : 'rgba(196,164,90,0.25)',
                            color: form.time === slot ? 'var(--color-forest)' : 'rgba(244,240,232,0.6)',
                            background: form.time === slot ? 'var(--color-gold)' : 'transparent',
                          }}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.time && <p className="font-sans text-xs mt-2" style={{ color: '#e07070' }}>{errors.time}</p>}
                  </div>

                  {/* Occasion */}
                  <div>
                    <select
                      name="occasion"
                      value={form.occasion}
                      onChange={handleChange}
                      className={inputBase}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="" style={{ background: 'var(--color-forest)' }}>Special Occasion (optional)</option>
                      {OCCASIONS.filter(Boolean).map(o => (
                        <option key={o} value={o} style={{ background: 'var(--color-forest)', color: 'var(--color-cream)' }}>{o}</option>
                      ))}
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <textarea
                      name="notes"
                      placeholder="Special requests or dietary requirements..."
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      className={inputBase}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="relative overflow-hidden font-sans text-xs tracking-[0.3em] uppercase py-4 px-12 mt-2 self-start"
                    style={{
                      background: 'var(--color-gold)',
                      color: 'var(--color-forest)',
                      fontWeight: 600,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'loading'}
                  >
                    <AnimatePresence mode="wait">
                      {status === 'loading' ? (
                        <motion.span
                          key="loading"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.span
                            className="w-3 h-3 rounded-full border border-forest border-t-transparent inline-block"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            style={{ borderColor: 'var(--color-forest)', borderTopColor: 'transparent' }}
                          />
                          Confirming…
                        </motion.span>
                      ) : (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Confirm Reservation
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <p className="font-sans text-xs" style={{ color: 'rgba(244,240,232,0.3)' }}>
                    * Required fields. Reservations are confirmed by email within 24 hours.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Gold bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
      />
    </section>
  );
}
