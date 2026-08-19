import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminTable } from '../../../hooks/useAdminTable';
import { AdminCard, AdminButton, AdminLabel, AdminInput, AdminBanner, EmptyState } from '../ui';

function CategoryForm({ initial, onCancel, onSave, saving }) {
  const [title, setTitle] = useState(initial?.title ?? '');

  return (
    <AdminCard className="mb-4">
      <AdminLabel>Category name</AdminLabel>
      <AdminInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Languages" />
      <div className="flex items-center gap-3 mt-4">
        <AdminButton disabled={saving || !title.trim()} onClick={() => onSave(title.trim())}>
          <Check size={16} /> {saving ? 'Saving…' : 'Save'}
        </AdminButton>
        <AdminButton variant="ghost" onClick={onCancel} disabled={saving}>
          <X size={16} /> Cancel
        </AdminButton>
      </div>
    </AdminCard>
  );
}

function ItemRow({ item, onEdit, onDelete, pendingDelete, onRequestDelete, onCancelDelete }) {
  return (
    <div
      className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg border"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
          {item.name}
        </p>
        {item.brand_slug && (
          <p className="text-xs truncate" style={{ color: 'var(--color-muted)' }}>
            icon: {item.brand_slug}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {pendingDelete ? (
          <>
            <AdminButton variant="danger" onClick={onDelete}>
              Confirm
            </AdminButton>
            <AdminButton variant="ghost" onClick={onCancelDelete}>
              Cancel
            </AdminButton>
          </>
        ) : (
          <>
            <AdminButton variant="ghost" onClick={onEdit}>
              <Pencil size={13} />
            </AdminButton>
            <AdminButton variant="danger" onClick={onRequestDelete}>
              <Trash2 size={13} />
            </AdminButton>
          </>
        )}
      </div>
    </div>
  );
}

function ItemForm({ initial, onCancel, onSave, saving }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [brandSlug, setBrandSlug] = useState(initial?.brand_slug ?? '');

  return (
    <div className="rounded-lg border p-3 space-y-3" style={{ borderColor: 'var(--color-accent)' }}>
      <div>
        <AdminLabel>Name</AdminLabel>
        <AdminInput value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Python" />
      </div>
      <div>
        <AdminLabel>Simple Icons slug (optional — leave blank for a generic icon)</AdminLabel>
        <AdminInput value={brandSlug} onChange={(e) => setBrandSlug(e.target.value)} placeholder="e.g. python" />
      </div>
      <div className="flex items-center gap-3">
        <AdminButton disabled={saving || !name.trim()} onClick={() => onSave({ name: name.trim(), brand_slug: brandSlug.trim() || null })}>
          <Check size={14} /> {saving ? 'Saving…' : 'Save'}
        </AdminButton>
        <AdminButton variant="ghost" onClick={onCancel} disabled={saving}>
          <X size={14} /> Cancel
        </AdminButton>
      </div>
    </div>
  );
}

function TechStackManager() {
  const categoriesTable = useAdminTable('tech_categories', { orderBy: 'sort_order' });
  const itemsTable = useAdminTable('tech_items', { orderBy: 'sort_order' });

  const [creatingCategory, setCreatingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [savingCategory, setSavingCategory] = useState(false);
  const [pendingDeleteCategory, setPendingDeleteCategory] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const [addingItemFor, setAddingItemFor] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [savingItem, setSavingItem] = useState(false);
  const [pendingDeleteItem, setPendingDeleteItem] = useState(null);

  const itemsFor = (categoryId) => itemsTable.rows.filter((i) => i.category_id === categoryId);

  const toggleCollapsed = (id) => setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const saveCategory = async (title) => {
    setSavingCategory(true);
    const result = editingCategoryId
      ? await categoriesTable.update(editingCategoryId, { title })
      : await categoriesTable.create({ title, sort_order: categoriesTable.rows.length });
    setSavingCategory(false);
    if (!result.error) {
      setCreatingCategory(false);
      setEditingCategoryId(null);
    }
  };

  const deleteCategory = async (id) => {
    await categoriesTable.remove(id);
    await itemsTable.refresh();
    setPendingDeleteCategory(null);
  };

  const saveItem = async (categoryId, payload) => {
    setSavingItem(true);
    const result = editingItemId
      ? await itemsTable.update(editingItemId, payload)
      : await itemsTable.create({ ...payload, category_id: categoryId, sort_order: itemsFor(categoryId).length });
    setSavingItem(false);
    if (!result.error) {
      setAddingItemFor(null);
      setEditingItemId(null);
    }
  };

  const deleteItem = async (id) => {
    await itemsTable.remove(id);
    setPendingDeleteItem(null);
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
            Tech Stack
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
            Categories become the column headings; items are listed line by line under each.
          </p>
        </div>
        {!creatingCategory && (
          <AdminButton
            onClick={() => {
              setCreatingCategory(true);
              setEditingCategoryId(null);
            }}
          >
            <Plus size={16} /> Add category
          </AdminButton>
        )}
      </div>

      {categoriesTable.error && <AdminBanner tone="error">{categoriesTable.error}</AdminBanner>}
      {itemsTable.error && <AdminBanner tone="error">{itemsTable.error}</AdminBanner>}

      {creatingCategory && (
        <CategoryForm saving={savingCategory} onCancel={() => setCreatingCategory(false)} onSave={saveCategory} />
      )}

      {categoriesTable.loading ? (
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Loading…
        </p>
      ) : categoriesTable.rows.length === 0 ? (
        <EmptyState>No categories yet — add "Languages", "Frontend", "Backend", etc.</EmptyState>
      ) : (
        <div className="space-y-4">
          {categoriesTable.rows.map((category) => {
            const items = itemsFor(category.id);
            const isCollapsed = collapsed[category.id];

            return (
              <AdminCard key={category.id}>
                {editingCategoryId === category.id ? (
                  <CategoryForm
                    initial={category}
                    saving={savingCategory}
                    onCancel={() => setEditingCategoryId(null)}
                    onSave={saveCategory}
                  />
                ) : (
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <button
                      type="button"
                      onClick={() => toggleCollapsed(category.id)}
                      className="flex items-center gap-2 text-left"
                    >
                      {isCollapsed ? (
                        <ChevronDown size={16} style={{ color: 'var(--color-muted)' }} />
                      ) : (
                        <ChevronUp size={16} style={{ color: 'var(--color-muted)' }} />
                      )}
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                        {category.title}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                        ({items.length})
                      </span>
                    </button>

                    <div className="flex items-center gap-2">
                      {pendingDeleteCategory === category.id ? (
                        <>
                          <AdminButton variant="danger" onClick={() => deleteCategory(category.id)}>
                            Confirm
                          </AdminButton>
                          <AdminButton variant="ghost" onClick={() => setPendingDeleteCategory(null)}>
                            Cancel
                          </AdminButton>
                        </>
                      ) : (
                        <>
                          <AdminButton
                            variant="ghost"
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setCreatingCategory(false);
                            }}
                          >
                            <Pencil size={13} />
                          </AdminButton>
                          <AdminButton variant="danger" onClick={() => setPendingDeleteCategory(category.id)}>
                            <Trash2 size={13} />
                          </AdminButton>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {!isCollapsed && (
                  <div className="mt-4 space-y-2">
                    {items.map((item) =>
                      editingItemId === item.id ? (
                        <ItemForm
                          key={item.id}
                          initial={item}
                          saving={savingItem}
                          onCancel={() => setEditingItemId(null)}
                          onSave={(payload) => saveItem(category.id, payload)}
                        />
                      ) : (
                        <ItemRow
                          key={item.id}
                          item={item}
                          pendingDelete={pendingDeleteItem === item.id}
                          onEdit={() => {
                            setEditingItemId(item.id);
                            setAddingItemFor(null);
                          }}
                          onRequestDelete={() => setPendingDeleteItem(item.id)}
                          onCancelDelete={() => setPendingDeleteItem(null)}
                          onDelete={() => deleteItem(item.id)}
                        />
                      )
                    )}

                    {addingItemFor === category.id ? (
                      <ItemForm
                        saving={savingItem}
                        onCancel={() => setAddingItemFor(null)}
                        onSave={(payload) => saveItem(category.id, payload)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setAddingItemFor(category.id);
                          setEditingItemId(null);
                        }}
                        className="flex items-center gap-1.5 text-xs font-medium mt-1 transition-colors hover:opacity-80"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        <Plus size={13} /> Add item to {category.title}
                      </button>
                    )}
                  </div>
                )}
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TechStackManager;
