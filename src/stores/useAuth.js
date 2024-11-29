import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
    const token = ref("")
    const user = ref(null)

    function setToken(newToken) {
        if (newToken) {
            token.value = newToken
        } else {
            console.log("No está llegando el token ", newToken);
        }
    }

    function getToken() {
        return token.value 
    }

    return {
        token,
        user,
        setToken,
        getToken
    }
}, {
  persist: true,
})