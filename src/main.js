import Vue from 'vue'
const NotFound = { template: '<p>Page not found</p>' }
Vue.config.productionTip = false;
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import routes from "./routes"
import Router from 'vue-router'
import Form from "./components/Form";
import App from "./App";
import Table from "./components/Table";
Vue.use(Buefy);
Vue.use(Router);

export default new Router({
    router: [
        {
            path: '/form',
            name: 'Form',
            component: Form,
            props: true
        },
        {
            path: '/home',
            name: 'Table',
            component: Table,
            props: true
        },
        {
            path: '/',
            name: 'App',
            component: App,
            props: true
        }
    ]
});

new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent () {
            return routes[this.currentRoute] || NotFound
        }
    },
    render (h) { return h(this.ViewComponent) }
});