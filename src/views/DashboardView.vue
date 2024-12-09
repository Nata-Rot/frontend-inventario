<template>
  <div class="container mt-4">
    <h1>Panel de Control - Inventario</h1>
    
    <!-- Botones de navegación -->
    <div class="row mb-4">
      <div class="col-md-4">
        <router-link to="/productos" class="btn btn-primary btn-block">
          <i class="bi bi-gear"></i> Creación Productos
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/entrada-inventario" class="btn btn-success btn-block">
          <i class="bi bi-arrow-down-circle"></i> Entrada de Inventario
        </router-link>
      </div>
      <div class="col-md-4">
        <router-link to="/salida-inventario" class="btn btn-warning btn-block">
          <i class="bi bi-arrow-up-circle"></i> Salida de Inventario
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header">Total de Productos</div>
          <div class="card-body">
            <h5 class="card-title">{{ totalProductos }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-warning mb-3">
          <div class="card-header">Productos por Vencer</div>
          <div class="card-body">
            <h5 class="card-title">{{ productosProximosAVencer }}</h5>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card text-white bg-danger mb-3">
          <div class="card-header">Productos Vencidos</div>
          <div class="card-body">
            <h5 class="card-title">{{ productosVencidos }}</h5>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="card-body col-12">
            <producto-lista 
              :productos="productos"
              @eliminar-producto="eliminarProducto"
            />
          </div>
      </div>
    </div>
</template>

<script>
import ProductoLista from '@/components/ProductoLista.vue';
import { productService } from '@/services/productService';

export default {
  components: {
    ProductoLista
  },
  data() {
    return {
      totalProductos: 0,
      productosProximosAVencer: 0,
      productosVencidos: 0,
      productos: []
    }
  },
  async created() {
    try {
      this.productos = await productService.getProductos();
      this.totalProductos = this.productos.length;
      this.calcularEstadosProductos();
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  },
  methods: {
    calcularEstadosProductos() {
      const today = new Date();
      const inThreeDays = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
      
      this.productosProximosAVencer = this.productos.filter(producto => {
        const fechaCaducidad = new Date(producto.fechaCaducidad);
        return fechaCaducidad > today && fechaCaducidad <= inThreeDays;
      }).length;
      
      this.productosVencidos = this.productos.filter(producto => {
        const fechaCaducidad = new Date(producto.fechaCaducidad);
        return fechaCaducidad < today;
      }).length;
    }
  }
}
</script>

<style scoped>
.btn-block {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-block i {
  margin-right: 10px;
}
</style>
