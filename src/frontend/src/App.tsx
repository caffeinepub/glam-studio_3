import {
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

// ── Animation variants ──────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const STARS = [1, 2, 3, 4, 5];

// ── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home", ocid: "nav.home_link" },
  { label: "Services", href: "#services", ocid: "nav.services_link" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    name: "Threading & Waxing",
    desc: "Precision brow threading, lip & full face waxing — perfectly shaped every time.",
    img: "/assets/generated/service-threading.dim_600x400.jpg",
    price: "From £8",
  },
  {
    name: "Facials & Peels",
    desc: "Meso Glow, Refresh Peel & deep cleanse facials to reveal luminous, youthful skin.",
    img: "/assets/generated/service-facial.dim_600x400.jpg",
    price: "From £97",
  },
  {
    name: "Gel Nails & Manicure",
    desc: "Luxury gel manicures, pedicures, nail art & bridal nail packages.",
    img: "/assets/generated/service-nails.dim_600x400.jpg",
    price: "From £25",
  },
  {
    name: "Lymphatic Drainage",
    desc: "Therapeutic manual lymphatic drainage massage for detox, slimming & deep relaxation.",
    img: "/assets/generated/service-body.dim_600x400.jpg",
    price: "From £65",
  },
  {
    name: "Henna Tattoos",
    desc: "Intricate traditional henna art for weddings, events & everyday beauty.",
    img: "/assets/generated/service-henna.dim_600x400.jpg",
    price: "From £15",
  },
  {
    name: "Wood Therapy & Contouring",
    desc: "Sculpting wood therapy body treatment to contour, tone and reduce cellulite.",
    img: "/assets/generated/service-body.dim_600x400.jpg",
    price: "From £75",
  },
];

const STATS = [
  { icon: "👑", number: "500+", label: "Happy Clients" },
  { icon: "⭐", number: "5-Star", label: "Google Rating" },
  { icon: "💅", number: "10+", label: "Services Offered" },
  { icon: "📅", number: "Same Day", label: "Booking Available" },
];

