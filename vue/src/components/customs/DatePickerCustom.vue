<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from '@radix-icons/vue'
import { ref } from 'vue'
import CalendarDateCustom from './CalendarDateCustom.vue'

const df = new DateFormatter('pt-BR', {
  dateStyle: 'long',
})

const value = ref<DateValue>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateValue): void
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'justify-start text-left font-normal w-full',
          !value && 'text-muted-foreground',
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <CalendarDateCustom v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>