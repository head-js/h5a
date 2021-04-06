import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import App from './App.vue';


if ('development' === process.env.NODE_ENV) {
  Vue.config.debug = true;
  Vue.config.devtools = true;
  Vue.config.productionTip = true;
}

a = b;

// Vue.config.warnHandler = function (msg, vm, trace) {
//   // console.log(msg)
//   // console.log(vm)
//   // console.log(trace)
// }

// Vue.config.errorHandler = function (err, vm, info) {
//   // console.log(err)
//   // console.log(vm)
//   // console.log(info)
// }


Vue.use(VueRouter);

const router = new VueRouter({ routes });


const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount(".App");


window.__vue = Vue;
window.__app = app;
