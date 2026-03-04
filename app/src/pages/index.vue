<script lang="ts" setup>
import { ref } from 'vue'
import { getInfo } from '../api'

const title = ref('')
getInfo().then((d) => {
  title.value = d.message
})
</script>

<template>
  <div>{{ title }}</div>
</template>

<style lang="scss"></style>
