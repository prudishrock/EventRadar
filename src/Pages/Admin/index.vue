<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import type { EventItem } from '@/Interfaces/EventItem'
import { addEvent, deleteEvent, getEvents, updateEvent } from '@/services/eventService'

const events = ref<EventItem[]>([])
const loading = ref(false)
const editingId = ref<number | null>(null)
const highlightedRowId = ref<number | null>(null)
const rowTextHighlight = ref<'add' | 'edit' | null>(null)

const newEvent = ref<EventItem>({
  id: 1,
  name: '',
  category: '',
  quantity: 0,
  image: '',
})

const isEditing = computed(() => editingId.value !== null)
const categoryOptions = ['Konser', 'Konferans', 'Workshop', 'Etkinlik', 'Seminer']
const defaultEventImages = [
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1920&q=80',
] as const

function getDefaultImage(id: number): string {
  const image = defaultEventImages[(id - 1) % defaultEventImages.length]
  return image ?? defaultEventImages[0]
}

function getNextId(): number {
  if (events.value.length === 0) return 1
  return Math.max(...events.value.map((item) => item.id)) + 1
}

function fallbackImage(id: number): string {
  return getDefaultImage(id)
}

function createDraftEvent(): EventItem {
  const id = getNextId()
  return {
    id,
    name: '',
    category: '',
    quantity: 0,
    image: fallbackImage(id),
  }
}

function onAdd() {
  editingId.value = null
  const row = createDraftEvent()
  events.value.push(row)
  newEvent.value = row
  highlightedRowId.value = row.id
  rowTextHighlight.value = 'add'
}

function getRowClass(data: EventItem): string {
  if (highlightedRowId.value !== data.id) return ''
  return rowTextHighlight.value === 'edit' ? 'highlighted-edit-row' : 'highlighted-add-row'
}

async function onSave() {
  const payload: EventItem = {
    ...newEvent.value,
    name: newEvent.value.name.trim(),
    category: newEvent.value.category.trim(),
    image: newEvent.value.image.trim() || fallbackImage(newEvent.value.id),
  }

  if (isEditing.value) {
    events.value = await updateEvent(payload)
    highlightedRowId.value = payload.id
    rowTextHighlight.value = 'edit'
    editingId.value = null
    newEvent.value = createDraftEvent()
    return
  }

  events.value = await addEvent(events.value)
  highlightedRowId.value = payload.id
  rowTextHighlight.value = 'add'
  newEvent.value = createDraftEvent()
}

function onEdit(row: EventItem) {
  editingId.value = row.id
  newEvent.value = { ...row }
  highlightedRowId.value = row.id
  rowTextHighlight.value = 'edit'
}

async function onDelete(row: EventItem) {
  await deleteEvent(row).then((res) => {
    events.value = res
    if (editingId.value === row.id) {
      editingId.value = null
    }
    if (highlightedRowId.value === row.id) {
      highlightedRowId.value = null
      rowTextHighlight.value = null
    }
  })
}

onMounted(async () => {
  loading.value = true
  try {
    events.value = await getEvents()
    newEvent.value = createDraftEvent()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page-content">
    <div class="card">
      <div class="edit-form">
        <label class="edit-form-label">
          {{ isEditing ? 'Etkinliği güncelle' : 'Yeni satırı düzenle' }}
        </label>
        <div class="edit-form-fields">
          <div class="edit-field">
            <label for="edit-name">Name</label>
            <InputText id="edit-name" v-model="newEvent.name" placeholder="Etkinlik adı" />
          </div>
          <div class="edit-field">
            <label for="edit-category">Category</label>
            <select id="edit-category" v-model="newEvent.category" class="category-select">
              <option value="" disabled>Kategori sec</option>
              <option v-for="option in categoryOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          <div class="edit-field">
            <label for="edit-quantity">Quantity</label>
            <InputNumber id="edit-quantity" v-model="newEvent.quantity" placeholder="Adet" />
          </div>
          <div class="edit-field">
            <label for="edit-image">Image</label>
            <InputText id="edit-image" v-model="newEvent.image" placeholder="https://example.com/image.jpg" />
          </div>
          <div class="edit-actions">
            <Button label="Ekle" icon="pi pi-plus" class="add-btn" @click="onAdd" />
            <Button label="Kaydet" icon="pi pi-check" class="save-btn" @click="onSave" />
          </div>
        </div>
      </div>
      <DataTable :value="events" :loading="loading" :rowClass="getRowClass" tableStyle="min-width: 50rem">
        <Column header="Image">
          <template #body="{ data }">
            <img v-if="data.image" :src="data.image" alt="Etkinlik görseli" class="event-image" />
            <div v-else class="event-image event-image-placeholder">Gorsel yok</div>
          </template>
        </Column>
        <Column field="name" header="Name" />
        <Column field="category" header="Category" />
        <Column field="quantity" header="Quantity" />
        <Column header="" :exportable="false">
          <template #body="{ data }">
            <Button
              label="Güncelle"
              icon="pi pi-pencil"
              class="update-btn"
              size="small"
              aria-label="Güncelle"
              @click="onEdit(data)"
            />
          </template>
        </Column>
        <Column header="" :exportable="false">
          <template #body="{ data }">
            <Button
              label="Sil"
              icon="pi pi-trash"
              class="delete-btn"
              size="small"
              aria-label="Sil"
              @click="onDelete(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.edit-form {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #18181b;
  border: 1px solid #27272a;
  border-radius: 8px;
}

.edit-form-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #f4f4f5;
}

.edit-form-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: flex-end;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px;
  flex: 1;
}

