// Fallback shown until entries are added from /admin.
// Shape matches the `education` table exactly (see supabase/schema_cms.sql).
export const educationFallback = [
  {
    id: 'fallback-btech',
    degree: 'B.Tech, Electronics and Communication Engineering',
    institution: 'SASTRA Deemed to Be University',
    period: '2022 – 2026',
    detail: 'CGPA: 7.1351 / 10',
  },
  {
    id: 'fallback-hsc',
    degree: 'HSC (Class 12)',
    institution: 'Sri Shanmuka Matric Hr. Sec. School',
    period: 'Completed',
    detail: '88.67%',
  },
  {
    id: 'fallback-sslc',
    degree: 'SSLC (Class 10)',
    institution: 'Sri Shanmuka Matric Hr. Sec. School',
    period: 'Completed',
    detail: '79.6%',
  },
];
