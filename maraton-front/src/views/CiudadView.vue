<script setup lang="ts">
import { hydrateOnMediaQuery } from 'vue';
import './style.css'

</script>



<template>
  <main class="home-container">
    <h1 class="titulo"></h1>

    <div class="recuadros">
      <!-- Recuadro Ciudad -->
      <div class="recuadroCRUD">
        
      </div>

      <!-- Recuadro Atleta -->
      <router-link to="/atleta" class="recuadro">
        <img src="@/assets/atletaFoto.avif" alt="Atleta">
        <span>Atleta</span>
      </router-link>
    </div>
  </main>
</template>
