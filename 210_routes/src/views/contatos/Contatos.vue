<template>
    <div>
        <contatos-lista/>
        <!--SERVE PARA RENDERIZAR OS CAMPONENTES FILHOS-->
        <router-view></router-view>
        <router-view name="contato-detalhes"></router-view>
    </div>
</template>

<script>
    import ContatosLista from './../../components/contatos/ContatosLista.vue'

    export default {
        components: {
            ContatosLista
        }

        // methods: {
        //     voltar() {
        //         //this.$router.push('/')
        //         //this.$router.replace('/')
        //         //this.$router.go(1)
        //         //this.$router.forward();
        //         this.$router.back();
        //     }
        // }
    }
</script>
