export const projectsData = [
  {
    id: 'ecommerce-store',
    title: 'Ecommerce Store',
    shortDescription:
      'Full-stack React shopping platform with product catalog, search, filtering, cart and wishlist management, and a validated checkout flow.',
    fullDescription:
      'A production-quality full-stack e-commerce platform featuring a product catalog with search, category filtering, and multi-criteria sorting. Cart and wishlist state is managed globally through React Context API with localStorage persistence across sessions, and the codebase is structured with reusable components, utility helpers, and custom hook abstractions for clean separation of concerns.',
    tags: ['React 19', 'Vite 7', 'Tailwind CSS', 'React Router v7', 'React Hook Form', 'Zod', 'Context API'],
    features: [
      'Product catalog with search, category filtering, and multi-criteria sorting',
      'Global cart and wishlist management via React Context API with localStorage persistence across sessions',
      'Form validation pipeline built with React Hook Form and Zod schema validation',
      'Lazy-loaded routes with React Router v7 Suspense boundaries to reduce initial bundle size',
      'Custom React hooks for REST API data fetching',
      'Reusable component library (ProductCard, Cart, Checkout, PageHeader, EmptyState, Button, Toast) across 10+ pages',
      'Shimmer skeleton loading states and dismissible toast notifications',
      'Fully responsive layout styled with Tailwind CSS utility classes',
    ],
    challenges: [
      'Keeping cart/wishlist state consistent across sessions without a backend, purely via client-side persistence',
      'Validating complex checkout forms while keeping error feedback fast and unobtrusive',
      'Reducing initial bundle size as the page count and component library grew',
    ],
    solutions: [
      'Used Context API combined with localStorage syncing for durable, dependency-free state persistence',
      'Built a validation pipeline with React Hook Form and Zod for type-safe, schema-driven form handling',
      'Adopted React Router v7 Suspense boundaries to lazy-load routes and defer non-critical bundles',
    ],
    featured: true,
  },
  {
    id: 'ai-multi-agent-financial-analyst',
    title: 'AI-Powered Multi-Agent Financial Analyst',
    shortDescription:
      'A 3-agent LLM orchestration pipeline (Research \u2192 Planner \u2192 Risk Evaluator) built with Google ADK and Gemini 1.5 Pro for autonomous equity analysis.',
    fullDescription:
      'A multi-agent financial analysis system built with Google ADK and Gemini 1.5 Pro. Three agents \u2014 a Research Agent, a Planner Agent, and a Risk Evaluator Agent \u2014 hand off structured JSON between each other to produce risk-tiered, explainable investment recommendations for equities, validated against live yfinance data to reduce hallucination on price-sensitive outputs.',
    tags: ['Python', 'Google ADK', 'Gemini 1.5 Pro', 'Flask', 'yfinance', 'Bootstrap 5', 'Render.com', 'REST API'],
    features: [
      '3-agent LLM orchestration pipeline (Research Agent \u2192 Planner Agent \u2192 Risk Evaluator Agent) using Google ADK and Gemini 1.5 Pro',
      'Autonomous equity analysis across multiple stock symbols per session',
      'Structured prompt chains producing risk-tiered, explainable investment recommendations',
      'JSON schema output validation against live yfinance data to reduce hallucination on price-sensitive outputs',
      'Flask REST API + Bootstrap 5 frontend deployed to Render.com with CORS, rate limiting, and session-based state management',
      'Modular agent JSON handoff schemas enabling independent agent swapping without pipeline disruption',
    ],
    challenges: [
      'Keeping multi-agent handoffs reliable when each agent depends on the previous agent\u2019s structured output',
      'Reducing hallucination risk in an LLM pipeline that produces financial recommendations',
      'Deploying a stateful, rate-limited API safely to a public endpoint',
    ],
    solutions: [
      'Designed modular JSON handoff schemas between agents so any single agent could be swapped independently',
      'Validated LLM outputs against live yfinance data before surfacing recommendations',
      'Added CORS, rate limiting, and session-based state management around the Flask REST API on Render.com',
    ],
    featured: true,
  },
  {
    id: 'wireless-patient-alert-system',
    title: 'Wireless Patient Alert System',
    shortDescription:
      'A real-time wireless alert system across 3 hospital ward nodes using Arduino Uno and 433MHz RF modules, with interrupt-driven event logic.',
    fullDescription:
      'An embedded, real-time communication system prototyped across 3 hospital ward nodes using Arduino Uno and 433MHz RF modules. Interrupt-driven C++ event logic drives an LCD status display and buzzer escalation alerts, and the system was validated against controlled test cycles to measure response-time improvement over the baseline.',
    tags: ['Arduino Uno', 'C++', '433MHz RF Modules', 'Interrupt-driven logic', 'LCD', 'Arduino IDE'],
    features: [
      'Real-time wireless alert system across 3 hospital ward nodes',
      'Interrupt-driven C++ event logic for immediate response to patient alert triggers',
      'LCD status display with buzzer escalation alerts',
      'Validated across 50 controlled test cycles, measuring a 71% reduction in alert response time (7s baseline to under 2s)',
    ],
    challenges: [
      'Achieving reliable low-latency wireless communication with 433MHz RF modules across multiple nodes',
      'Handling concurrent alert events without dropped or delayed interrupts',
      'Validating real response-time improvements under real hardware constraints rather than simulation',
    ],
    solutions: [
      'Implemented interrupt-driven event handling in C++ instead of polling, cutting response latency',
      'Added an LCD status display and buzzer escalation to make alert states unambiguous at each ward node',
      'Ran 50 controlled test cycles to measure and confirm the response-time improvement',
    ],
    featured: false,
  },
];
