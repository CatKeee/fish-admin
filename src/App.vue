<script setup lang="ts">
import { theme } from 'ant-design-vue';

const { defaultAlgorithm, darkAlgorithm } = theme;
const appTheme = ref(darkAlgorithm);

onMounted(() => {
  const updateTheme = (matches: boolean) => {
    appTheme.value = matches ? defaultAlgorithm : darkAlgorithm;
  };

  const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)');
  updateTheme(prefersLightMode.matches);

  prefersLightMode.addEventListener('change', () => updateTheme(prefersLightMode.matches));
})
</script>

<template>
  <a-config-provider :theme="{
    algorithm: appTheme,
    token: {
      colorPrimary: '#00C7DB',
      // colorPrimary: '#009dfd',
      borderRadius: 4
    },
  }">
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
