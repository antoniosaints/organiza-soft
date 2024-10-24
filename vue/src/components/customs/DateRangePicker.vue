<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { type Ref, ref } from 'vue'

const df = new DateFormatter('pt-BR', {
    dateStyle: 'medium',
})

const convertStringToCalendarDate = (date: string) => {
    if (!date) {
        const date = new Date();
        return new CalendarDate(date.getFullYear(), date.getMonth() + 1, 1);
    } 
    const [year, month, day] = date.split('-')
    return new CalendarDate(Number(year), Number(month) - 1, Number(day))
}

const convertStartEndToString = (value: any) => {
    if (!value.start || !value.end) return ''
    return {
        start: value.start.toDate(getLocalTimeZone()),
        end: value.end.toDate(getLocalTimeZone()),
    }
}

const props = defineProps<{
    startDate: string
    endDate: string
}>()

const value = ref({
    start: convertStringToCalendarDate(props.startDate),
    end: convertStringToCalendarDate(props.endDate).add({ months: 1, days: -1 }),
}) as Ref<DateRange>
</script>

<template>
    <div :class="cn('grid gap-2', $attrs.class ?? '')">
        <Popover>
            <PopoverTrigger as-child>
                <Button id="date" :variant="'outline'" :class="cn(
                    'w-[300px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />

                    <template v-if="value.start">
                        <template v-if="value.end">
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                df.format(value.end.toDate(getLocalTimeZone())) }}
                        </template>

                        <template v-else>
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                        </template>
                    </template>
                    <template v-else>
                        Selecione uma data
                    </template>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="end">
                <RangeCalendar locale="pt-BR" v-model="value" @update:model-value="() => $emit('update:modelValue', convertStartEndToString(value))" weekday-format="short" :number-of-months="2" initial-focus
                    :placeholder="value.start" @update:start-value="(startDate) => value.start = startDate" />
            </PopoverContent>
        </Popover>
    </div>
</template>