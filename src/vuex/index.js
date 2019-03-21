import music from "./stores/music.js"
const storeList = [music];

const store = {state: {}, getters: {}, mutations: {}, actions: {}}
Object.keys(store).forEach(items => {
  storeList.forEach(item => {
    item[items] && Object.keys(item[items]).forEach(key => {
      if (store[items][key]) return console.log(`warning store.${items}.${key} has been defined!`)
      store[items][key] = item[items][key];
    });
  });
});
export default store;
