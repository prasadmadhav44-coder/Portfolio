// Fallback shown until entries are added from /admin.
// Shape matches the `experience` table exactly (see supabase/schema_cms.sql).
export const experienceFallback = [
  {
    id: 'fallback-tinyml',
    title: 'TinyML Workshop Organiser',
    company: 'SASTRA Deemed to Be University',
    period: 'University Program',
    location: 'Thanjavur, India',
    type: 'Leadership',
    description: [
      'Led a university-level workshop on TinyML for edge devices with 150+ student participants.',
      'Managed speaker coordination, hardware lab setup, and live Q&A sessions throughout the event.',
    ],
  },
  {
    id: 'fallback-cybersecurity',
    title: 'Cybersecurity Workshop Participant',
    company: 'SASTRA Deemed to Be University',
    period: 'University Program',
    location: 'Thanjavur, India',
    type: 'Training',
    description: [
      'Completed hands-on penetration testing fundamentals using Kali Linux in a 200+ student workshop environment.',
      'Gained foundational knowledge in network security and vulnerability analysis.',
    ],
  },
];
