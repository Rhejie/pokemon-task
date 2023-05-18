<script setup>
import { onMounted, watch } from 'vue';
import { fetchPokemons } from '../composables/get-pokemons';
import { ref } from 'vue';
import { pokemonAPI } from '../../../endpoints/pokemons-api';
import { capitalizeTheFirstLetter } from '../../../helpers/text-helpers'
import { computed } from 'vue';

const emit = defineEmits(['onClickViewProkemonProfile'])

const { load, loading, data: pokemons } = fetchPokemons();
const limit = ref(50)
const offset = ref(1)
const isPaginate = ref(false)
const params = computed(() => {
    return {
        limit: limit.value,
        offset: offset.value,
        isPaginate: isPaginate.value
    }
})

const totalPokemons = computed(() => limit.value * offset.value)

const handleClickViewPokemon = (pokemonProfile) => {
    emit('onClickViewProkemonProfile', pokemonProfile)
}   

const handleClickLoadMore = () => {
    offset.value++
    limit.value = 15
}

const handleSizeChange = (size) => {
    limit.value = size
    offset.value = 1
    isPaginate.value = true
}

const handleCurrentChange = (page) => {
    offset.value = page
    isPaginate.value = true
}

onMounted(() => {
    load(params.value);
})

watch(params, (val) => {
    load(val)
})
</script>
<template>
    <div class="w-full h-screen overflow-y-auto">
        <el-table :data="pokemons" class="w-full" height="600" style="width: 100%" v-loading="loading">
            <el-table-column label="Name">
                <template #default="scope">
                    {{ capitalizeTheFirstLetter(scope.row.name) }}
                </template>
            </el-table-column>
            <el-table-column label="Action" width="100">
                <template #default="scope">
                    <button type="button"
                    class="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="handleClickViewPokemon(scope.row)">View</button>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-center items-center py-4">
            <button type="button" class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="handleClickLoadMore" v-if="totalPokemons !== 150">Load More</button>
        </div>
        <div class="flex justify-center items-center">
            <el-pagination
                v-model:current-page="offset"
                v-model:page-size="limit"
                :page-sizes="[5, 10, 20, 30]"
                :small="small"
                :disabled="disabled"
                :background="background"
                layout="sizes, prev, pager, next"
                :total="150"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                />
        </div>
    </div>
</template>