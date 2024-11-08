<script setup>
import { ref } from 'vue'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Printer, Download, ChevronUp, ChevronDown } from 'lucide-vue-next'
import { useLancamentosDetalhesStore } from '@/stores/financeiro/lancamentos/lancamentosDetalhesStore'
const store = useLancamentosDetalhesStore()
// Mock invoice data
const invoiceData = {
  id: 'INV-001',
  customerName: 'John Doe',
  customerEmail: 'john.doe@example.com',
  date: '2023-05-15',
  dueDate: '2023-06-15',
  total: 1250.00,
  status: 'Paid',
  parcels: [
    { id: 'P001', description: 'Electronics', weight: '2.5 kg', dimensions: '30x20x10 cm', price: 500.00 },
    { id: 'P002', description: 'Books', weight: '3 kg', dimensions: '25x20x15 cm', price: 250.00 },
    { id: 'P003', description: 'Clothing', weight: '1 kg', dimensions: '20x15x10 cm', price: 500.00 },
  ],
  additionalNotes: 'Express shipping requested.',
  paymentHistory: [
    { date: '2023-05-20', amount: 625.00, method: 'Credit Card' },
    { date: '2023-06-01', amount: 625.00, method: 'Bank Transfer' },
  ]
}

const isOpen = ref(false)
const sortColumn = ref('')
const sortDirection = ref('asc')

const sortParcels = (parcels) => {
  if (!sortColumn.value) return parcels
  return [...parcels].sort((a, b) => {
    if (a[sortColumn.value] < b[sortColumn.value]) return sortDirection.value === 'asc' ? -1 : 1
    if (a[sortColumn.value] > b[sortColumn.value]) return sortDirection.value === 'asc' ? 1 : -1
    return 0
  })
}

const handleSort = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const SortIcon = (column) => {
  if (sortColumn.value !== column) return null
  return sortDirection.value === 'asc' ? ChevronUp : ChevronDown
}
</script>

<template>
  <Dialog v-model:open="store.isOpenModalLancamento" @openChange="store.isOpenModalLancamento = $event">
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader class="border-b pb-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <Package class="w-10 h-10 text-primary" />
            <div>
              <DialogTitle class="text-2xl font-bold">Invoice {{ invoiceData.id }}</DialogTitle>
              <p class="text-sm text-muted-foreground">Issued on </p>
            </div>
          </div>
          <div :class="`px-3 py-1 rounded-full text-sm font-semibold ${invoiceData.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`">
            {{ invoiceData.status }}
          </div>
        </div>
      </DialogHeader>

      <div class="grid gap-6 py-6">
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">Customer Details</h3>
            <p class="text-sm">{{ invoiceData.customerName }}</p>
            <p class="text-sm text-muted-foreground">{{ invoiceData.customerEmail }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Invoice Summary</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p class="font-medium">Invoice Date:</p>
              <p></p>
              <p class="font-medium">Due Date:</p>
              <p></p>
              <p class="font-medium">Total Amount:</p>
              <p class="text-lg font-bold">${{ invoiceData.total.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Parcel Details</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px] cursor-pointer" @click="handleSort('id')">
                  Parcel ID <component :is="SortIcon('id')" class="inline w-4 h-4" />
                </TableHead>
                <TableHead class="cursor-pointer" @click="handleSort('description')">
                  Description <component :is="SortIcon('description')" class="inline w-4 h-4" />
                </TableHead>
                <TableHead class="cursor-pointer" @click="handleSort('weight')">
                  Weight <component :is="SortIcon('weight')" class="inline w-4 h-4" />
                </TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead class="text-right cursor-pointer" @click="handleSort('price')">
                  Price <component :is="SortIcon('price')" class="inline w-4 h-4" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="parcel in sortParcels(invoiceData.parcels)" :key="parcel.id">
                <TableCell class="font-medium">{{ parcel.id }}</TableCell>
                <TableCell>{{ parcel.description }}</TableCell>
                <TableCell>{{ parcel.weight }}</TableCell>
                <TableCell>{{ parcel.dimensions }}</TableCell>
                <TableCell class="text-right">${{ parcel.price.toFixed(2) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">Payment History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(payment, index) in invoiceData.paymentHistory" :key="index">
                <TableCell></TableCell>
                <TableCell>${{ payment.amount.toFixed(2) }}</TableCell>
                <TableCell>{{ payment.method }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div v-if="invoiceData.additionalNotes">
          <h3 class="text-lg font-semibold mb-2">Additional Notes</h3>
          <p class="text-sm text-muted-foreground">{{ invoiceData.additionalNotes }}</p>
        </div>
      </div>

      <div class="flex justify-between items-center mt-6 pt-6 border-t">
        <div class="flex space-x-2">
          <Button variant="outline" size="sm" @click="console.log('Print invoice')">
            <Printer class="w-4 h-4 mr-2" /> Print
          </Button>
          <Button variant="outline" size="sm" @click="console.log('Download invoice')">
            <Download class="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
        <Button @click="store.isOpenModalLancamento = false">Fechar</Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
