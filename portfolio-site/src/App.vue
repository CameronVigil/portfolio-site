<script setup lang="ts">
  import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
  /* CRITICAL: Reset all browser defaults */


  html {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    border: none !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    background: #000 !important;
  }

 
</style>
