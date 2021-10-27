<template>
    <div>
        <h3 class="fonte-weight-light">Contatos</h3>
        <button 
        class="btn btn-secondary mt-4 mb-4" 
        @click="voltar">Voltar</button>

        <div class="form-group">
            <input 
                type="search"
                class="form-control"
                placeholder="Buscar contatos"
                @keyup.enter="buscar"
                :value="$route.query.busca">
        </div>

        <ul class="list-group" v-if="contatosFiltrados.length > 0">
            <contatos-lista-item 
                class="list-group-item" 
                v-for="contato in contatosFiltrados" 
                :key="contato.id" 
                :contato="contato" />
        </ul>
        <p v-else>Nenhum contato cadastrado</p>
    </div>
</template>

<script>

import ContatosListaItem from './ContatosListaItem.vue'
    export default {
        components: {
            ContatosListaItem
        },
        data() {
            return {
                contatos: [
                    { id: 1, nome: 'Gerson', email: 'gersonalifer@hotmail.com'},
                    { id: 2, nome: 'Michelly', email: 'gersonalifer@hotmail.com'},
                    { id: 3, nome: 'Barros', email: 'gersonalifer@hotmail.com'}
                ]
            }
        },
        computed: {
            contatosFiltrados() {
                const busca = this.$route.query.busca
                return !busca
                    ? this.contatos
                    : this.contatos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()))
            }
        },
        methods: {
            buscar(event) {
                this.$router.push({
                    path: '/contatos',
                    query: { busca: event.target.value }
                })
            },
            voltar() {
                this.$router.push('/')
            }
        }
    }
</script>
