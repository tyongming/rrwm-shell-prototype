// PROTOTYPE — THROWAWAY CODE.
// Three variants of the company website, switchable via ?variant= on one route.

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VARIANTS = [
  { key: "A", name: "Signal Grid" },
  { key: "B", name: "Editorial Circuit" },
  { key: "C", name: "Blue Horizon" },
];

const services = [
  {
    title: "Computer hardware supply",
    body: "Business-ready equipment for new offices, upgrades, replacements, and growing teams.",
    detail: "Laptops · Desktops · Servers · Monitors",
    image: "https://images.unsplash.com/photo-1721333092320-6b05183d2fe5?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Parts and component sourcing",
    body: "Hard-to-find components and compatible replacement parts sourced to your specification.",
    detail: "CPU · RAM · SSD · GPU · Network parts",
    image: "https://images.unsplash.com/photo-1672923491001-3e58a608e418?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Custom orders and delivery",
    body: "Send the model, quantity, and destination. We confirm availability, lead time, and delivery.",
    detail: "Model matching · Bulk orders · Regional delivery",
    image: "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?auto=format&fit=crop&w=1400&q=85",
  },
];

const partners = ["Laptops", "Servers", "Components", "Networking", "Storage", "Delivery"];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function BrandMark() {
  return (
    <a className="brand" href="#home" aria-label="Nexora Systems home">
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span>NEXORA</span>
    </a>
  );
}

function Navigation({ mode = "solid" }) {
  return (
    <header className={`nav-shell nav-${mode}`}>
      <BrandMark />
      <nav className="desktop-nav" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#company">About Us</a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="nav-cta" onClick={() => scrollToId("contact")}>Request a quote</button>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <div>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#company">About Us</a>
          <a href="#contact">Contact</a>
        </div>
      </details>
    </header>
  );
}

function WordReveal({ children }) {
  return (
    <p className="word-reveal">
      {children.split(" ").map((word, index) => (
        <span className="reveal-word" key={`${word}-${index}`}>{word}&nbsp;</span>
      ))}
    </p>
  );
}

function Marquee() {
  const row = [...partners, ...partners];
  return (
    <div className="marquee" aria-label="Solution categories">
      <div className="marquee-track">
        {row.map((partner, index) => <span key={`${partner}-${index}`}>{partner}</span>)}
      </div>
    </div>
  );
}

function ContactFooter({ light = false }) {
  return (
    <footer id="contact" className={`contact-footer ${light ? "contact-light" : ""}`}>
      <div className="footer-copy">
        <p>Start with the requirement.</p>
        <h2>Build the right system around it.</h2>
        <a className="primary-button" href="mailto:hello@example.com">hello@example.com <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-meta">
        <BrandMark />
        <p>Computer hardware, component sourcing, and delivery support.</p>
        <div><a href="#services">Services</a><a href="#company">About Us</a><a href="#home">Back to top</a></div>
        <small>Prototype content only. Replace with client information.</small>
      </div>
    </footer>
  );
}

