<template>
  <div class="container mt-4">
    <!-- Título de la página -->
    <h1 class="mb-4 text-center">Gestión de Productos</h1>

    <div class="row justify-content-center">
      <!-- Tarjeta para agregar un producto (en la parte superior) -->
      <div class="col-md-8 mb-4">
        <div class="card shadow-sm">
          <div class="card-header text-center">
            <h5>Agregar Producto</h5>
          </div>
          <div class="card-body">
            <producto-form @producto-creado="agregarProducto"></producto-form>
          </div>
        </div>
      </div>

      <!-- Tarjeta para mostrar la lista de productos (debajo del formulario) -->
      <div class="col-md-8">
        <div class="card-body">
            <producto-lista 
              :productos="productos"
              @editar-producto="editarProducto"
              @eliminar-producto="eliminarProducto"
            ></producto-lista>
          </div>
      </div>

      <!-- Botón de retorno al Dashboard -->
      <div class="d-flex justify-content-end mt-4">
        <button @click="irDashboard" class="btn btn-secondary btn-sm">
          <i class="fas fa-arrow-left"></i> Regresar al Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductoForm from '@/components/ProductoForm.vue';
import ProductoLista from '@/components/ProductoLista.vue';
import { productService } from '@/services/productService';

export default {
  components: {
    ProductoForm,  // Componente para el formulario de agregar producto
    ProductoLista  // Componente para mostrar la lista de productos
  },
  data() {
    return {
      productos: []  // Lista de productos obtenidos del servidor
    };
  },
  methods: {
    // Método para obtener los productos desde el servicio
    async fetchProductos() {
      try {
        this.productos = await productService.getProductos();
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    
    // Método para agregar un producto a la lista
    async agregarProducto(producto) {
      try {
        await productService.crearProducto(producto);
        this.fetchProductos();  // Recargar la lista de productos después de agregar uno nuevo
      } catch (error) {
        console.error('Error al crear producto:', error);
      }
    },

    // Método para editar un producto (implementación pendiente)
    editarProducto(producto) {
      console.log('Editar producto:', producto);
    },

    // Método para eliminar un producto (implementación pendiente)
    eliminarProducto(producto) {
      console.log('Eliminar producto:', producto);
    },

    // Método para navegar al Dashboard
    irDashboard() {
      this.$router.push('/dashboard'); // Usando $router directamente
    }
  },
  mounted() {
    this.fetchProductos();  // Cargar los productos cuando el componente se monte
  }
};
</script>

<style scoped>
/* Personalización de los estilos */
.card {
  margin-bottom: 20px; /* Espaciado entre las tarjetas */
}

.card-header h5 {
  font-weight: bold;
  text-align: center;
}

.text-center {
  text-align: center;
}

/* Estilos adicionales */
</style>
