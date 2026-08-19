import CrudManager from '../CrudManager';

const FIELDS = [
  { key: 'degree', label: 'Degree', type: 'text', placeholder: 'B.Tech, Electronics and Communication Engineering' },
  { key: 'institution', label: 'Institution', type: 'text', placeholder: 'SASTRA Deemed to Be University' },
  { key: 'period', label: 'Period', type: 'text', placeholder: '2022 – 2026' },
  { key: 'detail', label: 'Detail', type: 'text', placeholder: 'CGPA: 7.14 / 10' },
];

function EducationManager() {
  return (
    <CrudManager
      table="education"
      title="Education"
      description="Cards shown in the Education section, in order."
      fields={FIELDS}
      idField="id"
      orderBy="sort_order"
      titleField="degree"
      subtitleField="institution"
    />
  );
}

export default EducationManager;
