<template>
  <div class="container mt-4 d-flex justify-content-center">
    <div class="col-md-6">
      <h1>Registro de Salida de Inventario</h1>
      <div class="card shadow-sm">
        <!-- Encabezado de la tarjeta con el título -->
        <div class="card-header" style="background-color: #FFC107; color: #212529;">
          <h5 class="card-title mb-0 text-center fw-bold">Registro de Salida de Inventario</h5>
        </div>
        <!-- Cuerpo de la tarjeta -->
        <div class="card-body">
          <form @submit.prevent="registrarSalida">
            <!-- Selector de Producto -->
            <div class="mb-3">
              <label for="productoId" class="form-label">Producto</label>
              <select v-model="productoId" class="form-select" id="productoId" required>
                <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                  {{ producto.nombre }}
                </option>
              </select>
            </div>

            <!-- Input para Cantidad -->
            <div class="mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <input 
                type="number" 
                v-model="cantidad" 
                class="form-control" 
                id="cantidad" 
                required 
                min="1"
                :max="obtenerCantidadMaxima()"
              >
            </div>

            <!-- Botón de Registrar -->
            <button type="submit" class="btn btn-danger w-100">
              Registrar Salida
            </button>
          </form>
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
import { productService } from '@/services/productService';
import { inventoryService } from '@/services/inventoryService';

export default {
  data() {
    return {
      productos: [],
      productoId: null,
      cantidad: null
    };
  },
  async created() {
    try {
      this.productos = await productService.getProductos();
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  },
  methods: {
    obtenerCantidadMaxima() {
      return 100;
    },
    async registrarSalida() {
      try {
        const salida = { productoId: this.productoId, cantidad: this.cantidad };
        await inventoryService.registrarSalida(salida);
        this.$router.push('/dashboard');
        this.$bvToast.toast('Salida de inventario registrada con éxito', {
          title: 'Éxito',
          variant: 'success',
        });
      } catch (error) {
        console.error('Error al registrar salida:', error);
        this.$bvToast.toast('Error al registrar salida', {
          title: 'Error',
          variant: 'danger',
        });
      }
    },
    irDashboard() {
      this.$router.push('/dashboard');
    }
  }
};
</script>