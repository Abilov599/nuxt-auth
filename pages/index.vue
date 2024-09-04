<script setup lang="ts">
const { data } = await useFetch("https://jsonplaceholder.typicode.com/posts");
</script>

<template>
  <Head><Title>CRM</Title></Head>
  <div>
    {{ data }}
  </div>
</template>