.edit-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e4e7;
}

.edit-actions {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  justify-content: flex-end;
  min-width: 180px;
  flex: 1;
  margin-top: 1rem;
}

.card :deep(.p-button) {
  border-radius: 7px;
  padding: 0.4rem 0.7rem;
  min-height: 2rem;
}

.card :deep(.p-button .p-button-label) {
  font-size: 0.8rem;
  font-weight: 500;
}

.card :deep(.p-button.add-btn) {
  background: transparent;
  color: #22c55e;
  border: 1px solid #22c55e;
}

.card :deep(.p-button.save-btn) {
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.card :deep(.p-button.update-btn) {
  background: transparent;
  color: #facc15;
  border: 1px solid #facc15;
}

.card :deep(.p-button.delete-btn) {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.card :deep(.p-button.add-btn:hover) {
  background: rgba(34, 197, 94, 0.12);
}

.card :deep(.p-button.save-btn:hover) {
  background: rgba(255, 255, 255, 0.12);
}

.card :deep(.p-button.update-btn:hover) {
  background: rgba(250, 204, 21, 0.12);
}

.card :deep(.p-button.delete-btn:hover) {
  background: rgba(239, 68, 68, 0.12);
}

.card :deep(.p-button.update-btn),
.card :deep(.p-button.delete-btn) {
  padding: 0.3rem 0.55rem;
  min-height: 1.75rem;
}

.card :deep(.p-button.update-btn .p-button-label),
.card :deep(.p-button.delete-btn .p-button-label) {
  font-size: 0.75rem;
}

.edit-form :deep(.p-inputtext),
.edit-form :deep(.p-inputnumber input) {
  background-color: #27272a;
  color: #f4f4f5;
  border-color: #3f3f46;
}

.category-select {
  width: 100%;
  height: 1.5rem;
  padding: 0 0.6rem;
  border-radius: 6px;
  border: 1px solid #3f3f46;
  background-color: #27272a;
  color: #f4f4f5;
}

.category-select:focus {
  outline: none;
  border-color: #f59e0b;
  box-shadow: 0 0 0 1px #f59e0b;
}

.event-image {
  width: 88px;
  height: 56px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #3f3f46;
}

.event-image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  color: #a1a1aa;
  background-color: #18181b;
}

.card :deep(.highlighted-add-row > td) {
  color: #22c55e;
}

.card :deep(.highlighted-edit-row > td) {
  color: #facc15;
}

.edit-form :deep(.p-inputtext::placeholder),
.edit-form :deep(.p-inputnumber input::placeholder) {
  color: #71717a;
}

.edit-form :deep(.p-inputtext:enabled:hover),
.edit-form :deep(.p-inputnumber input:enabled:hover) {
  border-color: #52525b;
}

.edit-form :deep(.p-inputtext:enabled:focus),
.edit-form :deep(.p-inputnumber input:enabled:focus) {
  border-color: #f59e0b;
  box-shadow: 0 0 0 1px #f59e0b;
}
</style>
