<script>
import { inject } from 'vue'
export default {
    props: ['title'],
    setup () {
        const selectedTitle = inject("selectedTitle")

        return {
            selectedTitle
        }
    }
    
}

</script>



<template>
<div class="tab-content" v-show="title === selectedTitle">
    <slot></slot>
</div>

</template>

<style scoped>

</style>
