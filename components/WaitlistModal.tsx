
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const WaitlistModal: React.FC<Props> = ({ isOpen, onClose, title }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      // In a real app, you'd send this to your backend/ESP
      console.log(`Waitlist signup: ${email} for ${title}`);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-background-alt border border-white/10 rounded-sm shadow-2xl overflow-hidden p-8 md:p-12 text-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-warm-gray hover:text-off-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!submitted ? (
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block px-3 py-1 bg-starlink/20 border border-starlink/30 rounded-full">
              <span className="text-[10px] font-mono text-starlink uppercase tracking-[0.2em] font-bold">Coming Soon</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl text-off-white tracking-tight leading-none uppercase">
                {title}
              </h2>
              <p className="text-warm-gray text-base leading-relaxed max-w-sm mx-auto font-light">
                The ultimate utility for real-time objection handling is currently in beta testing. Join the waitlist for early access and a 50% lifetime launch discount.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your best email..."
                className="w-full bg-white/5 border border-white/10 rounded-sm px-6 py-4 text-sm text-off-white focus:outline-none focus:border-starlink transition-colors text-center"
              />
              <button 
                type="submit"
                className="w-full bg-starlink text-white px-10 py-4 rounded-sm font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-starlink/20"
              >
                Get Priority Access
              </button>
            </form>

            <p className="text-[10px] text-warm-gray font-mono uppercase tracking-widest opacity-50">
              No Spam. Just early access & exclusive frames.
            </p>
          </div>
        ) : (
          <div className="py-12 space-y-6 animate-fade-in">
            <div className="w-20 h-20 bg-cyber-lime/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-cyber-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-4xl text-off-white uppercase tracking-tight">You're On The List</h3>
            <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto font-light">
              We'll reach out as soon as the next beta slot opens. Prepare to never lose the frame again.
            </p>
            <button 
              onClick={onClose}
              className="text-cyber-lime font-mono text-xs uppercase tracking-widest pt-4 hover:text-off-white transition-colors"
            >
              Back to Command Center
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
