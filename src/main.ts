import { createApp } from "vue";
import { createPinia } from "pinia";

import "./styles/index.css";
import "ant-design-vue/dist/reset.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");