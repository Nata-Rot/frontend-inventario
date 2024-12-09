<template>
  <form @submit.prevent="submitProducto">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre</label>
      <input v-model="producto.nombre" type="text" class="form-control" id="nombre" placeholder="Nombre" required>
    </div>
    <div class="mb-3">
      <label for="descripcion" class="form-label">Descripción</label>
      <input v-model="producto.descripcion" type="text" class="form-control" id="descripcion" placeholder="Descripción" required>
    </div>
    <div class="mb-3">
      <label for="cantidad" class="form-label">Cantidad</label>
      <input v-model.number="producto.cantidadDisponible" type="number" class="form-control" id="cantidad" placeholder="Cantidad" required>
    </div>
    <button type="submit" class="btn btn-primary">Crear Producto</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      producto: {
        nombre: '',
        descripcion: '',
        cantidadDisponible: 0
      }
    };
  },
  methods: {
    submitProducto() {
      this.$emit('producto-creado', this.producto);
      // Reset form
      this.producto = {
        nombre: '',
        descripcion: '',
        cantidadDisponible: 0
      };
    }
  }
}
</script>

