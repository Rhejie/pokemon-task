<script setup>
import { computed, onMounted, watch, ref } from 'vue'
import { pokemonAPI } from '../../../endpoints/pokemons-api';
import { fetchPokemon } from '../composables/get-pokemon';
import PokemonProfileLoading from './layouts/PokemonProfileLoading.vue';
import PokemonImages from './PokemonImages.vue';
import { objectToArrayHelper } from '../../../helpers/coverter-helpers';
import PokemonDetails from './PokemonDetails.vue';
import { capitalizeTheFirstLetter } from '../../../helpers/text-helpers';
const props = defineProps({
    pokemon: {
        type: Object,
        default: null
    }
})

const pokemonObject = computed(() => props.pokemon)
const loading = ref(false)
const pokemonProfile = ref(null)

const loadPokemonProfile = async () => {
    loading.value = true
    const { data } = await fetchPokemon(`${pokemonAPI.resource}/${pokemonObject.value.name}`)
    loading.value = false
    pokemonProfile.value = data.value
}

const pokemonImages = computed(() => {
    if(pokemonProfile.value) {
        let images = objectToArrayHelper(pokemonProfile.value.sprites)
        const newArray = []
        for(let i = 0; i <= 7; i++) {
            newArray.push(images[i])
        }

        return newArray;
    }

    return []
})

onMounted(() => {
    if(pokemonObject.value && pokemonObject.value.name) {
        loadPokemonProfile()
    }
})

watch(pokemonObject, () => {
    loadPokemonProfile();
})

</script>
<template>
    <div v-if="loading">
        <PokemonProfileLoading/>
    </div>
    <div v-if="!pokemonProfile && !loading" class="shadow-md w-full">
        <el-empty description="No Selected Pokemon" />
    </div>
    <div v-if="!loading && pokemonProfile">
        <div class="px-4  py-4">
            <h2 class="text-xl font-semibold">{{ capitalizeTheFirstLetter(pokemonObject.name) }} Profile</h2>
        </div>
        <div class="px-4 py-2">
            <PokemonDetails :name="pokemonObject.name" :pokemon-profile="pokemonProfile"/>
        </div>
        <div class="shadow-md w-full px-4 mx-4 py-2">
            <label for="">Images</label>
            <PokemonImages :pokemon-images="pokemonImages"/>
        </div>
    </div>
</template>