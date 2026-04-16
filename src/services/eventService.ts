export interface EventItem {
  id: number
  name: string
  category: string
  quantity: number
}

const STORAGE_KEY = 'eventradar_events'

const mockEvents: EventItem[] = [
  { id: 1, name: 'Yaz Konseri Serisi', category: 'Konser', quantity: 500 },
  { id: 2, name: 'Tech Konferans 2025', category: 'Konferans', quantity: 200 },
  { id: 3, name: 'Fotoğrafçılık Atölyesi', category: 'Workshop', quantity: 30 },
  { id: 4, name: 'Caz Gecesi', category: 'Konser', quantity: 150 },
  { id: 5, name: 'Startup Pitch Günü', category: 'Etkinlik', quantity: 80 },
]

function seedFromMock(): void {
  if (typeof localStorage === 'undefined') return
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvents))
  }
}

export async function getEvents(): Promise<EventItem[]> {
  seedFromMock()
  await new Promise((resolve) => setTimeout(resolve, 300))
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as EventItem[]
  } catch {
    return []
  }
}

export async function addEvent(events: EventItem[]): Promise<EventItem[]> {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  return events
}

export async function updateEvent(event: EventItem): Promise<EventItem[]> {
  const events = await getEvents()
  const updatedEvents = events.map((item) => (item.id === event.id ? event : item))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEvents))
  return updatedEvents
}

export async function deleteEvent(event: EventItem): Promise<EventItem[]> {
  let events = await getEvents()
  events = events.filter((e) => e.id !== event.id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  return events
}
