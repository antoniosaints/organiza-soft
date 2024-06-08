import { defineStore } from "pinia"
import {  ref } from "vue"


export const useMainStore = defineStore("main", () => {
    const isAuth = ref(true)
    const darkMode = ref(false)


    darkMode.value = JSON.parse(localStorage.getItem("darkMode"))


    return { isAuth, darkMode }
})