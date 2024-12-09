import apiClient from './api';

export const inventoryService = {
  async registrarEntrada(entrada) {
    try {
      const response = await apiClient.post('/EntradaInventario', entrada);
      return response.data;
    } catch (error) {
      console.error('Error registrando entrada:', error);
      throw error;
    }
  },

  async registrarSalida(salida) {
    try {
      const response = await apiClient.post('/SalidaInventario', salida);
      return response.data;
    } catch (error) {
      console.error('Error registrando salida:', error);
      throw error;
    }
  }
};