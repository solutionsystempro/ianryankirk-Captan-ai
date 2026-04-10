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
        </Route>
      </Routes>
    </>
  );
}
