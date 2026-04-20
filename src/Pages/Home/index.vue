<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ImageSlider from '@/Components/ImageSlider.vue'
import type { EventItem } from '@/Interfaces/EventItem'
import type { Slide } from '@/Interfaces/Slide'
import { getEvents } from '@/services/eventService'

const events = ref<EventItem[]>([])

const sliderSlides = computed<Slide[]>(() => {
  if (events.value.length === 0) {
    return [
      {
        image: 'https://picsum.photos/1920/600?random=1',
        title: 'Etkinlikleri Kesfet',
        subtitle: 'Yonetim panelinden etkinlik ekleyin',
      },
    ]
  }

  return events.value.map((event) => ({
    image: event.image,
    title: event.name,
    subtitle: `${event.category} - Kontenjan: ${event.quantity}`,
  }))
})

onMounted(async () => {
  events.value = await getEvents()
})
</script>

<template>
  <div class="home-page">
    <ImageSlider :slides="sliderSlides" />
    <hr class="home-divider" aria-hidden="true" />
    <div class="home-content">
      <h2 class="home-section-title">Öne Çıkan Etkinlikler</h2>
      <div class="event-cards">
        <article
          v-for="event in events"
          :key="event.id"
          class="event-card"
        >
          <div class="event-card-image-wrap">
            <img
              :src="event.image"
              :alt="event.name"
              class="event-card-image"
              loading="lazy"
            />
            <span class="event-card-badge">{{ event.category }}</span>
          </div>
          <div class="event-card-body">
            <h3 class="event-card-title">{{ event.name }}</h3>
            <p class="event-card-meta">
              <span>{{ event.category }}</span>
              <span>Kontenjan: {{ event.quantity }}</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>