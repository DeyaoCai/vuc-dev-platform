import configs from './config.js';
import axios from 'axios';
const environment = {
  baseUrl: "http://localhost:9898",
  userMock: false
}
const http = {};
const paramReg = /:([^\/]*)/;
Object.keys(configs).forEach(item => {
  http[item] = (data) => {
    const config = configs[item];
    let getUrl = config.url;
    const query = [];
    while (paramReg.test(getUrl)) {
      getUrl = getUrl.replace(paramReg, function (full, key) {
        const replacedSign = `@cdyreplacedKey${key}`;
        query.push({ori: replacedSign, val: data[key]});
        return replacedSign;
      })
    }
    while (query[0]) {
      const conf = query.pop();
      getUrl = getUrl.replace(conf.ori, conf.val);
    }
    if (config.type === "post") return axios.post(environment.baseUrl + config.url, data);
    if(config.type === "get") return axios.get(environment.baseUrl + getUrl, {params: data});
  }
});
export default http;
