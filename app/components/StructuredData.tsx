'use client';

import React from 'react';

export default function StructuredData() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Aditya Sankranthi',
    'url': 'https://aditya-portfolio.com',
    'image': 'https://aditya-portfolio.com/og-image.png',
    'description': 'Full Stack Engineer specializing in scalable web applications, microservices, and AI integration',
    'jobTitle': 'Full Stack Engineer',
    'email': 'aditya@example.com',
    'sameAs': [
      'https://linkedin.com/in/adityasankranthi',
      'https://github.com/adityasankranthi',
      'https://twitter.com/adityasankranthi'
    ],
    'knowsAbout': [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'Docker',
      'AWS',
      'Microservices',
      'DevOps',
      'Full Stack Development',
      'Web Development',
      'Backend Development',
      'Cloud Infrastructure'
    ],
    'worksFor': {
      '@type': 'Organization',
      'name': 'Aditya Sankranthi - Freelance'
    },
    'affiliation': [
      {
        '@type': 'Organization',
        'name': 'University of Wisconsin-Milwaukee',
        'description': 'Computer Science Studies'
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
