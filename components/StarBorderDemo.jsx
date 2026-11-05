import React from 'react';
import StarBorder from './StarBorder';

export function StarBorderDemo() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', padding: '2rem', flexWrap: 'wrap' }}>
      {/* Default Example */}
      <StarBorder
        color="#ffffff"
        trailColor="#ffffff"
        duration={4}
        direction="clockwise"
        stars={1}
        trailLength={0.3}
        thickness={1}
        radius={12}
        glow={0.6}
        hover="lap"
        sparkle={false}
        clickPulse
        theme="dark"
      >
        Get started
      </StarBorder>

      {/* Spatial Computing / VisionOS Cyan Star Border */}
      <StarBorder
        color="#38bdf8"
        trailColor="#818cf8"
        duration={3.5}
        direction="clockwise"
        stars={2}
        trailLength={0.35}
        thickness={1.5}
        radius={24}
        glow={0.8}
        hover="brighten"
        sparkle={true}
        clickPulse
        theme="dark"
        backgroundColor="rgba(15, 23, 42, 0.75)"
      >
        Explore Programs →
      </StarBorder>
    </div>
  );
}

export default StarBorderDemo;