function VariantA() {
  return (
    <div className="site variant-a">
      <Navigation mode="solid" />
      <section id="home" className="hero hero-a">
        <div className="ambient ambient-one" />
        <div className="hero-a-copy">
          <p className="eyebrow">Technology, without the friction</p>
          <h1>Hardware that keeps business moving.</h1>
          <p className="hero-intro">A flexible technology supply partner for teams that need the right equipment, clear communication, and dependable delivery.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollToId("services")}>Explore services</button>
            <button className="text-button" onClick={() => scrollToId("company")}>How we work <span aria-hidden="true">↘</span></button>
          </div>
        </div>
        <div className="hero-a-visual image-card">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=88" alt="Server racks inside a data centre" />
          <div className="visual-caption"><span>Built around your brief</span><b>01 / 03</b></div>
        </div>
      </section>

      <Marquee />

      <section id="services" className="section services-a">
        <div className="section-heading">
          <p className="eyebrow">What we supply</p>
          <h2>Hardware, parts, and delivery support for business IT.</h2>
        </div>
        <div className="bento bento-a">
          <article className="bento-card bento-feature image-card">
            <img src={services[0].image} alt="Server infrastructure" />
            <div><span>01</span><h3>{services[0].title}</h3><p>{services[0].body}</p><small>{services[0].detail}</small></div>
          </article>
          <article className="bento-card bento-copy"><span>02</span><h3>{services[1].title}</h3><p>{services[1].body}</p><small>{services[1].detail}</small></article>
          <article className="bento-card bento-blue"><span>03</span><h3>{services[2].title}</h3><p>{services[2].body}</p><small>{services[2].detail}</small></article>
        </div>
      </section>

      <section id="company" className="section story pinned-story">
        <div className="story-title"><p className="eyebrow">About Nexora</p><h2>Business hardware, handled clearly.</h2></div>
        <div className="story-scroll">
          <article><strong>Who we are</strong><p>Nexora is a prototype business IT supplier helping companies source computers, servers, and replacement components.</p></article>
          <article><strong>What we supply</strong><p>Laptops, desktops, servers, storage, networking equipment, and compatible computer parts.</p></article>
          <article><strong>How we work</strong><p>Send the required model and quantity. We confirm the quotation, availability, lead time, and delivery.</p></article>
        </div>
      </section>

      <section className="section manifesto"><WordReveal>From one replacement component to a complete office rollout, we make business hardware easier to source and deliver.</WordReveal></section>
      <ContactFooter />
    </div>
  );
}

function VariantB() {
  return (
    <div className="site variant-b">
      <Navigation mode="glass" />
      <section id="home" className="hero hero-b">
        <div className="hero-b-copy">
          <p className="eyebrow">Nexora systems</p>
          <h1>Infrastructure, sourced with intent.</h1>
          <p>Purpose-fit hardware, transparent coordination, and support that stays close to the work.</p>
          <a className="primary-button" href="#contact">Discuss a requirement</a>
        </div>
        <div className="hero-b-image image-card">
          <img src="https://images.unsplash.com/photo-1631031509251-62a73758f9d3?auto=format&fit=crop&w=1600&q=88" alt="Close-up of a computer motherboard and storage components" />
          <div className="image-index"><span>Global sourcing</span><span>Focused delivery</span></div>
        </div>
      </section>

      <section id="services" className="section accordion-section">
        <header><p className="eyebrow">What we supply</p><h2>Hardware.<br />Parts. Delivery.</h2></header>
        <div className="horizontal-accordion">
          {services.map((service, index) => (
            <article className="accordion-panel image-card" key={service.title}>
              <img src={service.image} alt="" />
              <span>0{index + 1}</span>
              <div><h3>{service.title}</h3><p>{service.body}</p><small>{service.detail}</small></div>
            </article>
          ))}
        </div>
      </section>

      <Marquee />

      <section id="company" className="section editorial-story pinned-story">
        <div className="story-title"><p className="eyebrow">About Nexora</p><h2>A practical partner for business hardware.</h2></div>
        <div className="story-scroll editorial-list">
          <article><span>Who we are</span><p>A supplier for business computers, servers, and components.</p></article>
          <article><span>What we do</span><p>Match requested models, confirm stock, and prepare clear quotations.</p></article>
          <article><span>How we deliver</span><p>Coordinate lead times and delivery from order confirmation to arrival.</p></article>
        </div>
      </section>

      <section className="section manifesto manifesto-light"><WordReveal>Tell us the hardware, quantity, and destination. We turn that requirement into a clear quotation and delivery plan.</WordReveal></section>
      <ContactFooter light />
    </div>
  );
}

