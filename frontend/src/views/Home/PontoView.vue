<template>
  <div class="p-4">
    <div class="flex items-center gap-4 mb-4">
      <img class="w-10 h-10 rounded-full" src="../../assets/vue.svg" alt="" />
      <div class="font-medium text-gray-800 dark:text-white">
        <div>Antonio Costa dos Santos</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Último login: 23/05/2022
        </div>
      </div>
    </div>

    <span data-intro="Nesse local, você tem acesso a data e hor atual" data-title="Data e hora atual" href="#" class="flex justify-between mb-4 p-4 bg-gray-300 rounded-lg shadow dark:bg-gray-700">
      <div class="flex flex-col">
        <h5 id="relogio_ponto" class="mb-2 text-4xl dark:text-white text-gray-900 font-bold tracking-tight">
          {{ horario }}
        </h5>
        <p class="font-normal text-gray-800 dark:text-gray-300">Horário atual</p>
      </div>
      <div class="flex flex-col justify-center text-end">
        <h5 id="relogio_ponto" class="text-2xl dark:text-gray-300 text-gray-900 font-bold tracking-tight">
          {{ dataMes }}
        </h5>
        <p class="font-normal text-gray-800 dark:text-gray-300">{{ diaSemana }}</p>
      </div>

    </span>

    <div class="d-flex text-right p-0">
      <div class="max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="h-80" data-title="Mapa" data-intro="Aqui você tem o mapa mostrando sua localização e cercas virtuais">
          <div ref="mapa" style="z-index: 5" class="p-0 w-full rounded-lg h-full"></div>
        </div>
      </div>

      <button @click="verifyLocation" type="button"
        data-title="Registrar ponto"
        data-intro="Clique aqui para registrar seu ponto"
        class="my-2 text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-800 dark:hover:bg-emerald-700">
        Registrar ponto
      </button>
      <button @click="centerUserLocation" type="button"
        data-title="Centralizar mapa"
        data-intro="Clique aqui para centralizar o mapa na sua localização"
        class="my-2 text-white bg-violet-900 hover:bg-violet-600 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700">
        <iconComponent color="text-white" icon="location-crosshairs" size="text-l" />
      </button>
    </div>
  </div>
</template>

<script setup>

</script>