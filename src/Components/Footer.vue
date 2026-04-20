<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <RouterLink to="/" class="footer-logo">EventRadar</RouterLink>
      <p class="footer-copyright">
        © {{ new Date().getFullYear() }} EventRadar. Tüm hakları saklıdır.
      </p>
      <nav class="footer-nav">
        <RouterLink to="/" class="footer-link">Ana Sayfa</RouterLink>
      </nav>
    </div>
  </footer>
</template>
