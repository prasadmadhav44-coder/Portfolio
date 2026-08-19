import CrudManager from '../CrudManager';

const FIELDS = [
  { key: 'title', label: 'Title', type: 'text', placeholder: '5-Day AI Agents Intensive Course with Google' },
  { key: 'issuer', label: 'Issuer', type: 'text', placeholder: 'Google × Kaggle' },
  { key: 'cert_date', label: 'Date (optional)', type: 'text', placeholder: 'Dec 2025' },
];

function CertificationsManager() {
  return (
    <CrudManager
      table="certifications"
      title="Certifications"
      description="Cards shown in the Certifications section, in order."
      fields={FIELDS}
      idField="id"
      orderBy="sort_order"
      titleField="title"
      subtitleField="issuer"
    />
  );
}

export default CertificationsManager;
