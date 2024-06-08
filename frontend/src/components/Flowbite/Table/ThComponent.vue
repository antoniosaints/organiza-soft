<template>
    <th scope="col" class="px-6 py-3">
        <div :class="alinhar" class="flex items-center" >
            <slot></slot>

        </div>
    </th>
</template>

<script setup>
defineProps({
    alinhar: {
        type: String,
        default: "justify-start"
    }
})
</script>