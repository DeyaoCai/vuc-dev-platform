<template>
  <div class="platform-content-menu">
    <ul class="platform-tree">
      <div>
        <input  v-if="!disableLabel" type="text" v-model="conf.key" placeholder="key">
        <span v-if="disableLabel">{{conf.key}}</span>
      </div>:
      <div :class="{add: conf.valType === `array` || conf.valType === `object`}">
        <li v-if="conf.valType === `array`">
          [<platform-tree v-for="(nextConf, index) in conf.val" :conf="nextConf" :disableLabel="conf.valType === 'array'" :key="index" :index="index"/>]
        </li>
        <li v-if="conf.valType === `object`">
          {<platform-tree v-for="(nextConf, index) in conf.val" :conf="nextConf" :disableLabel="conf.valType === 'array'" :key="index" :index="index"/>}
        </li>
        <input type="number" v-if="conf.valType === `number`" v-model="conf.val">
        <input type="text" v-if="conf.valType === `string`" v-model="conf.val">
        <span class="tree-boolean" v-if="conf.valType === `boolean`" @click="conf.val = !conf.val">
          <i v-for="(item, index) in booleanList" :class="{active: index ? !conf.val : conf.val}" >{{item}}</i>
        </span>
        <input type="text" v-if="conf.valType === `undefined`" disabled="disabled" v-model="conf.val">
        <b v-if="conf.valType === `array` || conf.valType === `object`">添加项</b>
      </div>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'platform-tree',
    props: ["conf", "index", "disableLabel"],
    data() {
      return {
        booleanList: ["true", "false"],
      }
    },
    methods: {
    },
    mounted() {
    },
    computed: {
    },
    watch: {
    },
  }
</script>

<style scoped>
  span.tree-boolean{
    display: block;
  }
  span.tree-boolean>i{
    font-style: normal;
    font-size: 12px;
    flex: 1 1 0;
    margin: 4px;
    padding: 0 4px;
    text-align: center;
    line-height: 18px;
    border-radius: 2px;
  }
  span.tree-boolean>i.active{
    background-color: #5584ff;
    color: #fff;
  }

  .platform-tree{
    position: relative;
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
  }
  .platform-tree>div>b{
    padding: 0 10px;
    background-color: #5584ff;
    color: #fff;
    line-height: 28px;
    border-radius: 4px;
  }
  .platform-tree>div{
    margin: 6px;
    padding: 0 6px;
    line-height: 20px;
    color: #333;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .platform-tree>div:hover{
    border: 1px solid yellow;
  }
  .platform-tree>div:first-child{
    flex: 0 0 60px;
  }
  .platform-tree>div:first-child:before{
    position: absolute;
    top: 16px;
    left: 6px;
    content: "";
    display: block;
    border-top: 5px solid #333;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
