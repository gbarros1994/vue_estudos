<template>
    <div>
        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button 
                    class="btn btn-primary float-right"
                    @click="exibirFormularioCriarTarefa">
                    <i class="fa fa-plus mr-2"></i>
                    <span>Criar</span>
                </button>
            </div>
        </div>

        <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
            <TarefasListaIten
                v-for="tarefa in tarefasOrdenadas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao"
                @deletar="deletarTarefa"
                @concluir="editarTarefa" />
        </ul>

        <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

        <div class="alert alert-danger" v-else>{{ mensagemErro }}</div>

        <TarefaSalvar 
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada"
            @criar="criarTarefa"
            @editar="editarTarefa"/>

    </div>
</template>

<script>
import axios from './../axios'

import TarefaSalvar from './TarefaSalvar.vue'
import TarefasListaIten from './TarefasListaIten.vue'

export default {
    components: {
        TarefaSalvar,
        TarefasListaIten
    },
    data() {
        return {
            tarefas: [],
            exibirFormulario: false,
            tarefaSelecionada: undefined,
            mensagemErro: undefined
        }
    },
    computed: {
        tarefasOrdenadas() {
            return this.tarefas.slice().sort((t1, t2) => {
                if (t1.concluido === t2.concluido) {
                    return t1.titulo < t2.titulo
                        ? -1
                        : t1.titulo > t2.titulo
                            ? 1
                            : 0
                }
                return t1.concluido - t2.concluido
            })
        }
    },
    created() {
        axios.get(`/tarefas`)
            .then((response) => {
                this.tarefas = response.data
            }, error => {
                return Promise.reject(error)
            }).catch(error => {
                if (error.response) {
                    this.mensagemErro = `Servidor retornou um erro: ${error.message} ${error.response.statusText}`
                } else if (error.request) {
                    this.mensagemErro = `Erro ao tentar se comunicar com servidor: ${error.message}`
                } else {
                    this.mensagemErro = `Erro ao fazer requisição: ${error.message}`
                }
            })
    },
    methods: {
        criarTarefa: function (tarefa) {
            axios.post(`/tarefas`, tarefa)
                .then((response) => {
                   this.tarefas.push(response.data)
                   this.resetar()
                })
        },
        editarTarefa: function (tarefa) {
            axios.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() => {
                    const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                    this.tarefas.splice(indice, 1, tarefa)
                    this.resetar()
                })
        },
        deletarTarefa: function (tarefa) {
            const confirmar = window.confirm(`Deseja excluir a tarefa ${tarefa.titulo} ?`)
            if (confirmar) {
                axios.delete(`/tarefas/${tarefa.id}`)
                    .then(() => {
                        //console.log('excluido com sucesso!')
                        const indice = this.tarefas.findIndex(t => t.id === tarefa.id)
                        this.tarefas.splice(indice, 1)
                    })
            }
        },
        resetar() {
            this.tarefaSelecionada = undefined,
            this.exibirFormulario - false
        },
        exibirFormularioCriarTarefa: function () {
            if (this.tarefaSelecionada) {
                this.tarefaSelecionada = undefined
                return 
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        selecionarTarefaParaEdicao: function (tarefa) {
            this.tarefaSelecionada = tarefa
            this.exibirFormulario = true
        }
    }
}
</script>
