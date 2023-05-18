import { ref } from "vue"

export const fetchPokemon = async (api) => {
    const data = ref(null)
    await fetch(api).then(response => response.json())
        .then(json => data.value = json)
    
    return { data }
}