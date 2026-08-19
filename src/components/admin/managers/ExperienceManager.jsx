import CrudManager from '../CrudManager';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text', placeholder: 'TinyML Workshop Organiser' },
  { key: 'company', label: 'Organization', type: 'text', placeholder: 'SASTRA Deemed to Be University' },
  { key: 'period', label: 'Period', type: 'text', placeholder: 'University Program' },
  { key: 'location', label: 'Location', type: 'text', placeholder: 'Thanjavur, India' },
  { key: 'type', label: 'Type', type: 'text', placeholder: 'Leadership' },
  { key: 'description', label: 'Description bullets (one per line)', type: 'list' },
];

function ExperienceManager() {
  return (
    <CrudManager
      table="experience"
      title="Experience"
      description="Timeline entries shown in the Experience section, in order."
      fields={FIELDS}
      idField="id"
      orderBy="sort_order"
      titleField="title"
      subtitleField="company"
    />
  );
}

export default ExperienceManager;
