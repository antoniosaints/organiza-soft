<script setup lang="ts">
import { Package, Calendar, CreditCard, User } from 'lucide-vue-next'

const contractDetails = {
  plan: 'Plano Premium',
  startDate: '01/01/2024',
  paymentMethod: 'Cartão de Crédito',
  status: 'Ativo',
}

const features = [
  'Acesso ilimitado',
  'Suporte 24/7',
  'Backup automático',
  'Recursos exclusivos',
]
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Detalhes do Contrato</h2>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 lg:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div class="flex items-center">
          <Package class="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div class="ml-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Plano</p>
            <p class="font-semibold text-gray-800 dark:text-white">{{ contractDetails.plan }}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <Calendar class="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div class="ml-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Data de Início</p>
            <p class="font-semibold text-gray-800 dark:text-white">{{ contractDetails.startDate }}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <CreditCard class="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div class="ml-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Forma de Pagamento</p>
            <p class="font-semibold text-gray-800 dark:text-white">{{ contractDetails.paymentMethod }}</p>
          </div>
        </div>
        
        <div class="flex items-center">
          <User class="w-6 h-6 text-blue-500 flex-shrink-0" />
          <div class="ml-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <p class="font-semibold text-gray-800 dark:text-white">{{ contractDetails.status }}</p>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recursos Inclusos</h3>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <li v-for="feature in features" :key="feature" class="flex items-center text-gray-700 dark:text-gray-300">
            <svg class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>