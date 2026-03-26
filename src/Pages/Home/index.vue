<script setup lang="ts">
import { ref } from 'vue'
import ImageSlider from '@/Components/ImageSlider.vue'

interface TopEvent {
  id: number
  title: string
  date: string
  location: string
  category: string
  image: string
}

const topEvents = ref<TopEvent[]>([
  {
    id: 1,
    title: 'Yaz Konseri Serisi',
    date: '15 Haz 2025',
    location: 'İstanbul',
    category: 'Konser',
    image: 'https://picsum.photos/400/250?random=10',
  },
  {
    id: 2,
    title: 'Tech Konferans 2025',
    date: '22 Haz 2025',
    location: 'Ankara',
    category: 'Konferans',
    image: 'https://picsum.photos/400/250?random=11',
  },
  {
    id: 3,
    title: 'Fotoğrafçılık Atölyesi',
    date: '28 Haz 2025',
    location: 'İzmir',
    category: 'Workshop',
    image: 'https://picsum.photos/400/250?random=12',
  },
  {
    id: 4,
    title: 'Caz Gecesi',
    date: '5 Tem 2025',
    location: 'İstanbul',
    category: 'Konser',
    image: 'https://picsum.photos/400/250?random=13',
  },
  {
    id: 5,
    title: 'Startup Pitch Günü',
    date: '12 Tem 2025',
    location: 'Online',
    category: 'Etkinlik',
    image: 'https://picsum.photos/400/250?random=14',
  },
  {
    id: 6,
    title: 'Açık Hava Sineması',
    date: '18 Tem 2025',
    location: 'Bodrum',
    category: 'Sinema',
    image: 'https://picsum.photos/400/250?random=15',
  },
])
</script>

<template>
  <div class="home-page">
    <ImageSlider />
    <hr class="home-divider" aria-hidden="true" />
    <div class="home-content">
      <h2 class="home-section-title">Öne Çıkan Etkinlikler</h2>
      <div class="event-cards">
        <article
          v-for="event in topEvents"
          :key="event.id"
          class="event-card"
        >
          <div class="event-card-image-wrap">
            <img
              :src="event.image"
              :alt="event.title"
              class="event-card-image"
              loading="lazy"
            />
            <span class="event-card-badge">{{ event.category }}</span>
          </div>
          <div class="event-card-body">
            <h3 class="event-card-title">{{ event.title }}</h3>
            <p class="event-card-meta">
              <span>{{ event.date }}</span>
              <span>{{ event.location }}</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
