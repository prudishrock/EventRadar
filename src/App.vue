<script setup lang="ts">
import Header from '@/Components/Header.vue'
import Footer from '@/Components/Footer.vue'
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
