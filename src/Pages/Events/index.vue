<script setup lang="ts">
import { ref } from 'vue'

const title = ref('Etkinlikler')
const description = ref('Yaklaşan etkinlikleri keşfedin.')
</script>

<template>
  <div class="page-content">
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">{{ description }}</p>
  </div>
</template>
