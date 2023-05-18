<template>
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="grid gap-4 grid-cols-2 grid-rows-1">
            <div>
                <PokemonsList @onClickViewProkemonProfile="handleSelectedPokemon"/>
            </div>
            <div>
                <PokemonProfile :pokemon="selectedPokemon"/>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'
import PokemonsList from '../components/PokemonsList.vue';
import PokemonProfile from '../components/PokemonProfile.vue';
const selectedPokemon = ref(null)

const handleSelectedPokemon = (selectPokemon) => {
    selectedPokemon.value = selectPokemon
}
</script>