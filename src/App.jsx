// PROTOTYPE — THROWAWAY CODE.
// Four independent A-direction pages answering how the selected visual system
// should extend across the eventual WordPress site.

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const siteBase = import.meta.env.BASE_URL.replace(/\/$/, "");

const routes = {
  "/": "home",
  "/products-services": "products",
  "/about-us": "about",
  "/contact": "contact",
};

const navigation = [
  { label: "Home", href: "/", key: "home" },
  { label: "Products & Services", href: "/products-services", key: "products" },
  { label: "About Us", href: "/about-us", key: "about" },
  { label: "Contact", href: "/contact", key: "contact" },
];

const categories = [
  {
    title: "Computer Hardware Supply",
    body: "Business-ready equipment for office setups, scheduled upgrades, replacements, and expanding teams.",
    detail: "Laptops · Desktops · Servers · Monitors",
    image: "https://images.unsplash.com/photo-1721333092320-6b05183d2fe5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Parts & Component Sourcing",
    body: "Compatible replacement parts and specialist components sourced against a clear technical requirement.",
    detail: "CPU · RAM · SSD · GPU · Network Parts",
    image: "https://images.unsplash.com/photo-1672923491001-3e58a608e418?auto=format&fit=crop&w=1600&q=85",
  },
  {
    title: "Custom Orders & Delivery",
    body: "Model matching, quantity coordination, lead-time confirmation, and delivery planning for custom orders.",
    detail: "Model Matching · Bulk Orders · Delivery",
    image: "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?auto=format&fit=crop&w=1600&q=85",
  },
];

const capabilityWords = ["Laptops", "Servers", "Components", "Networking", "Storage", "Delivery"];

function normalisePath(pathname) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

function routeFromLocation() {
  const pathname = siteBase && window.location.pathname.startsWith(siteBase)
    ? window.location.pathname.slice(siteBase.length) || "/"
    : window.location.pathname;
  return routes[normalisePath(pathname)] ?? "home";
}

function SiteLink({ href, className, children, onNavigate, ...props }) {
  const siteHref = href === "/" ? `${siteBase}/` : `${siteBase}${href}`;
  const handleClick = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.history.pushState({}, "", siteHref);
    window.dispatchEvent(new PopStateEvent("popstate"));
    onNavigate?.();
  };

  return <a href={siteHref} className={className} onClick={handleClick} {...props}>{children}</a>;
}

function BrandMark() {
  return (
    <SiteLink className="brand" href="/" aria-label="PT. Metagama home">
      <span className="brand-mark" aria-hidden="true"><i /><i /></span>
      <span>PT. METAGAMA</span>
    </SiteLink>
  );
}

function Navigation({ current }) {
  return (
    <header className="nav-shell">
      <BrandMark />
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <SiteLink className={current === item.key ? "active" : ""} href={item.href} key={item.key}>
            {item.label}
          </SiteLink>
        ))}
      </nav>
      <SiteLink className="nav-cta" href="/contact">Request a Quote</SiteLink>
      <details className="mobile-nav">
        <summary aria-label="Open navigation">Menu</summary>
        <div>
          {navigation.map((item) => (
            <SiteLink className={current === item.key ? "active" : ""} href={item.href} key={item.key}>
              {item.label}
            </SiteLink>
          ))}
        </div>
      </details>
    </header>
  );
}

