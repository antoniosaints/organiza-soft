<script setup lang="ts">
import { ref } from 'vue'
import { Download, CreditCard } from 'lucide-vue-next'

const showPaymentModal = ref(false)
const selectedInvoice = ref<any>(null)

const invoices = [
  { id: 4, date: '2024-03-15', amount: 'R$ 99,90', status: 'Pendente', dueDate: '2024-03-25' },
  { id: 1, date: '2024-03-01', amount: 'R$ 99,90', status: 'Pago', dueDate: '2024-03-10' },
  { id: 2, date: '2024-02-01', amount: 'R$ 99,90', status: 'Pago', dueDate: '2024-02-10' },
  { id: 3, date: '2024-01-01', amount: 'R$ 99,90', status: 'Pago', dueDate: '2024-01-10' },
]

const openPaymentModal = (invoice: any) => {
  selectedInvoice.value = invoice
  showPaymentModal.value = true
}

const closePaymentModal = () => {
  showPaymentModal.value = false
  selectedInvoice.value = null
}

const generateCheckout = () => {
  // Here you would integrate with your payment gateway
  alert('Redirecionando para o checkout...')
  closePaymentModal()
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Faturas</h2>
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Data</th>
              <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Vencimento</th>
              <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Valor</th>
              <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="invoice in invoices" :key="invoice.id" class="dark:bg-gray-800">
              <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{{ invoice.date }}</td>
              <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{{ invoice.dueDate }}</td>
              <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">{{ invoice.amount }}</td>
              <td class="px-4 lg:px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 text-sm rounded-full': true,
                  'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200': invoice.status === 'Pago',
                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200': invoice.status === 'Pendente'
                }">
                  {{ invoice.status }}
                </span>
              </td>
              <td class="px-4 lg:px-6 py-4 whitespace-nowrap">
                <div class="flex gap-2">
                  <button 
                    v-if="invoice.status === 'Pendente'"
                    @click="openPaymentModal(invoice)"
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    title="Pagar fatura"
                  >
                    <CreditCard class="w-5 h-5" />
                  </button>
                  <button 
                    class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    title="Baixar fatura"
                  >
                    <Download class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Detalhes do Pagamento</h3>
          
          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Valor da Fatura</p>
              <p class="text-2xl font-bold text-gray-800 dark:text-white">{{ selectedInvoice?.amount }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Vencimento</p>
              <p class="text-gray-800 dark:text-white">{{ selectedInvoice?.dueDate }}</p>
            </div>
          </div>

          <div class="mt-6 flex gap-3">
            <button
              @click="generateCheckout"
              class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pagar Agora
            </button>
            <button
              @click="closePaymentModal"
              class="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>