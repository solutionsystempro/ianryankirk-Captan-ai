
import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen animate-fade-in">
      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h1 className="font-display text-7xl md:text-9xl leading-none tracking-tighter text-off-white">
              HEY, I'M IAN. <br />
              <span className="text-warm-gray">AND I WASN'T SUPPOSED TO BE HERE.</span>
            </h1>
            <div className="relative aspect-[3/4] overflow-hidden grayscale border border-white/10 rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-full object-cover" 
                alt="Ian Ryan Kirk dramatic portrait" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
          </div>
          
          <div className="space-y-10 pt-10 lg:pt-32">
            <div className="space-y-6 text-warm-gray text-lg md:text-xl font-light leading-relaxed">
              <p className="text-off-white font-medium">1999. I was just a kid with a VHS camera and a wakeboard.</p>
              <p>I built my first 5-figure monthly business from cold calls and grit. Guerrilla-marketed at boat shows, editing on bootleg software. It felt like I'd hacked the world.</p>
              <p>Then success convinced me I was unstoppable. I dove into real estate empires, $10M developments, high-stakes trade. I crushed it. Until I didn't.</p>
              <p>When the bottom fell out, it wasn't just money. It was identity. I reached for the phone, but there was no one left to call. Ready to quit. But I didn't.</p>
              <p className="italic">That moment should have been the end. Instead, it was a new beginning.</p>
              <p>I turned off my phone for 4 years. Disappeared to the mountains. Taught snowboarding for $20 an hour. Found myself in the silence between turns.</p>
              <p className="text-off-white font-medium">Those 4 years taught me everything about architecture over hustle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION SECTION */}
      <section className="py-32 bg-background-alt border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-6xl md:text-8xl tracking-tighter text-off-white leading-none">
                FROM LOST TO <span className="text-cyber-lime italic">LIMITLESS</span>
              </h2>
              <div className="space-y-6 text-warm-gray text-lg font-light leading-relaxed">
                <p>For the first time, I had something to pour my energy into that wasn't destruction. I became obsessed with systems. Not just business, but the biology of success.</p>
                <p>Between 2012 and 2022, I started, scaled, and automated three high-performance companies. Each one bigger, faster, and stronger than the last. But this time, they ran without me.</p>
                <p>The engine kept tracking. But what I wanted more? To see others win too.</p>
                <p className="text-off-white font-display text-3xl tracking-wide uppercase pt-8">I realized what was next...</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="aspect-video overflow-hidden rounded-lg grayscale border border-white/10">
                 <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Past success" />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-lg grayscale border border-white/10">
                 <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Meeting with founders" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDING PEOPLE SECTION */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center flex-row-reverse">
             <div className="md:order-2 space-y-8">
              <h2 className="font-display text-6xl md:text-8xl tracking-tighter text-off-white leading-none">
                FROM BUILDING COMPANIES TO <span className="text-starlink">BUILDING PEOPLE</span>
              </h2>
              <div className="space-y-6 text-warm-gray text-lg font-light leading-relaxed">
                <p>In 2024 I launched Captain AI — the digital command center for high-performance founders.</p>
                <p>I started my channel and this platform not to "build an audience" but because I wished someone had done this for me when I was $10M down and 4 years out.</p>
                <p>I made a commitment to breathe life back into ambitious people who refuse to quit. I didn't just want to help them make more money... I wanted to help them reclaim their time, their energy, and their freedom.</p>
                <p className="text-off-white font-medium italic">I realized... it was never JUST about systems. It was about Sovereignty.</p>
              </div>
            </div>
            <div className="md:order-1 grid grid-cols-1 gap-4">
              <div className="aspect-video overflow-hidden rounded-lg grayscale border border-white/10">
                 <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Collaborative workshop" />
              </div>
              <div className="aspect-video overflow-hidden rounded-lg grayscale border border-white/10">
                 <img src="https://images.unsplash.com/photo-1540575861501-7c00117fb3c9?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Large stage speaking" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE MISSION SECTION */}
      <section className="py-32 bg-background-alt">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-7xl md:text-9xl tracking-tighter text-off-white mb-16">THE MISSION NOW</h2>
          <div className="max-w-3xl mx-auto space-y-8 text-xl text-warm-gray font-light leading-relaxed">
             <p>I shouldn't even be here. But I am.</p>
             <p>And I believe there are millions who just need the right person, the right push, and the right system to break through.</p>
             <p className="text-off-white font-medium">That's why I do this. That's why I show up every day.</p>
             <p>And that's why, when you're ready to step up and take control of your business, your fitness, and your life... I'm here to help you do it.</p>
          </div>
          
          <div className="mt-20 flex justify-center">
             <div className="relative p-1 bg-cyber-lime rounded-sm group hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-background px-12 py-6 rounded-sm">
                  <span className="font-display text-4xl text-cyber-lime tracking-widest uppercase">JOIN THE COMMAND CENTER</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* BOOK SECTION */}
      <section className="py-32 bg-[#002B4D] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
               <div className="w-72 shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[2/3] bg-starlink flex flex-col items-center justify-center p-8 border-4 border-white">
                    <span className="font-display text-4xl text-white text-center">RAISED BY TWO TEACHERS</span>
                    <div className="w-20 h-1 bg-white my-6" />
                    <span className="font-mono text-xs uppercase">By Ian Ryan Kirk</span>
                  </div>
               </div>
            </div>
            <div className="space-y-8">
              <h5 className="font-mono text-cyber-lime uppercase tracking-widest text-sm">Best Seller</h5>
              <h2 className="font-display text-6xl md:text-8xl tracking-tight leading-none uppercase">RAISED BY TWO TEACHERS</h2>
              <p className="text-lg opacity-80 leading-relaxed max-w-lg">
                The foundational blueprint for engineering a life of freedom without burning out. Learn how to trade money for time, grow faster, and create more success without sacrificing your life.
              </p>
              <button className="bg-white text-[#002B4D] px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">
                Buy the Book
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL NEWSLETTER SECTION */}
      <section className="py-32 bg-background border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
           <h2 className="font-display text-6xl md:text-8xl tracking-tighter text-off-white uppercase">THE CAPTAIN'S LOG</h2>
           <p className="text-cyber-lime font-mono text-sm uppercase tracking-[0.3em]">The 5 minute email that could save you 50 years.</p>
           
           <div className="space-y-4 max-w-md mx-auto">
             <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-off-white focus:outline-none focus:border-cyber-lime" />
             <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-off-white focus:outline-none focus:border-cyber-lime" />
             <button className="w-full bg-starlink py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all">Subscribe for Free</button>
           </div>
           
           <div className="pt-20">
             <div className="font-display text-4xl text-off-white flex justify-center items-center gap-2">
                <span className="w-8 h-8 bg-cyber-lime text-background flex items-center justify-center font-bold">C</span>
                CAPTAIN AI
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};
