<template>
  <div>
    <SidebarComponent />
    <div class="md:ml-64 ml-0 md:mb-0 mb-16 p-4">
      <router-view v-if="showComponent" v-slot="{ Component }">
        <transition
          name="fade"
          @before-enter="beforeEnter"
          @after-leave="afterLeave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <BottonComponent />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import SidebarComponent from "../components/layout/sidebarComponent.vue";
  import BottonComponent from "../components/layout/bottonComponent.vue";
  const showComponent = ref(true);
  const beforeEnter = () => {
    showComponent.value = false;
  };
  const afterLeave = () => {
    showComponent.value = true;
  };
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    /* transform: translateX(-100%); */
  }

  .fade-leave,
  .fade-enter-to {
    opacity: 1;
    /* transform: translateX(0%); */
  }
</style>
