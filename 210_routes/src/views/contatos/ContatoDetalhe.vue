<template>
    <div>
        <h3>Detalhes sobre o contato com id {{ id }}</h3>
        <router-link 
            :to="`/contatos/${id}/editar`"
            class="btn btn-primary">
        </router-link>
    </div>
</template>

<script>

    export default {
        props: ['id'],
        // data() {
        //     return {
        //         id: this.$route.params.id
        //     }
        // },
        // watch: {
        //     '$route'(to, from) {
        //         this.id = to.params.id
        //     }
        // },
        // beforeRouteUpdate(to, from, next) {
        //     this.id = to.params.id
        //     next()
        // },
        created() {
            //console.log('parametro de rota', this.$route.params)
            console.log('parametro de rota', this.$props)
        }
    }

</script>
