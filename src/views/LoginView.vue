<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="text-center mb-4">Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="email" 
            required
          >
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" 
            v-model="password" 
            required
          >
        </div>
        <button type="submit" class="btn btn-primary btn-block mt-3">
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response /* eslint-disable-line no-unused-vars */ = await authService.login(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        alert('Inicio de sesión fallido. Verifique sus credenciales.');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>