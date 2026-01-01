
import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen animate-fade-in text-off-white">
      {/* 1. HERO SECTION: IDENTITY & AUTHORITY */}
      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h5 className="font-mono text-cyber-lime text-xs uppercase tracking-[0.4em] mb-4">Founder • Architect • Captain</h5>
            <h1 className="font-display text-8xl md:text-[12rem] leading-[0.85] tracking-tighter uppercase">
              IAN RYAN <br /> <span className="text-warm-gray">KIRK</span>
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl text-warm-gray font-light leading-relaxed">
              I build systems that automate income so founders can reclaim their sovereignty and lead high-performance lives.
            </p>
          </div>
          <div className="lg:col-span-4">
             <div className="aspect-[3/4] overflow-hidden grayscale border border-white/10 rounded-sm relative group">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Ian Ryan Kirk" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
             </div>
          </div>
        </div>
      </section>

      {/* 2. THE QUOTE: CORE PHILOSOPHY */}
      <section className="py-32 bg-background-alt border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-tight italic">
            "I spent 20 years learning how to build a business. I spent the last 5 learning how to <span className="text-cyber-lime">build a life</span> that doesn't require me to be the engine."
          </h2>
        </div>
      </section>

      {/* 3. THE NARRATIVE: THE GRIT (1999 - 2008) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <h3 className="font-display text-6xl tracking-tighter uppercase leading-none">
              The <span className="text-starlink">VHS</span> Era & <br /> The High Stakes Crash
            </h3>
            <div className="space-y-6 text-warm-gray text-lg font-light leading-relaxed">
              <p>1999. I was just a kid with a VHS camera and a wakeboard. I didn't have a mentor; I had a phone book and a pulse.</p>
              <p>I built my first 5-figure monthly business from cold calls. We were guerrilla-marketing at boat shows, editing on bootleg software in a basement. It felt like I'd hacked the world.</p>
              <p>But success is a dangerous drug. It convinced me I was unstoppable. I dove into real estate empires, $10M developments, and high-stakes trade. I crushed it. Until the bottom fell out in 2008.</p>
              <p className="text-off-white font-medium">When I lost it all, it wasn't just the money. It was the identity. I reached for the phone, but there was no one left to call. I was $10M down and out of moves.</p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-white/5 border border-white/10 p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1000" 
                 className="w-full h-full object-cover grayscale" 
                 alt="Early days hustle"
               />
            </div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-starlink/20 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* 4. THE SILENCE: THE MOUNTAIN YEARS */}
      <section className="py-32 bg-background-alt">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <span className="font-mono text-cyber-lime text-xs uppercase tracking-widest">The Transformation</span>
          <h2 className="font-display text-7xl md:text-9xl tracking-tighter uppercase leading-none">4 YEARS <br /> OF SILENCE</h2>
          <div className="space-y-8 text-xl text-warm-gray font-light leading-relaxed">
            <p>I turned off my phone for 4 years. I disappeared to the mountains. I taught snowboarding for $20 an hour. I found myself in the silence between turns.</p>
            <p className="text-off-white font-medium italic">Those 4 years taught me everything about architecture over hustle.</p>
            <p>I realized that most entrepreneurs aren't building businesses—they're building high-stress jobs for themselves. I vowed that if I ever built again, it would be different. It would be an engine, not a cage.</p>
          </div>
        </div>
      </section>

      {/* 5. THE SCALE: 2012 - 2022 */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h3 className="font-display text-5xl tracking-tighter uppercase sticky top-32">The <br /> Architecture <br /> of Scale</h3>
            </div>
            <div className="lg:col-span-2 space-y-16">
              <div className="border-l border-cyber-lime pl-8 space-y-4">
                <span className="font-mono text-cyber-lime text-xs uppercase tracking-widest">Phase 01</span>
                <h4 className="font-display text-3xl uppercase">The Systemization of Sales</h4>
                <p className="text-warm-gray font-light leading-relaxed">Between 2012 and 2015, I rebuilt from scratch. This time, I didn't rely on my charisma. I built the "Call Reflex" methodology—a way to analyze human belief gaps and close high-ticket deals through cold, hard logic.</p>
              </div>
              <div className="border-l border-white/10 pl-8 space-y-4">
                <span className="font-mono text-warm-gray text-xs uppercase tracking-widest">Phase 02</span>
                <h4 className="font-display text-3xl uppercase">The Multi-Company Automation</h4>
                <p className="text-warm-gray font-light leading-relaxed">I scaled three separate high-performance companies simultaneously. By 2018, they were running on 95% automation. I was no longer the bottleneck. I was the architect.</p>
              </div>
              <div className="border-l border-white/10 pl-8 space-y-4">
                <span className="font-mono text-warm-gray text-xs uppercase tracking-widest">Phase 03</span>
                <h4 className="font-display text-3xl uppercase">The Victoria Intelligence Layer</h4>
                <p className="text-warm-gray font-light leading-relaxed">With the rise of Ai, I saw the ultimate lever. I took 20 years of pattern recognition and encoded it. This is where Captain AI was born—the fusion of human grit and artificial precision.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE BOOK: RAISED BY TWO TEACHERS */}
      <section className="py-32 bg-starlink text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <h5 className="font-mono uppercase tracking-[0.4em] text-sm opacity-80">Foundation</h5>
            <h2 className="font-display text-7xl md:text-9xl tracking-tighter uppercase leading-none">RAISED BY <br /> TWO TEACHERS</h2>
            <p className="text-xl opacity-90 font-light leading-relaxed max-w-lg">
              My book isn't just a memoir. It's the blueprint for how I traded money for time, grew faster, and created a decade of freedom. It's the philosophy behind the Captain AI system.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-starlink px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-off-white transition-all">Get the Book</button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all">Read Reviews</button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-80 h-[480px] bg-background-alt border-[10px] border-white/10 shadow-2xl rotate-6 hover:rotate-0 transition-transform duration-700 p-8 flex flex-col justify-between">
               <span className="font-display text-4xl leading-none">RAISED <br /> BY TWO <br /> TEACHERS</span>
               <div className="w-full h-1 bg-white/20" />
               <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">The System behind the lifestyle</span>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
      </section>

      {/* 7. THE MISSION NOW: BUILDING PEOPLE */}
      <section className="py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <h2 className="font-display text-7xl md:text-9xl tracking-tighter uppercase">THE MISSION NOW</h2>
          <div className="text-xl text-warm-gray font-light space-y-8 leading-relaxed">
            <p>I shouldn't be here. But I am. And because I am, I have a responsibility to the people who are currently where I was in 2008.</p>
            <p>Captain AI isn't an "agency." It's a digital command center. I'm building a community of founders who refuse to trade their lives for their business.</p>
            <p className="text-cyber-lime font-display text-4xl">I AM BUILDING SOVEREIGN PEOPLE.</p>
          </div>
          
          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-display text-3xl mb-2">JOIN THE CREW</h4>
              <p className="text-warm-gray font-mono text-xs uppercase tracking-widest">Access the Victoria Intelligence Layer</p>
            </div>
            <button className="bg-cyber-lime text-background px-12 py-6 rounded-sm font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl shadow-cyber-lime/10">
              Apply to the Command Center
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-background-alt border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="font-display text-4xl tracking-tighter text-off-white flex items-center gap-3">
              <span className="w-10 h-10 bg-cyber-lime text-background flex items-center justify-center font-bold">C</span>
              CAPTAIN AI
           </div>
           <div className="flex gap-8">
             <a href="#" className="font-mono text-xs uppercase tracking-widest text-warm-gray hover:text-cyber-lime transition-colors">Instagram</a>
             <a href="#" className="font-mono text-xs uppercase tracking-widest text-warm-gray hover:text-cyber-lime transition-colors">YouTube</a>
             <a href="#" className="font-mono text-xs uppercase tracking-widest text-warm-gray hover:text-cyber-lime transition-colors">LinkedIn</a>
           </div>
        </div>
      </section>
    </div>
  );
};
