import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";

// ── Types ────────────────────────────────────────────────────────────────────
type Page = "home" | "services" | "about";

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
  { label: "Home", href: "#home", page: "home" as Page },
  { label: "Services", href: "#services", page: "services" as Page },
  { label: "About", href: "#about", page: "about" as Page },
  { label: "Gallery", href: "#gallery", page: "home" as Page },
  { label: "Contact", href: "#contact", page: "home" as Page },
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

// ── Pricing Data ─────────────────────────────────────────────────────────────
const NAIL_SERVICES = [
  {
    treatment: "Classic Manicure",
    details: "Shape, file, cuticle care, polish",
    price: "£18",
  },
  {
    treatment: "Gel Manicure",
    details: "Long-lasting gel colour + cuticle care",
    price: "£28",
  },
  {
    treatment: "Classic Pedicure",
    details: "Soak, scrub, shape, polish",
    price: "£25",
  },
  {
    treatment: "Gel Pedicure",
    details: "Gel colour + foot scrub",
    price: "£35",
  },
  {
    treatment: "Nail Art (per nail)",
    details: "Freehand or sticker designs",
    price: "£2+",
  },
  {
    treatment: "Bridal Manicure",
    details: "Full luxury treatment + nail art",
    price: "£55",
  },
  {
    treatment: "Acrylic Full Set",
    details: "Sculpted acrylics, any shape",
    price: "£45",
  },
  { treatment: "Infills", details: "Acrylic or gel infills", price: "£30" },
];

const FACIAL_SERVICES = [
  {
    treatment: "Classic Facial",
    details: "Deep cleanse, exfoliate, mask",
    price: "£50",
  },
  {
    treatment: "Meso Glow",
    details: "Mesotherapy glow treatment",
    price: "£97",
  },
  {
    treatment: "Refresh Peel",
    details: "Chemical peel for skin renewal",
    price: "£97",
  },
  {
    treatment: "Extraction Facial",
    details: "Targeted pore cleanse & extraction",
    price: "£65",
  },
  {
    treatment: "Anti-Ageing Facial",
    details: "Firming & lifting treatment",
    price: "£75",
  },
  {
    treatment: "Hydrating Facial",
    details: "Intense moisture boost",
    price: "£60",
  },
];

const THREADING_SERVICES = [
  {
    treatment: "Eyebrow Threading",
    details: "Precise shape & definition",
    price: "£8",
  },
  { treatment: "Upper Lip Threading", details: "Quick & gentle", price: "£4" },
  {
    treatment: "Full Face Threading",
    details: "Brows, lip, chin, sides",
    price: "£18",
  },
  { treatment: "Full Leg Wax", details: "Smooth, long-lasting", price: "£30" },
  { treatment: "Half Leg Wax", details: "Upper or lower leg", price: "£18" },
  { treatment: "Bikini Wax", details: "Classic bikini line", price: "£15" },
  { treatment: "Underarm Wax", details: "Quick & clean", price: "£10" },
  {
    treatment: "Full Body Wax",
    details: "Complete full body treatment",
    price: "£65",
  },
];

const BODY_SERVICES = [
  {
    treatment: "Lymphatic Drainage",
    details: "Manual drainage massage, detox",
    price: "£65",
  },
  {
    treatment: "Wood Therapy",
    details: "Sculpting & contouring treatment",
    price: "£75",
  },
  {
    treatment: "Body Contouring Session",
    details: "Combined wood + lymphatic",
    price: "£110",
  },
  {
    treatment: "Henna Tattoo (small)",
    details: "Traditional henna art",
    price: "£15",
  },
  {
    treatment: "Henna Tattoo (large)",
    details: "Full hand or arm design",
    price: "£35",
  },
  {
    treatment: "Bridal Henna (hands)",
    details: "Intricate bridal design",
    price: "£60",
  },
];

const SERVICE_CATEGORIES = [
  {
    id: "nails",
    label: "Nails",
    emoji: "💅",
    tagline:
      "Gel nails, manicures & bridal nail art in Erith — nail salon Erith DA8",
    items: NAIL_SERVICES,
  },
  {
    id: "facials",
    label: "Facials & Peels",
    emoji: "✨",
    tagline:
      "Advanced facials & chemical peels — beauty salon Bexley, facials DA8",
    items: FACIAL_SERVICES,
  },
  {
    id: "threading",
    label: "Threading & Waxing",
    emoji: "🧖‍♀️",
    tagline:
      "Expert threading in Erith & waxing Bexleyheath — quick, precise & gentle",
    items: THREADING_SERVICES,
  },
  {
    id: "body",
    label: "Body Treatments",
    emoji: "🌿",
    tagline: "Lymphatic massage South East London, wood therapy & henna art",
    items: BODY_SERVICES,
  },
];

