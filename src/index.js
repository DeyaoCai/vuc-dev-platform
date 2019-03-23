import store from "./vuex";
import routerConf from "./router/conf.js";
import routerDef from "./router/index.js";
import "./assets/font/iconfont.css"
import "./assets/index.css"
export default {
  comps: {},
  store: [store],
  router: [routerDef, routerConf],
  callback: [
    param => {
    }
  ]
}
