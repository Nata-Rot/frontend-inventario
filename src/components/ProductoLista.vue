<template>
  <div class="card">
    <div class="card-header">Lista de Productos</div>
    <div class="card-body">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha Creación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ formatearFecha(producto.fechaCreacion) }}</td>
            <td>
              <span :class="obtenerClaseEstado(producto)">
                {{ obtenerEstadoProducto(producto) }}
              </span>
            </td>
            <td>
              <button 
                class="btn btn-sm btn-danger" 
                @click="eliminarProducto(producto.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { productService } from '@/services/productService';  // Importar el servicio

export default {
  props: {
    productos: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatearFecha(fecha) {
      return new Date(fecha).toLocaleDateString();
    },

    // Mantener solo esta implementación de obtenerEstadoProducto
    obtenerEstadoProducto(producto) {
      const today = new Date();
      const fechaCaducidad = new Date(producto.fechaCaducidad);
      const inThreeDays = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

      if (fechaCaducidad < today) return 'Vencido';
      if (fechaCaducidad <= inThreeDays) return 'Por Vencer';
      return 'Vigente';
    },

    obtenerClaseEstado(producto) {
      const estado = this.obtenerEstadoProducto(producto);
      return {
        'badge': true,
        'badge-danger': estado === 'Vencido',      // Color rojo para "Vencido"
        'badge-warning': estado === 'Por Vencer',   // Color amarillo para "Por Vencer"
        'badge-success': estado === 'Vigente'       // Color verde para "Vigente"
      };
    },

    async eliminarProducto(id) {
      try {
        await productService.eliminarProducto(id);  // Llamar al servicio para eliminar el producto
        this.$emit('eliminar-producto', id);  // Emitir el evento para actualizar la lista de productos
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos personalizados para los estados */
.badge-danger {
  background-color: #dc3545; /* Color rojo */
  color: white; /* Color del texto */
}

.badge-warning {
  background-color: #ffc107; /* Color amarillo */
  color: black; /* Color del texto */
}

.badge-success {
  background-color: #28a745; /* Color verde */
  color: white; /* Color del texto */
}
</style>
