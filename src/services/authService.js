import axios from 'axios'

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      });
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}