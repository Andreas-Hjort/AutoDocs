<script setup>
import GetDeals from './components/GetDeals.vue';
import Tab from '@/components/Tab.vue'
import Tabs from '@/components/Tabs.vue'
import Ordre from '@/components/Ordre.vue'
</script>

<template>
  <GetDeals msg="tester lige"></GetDeals>
  <Tabs>
    <Tab title="ordre">
      <Ordre></Ordre>
    </Tab>
    <Tab title="stamdata">
      <p>Test tab stamdata</p>
    </Tab>
    <Tab title="tilbud">
      <p>Test tab tilbud</p>
    </Tab>
  </Tabs>
</template>

<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
