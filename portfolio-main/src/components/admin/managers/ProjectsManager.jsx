import CrudManager from '../CrudManager';

const STATUS_OPTIONS = ['Completed', 'In Progress', 'Prototype'];

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text', placeholder: 'Ecommerce Store' },
  { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS },
  { key: 'live_url', label: 'Live URL', type: 'text', placeholder: 'https://…' },
  { key: 'github_url', label: 'GitHub URL', type: 'text', placeholder: 'https://github.com/…' },
  { key: 'featured', label: 'Featured on homepage', type: 'boolean' },
  { key: 'short_description', label: 'Short description', type: 'textarea', placeholder: 'One or two sentences shown on the card' },
  { key: 'full_description', label: 'Full description', type: 'textarea', placeholder: 'Shown inside the project modal' },
  { key: 'tags', label: 'Tags (one per line)', type: 'list', placeholder: 'React 19\nVite 7\nTailwind CSS' },
  { key: 'features', label: 'Key features (one per line)', type: 'list' },
  { key: 'challenges', label: 'Challenges (one per line)', type: 'list' },
  { key: 'solutions', label: 'Solutions (one per line)', type: 'list' },
];

function ProjectsManager() {
  return (
    <CrudManager
      table="projects"
      title="Projects"
      description="Shown in the Projects section. Slug (id) is generated automatically from the title."
      fields={FIELDS}
      idField="id"
      orderBy="sort_order"
      slugField="title"
      titleField="title"
      subtitleField="status"
      defaults={{ status: 'In Progress' }}
    />
  );
}

export default ProjectsManager;
