<script>
import { ref, provide } from 'vue'
export default {
    data () {
        return {
            tabTitles: [],
            selectedTitle: ''
        }
    },
    setup (props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])

        provide("selectedTitle", selectedTitle)

        return {
            selectedTitle,
            tabTitles
        }
    },
    methods: {
        selectTab(tabTitle) {
            this.selectedTitle = tabTitle
            // console.log(`Currently at: ${this.selectedTitle}`);
        }
    },
}

</script>


<template>
    <article>
        <header class="tabs">
            <ul class="tabs-header">
                <li 
                v-for="title in tabTitles" 
                :key="title"
                :class="{selected: title == selectedTitle}"
                @click="selectTab(title)">
                    <div class="nav-item">
                        {{ title }}
                    </div>
                </li>
            </ul>
        </header>
        <section class="tabs-details">
            <slot></slot>
        </section>
    </article>
</template>

<style scoped>
.tabs {
    margin: 0 auto;
}

.tabs-header {
    margin-bottom: 10px;
    list-style: none;
    padding: 0;
    display: flex;
}

.tabs-header li {
    width: 150px;
    text-align: center;
    padding: 10px 20px;
    margin: 5px 10px;
    background-color: grey;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.4s all ease-out;
}

.tabs-header li.selected {
    background-color: lightgrey;
    color: black;
}

</style>
