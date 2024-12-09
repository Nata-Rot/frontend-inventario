<template>
  <div id="app">
    <nav v-if="isLoggedIn" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/dashboard" class="navbar-brand">Gestión de Inventario</router-link>
        <div class="navbar-nav">
          <router-link to="/productos" class="nav-item nav-link">Productos</router-link>
          <router-link to="/entrada-inventario" class="nav-item nav-link">Entrada</router-link>
          <router-link to="/salida-inventario" class="nav-item nav-link">Salida</router-link>
          <a @click="logout" class="nav-item nav-link" style="cursor: pointer;">Cerrar Sesión</a>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('user') !== null;
    }
  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>