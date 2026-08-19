import { useEffect, useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { useAdminSingleton } from '../../../hooks/useAdminTable';
import { AdminCard, AdminButton, AdminLabel, AdminInput, AdminTextarea, AdminBanner } from '../ui';

const listToText = (arr) => (Array.isArray(arr) ? arr.join('\n\n') : '');
const textToList = (text) =>
  text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

function AboutManager() {
  const { row, loading, error, save } = useAdminSingleton('about_content');

  const [paragraphsText, setParagraphsText] = useState('');
  const [facts, setFacts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!row) return;
    setParagraphsText(listToText(row.paragraphs));
    setFacts(Array.isArray(row.facts) && row.facts.length > 0 ? row.facts : [{ label: '', value: '' }]);
  }, [row]);

  const updateFact = (idx, key, value) => {
    setFacts((prev) => prev.map((f, i) => (i === idx ? { ...f, [key]: value } : f)));
  };

  const addFact = () => setFacts((prev) => [...prev, { label: '', value: '' }]);
  const removeFact = (idx) => setFacts((prev) => prev.filter((_, i) => i !== idx));

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setSaved(false);

    const result = await save({
      paragraphs: textToList(paragraphsText),
      facts: facts.filter((f) => f.label.trim() || f.value.trim()),
    });

    setSaving(false);
    if (result.error) {
      setSaveError(result.error);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
        Loading…
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
        About
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
        Bio paragraphs and the three quick facts shown next to your photo panel.
      </p>

      {error && <AdminBanner tone="error">{error}</AdminBanner>}
      {saveError && <AdminBanner tone="error">{saveError}</AdminBanner>}
      {saved && <AdminBanner tone="info">Saved.</AdminBanner>}

      <AdminCard className="mb-6">
        <AdminLabel>Bio paragraphs (separate each paragraph with a blank line)</AdminLabel>
        <AdminTextarea
          rows={10}
          value={paragraphsText}
          onChange={(e) => setParagraphsText(e.target.value)}
          placeholder={`I'm a Full Stack Developer who enjoys turning ideas into scalable, user-centric products.\n\nI've shipped production systems end-to-end…`}
        />
      </AdminCard>

      <AdminCard className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <AdminLabel>Quick facts</AdminLabel>
          <AdminButton variant="ghost" onClick={addFact}>
            <Plus size={14} /> Add fact
          </AdminButton>
        </div>

        <div className="space-y-3">
          {facts.map((fact, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-2 items-center">
              <AdminInput
                placeholder="Label (e.g. Location)"
                value={fact.label}
                onChange={(e) => updateFact(idx, 'label', e.target.value)}
              />
              <AdminInput
                placeholder="Value (e.g. Thiruvarur, India)"
                value={fact.value}
                onChange={(e) => updateFact(idx, 'value', e.target.value)}
              />
              <AdminButton variant="danger" onClick={() => removeFact(idx)}>
                <Trash2 size={14} />
              </AdminButton>
            </div>
          ))}
        </div>
      </AdminCard>

      <AdminButton onClick={handleSave} disabled={saving}>
        <Check size={16} /> {saving ? 'Saving…' : 'Save changes'}
      </AdminButton>
    </div>
  );
}

export default AboutManager;
