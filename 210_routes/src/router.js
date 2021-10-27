import Vue from 'vue'
import VueRouter from 'vue-router'

import Contatos from './views/contatos/Contatos.vue'
import ContatoDetalhe from './views/contatos/ContatoDetalhe.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatoEditar from './views/contatos/ContatoEditar.vue'
import Erro404Contatos from './views/contatos/Erro404Contatos.vue'
import Home from './views/Home.vue'
import Erro404 from './views/Erro404.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/contatos', 
      component: Contatos,
      alias: ['/meus-contatos', '/lista-de-contatos'],
       children: [
        { 
          path: ':id', 
          component: ContatoDetalhe, 
          name: 'contato',
          props: true
        },
        { 
          path: ':id/editar', 
          alias: ':id/alterar',
          components: {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhe
          }
        },
        { path: '', component: ContatosHome},
        { path: '*', component: Erro404Contatos },
       ] 
      },
    { path: '/home', component: Home },
    { path: '/', redirect: '/contatos' },
    { path: '*', component: Erro404 }
  ]
})