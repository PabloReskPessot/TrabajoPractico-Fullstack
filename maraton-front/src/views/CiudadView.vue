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
  listaCiudades()
});

const nombreCiudad = ref('');
const idCiudad = ref<number | null>(null);

async function listaCiudades(){
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
}

async function crearCiudad() {
  try {
    const response = await fetch('http://localhost:3000/ciudades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombreCiudad.value, // debe coincidir con tu CreateCiudadDto
      }),
    })

    if (!response.ok) throw new Error('Error al crear la ciudad')

    const data = await response.json()
    console.log('Ciudad creada:', data)
    alert('Ciudad creada correctamente')

    // opcional: limpiar input o actualizar la lista
    nombreCiudad.value = ''

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

async function modificarCiudad(){
try {
    const response = await fetch(`http://localhost:3000/ciudades/${idCiudad.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombreCiudad.value, // debe coincidir con tu CreateCiudadDto
      }),
    })

    if (!response.ok) throw new Error('Error al modificar la ciudad')

    const data = await response.json()
    console.log('Ciudad modificada:', data)
    alert('Ciudad modificada correctamente')

    // opcional: limpiar input o actualizar la lista
    nombreCiudad.value = ''

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

async function borrarCiudad(){
try {
    const response = await fetch(`http://localhost:3000/ciudades/${idCiudad.value}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Error al borrar la ciudad')

    const data = await response.json()
    console.log('Ciudad borrada:', data)
    alert('Ciudad borrada correctamente')

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

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
            </ul>
          </header>
          <div class="formularios">
            <div v-if="accionSeleccionada === 'crear'">
              <form @submit.prevent="crearCiudad">
                <input type="text" placeholder="Nombre" v-model="nombreCiudad" > </input>
                <button type="submit" class="btn btn-outline-dark">Enviar</button>
              </form>
            </div>
            <div v-if="accionSeleccionada === 'modificar'">
              <form @submit.prevent="modificarCiudad">
                <input type="number" placeholder="Id" v-model="idCiudad"> </input>
                <input type="text" placeholder="Nombre" v-model="nombreCiudad" > </input>
                <button type="submit" class="btn btn-outline-dark">Enviar</button>
              </form>

            </div>
            <div v-if="accionSeleccionada === 'borrar'">
              <form @submit.prevent="borrarCiudad">
                <input type="number" placeholder="Id" v-model="idCiudad"> </input>
                <button type="submit" class="btn btn-outline-dark">Borrar</button>
              </form>
            </div>
          </div>

        </div>
      </div>
      <div class="tablaGet">
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
            <button type="button" class="btn btn-outline-light" @click="listaCiudades">Actualizar</button>
      </div>
    </div>
    <div class="botton-home">
        <button type="button" class="btn btn-outline-light" @click="$router.push('/')" > Home </button>
      </div>
  </main>
</template>


