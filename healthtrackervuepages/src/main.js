import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'font-awesome/css/font-awesome.css';
import { BootstrapVue } from 'bootstrap-vue';
import router from './router/index'
import store from './router/store';

Vue.config.productionTip = false
Vue.use(BootstrapVue);
new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        document.title = 'Health Tracker';
    },
}).$mount('#app');
