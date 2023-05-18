<script setup>
import { computed } from 'vue'
import { capitalizeTheFirstLetter } from '../../../helpers/text-helpers';
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    pokemonProfile: {
        type: Object,
        required: true
    }
})

const name = computed(() => props.name)
const pokemonProfile = computed(() => props.pokemonProfile)
</script>
<template>
    <div class="overflow-hidden bg-white shadow sm:rounded-lg w-full">
        <div class="px-4 py-6 sm:px-6">
            <h3 class="text-base font-semibold leading-7 text-gray-900">Pokemon Information</h3>
        </div>
        <div class="border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Name</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {{ capitalizeTheFirstLetter(name) }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Height</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ pokemonProfile.height }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-900">Weight</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ pokemonProfile.weight }}</dd>
                </div>
            </dl>
        </div>
    </div>
</template>