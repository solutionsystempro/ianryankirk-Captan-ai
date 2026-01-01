
import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateMessage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome, onNavigateAbout, onNavigateMessage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Course Community & Coaching', href: '#ladder', action: onNavigateMessage },
    { name: 'Online Business Starter Kit', href: '#starter-kit', action: onNavigateHome },
    { name: 'Live Events & Meet Ups', href: '#anchor', action: onNavigateMessage },
    { name: 'About Ian', href: '#origin', action: onNavigateAbout },
    { name: 'Subscribe', href: '#footer', action: onNavigateMessage },
  ];

  const workWithOptions = [
    { name: 'Clarity Audit', desc: '1-on-1 strategic diagnostic', href: '#starter-kit', action: onNavigateHome },
    { name: 'System Deployment', desc: 'Full AI business architecture', href: '#message', action: onNavigateMessage },
    { name: 'The Inner Circle', desc: 'Mastermind & coaching', href: '#message', action: onNavigateMessage },
    { name: 'Reflex Training', desc: 'Sales team analysis', href: '#starter-kit', action: onNavigateHome },
  ];

  const handleLinkClick = (e: React.MouseEvent, action?: () => void, href?: string) => {
    if (action) {
      if (href?.startsWith('#') && href !== '#message') {
        // Normal scroll link
        action();
      } else {
        // View change link
        e.preventDefault();
        action();
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-alt/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={onNavigateHome}
          className="font-display text-2xl tracking-tighter text-off-white flex items-center gap-2 group flex-shrink-0"
        >
          <span className="w-8 h-8 bg-cyber-lime text-background flex items-center justify-center font-bold rotate-12 group-hover:rotate-0 transition-transform">C</span>
          <span className="hidden sm:inline">CAPTAIN AI</span>
        </button>
        
        <div className="hidden lg:flex gap-6 xl:gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.action, link.href)}
              className="text-[10px] xl:text-xs font-mono uppercase tracking-widest text-warm-gray hover:text-cyber-lime transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          
          {/* Dropdown Menu */}
          <div className="relative ml-4" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 bg-cyber-lime text-background px-6 py-2 rounded-sm font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 whitespace-nowrap ${isDropdownOpen ? 'ring-2 ring-white/20' : ''}`}
            >
              Work with Me
              <svg 
                className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Content */}
            <div className={`absolute right-0 mt-4 w-72 origin-top-right transition-all duration-300 transform ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
              <div className="bg-background-alt border border-white/10 shadow-2xl overflow-hidden rounded-sm">
                <div className="p-2">
                  {workWithOptions.map((option) => (
                    <a 
                      key={option.name} 
                      href={option.href}
                      onClick={(e) => {
                        handleLinkClick(e, option.action, option.href);
                        setIsDropdownOpen(false);
                      }}
                      className="block p-4 hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-off-white font-display text-lg tracking-wider uppercase group-hover:text-cyber-lime transition-colors">
                          {option.name}
                        </span>
                        <span className="text-cyber-lime opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </div>
                      <p className="text-[10px] text-warm-gray font-mono uppercase tracking-widest leading-none">
                        {option.desc}
                      </p>
                    </a>
                  ))}
                </div>
                <div className="bg-cyber-lime/5 p-3 text-center border-t border-white/10">
                  <span className="text-[9px] font-mono text-warm-gray uppercase tracking-[0.2em]">Select an intelligence track</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button className="lg:hidden text-off-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </button>
      </div>
    </nav>
  );
};
