<script setup lang="ts">
import * as z from 'zod'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { AutoForm, AutoFormField } from '@/components/ui/auto-form'


const schema = z.object({
    username: z
        .string({
            required_error: 'O Nome de usuário é obrigatório.',
        })
        .min(2, {
            message: 'Username must be at least 2 characters.',
        }),

    password: z
        .string({
            required_error: 'Password is required.',
        })
        .min(8, {
            message: 'Password must be at least 8 characters.',
        }),
})

function onSubmit(values: Record<string, any>) {
    toast({
        title: 'You submitted the following values:',
        description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    })
}
</script>

<template>
    <div class="mx-auto max-w-7xl">
        <AutoForm class="space-y-4" :schema="schema" @submit="onSubmit" :fieldConfig="{
            username: {
                label: 'Seu nome completo',
                inputProps: {
                    placeholder: 'Seu nome completo',
                }
            }
        }">
            <template #username="slotProps">
                <AutoFormField v-bind="slotProps" />
            </template>
            <Button type="submit">
                Submit
            </Button>
        </AutoForm>
    </div>
</template>