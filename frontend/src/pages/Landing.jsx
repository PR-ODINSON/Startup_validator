import React from 'react';
import { HeroSection } from '../components';

const Landing = () => {
  return (
    <>
      <HeroSection />
      <div style={{ padding: '100px', background: 'red', color: 'white' }}>
        <h1>Test - If you can see this, the page is working</h1>
      </div>
    </>
  );
};

export default Landing; 