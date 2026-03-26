<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { addEvent, deleteEvent, getEvents, type EventItem } from '@/services/eventService'

const title = ref('Yönetim Paneli')
const description = ref('Etkinlikleri ve içerikleri yönetin.')

const events = ref<EventItem[]>([])
const loading = ref(false)

const newEvent = ref<EventItem>({
  id: 0,
  name: '',
  category: '',
  quantity: 0,
})

function onAdd() {
  const row: EventItem = {
    id: 0,
    name: '',
    category: '',
    quantity: 0,
  }
  events.value.push(row)
  newEvent.value = row
}

async function onSave() {
  await addEvent(events.value)
}

async function onDelete(row: EventItem) {
  await deleteEvent(row).then( res => {
    events.value=res;
  })
}

onMounted(async () => {
  loading.value = true
  try {
    events.value = await getEvents()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page-content">
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">{{ description }}</p>
    <div class="card">
      <div class="table-toolbar">
        <Button label="Ekle" icon="pi pi-plus" @click="onAdd" />
        <Button label="Kaydet" icon="pi pi-check" @click="onSave" />
      </div>
      <div v-if="events.length > 0" class="edit-form">
        <label class="edit-form-label">Yeni satırı düzenle (tablo üstü)</label>
        <div class="edit-form-fields">
          <div class="edit-field">
            <label for="edit-id">Id</label>
            <InputNumber id="edit-id" v-model="newEvent.id" readonly />
          </div>
          <div class="edit-field">
            <label for="edit-name">Name</label>
            <InputText id="edit-name" v-model="newEvent.name" placeholder="Etkinlik adı" />
          </div>
          <div class="edit-field">
            <label for="edit-category">Category</label>
            <InputText id="edit-category" v-model="newEvent.category" placeholder="Kategori" />
          </div>
          <div class="edit-field">
            <label for="edit-quantity">Quantity</label>
            <InputNumber id="edit-quantity" v-model="newEvent.quantity" placeholder="Adet" />
          </div>
        </div>
      </div>
      <DataTable :value="events" :loading="loading" tableStyle="min-width: 50rem">
        <Column field="id" header="Id" />
        <Column field="name" header="Name" />
        <Column field="category" header="Category" />
        <Column field="quantity" header="Quantity" />
        <Column header="Sil" :exportable="false">
          <template #body="{ data }">
            <Button
              label="Sil"
              icon="pi pi-trash"
              severity="danger"
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
.table-toolbar {
  margin-bottom: 1rem;
}

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
  gap: 1rem;
  align-items: flex-end;
}

.edit-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 140px;
}

.edit-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e4e7;
}

.edit-form :deep(.p-inputtext),
.edit-form :deep(.p-inputnumber input) {
  background-color: #27272a;
  color: #f4f4f5;
  border-color: #3f3f46;
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
