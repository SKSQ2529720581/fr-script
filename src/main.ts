import { createApp } from "vue";
import { createPinia } from "pinia";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import App from "./App.vue";
import "./assets/scss/theme.scss";
import "./assets/scss/style.scss";
import "./assets/scss/highlight-vs.scss";
import router from "./router/index";
import "animate.css";
import "element-plus/theme-chalk/el-message-box.css"; //手动引入el-message-box样式，解决el-message-box样式丢失问题
import "virtual:uno.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
logUtil.setProductionErrorReport();
