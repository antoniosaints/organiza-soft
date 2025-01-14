<script setup lang="ts">
import { Activity, DollarSign, Package, Bell } from 'lucide-vue-next'

const stats = [
  { icon: Activity, title: 'Status', value: 'Ativo' },
  { icon: DollarSign, title: 'Próxima Fatura', value: 'R$ 99,90' },
  { icon: Package, title: 'Plano', value: 'Premium' },
  { icon: Bell, title: 'Notificações', value: '3' },
]
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg shadow">
        <div class="flex items-center">
          <component :is="stat.icon" class="w-8 h-8 text-blue-500" />
          <div class="ml-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.title }}</p>
            <p class="text-xl font-semibold text-gray-800 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>