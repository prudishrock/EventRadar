<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  image: string
  title?: string
  subtitle?: string
}

const props = withDefaults(
  defineProps<{ slides?: Slide[]; interval?: number }>(),
  {
    slides: () => [
      { image: 'https://picsum.photos/1920/600?random=1', title: 'Etkinlikleri Keşfet', subtitle: 'Şehrin en iyi etkinlikleri burada' },
      { image: 'https://picsum.photos/1920/600?random=2', title: 'Konserler & Festivaller', subtitle: 'Canlı performanslar' },
      { image: 'https://picsum.photos/1920/600?random=3', title: 'Workshop & Seminerler', subtitle: 'Öğren, geliş' },
    ],
    interval: 5000,
  }
)

const current = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function goTo (index: number) {
  const n = props.slides.length
  current.value = ((index % n) + n) % n
}

function next () {
  goTo(current.value + 1)
}

function startAutoPlay () {
  if (timer) clearInterval(timer)
  timer = setInterval(next, props.interval)
}

function stopAutoPlay () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(startAutoPlay)
onUnmounted(stopAutoPlay)
</script>

<template>
  <section class="hero-slider" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="hero-slider-track">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="hero-slider-slide"
        :class="{ 'hero-slider-slide--active': i === current }"
      >
        <img :src="slide.image" :alt="slide.title ?? ''" class="hero-slider-img" />
        <div class="hero-slider-overlay" />
        <div v-if="slide.title || slide.subtitle" class="hero-slider-caption">
          <h2 v-if="slide.title" class="hero-slider-title">{{ slide.title }}</h2>
          <p v-if="slide.subtitle" class="hero-slider-subtitle">{{ slide.subtitle }}</p>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="hero-slider-btn hero-slider-btn--prev"
      aria-label="Önceki"
      @click="goTo(current - 1)"
    />
    <button
      type="button"
      class="hero-slider-btn hero-slider-btn--next"
      aria-label="Sonraki"
      @click="goTo(current + 1)"
    />
    <div class="hero-slider-dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        class="hero-slider-dot"
        :class="{ 'hero-slider-dot--active': i === current }"
        :aria-label="`Slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </section>
</template>
