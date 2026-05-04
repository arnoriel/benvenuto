import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuoteSection, { MarqueeBanner } from './components/QuoteSection';
import PictureText from './components/PictureText';
import CircularMenuLink from './components/CircularMenuLink';
import Footer from './components/Footer';
import PageCover from './components/PageCover';
import CustomCursor from './components/CustomCursor';
import ReservationSection from './components/ReservationSection';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-cream)' }}>
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          mixBlendMode: 'multiply',
        }}
      />
      <div className="vline vline-left hidden lg:block" />
      <div className="vline vline-right hidden lg:block" />

      <PageCover />
      <CustomCursor />
      <Navbar />

      <main id="main-content">
        <Hero />

        <QuoteSection
          text="Bella Osteria: a temple of Italian contemporary cuisine, rooted in Florentine heritage and expressed through the philosophy of Chef Marco Rinaldi — where every plate tells a story of land, season, and soul."
          small
        />

        <PictureText
          eyelet="Bella Osteria Florence"
          title="Shop"
          paragraph="Bring the warmth of our Florentine kitchen into your home. Curated provisions, limited edition pantry staples and culinary gifts crafted with intention."
          ctaLabel="DISCOVER"
          ctaHref="#shop"
          imageUrl="https://images.unsplash.com/photo-1551529563-fce9529e67ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwaW4lMjByZXN0YXVyYW50fGVufDB8fDB8fHww"
          imageShape="arch"
          direction="right"
        />

        <PictureText
          eyelet="Bella Osteria Florence"
          title="About"
          paragraph="Founded in 2018, Bella Osteria was born from the vision of uniting Florentine culinary tradition with creative modernity — a space where every gathering becomes unforgettable."
          ctaLabel="DISCOVER"
          ctaHref="#about"
          imageUrl="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlc3RhdXJhbnQlMjBmb29kfGVufDB8fDB8fHww"
          imageShape="arch"
          direction="left"
        />

        <PictureText
          eyelet="Bella Osteria Florence"
          title="Chef"
          paragraph="Chef Marco Rinaldi grew up in the Chianti hills, training under legends before returning to Florence with a singular vision: cooking that honours the past while speaking to the present."
          ctaLabel="DISCOVER"
          ctaHref="#chef"
          imageUrl="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&auto=format&fit=crop"
          imageShape="arch"
          direction="right"
        />

        <CircularMenuLink />

        <QuoteSection
          text="Gift the Bella Osteria experience. Our gift cards open the door to exceptional dining, exclusive tastings and private culinary journeys."
          small
        />

        <PictureText
          eyelet="Bella Osteria Florence"
          title="Experiences"
          paragraph="From private vineyard tours in the Tuscan countryside to hands-on pasta masterclasses with our chefs — curated experiences that bring you closer to the heart of Italian gastronomy."
          ctaLabel="DISCOVER"
          ctaHref="#experiences"
          imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop"
          imageShape="arch"
          direction="left"
        />

        <MarqueeBanner items={[
          'Cucina Contemporanea',
          'Firenze · Italy',
          'Since 2018',
          '1 Stella Michelin',
          'Chef Marco Rinaldi',
          'Terra · Stagione · Anima',
        ]} />

        {/* ── Dummy Reservation ── */}
        <ReservationSection />
      </main>

      <Footer />
    </div>
  );
}
