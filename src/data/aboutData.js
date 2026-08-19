// Fallback shown until the `about_content` row is edited from /admin.
// Shape matches the `about_content` table exactly (see supabase/schema_cms.sql).
export const aboutFallback = {
  paragraphs: [
    "I'm a Full Stack Developer who enjoys turning ideas into scalable, user-centric products.",
    "I've shipped production systems end-to-end — from a multi-agent LLM financial analyst built with Python and Google ADK, to a full-stack e-commerce platform in React and Node.js. I care about clean architecture as much as clean UI.",
    "A quick learner with a strong problem-solving mindset, I pick up new tools fast and I'm genuinely curious about AI-driven products and where modern web development is headed.",
    'Currently looking for Full Stack Developer or Software Engineer roles — ready to contribute from day one.',
  ],
  facts: [
    { label: 'Location', value: 'Thiruvarur, India' },
    { label: 'Education', value: 'B.Tech, ECE — SASTRA University' },
    { label: 'Focus', value: 'Multi-agent LLM systems & full-stack web' },
  ],
};
