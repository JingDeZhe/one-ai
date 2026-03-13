<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { chatStream, getInfo, testAI } from '../api'
import { NCard } from 'naive-ui'
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.vue'
import { ref } from 'vue'

const mdText = ref('')
chatStream('你是谁？', (chunk) => {
  mdText.value += chunk
})
</script>

<template>
  <div class="p-2">
    <NCard>
      <MarkdownRenderer :content="mdText"></MarkdownRenderer>
    </NCard>
  </div>
</template>

<style lang="scss"></style>
