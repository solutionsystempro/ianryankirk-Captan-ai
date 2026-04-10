import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';

const NAV_LINKS = [
  { label: 'Tools', href: '/#tools' },
  { label: 'The Book', href: '/#book' },
  { label: 'About', href: '/about' },
  { label: 'Subscribe', href: '/contact' },
];

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);
      setNavHidden(currentY > lastScrollY.current && currentY > 120);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleHashLink = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-off-white">
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navHidden
            ? '-translate-y-full'
            : scrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-accent/10 shadow-[0_1px_40px_rgba(0,0,0,0.6)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-9 h-9 text-background flex items-center justify-center font-display text-xl rotate-6 group-hover:rotate-0 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #AAFF00 0%, #00C853 100%)' }}>
              C
            </span>
            <span className="font-display text-2xl tracking-tighter text-off-white hidden sm:inline">
              CAPTAIN AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleHashLink(link.href)}
                  className="relative font-sans text-sm font-semibold uppercase tracking-widest text-warm-gray hover:text-off-white transition-colors duration-300 group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(170,255,0,0.8)]" />
                </button>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative font-sans text-sm font-semibold uppercase tracking-widest text-warm-gray hover:text-off-white transition-colors duration-300 group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(170,255,0,0.8)]" />
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://slap-method-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm font-semibold uppercase tracking-widest text-warm-gray hover:text-starlink transition-colors duration-200"
            >
              SLAP Method ↗
            </a>
            <Link
              to="/contact"
              className="btn-primary"
            >
              Work With Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-off-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[5px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-off-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-off-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-start pt-28 px-8 gap-8">
              {NAV_LINKS.map((link, i) =>
                link.href.startsWith('/#') ? (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => handleHashLink(link.href)}
                    className="font-display text-5xl tracking-tighter text-off-white hover:text-starlink transition-colors text-left"
                  >
                    {link.label}
                  </motion.button>
                ) : (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className="font-display text-5xl tracking-tighter text-off-white hover:text-starlink transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              )}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 flex flex-col gap-4"
              >
                <a
                  href="https://slap-method-production.up.railway.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-block text-center"
                >
                  SLAP Method — Free ↗
                </a>
                <Link to="/contact" className="btn-primary inline-block text-center">
                  Work With Me
                </Link>
              </motion.div>
            </div>

            <div className="px-8 pb-12 flex gap-6">
              {SOCIAL_LINKS.slice(0, 4).map((s) => (
                <a
                  key={s.handle}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-tag hover:text-starlink transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGE CONTENT with transition */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-background-alt border-t border-white/10 pt-20 pb-10">
        <div className="container-wide">
          <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-white/8">
            {/* Brand */}
            <div className="md:col-span-2 space-y-5">
              <Link to="/" className="flex items-center gap-3 group w-fit">
                <span className="w-10 h-10 text-background flex items-center justify-center font-display text-2xl" style={{ background: 'linear-gradient(135deg, #AAFF00 0%, #00C853 100%)' }}>
                  C
                </span>
                <span className="font-display text-3xl tracking-tighter text-off-white">CAPTAIN AI</span>
              </Link>
              <p className="text-warm-gray text-sm leading-relaxed max-w-sm font-light">
                20 years of field-tested sales patterns, now encoded in AI. Built for founders
                who are done winging it.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.handle}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/10 flex items-center justify-center text-warm-gray hover:border-starlink hover:text-starlink transition-all label-tag"

                    title={`${s.name} ${s.handle}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h5 className="font-display text-lg tracking-widest uppercase">Tools</h5>
              <ul className="space-y-2.5">
                {[
                  { label: 'SLAP Method', href: 'https://slap-method-production.up.railway.app/', ext: true },
                  { label: 'Clarity Coach', href: 'https://ultimate-clarity-coach.vercel.app/', ext: true },
                  { label: 'Call Reflekt Agent', href: 'https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0', ext: true },
                  { label: 'Objection Card App', href: 'https://objection-cards-app-production.up.railway.app/', ext: true },
                  { label: 'The Book', href: '/#book', ext: false },
                ].map((item) =>
                  item.ext ? (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-tag hover:text-starlink transition-colors"
                      >
                        {item.label} ↗
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <Link to={item.href} className="label-tag hover:text-accent transition-colors">
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Communities */}
            <div className="space-y-4">
              <h5 className="font-display text-lg tracking-widest uppercase">Communities</h5>
              <ul className="space-y-2.5">
                <li>
                  <a href="https://www.skool.com/ai-automation-insiders/about?ref=64378607e4d44ad99d39a6c9c49f3bff" target="_blank" rel="noopener noreferrer" className="label-tag hover:text-accent transition-colors">
                    AI Automation Secrets ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.skool.com/lead-gen" target="_blank" rel="noopener noreferrer" className="label-tag hover:text-accent transition-colors">
                    Lead Gen Secrets ↗
                  </a>
                </li>
                <li>
                  <a href="https://www.skool.com/remote-sales-secrets/about?ref=64378607e4d44ad99d39a6c9c49f3bff" target="_blank" rel="noopener noreferrer" className="label-tag hover:text-accent transition-colors">
                    Remote Sales Secrets ↗
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-4">
            <p className="label-tag">
              © {new Date().getFullYear()} Captain AI / Ian Ryan Kirk. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="label-tag hover:text-starlink transition-colors">Privacy Policy</a>
              <a href="#" className="label-tag hover:text-starlink transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
