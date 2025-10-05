<script setup lang="ts">
import './style.css'

</script>



<template>
  <main class="home-container">
    <h1 class="titulo">Consultar</h1>

    <div class="recuadros">
      <!-- Recuadro Ciudad -->
      <router-link to="/ciudad" class="recuadro">
        <img src="@/assets/ciudadFoto.jpg" alt="Ciudad">
        <span>Ciudad</span>
      </router-link>

      <!-- Recuadro Atleta -->
      <router-link to="/atleta" class="recuadro">
        <img src="@/assets/atletaFoto.avif" alt="Atleta">
        <span>Atleta</span>
      </router-link>
    </div>
  </main>
</template>