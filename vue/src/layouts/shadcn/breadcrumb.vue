<template>
    <breadcrumb>
        <breadcrumb-list>
            <breadcrumb-item v-for="(route, index) in breadcrumbRoutes" :key="index">
                <template v-if="index !== breadcrumbRoutes.length - 1">
                    <router-link :to="route.path">{{ route.meta.breadcrumb }}</router-link>
                    <breadcrumb-separator />
                </template>
                <template v-else>
                    <span>{{ route.meta.breadcrumb }}</span>
                </template>
            </breadcrumb-item>
        </breadcrumb-list>
    </breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const route = useRoute();
const breadcrumbRoutes = computed(() => {
    return route.matched.filter(route => route.meta && route.meta.breadcrumb)
})
</script>