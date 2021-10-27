<template>
    <div>
        <li>
            <span>{{ contato.nome }}</span>
            <router-link 
                class="btn btn-info btn-sm float-right"
                :to="{name: 'contato', params: {id: contato}}">Detalhes</router-link >
        </li>
    </div>
</template>

<script>
    export default {
        props: {
            contato: {
                type: Object,
                required: true
            }
        }
    }
</script>