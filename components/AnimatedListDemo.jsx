import React from 'react';
import AnimatedList from './AnimatedList';

const sampleItems = [
  { title: 'Brand assets', description: '24 files', meta: '2m' },
  { title: 'Launch hero.png', description: '2.4 MB', meta: '18m' },
  { title: 'Product tour.mp4', description: '148 MB', meta: '1h' },
  { title: 'Pricing notes', description: '1,240 words', meta: '3h' },
  { title: 'IIT-JEE Rankers Roster 2026.pdf', description: '420 Selected Candidates', meta: 'Today' },
  { title: 'Biometric Attendance Audit Log', description: '99.4% Present Rate', meta: 'Live' }
];

export function AnimatedListDemo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <AnimatedList
        items={sampleItems}
        onItemSelect={(item, index) => console.log('Selected item:', item, index)}
        animation="pop"
        theme="dark"
        width={440}
        maxHeight={420}
      />
    </div>
  );
}

export default AnimatedListDemo;
