<template>
  <div class="flex justify-center items-center h-full page flex-col">
    <img class="logo_m mb-4" src="./../../assets/logo.svg" alt="" />
    <h1 class="mb-12">404 页面找不到了</h1>
    <a-button type="primary" @click="backHome">
      <template #icon>
        <HomeOutlined />
      </template>
      返回首页
    </a-button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const backHome = () => {
  router.push("/");
};
</script>

<style lang="less" scoped></style>
