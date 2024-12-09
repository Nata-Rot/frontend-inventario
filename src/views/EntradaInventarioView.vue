<template>
  <div class="container mt-4">
    <h1>Entrada Inventario/Gestión de Productos</h1>
    <div class="row">
      <!-- Formulario para agregar productos (columna de 4) -->
      <div class="col-lg-4 mb-4">
        <div class="card shadow-sm">
          <div class="card-header">
            <h5>Agregar Producto</h5>
          </div>
          <div class="card-body">
            <producto-form @producto-creado="agregarProducto" />
          </div>
        </div>
      </div>

      <!-- Lista de productos (columna de 8) -->
      <div class="col-lg-8">
        <div class="card-body">
            <producto-lista 
              :productos="productos"
              @eliminar-producto="eliminarProducto"
            />
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
    ProductoForm,
    ProductoLista
  },
  data() {
    return {
      productos: []
    };
  },
  async created() {
    await this.cargarProductos();
  },
  methods: {
    // Método para cargar productos desde el servicio
    async cargarProductos() {
      try {
        this.productos = await productService.getProductos();
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    },
    // Método para agregar un producto
    async agregarProducto(producto) {
      try {
        await productService.crearProducto(producto);
        await this.cargarProductos();
      } catch (error) {
        console.error('Error al crear producto:', error);
      }
    },
    // Método para eliminar un producto
    async eliminarProducto(id) {
      try {
        await productService.eliminarProducto(id);  // Use el ID para eliminar
        await this.cargarProductos();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    },
    // Método para navegar al Dashboard
    irDashboard() {
      this.$router.push('/dashboard'); // Usando $router directamente
    }
  }
}
</script>
