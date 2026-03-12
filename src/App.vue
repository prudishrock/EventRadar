<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="app-layout">
    <Header />
    <main class="app-main">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
