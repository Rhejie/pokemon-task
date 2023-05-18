import { ref } from "vue"
import { pokemonAPI } from "../../../endpoints/pokemons-api";

export const fetchPokemons = () => {
    const data = ref([])
    const loading = ref(false);
    const nextPage = ref(null);
    const previousPage = ref(null);
    const total = ref(0)
    const load = async (params) => {
        loading.value = true;
        await fetch(`${pokemonAPI.resource}?limit=${params.limit}&offset=${params.offset}`)
            .then(response => {
                return response.json()
            }).then(json => {
                previousPage.value = json.previous
                nextPage.value = json.next
                total.value = json.total
                if(params.offset === 1) {
                    data.value = json.results
                }

                if(params.offset !== 1 && !params.isPaginate) {
                    data.value = [...data.value, ...json.results]
                }
                if(params.offset !== 1 && params.isPaginate) {
                    data.value = json.results
                }

            }).finally(() => {
                loading.value = false
            })
    }

    return {
        load,
        data,
        loading,
        total,
        previousPage,
        nextPage,
    }
}