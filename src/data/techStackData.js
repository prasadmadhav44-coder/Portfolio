import { ArrowRight, Code2, Server, Sparkles, Bot, Wrench, Award } from 'lucide-react';
import { CoffeeIcon, CloudIcon, TrendingUpIcon, LinkIcon } from '../components/icons.jsx';

// Fallback shown until categories/items are added from /admin. Items here
// may use a hand-picked lucide `Icon` component (kept exactly as before);
// items added later through the CMS always render via the Simple Icons
// CDN (brand_slug) or a generic icon, see components/TechStack.jsx.
export const techStackFallback = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', brand: 'python' },
      { name: 'JavaScript', brand: 'javascript' },
      { name: 'TypeScript', brand: 'typescript' },
      { name: 'Java', Icon: CoffeeIcon },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', brand: 'react' },
      { name: 'Next.js', brand: 'nextdotjs' },
      { name: 'HTML5', brand: 'html5' },
      { name: 'CSS3', brand: 'css' },
      { name: 'Tailwind CSS', brand: 'tailwindcss' },
      { name: 'Bootstrap 5', brand: 'bootstrap' },
      { name: 'Vite', brand: 'vite' },
      { name: 'React Router', Icon: ArrowRight },
      { name: 'React Hook Form', Icon: Code2 },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Flask', brand: 'flask' },
      { name: 'Node.js', brand: 'nodedotjs' },
      { name: 'Express.js', brand: 'express' },
      { name: 'REST APIs', Icon: Server },
    ],
  },
  {
    title: 'AI / ML',
    items: [
      { name: 'Google ADK', brand: 'google' },
      { name: 'Prompt Engineering', Icon: Sparkles },
      { name: 'Multi-agent Orchestration', Icon: Bot },
      { name: 'LangChain', Icon: LinkIcon },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'MongoDB', brand: 'mongodb' },
      { name: 'PostgreSQL', brand: 'postgresql' },
      { name: 'Prisma', brand: 'prisma' },
      { name: 'Supabase', brand: 'supabase' },
      { name: 'Pandas', brand: 'pandas' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      { name: 'AWS', Icon: CloudIcon },
      { name: 'Docker', brand: 'docker' },
      { name: 'Vercel', brand: 'vercel' },
      { name: 'Firebase', brand: 'firebase' },
      { name: 'Render.com', Icon: CloudIcon },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', brand: 'git' },
      { name: 'GitHub Actions', Icon: Wrench },
      { name: 'Zod', Icon: Award },
      { name: 'yfinance', Icon: TrendingUpIcon },
    ],
  },
];
