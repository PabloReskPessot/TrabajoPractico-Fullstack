<script setup lang="ts">
import { hydrateOnMediaQuery } from 'vue';
import { ref } from 'vue'
import { onMounted } from 'vue'

// Guarda la acción seleccionada: 'crear', 'modificar', 'borrar', 'consultar'
const accionSeleccionada = ref<string | null>(null)

// Cambia la acción cuando se hace clic en un botón
function seleccionarAccion(accion: string) {
  accionSeleccionada.value = accion
}

interface Ciudad {
        id: number;
        nombre: string;
      }


// Variable reactiva para almacenar la lista de ciudades
const ciudades = ref<Ciudad[]>([]);



onMounted(async () => {
  const prueba = await fetch('http://localhost:3000/ciudades');
  console.log(prueba.json)


  try {
    const respuesta = await fetch('http://localhost:3000/ciudades');
    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos de la API');
    }
    // Asigna el resultado del fetch a la variable reactiva
    ciudades.value = await respuesta.json();
  } catch (error) {
    console.error('Error al cargar las ciudades:', error);
  }
});

</script>



<template>
  <main class="home-container">
    <h1 class="titulo"> CIUDAD </h1>

    <div class="recuadros">
      <!-- Recuadro Ciudad -->
      <div class="recuadroCRUD">
        <div class="seleccionaCRUD">
          <header>
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
              <li><a @click="seleccionarAccion('crear')" class="nav-link px-2">Crear</a></li>
              <li><a @click="seleccionarAccion('modificar')"class="nav-link px-2">Modificar</a></li> 
              <li><a @click="seleccionarAccion('borrar')" class="nav-link px-2">Borrar</a></li> 
              <li><a @click="seleccionarAccion('consultar')" class="nav-link px-2">Consultar</a></li> 
            </ul>
          </header>
          <div class="formularios">
            <div v-if="accionSeleccionada === 'crear'">
              <form>
                <input type="text" placeholder="Nombre"> </input>
              </form>
              <button type="button" class="btn btn-outline-dark" @click="" >Enviar</button>
            </div>

          </div>

        </div>
      </div>
      <div class="">
          <span> lista de ciudades </span>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
      <!-- v-for itera sobre el arreglo ciudades -->
      <tr v-for="ciudad in ciudades" :key="ciudad.id">
        <td>{{ ciudad.id }}</td>
        <td>{{ ciudad.nombre }}</td>
      </tr>
      <!-- Si el arreglo está vacío, puedes mostrar un mensaje -->
      <tr v-if="ciudades.length === 0">
        <td colspan="2">Cargando datos o no se encontraron ciudades.</td>
      </tr>
    </tbody>
            </table>
      </div>
    </div>
    <div class="botton-home">
        <button type="button" class="btn btn-outline-dark" @click="$router.push('/')" > Home </button>
      </div>
  </main>
</template>


