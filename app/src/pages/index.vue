<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { getInfo } from '../api'

const {
  isPending,
  isFetching,
  isError,
  data: title,
  error,
} = useQuery({
  queryKey: ['mainInfo'],
  queryFn: () => getInfo().then((d) => d.message),
  placeholderData: '加载中...',
})
</script>

<template>
  <div>{{ title }}</div>
</template>

<style lang="scss"></style>