function Marquee() {
  const row = [...capabilityWords, ...capabilityWords];
  return (
    <div className="marquee" aria-label="Supply categories">
      <div className="marquee-track">
        {row.map((word, index) => <span key={`${word}-${index}`}>{word}</span>)}
      </div>
    </div>
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

function PageHero({ eyebrow, title, body, image, imageAlt, children }) {
  return (
    <section className="page-hero">
      <div className="ambient ambient-one" />
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        {children}
      </div>
      <div className="page-hero-visual image-card">
        <img src={image} alt={imageAlt} />
        <div className="visual-caption"><span>Prototype visual</span><b>PTM</b></div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p>Start with the requirement.</p>
        <h2>Source the right technology with a clearer process.</h2>
        <SiteLink className="button button-light" href="/contact">Request a Quote <span aria-hidden="true">↗</span></SiteLink>
      </div>
      <div className="footer-meta">
        <BrandMark />
        <p>Computer hardware, component sourcing, and custom-order support.</p>
        <nav aria-label="Footer navigation">
          <SiteLink href="/products-services">Products & Services</SiteLink>
          <SiteLink href="/about-us">About Us</SiteLink>
          <SiteLink href="/contact">Contact</SiteLink>
        </nav>
        <small>Prototype shell. Replace placeholder company and contact information before public deployment.</small>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Navigation current="home" />
      <section className="home-hero">
        <div className="ambient ambient-one" />
        <div className="home-hero-copy">
          <p className="eyebrow">Technology without the friction</p>
          <h1>Hardware that keeps business moving.</h1>
          <p className="hero-intro">A clear route from requirement to quotation, sourcing, and delivery for business technology needs.</p>
          <div className="hero-actions">
            <SiteLink className="button button-primary" href="/contact">Request a Quote</SiteLink>
            <SiteLink className="text-link" href="/products-services">Explore Products & Services <span aria-hidden="true">↘</span></SiteLink>
          </div>
        </div>
        <div className="home-hero-visual image-card">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88" alt="Server racks inside a data centre" />
          <div className="visual-caption"><span>Built around the brief</span><b>01 / 04</b></div>
        </div>
      </section>

      <Marquee />

      <section className="section home-services">
        <div className="section-heading">
          <p className="eyebrow">A practical supply route</p>
          <h2>Hardware, parts, and delivery support for business IT.</h2>
        </div>
        <div className="home-bento">
          <article className="bento-card bento-feature image-card">
            <img src={categories[0].image} alt="Business computer hardware" />
            <div><h3>{categories[0].title}</h3><p>{categories[0].body}</p><small>{categories[0].detail}</small></div>
          </article>
          <article className="bento-card bento-compact"><h3>{categories[1].title}</h3><p>{categories[1].body}</p><small>{categories[1].detail}</small></article>
          <article className="bento-card bento-blue"><h3>{categories[2].title}</h3><p>{categories[2].body}</p><small>{categories[2].detail}</small></article>
          <article className="bento-card bento-link"><p>See how the three supply routes work together.</p><SiteLink href="/products-services">View Products & Services <span aria-hidden="true">↗</span></SiteLink></article>
        </div>
      </section>

      <section className="section home-process pinned-layout">
        <div className="pin-title"><p className="eyebrow">Clarity at each step</p><h2>From a requirement to a delivery plan.</h2></div>
        <div className="stack-list">
          <article><strong>Share the brief</strong><p>Provide the required model, specification, quantity, and intended destination.</p></article>
          <article><strong>Confirm the route</strong><p>Align on suitable equipment, order requirements, lead time, and next actions.</p></article>
          <article><strong>Coordinate delivery</strong><p>Keep the final requirement and delivery details clear from confirmation onward.</p></article>
        </div>
      </section>

      <section className="section manifesto"><WordReveal>From one replacement component to a complete office rollout, the process should stay clear.</WordReveal></section>
      <SiteFooter />
    </>
  );
}

function ProductsPage() {
  return (
    <>
      <Navigation current="products" />
      <PageHero
        eyebrow="Products & Services"
        title="Technology supplied around the brief."
        body="A flexible starting point for computers, replacement parts, specialist components, and custom orders."
        image={categories[1].image}
        imageAlt="Computer components arranged on a workbench"
      >
        <div className="hero-actions"><SiteLink className="button button-primary" href="/contact">Request a Quote</SiteLink></div>
      </PageHero>

      <section className="section product-accordion-section">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Three connected capabilities</p>
          <h2>Move from model selection to delivery without losing the brief.</h2>
        </div>
        <div className="horizontal-accordion">
          {categories.map((category, index) => (
            <article className="accordion-panel image-card" key={category.title}>
              <img src={category.image} alt="" />
              <span>0{index + 1}</span>
              <div><h3>{category.title}</h3><p>{category.body}</p><small>{category.detail}</small></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-grid-section">
        <div className="product-grid">
          <article className="product-card product-wide"><h3>Everyday business equipment</h3><p>Common requirement categories across laptops, desktops, monitors, storage, servers, and network equipment.</p></article>
          <article className="product-card product-dark"><h3>Specification-led sourcing</h3><p>Use model references and compatibility requirements as the starting point.</p></article>
          <article className="product-card product-blue"><h3>Mixed and custom orders</h3><p>Coordinate multiple categories around one consolidated requirement.</p></article>
          <article className="product-card product-image image-card"><img src={categories[2].image} alt="Boxes prepared for delivery" /><div><h3>Delivery coordination</h3><p>Confirm quantities, destinations, and expected timing before fulfilment.</p></div></article>
          <article className="product-card product-cta"><p>Have a model or specification ready?</p><SiteLink href="/contact">Send the requirement <span aria-hidden="true">↗</span></SiteLink></article>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Navigation current="about" />
      <PageHero
        eyebrow="A clearer supply experience"
        title={<>Built around what business <span className="inline-heading-image" aria-hidden="true" /> needs.</>}
        body="A practical technology supply partner for computers, components, custom orders, and delivery coordination."
        image="https://images.unsplash.com/photo-1631031509251-62a73758f9d3?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Close-up of a computer motherboard"
      />

      <section className="section about-story pinned-layout">
        <div className="pin-title"><p className="eyebrow">A simple company story</p><h2>Who we are. What we supply. How we work.</h2></div>
        <div className="stack-list">
          <article><strong>Who We Are</strong><p>A prototype company profile for a business focused on practical computer hardware and IT equipment supply.</p></article>
          <article><strong>What We Supply</strong><p>Business computers, servers, monitors, storage, networking equipment, and compatible parts across broad requirement types.</p></article>
          <article><strong>How We Work</strong><p>Start from the required model, specification, and quantity; then align the quotation, availability, lead time, and delivery route.</p></article>
        </div>
      </section>

      <section className="section principles-section">
        <div className="section-heading">
          <p className="eyebrow">Built for operational clarity</p>
          <h2>A practical approach to every technology requirement.</h2>
        </div>
        <div className="principle-grid">
          <article><h3>Clear requirements</h3><p>Keep the requested models, quantities, and compatibility needs visible from the start.</p></article>
          <article><h3>Direct communication</h3><p>Use straightforward contact channels to keep expectations and next actions aligned.</p></article>
          <article><h3>Adaptable support</h3><p>Approach standard equipment, replacement parts, and mixed orders around the same clear brief.</p></article>
        </div>
      </section>

      <section className="section manifesto"><WordReveal>Clear requirements and direct communication make the next technology decision easier.</WordReveal></section>
      <SiteFooter />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Navigation current="contact" />
      <PageHero
        eyebrow="Start with the requirement"
        title="A direct route to the next conversation."
        body="Choose the most direct channel for the model, specification, quantity, destination, and timing you have in mind."
        image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88"
        imageAlt="Technology infrastructure in a data centre"
      />

      <section className="section contact-section">
        <div className="section-heading">
          <p className="eyebrow">Prototype contact details</p>
          <h2>Choose the channel that fits the requirement.</h2>
        </div>
        <div className="contact-grid">
          <a className="contact-card" href="mailto:contact@example.com"><span>Email</span><strong>contact@example.com</strong><small>Reserved example address</small></a>
          <a className="contact-card" href="tel:+00000000000"><span>Telephone</span><strong>+00 000 000 000</strong><small>Invalid placeholder number</small></a>
          <a className="contact-card contact-card-blue" href="https://wa.me/00000000000"><span>WhatsApp</span><strong>+00 000 000 000</strong><small>Replace before deployment</small></a>
        </div>
      </section>

      <section className="section contact-brief">
        <div className="contact-brief-copy"><p className="eyebrow">What to include</p><h2>A short brief is enough to begin.</h2></div>
        <div className="brief-list">
          <span>Required model or specification</span>
          <span>Estimated quantity</span>
          <span>Delivery destination</span>
          <span>Preferred timing</span>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}

const pageComponents = {
  home: HomePage,
  products: ProductsPage,
  about: AboutPage,
  contact: ContactPage,
};

export default function App() {
  const root = useRef(null);
  const [route, setRoute] = useState(routeFromLocation);
  const Page = pageComponents[route];

  useEffect(() => {
    const handleRouteChange = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = `${navigation.find((item) => item.key === route)?.label ?? "Home"} — PT. Metagama Prototype`;
  }, [route]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 901px)", () => {
      gsap.utils.toArray(".pinned-layout").forEach((section) => {
        const title = section.querySelector(".pin-title");
        if (!title) return;
        ScrollTrigger.create({ trigger: section, start: "top 16%", end: "bottom 72%", pin: title, pinSpacing: false });
      });
    });

    gsap.fromTo(".reveal-word", { opacity: 0.1 }, {
      opacity: 1,
      stagger: 0.08,
      scrollTrigger: { trigger: ".word-reveal", start: "top 82%", end: "bottom 45%", scrub: true },
    });

    gsap.utils.toArray(".image-card img").forEach((image) => {
      gsap.fromTo(image, { scale: 0.9, opacity: 0.74 }, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: image.closest(".image-card"), start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });

    return () => media.revert();
  }, { scope: root, dependencies: [route], revertOnUpdate: true });

  return <main ref={root} className="app-shell"><Page /></main>;
}
