<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const isAdmin = ref(false)
const waveBars = Array.from({ length: 64 }, (_, i) => i)
const route = useRoute()

onMounted(() => {
  localStorage.setItem('isAdmin', 'true')
  isAdmin.value = localStorage.getItem('isAdmin') === 'true'
})
</script>

<template>
  <header class="app-header">
    <div class="header-logo-wrap">
      <RouterLink to="/" class="header-logo">EventRadar</RouterLink>
    </div>
    <div v-if="route.path === '/'" class="header-wave" aria-hidden="true">
      <span
        v-for="bar in waveBars"
        :key="bar"
        class="header-wave-bar"
        :style="{ animationDelay: `${bar * 0.055}s` }"
      />
    </div>
    <nav class="header-nav">
      <ul class="header-nav-list">
        <li>
          <RouterLink to="/" class="header-nav-link" active-class="router-link-active">
            Ana Sayfa
          </RouterLink>
        </li>
        <li v-if="isAdmin">
          <RouterLink to="/admin" class="header-nav-link" active-class="router-link-active">
            Yönetim
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
