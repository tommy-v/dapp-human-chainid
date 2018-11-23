import Vue from 'vue'
import App from './App.vue'
import VueForm from 'vue-form';


Vue.config.productionTip = false

Vue.use(VueForm);

new Vue({
    render: h => h(App),
}).$mount('#app')
