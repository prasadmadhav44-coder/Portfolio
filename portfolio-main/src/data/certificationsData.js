// Fallback shown until entries are added from /admin.
// Shape matches the `certifications` table exactly (see supabase/schema_cms.sql).
export const certificationsFallback = [
  { id: 'fallback-1', title: '5-Day AI Agents Intensive Course with Google', issuer: 'Google × Kaggle', cert_date: 'Dec 2025' },
  { id: 'fallback-2', title: 'MERN Full Stack Development', issuer: 'Code Galatta', cert_date: null },
  { id: 'fallback-3', title: 'Frontend Dev Training — React, TypeScript, Next.js', issuer: 'Code Galatta', cert_date: null },
  { id: 'fallback-4', title: 'Backend Dev Training — Node.js, Express.js, MongoDB, AWS', issuer: 'Code Galatta', cert_date: null },
  { id: 'fallback-5', title: 'Deloitte Data Analytics Simulation', issuer: 'Forage', cert_date: 'Jun 2026' },
  { id: 'fallback-6', title: 'Prompt Engineering for ChatGPT', issuer: 'Great Learning', cert_date: 'Nov 2024' },
  { id: 'fallback-7', title: 'Introduction to Artificial Intelligence', issuer: 'Great Learning', cert_date: 'Nov 2024' },
];
