<script setup lang="ts">
import { ref, watch } from 'vue'
import { createMarkdownExit } from 'markdown-exit'

const props = withDefaults(
  defineProps<{
    content?: string
  }>(),
  { content: '' },
)

const htmlContent = ref('')

const md = createMarkdownExit()
watch(
  () => props.content,
  (v) => {
    htmlContent.value = md.render(v)
  },
  { immediate: true },
)
</script>

<template>
  <div class="markdown-renderer">
    <div v-html="htmlContent"></div>
  </div>
</template>

<style lang="scss"></style>
