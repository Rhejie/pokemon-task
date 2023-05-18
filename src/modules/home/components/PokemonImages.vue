<script setup>
import { computed } from 'vue'
const props = defineProps({
    pokemonImages: {
        type: Array,
        default: () => []
    }
})

const pokemonImages = computed(() => props.pokemonImages)
const filterImages = computed(() => pokemonImages.value.filter(image => image != null))
</script>
<template>
    <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in filterImages" :key="item">
            <div class="flex items-center h-full bg-slate-300">
                <img :src="item" alt="your-image-alt-text" class="mx-auto w-40">
            </div>
        </el-carousel-item>
    </el-carousel>
</template>