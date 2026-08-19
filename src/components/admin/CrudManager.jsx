import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useAdminTable } from '../../hooks/useAdminTable';
import {
  AdminCard,
  AdminButton,
  AdminLabel,
  AdminInput,
  AdminTextarea,
  AdminSelect,
  AdminCheckbox,
  AdminBanner,
  EmptyState,
} from './ui';

// ── list <-> textarea helpers ────────────────────────────────────────────
// 'list' fields are stored as a jsonb string[] in Supabase but edited as
// one-item-per-line plain text, since that's far faster to type than a
// dynamic add/remove-row widget for content like feature bullet points.
const listToText = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const textToList = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

function emptyValueFor(field) {
  if (field.type === 'boolean') return false;
  if (field.type === 'list') return [];
  if (field.type === 'number') return 0;
  return '';
}

function buildEmptyRow(fields, defaults = {}) {
  const row = {};
  fields.forEach((f) => {
    row[f.key] = f.key in defaults ? defaults[f.key] : emptyValueFor(f);
  });
  return row;
}

function rowToFormState(row, fields) {
  const state = {};
  fields.forEach((f) => {
    const value = row[f.key];
    state[f.key] = f.type === 'list' ? listToText(value) : value ?? emptyValueFor(f);
  });
  return state;
}

function formStateToPayload(form, fields) {
  const payload = {};
  fields.forEach((f) => {
    payload[f.key] = f.type === 'list' ? textToList(form[f.key]) : form[f.key];
  });
  return payload;
}

/**
 * A single config-driven CRUD screen: list + inline add/edit form +
 * delete, against one Supabase table.
 *
 * fields: [{ key, label, type: 'text'|'textarea'|'number'|'boolean'|'list'|'select',
 *            options?: string[] (for 'select'), placeholder? }]
 * idField: primary key column name (defaults to 'id')
 * slugField: when set, generates a new row's text-primary-key from this
 *            field's value on create (used by Projects, whose id is a slug)
 * titleField: which field to show as each row's heading in the list
 * subtitleField: optional secondary line under the heading
 */
function CrudManager({
  table,
  title,
  description,
  fields,
  idField = 'id',
  orderBy = 'sort_order',
  slugField = null,
  titleField,
  subtitleField,
  defaults = {},
}) {
  const { rows, loading, error, create, update, remove } = useAdminTable(table, { orderBy, idField });
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const startCreate = () => {
    setForm(rowToFormState(buildEmptyRow(fields, defaults), fields));
    setIsCreating(true);
    setEditingId(null);
    setFormError(null);
  };

  const startEdit = (row) => {
    setForm(rowToFormState(row, fields));
    setEditingId(row[idField]);
    setIsCreating(false);
    setFormError(null);
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormError(null);
  };

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);

    const payload = formStateToPayload(form, fields);

    let result;
    if (isCreating) {
      if (slugField) {
        const slug = String(payload[slugField] || '')
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        payload[idField] = slug || `item-${Date.now()}`;
      }
      if (!('sort_order' in payload) && fields.every((f) => f.key !== 'sort_order')) {
        payload.sort_order = rows.length;
      }
      result = await create(payload);
    } else {
      result = await update(editingId, payload);
    }

    setSaving(false);

    if (result.error) {
      setFormError(result.error);
      return;
    }
    cancelForm();
  };

  const handleDelete = async (id) => {
    await remove(id);
    setPendingDeleteId(null);
  };

  const renderField = (field) => {
    const value = form[field.key];

    switch (field.type) {
      case 'textarea':
      case 'list':
        return (
          <AdminTextarea
            rows={field.type === 'list' ? 5 : 4}
            placeholder={field.placeholder}
            value={value ?? ''}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        );
      case 'boolean':
        return <AdminCheckbox label={field.label} checked={Boolean(value)} onChange={(e) => setField(field.key, e.target.checked)} />;
      case 'number':
        return (
          <AdminInput
            type="number"
            value={value ?? 0}
            onChange={(e) => setField(field.key, Number(e.target.value))}
          />
        );
      case 'select':
        return (
          <AdminSelect value={value ?? ''} onChange={(e) => setField(field.key, e.target.value)}>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </AdminSelect>
        );
      default:
        return (
          <AdminInput
            type="text"
            placeholder={field.placeholder}
            value={value ?? ''}
            onChange={(e) => setField(field.key, e.target.value)}
          />
        );
    }
  };

  const showForm = isCreating || editingId !== null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            {title}
          </h1>
          {description && (
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
              {description}
            </p>
          )}
        </div>
        {!showForm && (
          <AdminButton onClick={startCreate}>
            <Plus size={16} /> Add
          </AdminButton>
        )}
      </div>

      {error && <AdminBanner tone="error">{error}</AdminBanner>}

      {showForm && (
        <AdminCard className="mb-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-accent)' }}>
            {isCreating ? 'New entry' : 'Edit entry'}
          </h2>

          {formError && <AdminBanner tone="error">{formError}</AdminBanner>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' || field.type === 'list' ? 'sm:col-span-2' : ''}>
                {field.type !== 'boolean' && <AdminLabel>{field.label}</AdminLabel>}
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-5">
            <AdminButton onClick={handleSave} disabled={saving}>
              <Check size={16} /> {saving ? 'Saving…' : 'Save'}
            </AdminButton>
            <AdminButton variant="ghost" onClick={cancelForm} disabled={saving}>
              <X size={16} /> Cancel
            </AdminButton>
          </div>
        </AdminCard>
      )}

      {loading ? (
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Loading…
        </p>
      ) : rows.length === 0 ? (
        <EmptyState>Nothing here yet — click "Add" to create the first entry.</EmptyState>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <AdminCard key={row[idField]} className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                  {row[titleField]}
                </p>
                {subtitleField && (
                  <p className="text-sm truncate" style={{ color: 'var(--color-muted)' }}>
                    {row[subtitleField]}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {pendingDeleteId === row[idField] ? (
                  <>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                      Delete?
                    </span>
                    <AdminButton variant="danger" onClick={() => handleDelete(row[idField])}>
                      Confirm
                    </AdminButton>
                    <AdminButton variant="ghost" onClick={() => setPendingDeleteId(null)}>
                      Cancel
                    </AdminButton>
                  </>
                ) : (
                  <>
                    <AdminButton variant="ghost" onClick={() => startEdit(row)}>
                      <Pencil size={14} />
                    </AdminButton>
                    <AdminButton variant="danger" onClick={() => setPendingDeleteId(row[idField])}>
                      <Trash2 size={14} />
                    </AdminButton>
                  </>
                )}
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default CrudManager;
