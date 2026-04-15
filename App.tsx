import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GmailClaudePage } from './pages/GmailClaudePage';
import { ClarityCoachPage } from './pages/ClarityCoachPage';
import { CallReflektPage } from './pages/CallReflektPage';
import { SlapMethodPage } from './pages/SlapMethodPage';
import { ObjectionCardsPage } from './pages/ObjectionCardsPage';
import { AIFoundationFieldGuidePage } from './pages/AIFoundationFieldGuidePage';
import { SevenElevenFourPage } from './pages/SevenElevenFourPage';
import { FiveHundredFiftyEightKPage } from './pages/FiveHundredFiftyEightKPage';
import { SevenFigureFunnelPage } from './pages/SevenFigureFunnelPage';
import { PlaybookPage } from './pages/PlaybookPage';
import { ColdEmailCopywriterPage } from './pages/ColdEmailCopywriterPage';
import { PushBackProtocolPage } from './pages/PushBackProtocolPage';
import { CustomCursor } from './components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="gmail-claude" element={<GmailClaudePage />} />
          <Route path="clarity-coach" element={<ClarityCoachPage />} />
          <Route path="call-reflekt" element={<CallReflektPage />} />
          <Route path="slap-method" element={<SlapMethodPage />} />
          <Route path="objection-cards" element={<ObjectionCardsPage />} />
          <Route path="ai-foundation" element={<AIFoundationFieldGuidePage />} />
          <Route path="7-11-4" element={<SevenElevenFourPage />} />
          <Route path="558k" element={<FiveHundredFiftyEightKPage />} />
          <Route path="7-figure-funnel" element={<SevenFigureFunnelPage />} />
          <Route path="playbook" element={<PlaybookPage />} />
          <Route path="cold-email-copywriter" element={<ColdEmailCopywriterPage />} />
          <Route path="push-back-protocol" element={<PushBackProtocolPage />} />
        </Route>
      </Routes>
    </>
  );
}
