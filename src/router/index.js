import Vue from 'vue';
import Router from 'vue-router';
import AppDashboard from '@/components/AppDashboard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'AppDashboard',
            component: AppDashboard,
        },
    ],
});
