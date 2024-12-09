import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ProductosView from '../views/ProductosView.vue';
import EntradaInventarioView from '../views/EntradaInventarioView.vue';
import SalidaInventarioView from '../views/SalidaInventarioView.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/productos',
    name: 'Productos',
    component: ProductosView
  },
  {
    path: '/entrada-inventario',
    name: 'EntradaInventario',
    component: EntradaInventarioView
  },
  {
    path: '/salida-inventario',
    name: 'SalidaInventario',
    component: SalidaInventarioView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
