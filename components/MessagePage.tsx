
import React, { useState } from 'react';

export const MessagePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Real submission would happen here
  };

  const socialLinks = [
    { name: 'Instagram', followers: '2.1M Followers', icon: '📷' },
    { name: 'Youtube', followers: '2.2M Followers', icon: '📹' },
    { name: 'X', followers: '417K Followers', icon: '✖️' },
    { name: 'Blog', followers: 'Read Now', icon: '📝' },
    { name: 'Tiktok', followers: '1.5M Followers', icon: '🎵' },
    { name: 'Facebook', followers: '1.8M Followers', icon: '👤' },
    { name: 'Linkedin', followers: '1.4M Followers', icon: '💼' },
    { name: 'Spotify', followers: 'The Martell Method', icon: '🎙️' },
  ];

  return (
    <div className="bg-background min-h-screen animate-fade-in flex flex-col">
      {/* FORM SECTION */}
      <section className="pt-40 pb-32 px-6 flex-grow flex items-center">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h1 className="font-display text-7xl md:text-9xl tracking-tighter text-off-white leading-none uppercase">
              READY TO SCALE <br /> YOUR BUSINESS?
            </h1>
            <div className="space-y-6 text-warm-gray text-xl font-light leading-relaxed max-w-lg">
              <p>If you're a business owner who wants to scale your business with proven systems, strategies, and tactics, let's connect!</p>
              <p>Fill out the form below, and we'll reach out to see if you're a fit.</p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-starlink/10 blur-3xl rounded-full" />
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-warm-gray">First Name *</label>
                    <input required type="text" placeholder="First Name" className="w-full bg-off-white px-4 py-3 text-background font-sans focus:outline-none focus:ring-2 focus:ring-starlink" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-warm-gray">Last Name *</label>
                    <input required type="text" placeholder="Last Name" className="w-full bg-off-white px-4 py-3 text-background font-sans focus:outline-none focus:ring-2 focus:ring-starlink" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-warm-gray">Email *</label>
                  <input required type="email" placeholder="Email" className="w-full bg-off-white px-4 py-3 text-background font-sans focus:outline-none focus:ring-2 focus:ring-starlink" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-warm-gray">Phone *</label>
                  <input required type="tel" placeholder="Phone" className="w-full bg-off-white px-4 py-3 text-background font-sans focus:outline-none focus:ring-2 focus:ring-starlink" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-warm-gray">Are you a Business Owner? *</label>
                  <select required className="w-full bg-off-white px-4 py-3 text-background font-sans focus:outline-none focus:ring-2 focus:ring-starlink appearance-none">
                    <option value="">- Select -</option>
                    <option value="yes">Yes, I am a business owner</option>
                    <option value="aspiring">I'm an aspiring business owner</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input type="checkbox" required className="mt-1 accent-starlink" />
                  <p className="text-[10px] text-warm-gray leading-normal uppercase font-mono">
                    By checking this box, I consent to receive marketing and promotional messages, including updates from Captain AI. Msg/data rates may apply.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-starlink py-5 text-white font-bold uppercase tracking-[0.3em] hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-starlink/20"
                >
                  Let's Chat
                </button>
              </form>
            ) : (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-cyber-lime rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="font-display text-4xl text-off-white uppercase">Message Sent</h3>
                <p className="text-warm-gray text-lg font-light">The Captain has received your coordinates. We'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MARTELL STYLE SOCIAL SECTION */}
      <section className="bg-background-alt py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-3 gap-16 items-start">
             {/* Left Socials */}
             <div className="grid grid-cols-1 gap-8">
                {socialLinks.slice(0, 4).map(link => (
                  <div key={link.name} className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-starlink transition-colors">
                      <span className="text-xl">{link.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-2xl text-off-white leading-none uppercase tracking-wider">{link.name}</h4>
                      <p className="font-mono text-[10px] text-warm-gray uppercase tracking-widest">{link.followers}</p>
                    </div>
                  </div>
                ))}
             </div>

             {/* Center Call to Action */}
             <div className="text-center space-y-8">
                <h3 className="font-display text-5xl md:text-6xl text-off-white tracking-tighter uppercase leading-none">THE CAPTAIN'S LOG</h3>
                <p className="text-starlink font-mono text-xs uppercase tracking-[0.2em]">The 5 minute email that could save you 5 years.</p>
                <div className="space-y-3 pt-4">
                  <input type="text" placeholder="First Name*" className="w-full bg-off-white px-4 py-3 text-background text-sm font-sans focus:outline-none" />
                  <input type="email" placeholder="Email*" className="w-full bg-off-white px-4 py-3 text-background text-sm font-sans focus:outline-none" />
                  <button className="w-full bg-starlink py-4 text-white font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all">Subscribe for Free</button>
                </div>
                
                <div className="pt-16 flex justify-center">
                   <div className="font-display text-4xl text-off-white flex items-center gap-2">
                      <span className="w-10 h-10 bg-cyber-lime text-background flex items-center justify-center font-bold">C</span>
                      CAPTAIN AI
                   </div>
                </div>
             </div>

             {/* Right Socials */}
             <div className="grid grid-cols-1 gap-8 lg:text-right">
                {socialLinks.slice(4).map(link => (
                  <div key={link.name} className="flex lg:flex-row-reverse items-center gap-6 group cursor-pointer">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-starlink transition-colors">
                      <span className="text-xl">{link.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-2xl text-off-white leading-none uppercase tracking-wider">{link.name}</h4>
                      <p className="font-mono text-[10px] text-warm-gray uppercase tracking-widest">{link.followers}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};
