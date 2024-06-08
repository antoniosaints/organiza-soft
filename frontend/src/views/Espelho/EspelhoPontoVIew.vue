<template>
    <div class="flex flex-col gap-2">
        <nav class="flex px-5 py-3 mb-4 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li class="inline-flex items-center">
                    <a href="#"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-white">
                        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        Espelho
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <a href="#"
                            class="ms-1 text-sm font-medium text-gray-900 hover:text-emerald-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Lista
                            de horários</a>
                    </div>
                </li>
            </ol>
        </nav>

        <div class="grid gap-2 lg:grid-cols-3 mt-[-9px] lg:gap-2">
            <select id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Selecione o colaborador</option>
                <option value="US">United States</option>
            </select>
            <input type="date" data-title="Data inicial" data-intro="Aqui você seleciona a data incial"
                v-model="firstFilterDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Data início">
            <input type="date" data-title="Data final" data-intro="Aqui você seleciona a data final"
                v-model="lastFilterDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Data início">
        </div>
        <button type="button" @click="updateMirror" data-title="Aplicar filtro"
            data-intro="Aqui voce pode aplicar as configurações de ponto de trabalho"
            class=" text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-emerald-800 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Aplicar</button>
        <div data-title="Espelho de ponto"
            data-intro="Aqui você pode ver o espelho de ponto, clicando você pode verificar os detalhes"
            class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2">
            
            <div v-for="data in espelho" :key="data.id" @click="detailsDay(data.id)"
                class="flex gap-2 relative bg-white border cursor-pointer border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                <div class="flex ml-2 my-2 flex-col w-1/6 justify-center items-center rounded-lg">
                    <h5 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ data.dia }}
                    </h5>
                    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                        {{ data.dia_semana ?? "Segunda" }}
                    </p>
                </div>
                <div class="flex">
                    <div class="flex flex-col">
                        <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Entradas e
                            saídas</p>
                        <p
                            class="text-sm rounded-sm px-2 mr-2 font-bold bg-slate-200 dark:bg-slate-700 text-gray-900 dark:text-gray-200">
                            {{ data.horarios.map(horario => {
                                return horario.hora
                            }).join(" - ") || "Nenhum registro..." }}</p>
                        <p
                            class="text-sm font-normal items-center flex justify-content-center py-2 text-gray-500 dark:text-gray-300">
                            <IconComponent
                                class="w-3 h-3 p-1 rounded mr-1 dark:bg-gray-900 bg-gray-300 text-gray-900 dark:text-gray-200"
                                icon="thumbtack" />
                            <span v-html="data.dia_semana == 'Domingo' ? 'Dia de folga' : data.observacao"></span>
                        </p>
                    </div>
                </div>
                <div v-if="data.dia_semana == 'Domingo'"
                    class="flex h-full w-1/5 text-center absolute end-0 bottom-0 justify-center itens-center font-bold dark:bg-emerald-900 bg-emerald-500 items-center px-2 rounded-e-lg">
                    <IconComponent class="w-6 h-6 p-1 rounded mr-1 dark:text-white text-white"
                        icon="martini-glass-citrus" />
                </div>
                
            </div>
        </div>
        <Modal buttonName="Detalhes" modalName="Detalhes do espelho" ref="modalDetalhes">
            <div class="relative overflow-x-auto max-h-96">
                <table class="w-full text-sm text-center rtl:text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-200 uppercase bg-emerald-600 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-s-lg">
                                Horário
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Local
                            </th>
                            <th scope="col" class="px-6 py-3 rounded-e-lg">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="horariosBatida.length == 0">
                        <tr>
                            <td class="px-6 py-3 font-bold" colspan="3">Nenhum horário encontrado</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr class="bg-white dark:bg-gray-800" v-for="horario in horariosBatida" :key="horario.id">
                            <td class="px-6 py-4 font-bold text-md">
                                {{ horario.horario }}
                            </td>
                            <td class="px-6 py-4 font-bold text-md">
                                {{ horario.id_local }} - {{ horario.nome_local }}
                            </td>
                            <td class="px-6 py-4">
                                <IconComponent @click="deleteHorario(horario.id, horario.id_batida)"
                                    class="w-3 h-3 py-2 px-3 rounded mr-1 cursor-pointer dark:bg-red-900 bg-red-600 text-white dark:text-gray-200"
                                    icon="trash" />
                                <IconComponent @click="editarPontoHorario.toggleModal()"
                                    class="w-3 h-3 py-2 px-3 rounded mr-1 cursor-pointer dark:bg-cyan-900 bg-cyan-600 text-white dark:text-gray-200"
                                    icon="edit" />
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="text-xs text-gray-900 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="font-semibold ">
                            <td class="px-6 py-3 rounded-s-lg">Horas trabalhadas</td>
                            <td class="px-6 py-3">Local preferido</td>
                            <td class="px-6 py-3 rounded-e-lg">Faltas</td>
                        </tr>
                        <tr class="font-semibold dark:bg-gray-800 bg-white text-gray-900 dark:text-blue-100">
                            <td class="px-6 py-3 text-md rounded-bl-lg">{{ horasTrabalhadas }}</td>
                            <td class="px-6 py-3 text-md">CENTRAL</td>
                            <td class="px-6 py-3 text-md rounded-br-lg">0</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">
            <div class="p-2 gap-2 flex justify-end rounded-lg text-right">
                <button class="bg-emerald-500 hover:bg-emerald-800 dark:bg-emerald-800 dark:hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">Fechar ponto</button>
                <button @click="modalDetalhes.toggleModal()" class="bg-gray-500 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Fechar</button>
            </div>
        </Modal>

        <Modal buttonName="Editar" modalName="Editar horário" ref="editarPontoHorario">
            <form class="flex flex-col" @submit.prevent="changeRequestHour">
                <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Informe o horário
                    e
                    justificativa:</label>
                <div class="flex">
                    <input type="time" id="time" v-model="dataJustifyHour.horario"
                        class="flex-shrink-0 w-1/3 rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-emerald-500 focus:border-emerald-500 block text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                        min="06:00" max="22:00" value="00:00" required>
                    <select id="timezones" name="timezone" v-model="dataJustifyHour.justificativa"
                        class="bg-gray-50 w-2/3 border border-s-0 border-gray-300 text-gray-900 text-sm rounded-e-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                        required>
                        <option value="" selected>Selecione a justificativa...</option>
                        <option value="America/Los_Angeles">Sistema não coletou o horário correto</option>
                    </select>
                </div>
                <button
                    class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Solicitar
                    alteração
                </button>
            </form>
            <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">
            <div class="p-2 gap-2 flex justify-end rounded-lg text-right">
                <button @click="editarPontoHorario.toggleModal()" class="bg-gray-500 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Fechar</button>
            </div>
        </Modal>

        
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import IconComponent from '@/components/Fontawesome/IconComponent.vue';
import { initIntro } from '@/utils/intro_util';
import { espelhoStore } from '@/stores/Ponto/espelhoStore';
import { horariosStore } from '@/stores/Ponto/horariosStore';
import Modal from '@/components/Flowbite/Modal.vue';
import CookieUtil from '@/utils/cookie';
const espelho = ref([]);
const modalDetalhes = ref();
const editarPontoHorario = ref();
const firstFilterDate = ref();
const lastFilterDate = ref();
const horariosBatida = ref([]);
const horasTrabalhadas = ref("00:00");
const dataJustifyHour = reactive({
    horario: "00:00",
    justificativa: ""
});