const TESTIMONIALS = [
  {
    quote:
      "Amazing threading service, best in Erith! Very professional and so precise. I won't go anywhere else!",
    name: "Sarah M.",
    service: "Threading",
  },
  {
    quote:
      "The Meso Glow facial completely transformed my skin. Highly recommend to everyone in DA8 and beyond!",
    name: "Priya K.",
    service: "Meso Glow Facial",
  },
  {
    quote:
      "Wood therapy body treatment was incredible. I felt so refreshed and my skin looked amazing. Will definitely return!",
    name: "Lisa T.",
    service: "Wood Therapy",
  },
];

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 shrink-0">
            <div className="h-10 w-10 rounded-full gradient-pink-gold flex items-center justify-center">
              <span className="text-white font-heading font-bold text-lg">
                GS
              </span>
            </div>
            <span className="font-heading text-xl text-foreground hidden sm:block">
              <span className="text-pink">Glam</span> Studio
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-ocid={link.ocid}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#book"
                data-ocid="nav.book_button"
                className="inline-flex items-center px-5 py-2 rounded-full gradient-pink-gold text-white text-sm font-semibold shadow-pink-glow hover:opacity-90 transition-opacity"
              >
                Book Now
              </a>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-border"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid={link.ocid}
                    className="text-foreground font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#book"
                  data-ocid="nav.book_button"
                  className="inline-flex items-center px-5 py-2 rounded-full gradient-pink-gold text-white text-sm font-semibold"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x800.jpg')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
      {/* Decorative radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,oklch(0.62_0.22_350/0.15),transparent)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4"
        >
          Erith DA8 · 337 Bexley Road
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4"
        >
          Best Beauty Salon
          <span className="block gradient-text">Erith DA8</span>
        </motion.h1>

        {/* Gold ornament */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
          <span className="text-gold text-xl">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="text-white/80 text-base sm:text-lg md:text-xl mb-8 tracking-wide"
        >
          Threading · Facials · Nails · Lymphatic Drainage · Henna · Wood
          Therapy
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#book"
            data-ocid="hero.primary_button"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full gradient-pink-gold text-white font-semibold text-base shadow-pink-glow hover:opacity-90 transition-all"
          >
            Book Appointment
          </a>
          <a
            href="tel:+447000000000"
            data-ocid="hero.secondary_button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-gold text-gold font-semibold text-base hover:bg-secondary/10 transition-all"
          >
            <Phone size={16} /> Call Us
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-12 flex items-center justify-center gap-2 text-white/50 text-sm"
        >
          <MapPin size={14} className="text-pink" />
          <span>337 Bexley Rd, Erith DA8 3EX</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

// ── Services Grid ───────────────────────────────────────────────────────────
function Services() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="py-24 px-4 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-pink text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Offer
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            Our Services
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-secondary/50" />
            <span className="text-gold text-base">✦</span>
            <div className="h-px w-12 bg-secondary/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.name}
              data-ocid={`services.item.${i + 1}`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border service-card-hover cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 right-3 text-xs font-semibold px-3 py-1 rounded-full gradient-pink-gold text-white">
                  {service.price}
                </span>
              </div>
              {/* Content */}
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-pink transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ───────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section className="py-20 px-4" style={{ background: "oklch(0.14 0 0)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="font-heading text-2xl md:text-3xl gradient-text font-bold">
                {s.number}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-pink text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Client Love
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-secondary/50" />
            <span className="text-gold">✦</span>
            <div className="h-px w-12 bg-secondary/50" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-card border border-border rounded-2xl p-7 relative"
            >
              {/* Pink quote mark */}
              <span
                className="absolute -top-4 left-6 text-5xl text-pink leading-none font-heading select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-2">
                {STARS.map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className="fill-secondary text-secondary"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                {t.quote}
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground text-sm">
                  {t.name}
                </p>
                <p className="text-xs text-pink mt-0.5">{t.service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Book CTA Banner ─────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section
      id="book"
      className="py-20 px-4 relative overflow-hidden"
      style={{ background: "oklch(0.14 0 0)" }}
    >
      {/* Decorative glow blobs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl gradient-text mb-4">
            Ready to Look &amp; Feel Your Best?
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Book your appointment today — walk-ins welcome
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/447000000000"
              data-ocid="cta.whatsapp_button"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-base transition-all shadow-lg"
            >
              <SiWhatsapp size={18} /> WhatsApp Us
            </a>
            <a
              href="tel:+447000000000"
              data-ocid="cta.call_button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full gradient-pink-gold text-white font-semibold text-base transition-all shadow-pink-glow hover:opacity-90"
            >
              <Phone size={16} /> Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Map ──────────────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="w-full" style={{ height: "400px" }}>
      <iframe
        title="Glam Studio Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.9!2d0.1747!3d51.4797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8ab7b4d9!2s337+Bexley+Rd+Erith!5e0!3m2!1sen!2suk!4v1"
        width="100%"
        height="400"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        data-ocid="map_marker"
      />
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      id="contact"
      data-ocid="footer.section"
      className="bg-black border-t border-border pt-16 pb-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full gradient-pink-gold flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">
                  GS
                </span>
              </div>
              <span className="font-heading text-xl text-foreground">
                <span className="text-pink">Glam</span> Studio
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Erith's premier beauty salon for nails, facials, threading,
              lymphatic drainage & more.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://wa.me/447000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading text-base text-foreground mb-4">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin size={15} className="text-pink shrink-0 mt-0.5" />
                337 Bexley Rd, Erith DA8 3EX
              </li>
              <li className="flex gap-2">
                <Phone size={15} className="text-pink shrink-0 mt-0.5" />
                <a
                  href="tel:+447000000000"
                  className="hover:text-foreground transition-colors"
                >
                  +44 7000 000000
                </a>
              </li>
              <li className="flex gap-2">
                <Clock size={15} className="text-pink shrink-0 mt-0.5" />
                <span>
                  Mon–Sat: 9am – 7pm
                  <br />
                  Sun: 10am – 5pm
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-base text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "Home",
                "Services",
                "About",
                "Gallery",
                "Book Now",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-muted-foreground hover:text-pink transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {year} Glam Studio. All rights reserved.</p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Testimonials />
        <CTABanner />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
