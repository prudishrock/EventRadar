<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
      </ul>
    </nav>
  </header>
</template>
