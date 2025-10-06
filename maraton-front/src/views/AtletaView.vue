<script setup lang="ts">
import './style.css'
import { ref } from 'vue'
import { onMounted } from 'vue'

// Guarda la acción seleccionada: 'crear', 'modificar', 'borrar', 'consultar'
const accionSeleccionada = ref<string | null>(null)

// Cambia la acción cuando se hace clic en un botón
function seleccionarAccion(accion: string) {
  accionSeleccionada.value = accion
}

interface Atleta {
        id: number;
        dni: number;
        nombre: string;
        tiempo: string;
        posicion: number;
        ciudad: Ciudad;
      }
// Variable reactiva para almacenar la lista de ciudades
const atletas = ref<Atleta[]>([]);

interface Ciudad {
        id: number;
        nombre: string;
      }
// Variable reactiva para almacenar la lista de ciudades
const ciudades = ref<Ciudad[]>([]);


onMounted(async () => {
  listaCiudades();
  listaAtletas();
});

const nombreCiudad = ref('');
const idCiudad = ref<number | null>(null);

const dniAtleta = ref('')
const nombreAtleta = ref('')
const tiempoAtleta = ref('')
const posicionAtleta = ref('')
const idAtleta = ref<number | null>(null);



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

async function listaAtletas() {
  try {
    const respuesta = await fetch('http://localhost:3000/atletas');
    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos de la API');
    }
    // Asigna el resultado del fetch a la variable reactiva
    atletas.value = await respuesta.json();
  } catch (error) {
    console.error('Error al cargar las ciudades:', error);
  }
}

async function crearAtleta() {
  
  try {

    // Convertir/validar explícitamente
    const ciudadIdNum = idCiudad.value !== null && idCiudad.value !== undefined
      ? Number(idCiudad.value)
      : null;

    if (ciudadIdNum === null || Number.isNaN(ciudadIdNum)) {
      alert('Por favor seleccioná una ciudad válida antes de enviar.');
      return;
    }

    console.log(ciudadIdNum);

    const response = await fetch('http://localhost:3000/atletas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dniAtleta.value,
        nombre: nombreAtleta.value, 
        tiempo: tiempoAtleta.value,
        posicion: posicionAtleta.value,
        ciudadId: ciudadIdNum,
      }),
    })
   

    if (!response.ok) throw new Error('Error al crear la atleta')

    const data = await response.json()
    console.log('Atleta creado:', data)
    alert('Atleta ingresado correctamente')

    // opcional: limpiar input o actualizar la lista
    dniAtleta.value = '';
    nombreAtleta.value= '';
    tiempoAtleta.value='';
    posicionAtleta.value='';
    idCiudad.value = null;

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

async function modificarAtleta(){
try {
    // Convertir/validar explícitamente
    const ciudadIdNum = idCiudad.value !== null && idCiudad.value !== undefined
      ? Number(idCiudad.value)
      : null;

    if (ciudadIdNum === null || Number.isNaN(ciudadIdNum)) {
      alert('Por favor seleccioná una ciudad válida antes de enviar.');
      return;
    }

    const response = await fetch(`http://localhost:3000/atletas/${idAtleta.value}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dniAtleta.value,
        nombre: nombreAtleta.value, 
        tiempo: tiempoAtleta.value,
        posicion: posicionAtleta.value,
        ciudadId: ciudadIdNum,
      }),
    })

    if (!response.ok) throw new Error('Error al modificar atleta')

    const data = await response.json()
    console.log('Atleta modificado:', data)
    alert('Datos atleta cambiados correctamente')

    // opcional: limpiar input o actualizar la lista
    dniAtleta.value = '';
    nombreAtleta.value= '';
    tiempoAtleta.value='';
    posicionAtleta.value='';
    idCiudad.value=null;

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

async function borrarAtleta(){
try {
    const response = await fetch(`http://localhost:3000/atletas/${idAtleta.value}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Error al borrar atleta')

    const data = await response.json()
    console.log('Atleta borrado:', data)
    alert('Atleta eliminado correctamente')

  } catch (error) {
    console.error('Error:', error)
    alert('Error al conectar con el servidor')
  }
}

</script>



<template>
  <main class="home-container">
    <h1 class="titulo"> ATLETA </h1>

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
              <form @submit.prevent="crearAtleta">
                <input type="number" placeholder="Dni" v-model="dniAtleta" > </input>
                <input type="text" placeholder="Nombre" v-model="nombreAtleta" > </input>
                <input type="text" placeholder="Tiempo 00hs 00min 00seg" v-model="tiempoAtleta" > </input>
                <input type="number" placeholder="posicion" v-model="posicionAtleta" > </input>
                 
                <select v-model="idCiudad" :disabled="ciudades.length === 0">
                    <!-- :value bind permite usar un null real en vez de string vacío -->
                    <option :value="null" disabled>Seleccione una ciudad</option>
                    <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">
                    {{ ciudad.nombre }}
                    </option>
                  </select>



                <button type="submit" class="btn btn-outline-dark">Enviar</button>
              </form>
            </div>
            <div v-if="accionSeleccionada === 'modificar'">
              <form @submit.prevent="modificarAtleta">
                <input type="number" placeholder="Id" v-model="idAtleta"> </input>
                <input type="number" placeholder="Dni" v-model="dniAtleta" > </input>
                <input type="text" placeholder="Nombre" v-model="nombreAtleta" > </input>
                <input type="text" placeholder="Tiempo 00hs 00min 00seg" v-model="tiempoAtleta" > </input>
                <input type="number" placeholder="posicion" v-model="posicionAtleta" > </input>
                 <select v-model="idCiudad" :disabled="ciudades.length === 0">
                    <!-- :value bind permite usar un null real en vez de string vacío -->
                    <option :value="null" disabled>Seleccione una ciudad</option>
                    <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">
                    {{ ciudad.nombre }}
                    </option>
                  </select>


                <button type="submit" class="btn btn-outline-dark">Enviar</button>
              </form>

            </div>
            <div v-if="accionSeleccionada === 'borrar'">
              <form @submit.prevent="borrarAtleta">
                <input type="number" placeholder="Id" v-model="idAtleta"> </input>
                <button type="submit" class="btn btn-outline-dark">Borrar</button>

              </form>
            </div>
          </div>

        </div>
      </div>
      <div class="tablaGet">
          <span> lista de Atletas </span>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dni</th>
                  <th>Nombre</th>
                  <th>Tiempo</th>
                  <th>Posicion</th>
                  <th>Ciudad</th>
                </tr>
              </thead>
              <tbody>
      <!-- v-for itera sobre el arreglo atletas -->
      <tr v-for="atleta in atletas" :key="atleta.id">
        <td>{{ atleta.id }}</td>
        <td>{{ atleta.dni }}</td>
        <td>{{ atleta.nombre }}</td>
        <td>{{ atleta.tiempo }}</td>
        <td>{{ atleta.posicion }}</td>
        <td>{{ atleta.ciudad}}</td>

      </tr>
      <!-- Si el arreglo está vacío, puedes mostrar un mensaje -->
      <tr v-if="atletas.length === 0">
        <td colspan="2">Cargando datos o no se encontraron atletas.</td>
      </tr>
    </tbody>
            </table>
            <button type="button" class="btn btn-outline-light" @click="listaAtletas">Actualizar</button>
      </div>
    </div>
    <div class="botton-home">
        <button type="button" class="btn btn-outline-light" @click="$router.push('/')" > Home </button>
      </div>
  </main>
</template>