function VariantC() {
  return (
    <div className="site variant-c">
      <Navigation mode="overlay" />
      <section id="home" className="hero hero-c">
        <img className="hero-c-bg" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=88" alt="Blue-lit server racks in a data centre" />
        <div className="hero-c-overlay" />
        <div className="hero-c-copy">
          <p className="eyebrow">Technology solutions for moving businesses</p>
          <h1>Connected <span className="inline-image" aria-hidden="true" /> systems. Clear outcomes.</h1>
          <p>Hardware sourcing and lifecycle support, shaped around the way your organisation actually operates.</p>
          <div className="hero-actions"><a className="primary-button" href="#services">View capabilities</a><a className="secondary-button" href="#contact">Request a quote</a></div>
        </div>
      </section>

      <Marquee />

      <section id="services" className="section services-c">
        <div className="section-heading centered"><p className="eyebrow">What we supply</p><h2>Business hardware from specification to delivery.</h2></div>
        <div className="bento bento-c">
          <article className="bento-card bento-feature image-card"><img src={services[0].image} alt="Laptop with computer hardware components" /><div><span>01</span><h3>{services[0].title}</h3><p>{services[0].body}</p><small>{services[0].detail}</small></div></article>
          <article className="bento-card bento-glow"><span>02</span><h3>{services[1].title}</h3><p>{services[1].body}</p><small>{services[1].detail}</small></article>
          <article className="bento-card bento-outline"><span>03</span><h3>{services[2].title}</h3><p>{services[2].body}</p><small>{services[2].detail}</small></article>
        </div>
      </section>

      <section id="company" className="section c-story pinned-story">
        <div className="story-title"><p className="eyebrow">About Nexora</p><h2>Hardware supply<br />without guesswork.</h2></div>
        <div className="story-scroll">
          <article><strong>Who we are</strong><p>A prototype supplier focused on computers, servers, network equipment, and components for business customers.</p></article>
          <article><strong>What we supply</strong><p>Standard equipment, specialist parts, mixed orders, and replacement hardware.</p></article>
          <article><strong>How to order</strong><p>Share the specification and quantity, approve the quotation, and confirm the delivery destination.</p></article>
        </div>
      </section>

      <section className="section manifesto"><WordReveal>Whether the request is one replacement part or a full office setup, the process stays clear from quotation to delivery.</WordReveal></section>
      <ContactFooter />
    </div>
  );
}

function PrototypeSwitcher({ current, onChange }) {
  const index = VARIANTS.findIndex((variant) => variant.key === current);
  const cycle = (direction) => onChange(VARIANTS[(index + direction + VARIANTS.length) % VARIANTS.length].key);

  useEffect(() => {
    const handleKey = (event) => {
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA"].includes(tag) || document.activeElement?.isContentEditable) return;
      if (event.key === "ArrowLeft") cycle(-1);
      if (event.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="prototype-switcher" role="group" aria-label="Prototype variants">
      <button onClick={() => cycle(-1)} aria-label="Previous variant">←</button>
      <span><b>{current}</b> — {VARIANTS[index].name}</span>
      <button onClick={() => cycle(1)} aria-label="Next variant">→</button>
    </div>
  );
}

export default function App() {
  const root = useRef(null);
  const initialVariant = useMemo(() => {
    const value = new URLSearchParams(window.location.search).get("variant")?.toUpperCase();
    return VARIANTS.some((variant) => variant.key === value) ? value : "A";
  }, []);
  const [variant, setVariant] = useState(initialVariant);

  const changeVariant = (next) => {
    const url = new URL(window.location.href);
    url.searchParams.set("variant", next);
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
    setVariant(next);
  };

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 900px)", () => {
      ScrollTrigger.create({
        trigger: ".pinned-story",
        start: "top 18%",
        end: "bottom 76%",
        pin: ".story-title",
        pinSpacing: false,
      });
    });

    gsap.fromTo(".reveal-word", { opacity: 0.1 }, {
      opacity: 1,
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".word-reveal",
        start: "top 80%",
        end: "bottom 45%",
        scrub: true,
      },
    });

    gsap.fromTo(".image-card img", { scale: 0.88, opacity: 0.72 }, {
      scale: 1,
      opacity: 1,
      ease: "none",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".site",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => media.revert();
  }, { scope: root, dependencies: [variant], revertOnUpdate: true });

  return (
    <main ref={root} className="app-shell">
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      {import.meta.env.DEV && <PrototypeSwitcher current={variant} onChange={changeVariant} />}
    </main>
  );
}