// ── Pricing Table ────────────────────────────────────────────────────────────
interface PricingItem {
  treatment: string;
  details: string;
  price: string;
}

function PricingTable({
  items,
  scope,
}: { items: PricingItem[]; scope: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-[1fr_1.5fr_auto] gap-4 px-6 py-3 gradient-pink-gold text-white text-xs font-semibold tracking-widest uppercase">
        <span>Treatment</span>
        <span>Details</span>
        <span className="text-right">Price</span>
      </div>
      {/* Rows */}
      {items.map((item, i) => (
        <div
          key={item.treatment}
          data-ocid={`${scope}.item.${i + 1}`}
          className={`grid grid-cols-1 sm:grid-cols-[1fr_1.5fr_auto] gap-1 sm:gap-4 px-6 py-4 ${
            i % 2 === 0 ? "bg-white" : "bg-[oklch(0.97_0.004_350)]"
          } border-b border-border last:border-0 transition-colors hover:bg-[oklch(0.95_0.01_350/0.7)]`}
        >
          <p className="font-semibold text-foreground text-sm">
            {item.treatment}
          </p>
          <p className="text-sm text-muted-foreground">{item.details}</p>
          <p className="text-sm font-bold text-pink sm:text-right">
            {item.price}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────
interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

function Navbar({ page, setPage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link: (typeof NAV_LINKS)[0]) => {
    setMenuOpen(false);
    if (link.page === "services") {
      setPage("services");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (link.page === "about") {
      setPage("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setPage("home");
      // Wait for home to mount then scroll
      setTimeout(() => {
        const el = document.querySelector(link.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || page === "services"
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => {
              setPage("home");
              window.scrollTo({ top: 0 });
            }}
            className="flex items-center gap-3 shrink-0 bg-transparent border-0 cursor-pointer"
            data-ocid="nav.home_link"
          >
            <img
              src="/assets/uploads/glam-studio-logo-1.jpg"
              alt="Glam Studio Nail and Beauty"
              className="h-14 md:h-16 w-auto object-contain rounded-md"
              style={{ maxWidth: "200px" }}
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link)}
                  data-ocid={
                    link.label === "About" ? "nav.about.link" : undefined
                  }
                  className={`text-sm transition-colors font-medium bg-transparent border-0 cursor-pointer ${
                    (page === "services" && link.label === "Services") ||
                    (page === "about" && link.label === "About") ||
                    (page === "home" && link.label === "Home")
                      ? "text-pink"
                      : "text-muted-foreground hover:text-pink"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  setPage("home");
                  setTimeout(() => {
                    const el = document.querySelector("#book");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
                data-ocid="nav.book_button"
                className="inline-flex items-center px-5 py-2 rounded-full gradient-pink-gold text-white text-sm font-semibold shadow-pink-glow btn-brand cursor-pointer border-0"
              >
                Book Now
              </button>
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
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="text-foreground font-medium hover:text-pink transition-colors bg-transparent border-0 cursor-pointer w-full text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  data-ocid="nav.book_button"
                  onClick={() => {
                    setMenuOpen(false);
                    setPage("home");
                    setTimeout(() => {
                      const el = document.querySelector("#book");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="inline-flex items-center px-5 py-2 rounded-full gradient-pink-gold text-white text-sm font-semibold border-0 cursor-pointer"
                >
                  Book Now
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero({ onServicesClick }: { onServicesClick: () => void }) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1400x800.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,oklch(0.55_0.22_350/0.12),transparent)]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "oklch(0.85 0.12 80)" }}
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
          <span className="block" style={{ color: "oklch(0.88 0.18 350)" }}>
            Erith DA8
          </span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-secondary" />
          <span className="text-xl" style={{ color: "oklch(0.85 0.12 80)" }}>
            ✦
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="text-white/85 text-base sm:text-lg md:text-xl mb-8 tracking-wide"
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
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full gradient-pink-gold text-white font-semibold text-base shadow-pink-glow btn-brand"
          >
            Book Appointment
          </a>
          <button
            type="button"
            onClick={onServicesClick}
            data-ocid="hero.secondary_button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 font-semibold text-base hover:bg-white/10 transition-all text-white cursor-pointer bg-transparent"
            style={{ borderColor: "oklch(0.85 0.12 80)" }}
          >
            <Sparkles size={16} /> View Services & Prices
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-12 flex items-center justify-center gap-2 text-white/60 text-sm"
        >
          <MapPin size={14} style={{ color: "oklch(0.88 0.18 350)" }} />
          <span>337 Bexley Rd, Erith DA8 3EX</span>
        </motion.div>
      </div>

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
function ServicesGrid({ onViewAllPrices }: { onViewAllPrices: () => void }) {
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
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
            <span className="text-base text-gold">✦</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
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
              className="group relative bg-card rounded-2xl overflow-hidden border border-border service-card-hover cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 right-3 text-xs font-semibold px-3 py-1 rounded-full gradient-pink-gold text-white">
                  {service.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-foreground mb-2 group-hover:text-pink transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.desc}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button
            onClick={onViewAllPrices}
            data-ocid="services.primary_button"
            className="gradient-pink-gold text-white rounded-full px-8 py-3 font-semibold shadow-pink-glow btn-brand border-0"
          >
            View Full Pricing Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Why Choose Us ───────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section
      className="py-20 px-4"
      style={{ background: "oklch(0.95 0.01 350)" }}
    >
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
              <span className="text-sm text-muted-foreground font-medium">
                {s.label}
              </span>
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
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
            <span className="text-gold">✦</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
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
              className="bg-card border border-border rounded-2xl p-7 relative shadow-sm"
            >
              <span
                className="absolute -top-4 left-6 text-5xl leading-none font-heading select-none"
                style={{ color: "oklch(0.55 0.22 350)" }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <div className="flex gap-1 mb-4 mt-2">
                {STARS.map((n) => (
                  <Star
                    key={n}
                    size={16}
                    style={{
                      fill: "oklch(0.65 0.12 80)",
                      color: "oklch(0.65 0.12 80)",
                    }}
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
      className="py-20 px-4 relative overflow-hidden gradient-pink-gold"
    >
      <div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Ready to Look &amp; Feel Your Best?
          </h2>
          <p className="text-white/85 text-lg mb-10">
            Book your appointment today — walk-ins welcome
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/447000000000"
              data-ocid="cta.whatsapp_button"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-pink font-semibold text-base transition-all shadow-lg hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <SiWhatsapp size={18} /> WhatsApp Us
            </a>
            <a
              href="tel:+447000000000"
              data-ocid="cta.call_button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/20 border-2 border-white text-white font-semibold text-base transition-all hover:bg-white/30 hover:scale-105 active:scale-95"
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
interface FooterProps {
  setPage: (p: Page) => void;
}

function Footer({ setPage }: FooterProps) {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer
      id="contact"
      data-ocid="footer.section"
      className="bg-background border-t border-border pt-16 pb-8 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/glam-studio-logo-1.jpg"
                alt="Glam Studio Nail and Beauty"
                className="h-14 w-auto object-contain rounded-md"
                style={{ maxWidth: "180px" }}
              />
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

          <div>
            <h4 className="font-heading text-base text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", page: "home" as Page, href: "#home" },
                { label: "Services", page: "services" as Page, href: "#" },
                { label: "About", page: "about" as Page, href: "#" },
                { label: "Contact", page: "home" as Page, href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => {
                      setPage(link.page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-muted-foreground hover:text-pink transition-colors bg-transparent border-0 cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
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

// ── Services Page ─────────────────────────────────────────────────────────────
interface ServicesPageProps {
  onNavigate: (p: Page) => void;
}

function ServicesPage({ onNavigate }: ServicesPageProps) {
  const handleBooking = () => {
    onNavigate("home");
    setTimeout(() => {
      const el = document.querySelector("#book");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden">
        {/* Decorative background */}
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.97 0.008 350)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 gradient-pink-gold" />
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.55 0.22 350 / 0.06)" }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.65 0.12 80 / 0.07)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-pink text-sm font-semibold tracking-[0.2em] uppercase mb-3"
          >
            Beauty Salon Erith DA8
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl text-foreground mb-4"
          >
            Our Services &amp;
            <span className="block gradient-text">Pricing</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
            <span className="text-gold">✦</span>
            <div
              className="h-px w-12"
              style={{ background: "oklch(0.65 0.12 80 / 0.5)" }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-muted-foreground text-lg"
          >
            Beauty treatments in Erith DA8 — threading, facials, nails &amp;
            more.
            <br />
            <span className="text-sm">
              Serving Bexleyheath, Bexley &amp; South East London
            </span>
          </motion.p>
        </div>
      </section>

      {/* Pricing Tabs */}
      <section className="py-16 px-4" data-ocid="services.section">
        <div className="max-w-5xl mx-auto">
          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <Tabs defaultValue="nails" data-ocid="services.tab">
              <TabsList className="w-full h-auto grid grid-cols-4 gap-1 mb-10 bg-[oklch(0.95_0.01_350)] p-1.5 rounded-2xl">
                {SERVICE_CATEGORIES.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    data-ocid={`services.${cat.id}.tab`}
                    className="pricing-tab rounded-xl py-3 text-sm font-medium transition-all"
                  >
                    <span className="mr-1.5">{cat.emoji}</span>
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {SERVICE_CATEGORIES.map((cat) => (
                <TabsContent key={cat.id} value={cat.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-muted-foreground mb-6 text-center italic">
                      {cat.tagline}
                    </p>
                    <PricingTable
                      items={cat.items}
                      scope={`services.${cat.id}`}
                    />
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <Accordion
              type="single"
              collapsible
              defaultValue="nails"
              className="space-y-3"
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <AccordionItem
                  key={cat.id}
                  value={cat.id}
                  data-ocid={`services.${cat.id}.panel`}
                  className="border border-border rounded-2xl overflow-hidden px-0"
                >
                  <AccordionTrigger className="px-5 py-4 font-heading text-base text-foreground hover:text-pink hover:no-underline">
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      {cat.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <p className="text-xs text-muted-foreground mb-4 italic">
                      {cat.tagline}
                    </p>
                    <PricingTable
                      items={cat.items}
                      scope={`services.${cat.id}`}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: "oklch(0.97 0.008 350)" }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "oklch(0.88 0.005 350)" }}
        />
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.55 0.22 350 / 0.07)" }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-pink text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Ready?
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl gradient-text mb-4">
              Book Your Treatment Today
            </h2>
            <p className="text-muted-foreground mb-8">
              Same-day appointments available. Serving Erith, Bexleyheath &
              South East London.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleBooking}
                data-ocid="services.primary_button"
                className="w-full sm:w-auto gradient-pink-gold text-white rounded-full px-8 py-3 font-semibold shadow-pink-glow btn-brand border-0 h-auto"
              >
                Book Appointment
              </Button>
              <a
                href="https://wa.me/447000000000"
                data-ocid="services.whatsapp_button"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold transition-all shadow-lg"
              >
                <SiWhatsapp size={18} /> WhatsApp Us
              </a>
              <a
                href="tel:+447000000000"
                data-ocid="services.secondary_button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-pink text-pink font-semibold hover:bg-pink/5 hover:scale-105 active:scale-95 transition-all"
              >
                <Phone size={16} /> Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer setPage={onNavigate} />
    </div>
  );
}

// ── About Page ───────────────────────────────────────────────────────────────
interface AboutPageProps {
  onNavigate: (p: Page) => void;
}

const TEAM = [
  {
    name: "Aisha",
    role: "Lead Beauty Therapist",
    bio: "Specialist in facials, peels and skin rejuvenation with 8+ years experience.",
    initials: "A",
  },
  {
    name: "Priya",
    role: "Nail Technician & Nail Artist",
    bio: "Creates stunning gel, acrylic and bridal nail designs that turn heads.",
    initials: "P",
  },
  {
    name: "Fatima",
    role: "Threading & Waxing Expert",
    bio: "Precision brow artist loved by clients across South East London.",
    initials: "F",
  },
];

const WHY_US = [
  {
    icon: "💎",
    title: "Experienced Team",
    desc: "Our therapists bring years of specialist training and genuine passion.",
  },
  {
    icon: "🌿",
    title: "Premium Products",
    desc: "We use only top-tier, skin-safe products for every treatment.",
  },
  {
    icon: "🏡",
    title: "Welcoming Space",
    desc: "A warm, calming salon where you can truly relax and unwind.",
  },
  {
    icon: "⭐",
    title: "5-Star Google Rated",
    desc: "Consistently rated 5 stars by our loyal Erith community clients.",
  },
];

function AboutPage({ onNavigate: _onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section
        data-ocid="about.hero.section"
        className="relative h-[420px] md:h-[500px] flex items-center justify-center overflow-hidden"
      >
        <img
          src="/assets/generated/about-hero.dim_1200x500.jpg"
          alt="Erith Beauty Lounge interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <p className="font-accent text-pink text-xl md:text-2xl mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            About Erith Beauty Lounge
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto">
            Your local beauty experts in Erith, DA8
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section data-ocid="about.story.section" className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
          >
            <img
              src="/assets/generated/about-hero.dim_1200x500.jpg"
              alt="Inside Erith Beauty Lounge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
              <p className="text-xs text-muted-foreground">Est. 2018</p>
              <p className="font-heading text-sm font-semibold text-foreground">
                337 Bexley Rd, Erith DA8
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-accent text-pink text-xl mb-3">
              How It All Began
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              Beauty born from{" "}
              <span className="font-accent text-gold">passion</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Erith Beauty Lounge opened its doors at 337 Bexley Rd with one
                simple mission — to bring luxury beauty treatments to the heart
                of Erith, DA8. Founded out of a deep love for beauty and
                self-care, our salon quickly became a beloved destination for
                clients across Erith, Bexleyheath, and South East London.
              </p>
              <p>
                Every treatment we offer, from precision threading and glowing
                facials to intricate nail art and therapeutic lymphatic massage,
                is delivered with skill, care and warmth. We believe every
                client deserves to leave our salon feeling pampered, confident
                and truly seen.
              </p>
              <p>
                Today, Erith Beauty Lounge is proud to serve thousands of happy
                clients and maintain our 5-star reputation — built one
                appointment at a time, through genuine dedication to your beauty
                and wellbeing.
              </p>
            </div>
            <div className="mt-8 flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-pink">500+</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Happy Clients
                </p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">5★</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Google Rating
                </p>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-pink">8yrs</p>
                <p className="text-xs text-muted-foreground mt-1">
                  In Business
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        data-ocid="about.why_us.section"
        className="py-20 px-4 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-accent text-pink text-xl mb-2">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose Erith Beauty Lounge?
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border text-center card-hover-lift"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-sm md:text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section data-ocid="about.team.section" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-accent text-pink text-xl mb-2">The Experts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Our passionate therapists are here to make you look and feel your
              absolute best.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-sm border border-border text-center card-hover-lift"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, #E91E8C 0%, #C9A84C 100%)",
                  }}
                >
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-pink text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section
        data-ocid="about.reviews.section"
        className="py-20 px-4 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="font-accent text-pink text-xl mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Our Clients Say
            </h2>
            <div className="flex justify-center gap-1 mt-3">
              {STARS.map((s) => (
                <Star key={s} size={18} className="fill-gold text-gold" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                5.0 on Google
              </span>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-2xl p-7 shadow-sm border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {STARS.map((s) => (
                    <Star key={s} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-heading font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <span className="text-xs bg-pink/10 text-pink px-3 py-1 rounded-full">
                    {t.service}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        data-ocid="about.cta.section"
        className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #E91E8C 0%, #C9A84C 100%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="font-accent text-white/80 text-xl mb-3">Book Today</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready for your glow-up?
          </h2>
          <p className="text-white/85 text-lg mb-10">
            Book your appointment today – same day slots available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/447700000000"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="about.whatsapp.button"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white text-pink font-semibold shadow-lg hover:bg-white/90 hover:scale-105 hover:shadow-xl active:scale-95 transition-all"
            >
              <SiWhatsapp size={18} /> Book on WhatsApp
            </a>
            <a
              href="tel:+447700000000"
              data-ocid="about.call.button"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
            >
              <Phone size={16} /> Call Us
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  if (page === "services") {
    return (
      <>
        <Navbar page={page} setPage={setPage} />
        <main>
          <ServicesPage onNavigate={setPage} />
        </main>
      </>
    );
  }

  if (page === "about") {
    return (
      <>
        <Navbar page={page} setPage={setPage} />
        <main>
          <AboutPage onNavigate={setPage} />
        </main>
        <Footer setPage={setPage} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar page={page} setPage={setPage} />
      <main>
        <Hero onServicesClick={() => setPage("services")} />
        <ServicesGrid onViewAllPrices={() => setPage("services")} />
        <WhyUs />
        <Testimonials />
        <CTABanner />
        <MapSection />
      </main>
      <Footer setPage={setPage} />
    </div>
  );
}
