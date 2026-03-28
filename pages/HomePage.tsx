import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { EcosystemSection } from '../components/sections/EcosystemSection';
import { GrowthOperatorSection } from '../components/sections/GrowthOperatorSection';
import { CommunitiesSection } from '../components/sections/CommunitiesSection';
import { BookSection } from '../components/sections/BookSection';
import { ProofSection } from '../components/sections/ProofSection';
import { FilterSection } from '../components/sections/FilterSection';
import { OriginSection } from '../components/sections/OriginSection';
import { FinalCTASection } from '../components/sections/FinalCTASection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <EcosystemSection />
      <GrowthOperatorSection />
      <CommunitiesSection />
      <BookSection />
      <ProofSection />
      <FilterSection />
      <OriginSection />
      <FinalCTASection />
    </>
  );
}
