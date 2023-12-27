import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue'
import Home from '../components/Home.vue';
import Activities from '../components/Activities.vue';
import store from "@/router/store";
import Logout from "@/components/Logout.vue";
import UserPage from "@/components/UserPage.vue";
import UserSignUpPage from "@/components/UserSignUpPage.vue";
import ForgotPassword from "@/components/ForgotPassword.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Login },
    { path: '/signup', name: 'usersignuppage', component: UserSignUpPage },
    { path: '/forgotpwd', name: 'forgotpassword', component: ForgotPassword },
    { path: '/home', name: 'homepage', component: Home, meta: { requiresAuth: true } },
    { path: '/userpage', name: 'userpage', component: UserPage, meta: { requiresAuth: true } },
    { path: `/activities/:userId`, name: 'activitiespage', component: Activities, meta: { requiresAuth: true } },
    { path: `/logout`, name: 'logoutpage', component: Logout, meta: { requiresAuth: true } },
];

const router = new VueRouter({
    routes,
});

// Use navigation guards to protect routes that require authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.isAuthenticated;  /* Check if the user is authenticated */
    console.log('indexPage' + store.state.isAuthenticated)
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        console.log('go to loginpage')
        // Redirect to login if authentication is required but the user is not authenticated
        next('/');
    } else {
        next();
    }
});
export default router;