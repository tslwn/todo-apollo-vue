import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({ defaultClient: apolloClient });

new Vue({
  apolloProvider,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
