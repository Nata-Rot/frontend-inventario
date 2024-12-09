import apiClient from './api';

export const productService = {
  async getProductos() {
    try {
      const response = await apiClient.get('/Producto');
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error);
      throw error;
    }
  },

  async crearProducto(producto) {
    try {
      const response = await apiClient.post('/Producto', producto);
      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error);
      throw error;
    }
  },

  async eliminarProducto(id) {
    try {
      const response = await apiClient.delete(`/Producto/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting producto:', error);
      throw error;
    }
  }
};
