<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isAdmin = ref(false)

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
    <nav class="header-nav">
      <ul class="header-nav-list">
        <li>
          <RouterLink to="/" class="header-nav-link" active-class="router-link-active">
            Ana Sayfa
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/events" class="header-nav-link" active-class="router-link-active">
            Etkinlikler
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
