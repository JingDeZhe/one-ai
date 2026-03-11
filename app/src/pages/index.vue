<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getInfo, testAI } from '../api'
import { NCard } from 'naive-ui'
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer.vue'

const { isPending, isFetching, isError, data, error } = useQuery({
  queryKey: ['mainInfo'],
  queryFn: () => testAI().then((d) => d.content),
  placeholderData: '加载中...',
})
</script>

<template>
  <div class="p-2">
    <NCard>
      <MarkdownRenderer :content="data"></MarkdownRenderer>
    </NCard>
  </div>
</template>

<style lang="scss"></style>