const getDayOfMonth = (id = null) => {
    const date = new Date();
    if (id) date.setDate(id);
    return date.toISOString().split('T')[0];
}

onMounted(async () => {
    initIntro("@pontoideal:espelho");
    firstFilterDate.value = CookieUtil.getCookie("@pontoideal:startDataToMirror") || getDayOfMonth(1);
    lastFilterDate.value = CookieUtil.getCookie("@pontoideal:endDataToMirror") || getDayOfMonth();
    await updateMirror();
});

const deleteHorario = async (id, id_batida) => {
    await horariosStore().deleteHorario(id);
    await updateMirror();
    const { data, horas_trabalhadas } = await espelhoStore().getEspelhoById(id_batida);
    horariosBatida.value = data
    horasTrabalhadas.value = horas_trabalhadas
}

const changeRequestHour = async () => {
    editarPontoHorario.value.toggleModal();
    await updateMirror();
}
const detailsDay = async (id) => {
    const { data, horas_trabalhadas } = await espelhoStore().getEspelhoById(id);
    horariosBatida.value = data
    horasTrabalhadas.value = horas_trabalhadas
    modalDetalhes.value.toggleModal();
}

async function updateMirror() {
    CookieUtil.setCookie("@pontoideal:startDataToMirror", firstFilterDate.value)
    CookieUtil.setCookie("@pontoideal:endDataToMirror", lastFilterDate.value)
    const { data } = await espelhoStore().getEspelho(`inicio=${firstFilterDate.value}&fim=${lastFilterDate.value}`);
    espelho.value = data.map((item) => (
        {
            ...item,
            observacao: item.horarios.length < 4 ? "Ponto ainda não foi fechado" : "Ponto fechado"
        }
    ));
}
</script>