
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Layout';
import { PRODUCT_TIERS } from './constants';
import { ClarityCoachModal } from './components/ClarityCoachModal';
import { WaitlistModal } from './components/WaitlistModal';
import { BookAudioPlayer } from './components/BookAudioPlayer';
import { AboutPage } from './components/AboutPage';
import { MessagePage } from './components/MessagePage';

export default function App() {
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'message'>('home');
  
  const clarityLink = "https://chatgpt.com/g/g-683752da6f10819187d894848e822a2c-ultimate-business-clarity-coach";

  // Handle back-to-top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigateHome = () => setCurrentView('home');
  const handleNavigateAbout = () => setCurrentView('about');
  const handleNavigateMessage = () => setCurrentView('message');

  const CommonFooter = () => (
    <footer className="bg-background-alt pt-16 pb-16 border-t border-white/5 text-center">
       <button 
        onClick={handleNavigateHome}
        className="text-cyber-lime font-mono text-xs uppercase tracking-widest hover:text-off-white transition-colors"
      >
        ← Back to Command Center
      </button>
    </footer>
  );

  if (currentView === 'about') {
    return (
      <div className="relative">
        <Navbar 
          onNavigateHome={handleNavigateHome} 
          onNavigateAbout={handleNavigateAbout} 
          onNavigateMessage={handleNavigateMessage}
        />
        <AboutPage />
        <CommonFooter />
      </div>
    );
  }

  if (currentView === 'message') {
    return (
      <div className="relative">
        <Navbar 
          onNavigateHome={handleNavigateHome} 
          onNavigateAbout={handleNavigateAbout} 
          onNavigateMessage={handleNavigateMessage}
        />
        <MessagePage />
        <CommonFooter />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar 
        onNavigateHome={handleNavigateHome} 
        onNavigateAbout={handleNavigateAbout} 
        onNavigateMessage={handleNavigateMessage}
      />
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Luxury Cabin Office Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-70" 
            alt="Luxury cabin office with fireplace and mountain view"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-display text-6xl md:text-9xl tracking-tighter text-off-white mb-6 animate-fade-in-up">
            THE SYSTEM BEHIND <br /> THE LIFESTYLE.
          </h1>
          <p className="text-xl md:text-2xl text-warm-gray mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            I spent a decade living it. <br className="hidden md:block" />
            I spent the last year automating it all with Ai.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleNavigateMessage}
              className="w-full md:w-auto bg-cyber-lime text-background px-10 py-5 rounded-sm font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-cyber-lime/10 text-center"
            >
              Work with Me
            </button>
            <a href="#starter-kit" className="text-warm-gray hover:text-off-white font-mono text-sm border-b border-transparent hover:border-warm-gray transition-all">
              ↓ Get My Online Business Starter Kit ↓
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section id="problem" className="py-32 bg-background-alt border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-8 text-2xl md:text-4xl font-light leading-tight text-off-white">
            <div className="text-warm-gray italic space-y-4">
              <p>You've done the courses.</p>
              <p>Downloaded the templates.</p>
              <p>Watched the YouTube breakdowns.</p>
            </div>
            
            <p className="pt-8">And you're still:</p>
            
            <ul className="space-y-4 text-warm-gray">
              <li>— Losing deals you should've closed</li>
              <li>— Chasing leads instead of Choosing them</li>
              <li>— Trading hours for income</li>
            </ul>
            
            <p className="text-cyber-lime font-display text-4xl pt-12 tracking-wider">
              THE GURUS SOLD YOU TACTICS. <br /> YOU NEEDED ARCHITECTURE.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRODUCT GRID */}
      <section id="starter-kit" className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-24 text-center">
            <h2 className="text-6xl md:text-9xl font-display tracking-tighter mb-6 uppercase leading-none">
              Online Business <br className="hidden md:block" /> Starter Kit
            </h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">
              Four tools. One system. Built to run without you.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12">
            {PRODUCT_TIERS.map((tier) => (
              <div key={tier.id} className="glass-card p-10 group relative flex flex-col justify-between hover:border-white/20 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                   <div className={`w-3 h-3 rounded-full ${tier.accent === 'lime' ? 'bg-cyber-lime shadow-[0_0_15px_rgba(180,255,0,0.5)]' : 'bg-starlink shadow-[0_0_15px_rgba(0,82,255,0.5)]'}`} />
                </div>
                
                <div>
                  <h3 className="font-display text-4xl mb-2 tracking-tight">{tier.title}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-warm-gray mb-8">{tier.subtitle}</p>
                  
                  <div className="aspect-video mb-8 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={tier.image} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" alt={tier.title} />
                  </div>
                  
                  <p className="text-warm-gray mb-10 leading-relaxed font-light">
                    {tier.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <span className="font-mono text-xs text-warm-gray">{tier.price}</span>
                  {tier.href ? (
                    <a 
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all text-center ${
                        tier.accent === 'lime' 
                          ? 'bg-cyber-lime text-background hover:scale-105 active:scale-95' 
                          : 'border border-starlink text-starlink hover:bg-starlink hover:text-white'
                      }`}
                    >
                      {tier.ctaText}
                    </a>
                  ) : (
                    <button 
                      onClick={() => {
                        if (tier.id === 'cards') setIsWaitlistOpen(true);
                      }}
                      className={`px-6 py-3 rounded-sm font-bold text-xs uppercase tracking-widest transition-all ${
                        tier.accent === 'lime' 
                          ? 'bg-cyber-lime text-background hover:scale-105 active:scale-95' 
                          : 'border border-starlink text-starlink hover:bg-starlink hover:text-white'
                      }`}
                    >
                      {tier.ctaText}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE PROOF */}
      <section id="proof" className="py-32 bg-background-alt overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-5xl md:text-7xl mb-8 tracking-tighter leading-none">
                BUILT IN THE FIELD. <br /> TESTED ON REAL CALLS.
              </h2>
              <div className="space-y-12">
                <div className="flex gap-8">
                  <div className="text-cyber-lime text-5xl font-display tracking-widest">500+</div>
                  <div>
                    <h4 className="text-off-white font-bold mb-1 uppercase tracking-widest">Conversations Analyzed</h4>
                    <p className="text-warm-gray text-sm">Real-world data training the Victoria engine daily.</p>
                  </div>
                </div>
                <div className="flex gap-8">
                  <div className="text-starlink text-5xl font-display tracking-widest">$100M+</div>
                  <div>
                    <h4 className="text-off-white font-bold mb-1 uppercase tracking-widest">In High-Ticket Deals</h4>
                    <p className="text-warm-gray text-sm">Pattern recognition from the world's most aggressive front lines.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-10 bg-cyber-lime/5 blur-3xl rounded-full" />
              <div className="relative glass-card p-8 font-mono text-[10px] md:text-xs leading-relaxed opacity-60">
                <span className="text-cyber-lime">// ANALYZING BELIEF GAP...</span> <br />
                <span className="text-warm-gray">[T-MINUS 00:04:12] User mentions "budget constraints"</span> <br />
                <span className="text-starlink">VICTORIA DIAGNOSIS:</span> Archetype: Skeptic Researcher. <br />
                Belief state: Missing ROI conviction. <br />
                <span className="text-cyber-lime">REFRAME:</span> Shift from expense to opportunity cost. <br />
                <span className="text-warm-gray">... REFRAMING COMPLETE. PROBABILITY OF CLOSE INCREASED BY 22%.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HUMAN ANCHOR */}
      <section id="anchor" className="relative py-48 md:py-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-25 grayscale" 
            alt="Warm library interior"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-6xl md:text-8xl tracking-tight text-off-white mb-6">RAISED BY TWO TEACHERS</h2>
          <p className="font-mono text-cyber-lime text-sm uppercase tracking-[0.3em] mb-8">The book behind the system.</p>
          
          {/* Audio Player Component */}
          <div className="mb-12">
            <BookAudioPlayer />
          </div>

          <p className="text-xl text-warm-gray mb-12 leading-relaxed font-light">
            Before the AI. Before the funnels. Before the decade of freedom.
          </p>
          <button 
            onClick={handleNavigateMessage}
            className="bg-cyber-lime text-background px-10 py-5 rounded-sm font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
          >
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* SECTION 6: ORIGIN STORY PREVIEW */}
      <section id="origin" className="py-32 bg-background-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             <div className="order-2 lg:order-1 space-y-8">
              <h2 className="font-display text-5xl md:text-7xl tracking-tighter leading-none">
                I BUILT IT. <br /> LOST IT. <br /> REBUILT IT DIFFERENT.
              </h2>
              <div className="text-warm-gray space-y-6 font-light leading-relaxed">
                <p>In 1999, I built a 5-figure monthly business from cold calls and VHS tapes. A wakeboarding school, guerrilla-marketed at boat shows, edited on bootleg software.</p>
                <p>Then success convinced me I was unstoppable. Real estate, MLM empires, $10M developments. I crushed it. Until it all vanished overnight.</p>
                <p>I turned off my phone for 4 years. Disappeared to the mountains. Taught snowboarding.</p>
              </div>
              <button 
                onClick={handleNavigateAbout}
                className="inline-block border-b-2 border-cyber-lime text-off-white font-display text-2xl pb-1 hover:text-cyber-lime transition-all uppercase tracking-widest"
              >
                Read My Full Story →
              </button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Entrepreneurial spirit in the mountains" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE PATH */}
      <section id="ladder" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl md:text-7xl mb-24 tracking-tighter">YOUR PATH TO FREEDOM</h2>
          
          <div className="space-y-0 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
            
            {[
              { id: 'clarity', step: '01', title: 'BUSINESS CLARITY COACH', desc: 'Get clear on your offer, your audience, your path.', type: 'Free' },
              { id: 'box', step: '02', title: 'No Brainer Lead Magnet', desc: 'Get a validated no brainer offer that businesses gladly sign up for that reveals they need your services.', type: 'FREE to use Pay to White Label' },
              { id: 'reflex', step: '03', title: 'CALL REFLEX AGENT', desc: 'Diagnose every call. Find your blind spots.', type: 'FREE' },
              { id: 'cards', step: '04', title: 'SALES OBJECTION TRAINING CARD APP', desc: '56 objections. 56 reframes. In your pocket.', type: '$9/mo' },
              { id: 'coaching', step: '05', title: 'COURSE COMMUNITY & COACHING', desc: 'Live practice. Real feedback. The crew.', type: 'Free to 50k per year' },
            ].map((item, i) => (
              <div key={i} className={`relative md:flex items-center gap-20 mb-20 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 text-right">
                  <div className={`hidden md:block ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-cyber-lime font-display text-6xl opacity-20">{item.step}</span>
                    <h4 className="text-off-white font-display text-3xl tracking-wide mt-2">{item.title}</h4>
                    <p className="text-warm-gray text-sm font-mono mt-1">{item.type}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-10 h-10 items-center justify-center bg-background border border-white/10 rounded-full z-10">
                   <div className="w-2 h-2 bg-cyber-lime rounded-full" />
                </div>
                
                <div className="md:w-1/2 text-left">
                  <div 
                    onClick={() => {
                      if (item.id === 'cards') setIsWaitlistOpen(true);
                      else handleNavigateMessage();
                    }}
                    className={`bg-white/5 border border-white/5 p-8 rounded-sm hover:border-white/20 transition-all cursor-pointer ${i % 2 === 0 ? 'text-left' : 'md:text-left'}`}
                  >
                    <div className="md:hidden flex items-center justify-between mb-4">
                      <span className="text-cyber-lime font-display text-4xl opacity-50">{item.step}</span>
                      <span className="text-warm-gray text-[10px] font-mono border border-white/10 px-2 py-1 uppercase">{item.type}</span>
                    </div>
                    <h4 className="md:hidden text-off-white font-display text-2xl tracking-wide mb-2">{item.title}</h4>
                    <p className="text-warm-gray text-base leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleNavigateMessage}
            className="inline-block mt-20 bg-cyber-lime text-background px-12 py-6 rounded-sm font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform text-center"
          >
            Start with Business Clarity Coach — It's Free
          </button>
        </div>
      </section>

      {/* FOOTER / FINAL CTA */}
      <footer id="footer" className="bg-background-alt pt-32 pb-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-6xl md:text-9xl tracking-tighter mb-8 text-off-white">THE LIFESTYLE IS REAL. <br /> THE SYSTEM IS READY.</h2>
          <p className="text-xl text-warm-gray mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Start with Business Clarity Coach. It's free, it's AI-powered, and it might just change how you think about your business.
          </p>
          <button 
            onClick={handleNavigateMessage}
            className="inline-block bg-cyber-lime text-background px-12 py-6 rounded-sm font-bold text-sm uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-transform mb-32 text-center"
          >
            Work with Me
          </button>
          
          <div className="grid md:grid-cols-4 gap-12 text-left border-t border-white/5 pt-16">
            <div className="col-span-2">
              <button 
                onClick={handleNavigateHome}
                className="font-display text-3xl tracking-tighter text-off-white flex items-center gap-3 mb-6"
              >
                <span className="w-10 h-10 bg-cyber-lime text-background flex items-center justify-center font-bold">C</span>
                CAPTAIN AI
              </button>
              <p className="text-warm-gray text-sm max-w-sm leading-relaxed font-light">
                Built on 20 years of real-world pattern recognition. 
                Designed for founders who want to engineer freedom, not chase it.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-display text-xl tracking-widest uppercase">Navigation</h5>
              <ul className="text-warm-gray text-sm space-y-2 font-mono uppercase tracking-widest">
                <li><button onClick={handleNavigateMessage} className="hover:text-cyber-lime">Course & Coaching</button></li>
                <li><a href="#starter-kit" className="hover:text-cyber-lime">Starter Kit</a></li>
                <li><button onClick={handleNavigateMessage} className="hover:text-cyber-lime">Live Events</button></li>
                <li><button onClick={handleNavigateAbout} className="hover:text-cyber-lime">About Ian</button></li>
                <li><button onClick={handleNavigateMessage} className="hover:text-cyber-lime">Subscribe</button></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-display text-xl tracking-widest uppercase">Connect</h5>
              <ul className="text-warm-gray text-sm space-y-2 font-mono uppercase tracking-widest">
                <li><a href="#" className="hover:text-cyber-lime">LinkedIn</a></li>
                <li><a href="#" className="hover:text-cyber-lime">Twitter / X</a></li>
                <li><a href="#" className="hover:text-cyber-lime">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-32 pt-8 border-t border-white/5 text-[10px] text-warm-gray font-mono uppercase tracking-widest gap-4">
            <p>© 2025 Captain AI / Ian Ryan Kirk. All Rights Reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-off-white">Privacy Policy</a>
              <a href="#" className="hover:text-off-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Coach Modal */}
      <ClarityCoachModal isOpen={isCoachOpen} onClose={() => setIsCoachOpen(false)} />
      
      {/* Waitlist Modal / Coming Soon Page */}
      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
        title="Sales Objection Training Card App" 
      />
    </div>
  );
}
