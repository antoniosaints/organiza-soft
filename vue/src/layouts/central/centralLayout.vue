<script setup lang="ts">
import { ref } from 'vue'
import { Home, FileText, Newspaper, FileCheck, LogOut, Menu, X } from 'lucide-vue-next'
import ThemeToggle from './components/ThemeToggle.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
    <!-- Mobile Menu Button -->
    <div class="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 z-20 px-4 py-4 flex justify-between items-center shadow-md">
      <h1 class="text-xl font-bold text-gray-800 dark:text-white">Portal do Assinante</h1>
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <button @click="toggleMobileMenu" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Sidebar -->
    <aside :class="{
      'fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out z-10': true,
      '-translate-x-full lg:translate-x-0': !isMobileMenuOpen,
      'translate-x-0': isMobileMenuOpen
    }">
      <div class="p-6 hidden lg:flex lg:justify-between lg:items-center">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Portal do Assinante</h1>
        <ThemeToggle />
      </div>
      <nav class="mt-24 lg:mt-4">
        <router-link @click="isMobileMenuOpen = false" to="/" class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Home class="w-5 h-5 mr-3" />
          Dashboard
        </router-link>
        <router-link @click="isMobileMenuOpen = false" to="/invoices" class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FileText class="w-5 h-5 mr-3" />
          Faturas
        </router-link>
        <router-link @click="isMobileMenuOpen = false" to="/news" class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Newspaper class="w-5 h-5 mr-3" />
          Notícias
        </router-link>
        <router-link @click="isMobileMenuOpen = false" to="/contract" class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FileCheck class="w-5 h-5 mr-3" />
          Contrato
        </router-link>
      </nav>
      <div class="absolute bottom-0 w-full p-6">
        <button class="flex items-center text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
          <LogOut class="w-5 h-5 mr-3" />
          Sair
        </button>
      </div>
    </aside>

    <!-- Overlay for mobile menu -->
    <div 
      v-if="isMobileMenuOpen" 
      @click="isMobileMenuOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden">
    </div>

    <!-- Main Content -->
    <main class="lg:ml-64 p-4 lg:p-8 mt-16 lg:mt-0">
      <router-view></router-view>
    </main>
  </div>
</template>