import 'devextreme/dist/css/dx.common.css';
import './themes/generated/theme.base.css';
import './themes/generated/theme.additional.css';
import { createApp }  from "vue";
import router from "./router";
import themes from "devextreme/ui/themes";

import App from "./App";
import appInfo from "./app-info";
import store from "@/store";
import setupInterceptors from "@/services/setupInterceptors";

setupInterceptors(store);

themes.initialized(() => {
    const app = createApp(App);
    app.use(router).use(store);
    app.config.globalProperties.$appInfo = appInfo;
    app.mount('#app');
});
