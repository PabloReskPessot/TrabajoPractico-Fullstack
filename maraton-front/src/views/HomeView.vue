<script setup lang="ts">

</script>

<template>
  <main class="home-container">
    <h1 class="titulo">Bienvenido</h1>

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

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;     /* centra horizontal */
  justify-content: center; /* centra vertical */
  grid-column: 1 / -1; /* ocupa todas las columnas del grid */
}

.titulo {
  font-size: 2rem;
  margin-bottom: 20px;
}

.recuadros {
  display: flex;
  justify-content: center;
  gap: 20px; /* separación entre recuadros */
}

.recuadro {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  height: 250px;
  border: 2px solid #ccc;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #af0f0f;
}

.recuadro img {
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 5%;
  background-color: #af0f0f;
}

.recuadro span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: #af0f0f;
  width: 100%;
  color:black
}

.recuadro:hover {
  transform: scale(1.05);
  box-shadow:  15px 15px 15px #af0f0f;

}
</style>
