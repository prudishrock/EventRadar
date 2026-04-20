import type { EventItem } from '@/Interfaces/EventItem'

export type { EventItem }

const STORAGE_KEY = 'eventradar_events'
const HERO_EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1920&q=80',
] as const

function getDefaultImage(id: number): string {
  const image = HERO_EVENT_IMAGES[(id - 1) % HERO_EVENT_IMAGES.length]
  return image ?? HERO_EVENT_IMAGES[0]
}

const mockEvents: EventItem[] = [
  {
    id: 1,
    name: 'Yaz Konseri Serisi',
    category: 'Konser',
    quantity: 500,
    image: getDefaultImage(1),
  },
  {
    id: 2,
    name: 'Tech Konferans 2025',
    category: 'Konferans',
    quantity: 200,
    image: getDefaultImage(2),
  },
  {
    id: 3,
    name: 'Fotoğrafçılık Atölyesi',
    category: 'Workshop',
    quantity: 30,
    image: getDefaultImage(3),
  },
  {
    id: 4,
    name: 'Caz Gecesi',
    category: 'Konser',
    quantity: 150,
    image: getDefaultImage(4),
  },
  {
    id: 5,
    name: 'Startup Pitch Günü',
    category: 'Etkinlik',
    quantity: 80,
    image: getDefaultImage(5),
  },
]

function fallbackImage(id: number): string {
  return getDefaultImage(id)
}

function isLegacyImage(image?: string): boolean {
  if (!image) return true
  return image.includes('picsum.photos')
}

function normalizeEvent(event: Partial<EventItem>, index: number): EventItem {
  const id = typeof event.id === 'number' ? event.id : index + 1
  const eventImage = event.image?.trim()
  return {
    id,
    name: event.name ?? '',
    category: event.category ?? '',
    quantity: typeof event.quantity === 'number' ? event.quantity : 0,
    image: !eventImage || isLegacyImage(eventImage) ? fallbackImage(id) : eventImage,
  }
}

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
    const parsed = JSON.parse(raw) as Partial<EventItem>[]
    const normalized = parsed.map((event, index) => normalizeEvent(event, index))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
    return normalized
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
