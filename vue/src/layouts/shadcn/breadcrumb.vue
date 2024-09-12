<template>
    <breadcrumb>
        <breadcrumb-list>
            <breadcrumb-item v-for="(route, index) in breadcrumbRoutes" :key="index">
                <template v-if="index !== breadcrumbRoutes.length - 1">
                    <router-link class="hidden_color_link" :to="route.path">{{ route.meta.breadcrumb }}</router-link>
                    <breadcrumb-separator>
                        <ChevronRightIcon />
                    </breadcrumb-separator>
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
import { ChevronRightIcon } from 'lucide-vue-next';

const route = useRoute();
const breadcrumbRoutes = computed(() => {
    return route.matched.filter(route => route.meta && route.meta.breadcrumb)
})
</script>

<style scoped>
.hidden_color_link {
    background-color: transparent !important;
    color: inherit;
}
</style>