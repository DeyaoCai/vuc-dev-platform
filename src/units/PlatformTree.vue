<template>
  <div class="platform-content-menu">
    <ul class="platform-tree">
      <div>
        <input ref="key" type="text" v-model="conf.key" placeholder="key" @focus="testFocus">
      </div>
      <div :class="{add: conf.valType === `array` || conf.valType === `object`}">
        <li v-if="conf.valType === `array`" tabindex="1" @keydown="valInputKeydown($event)" ref="input">
          <span>[</span>
          <platform-tree
            v-for="(nextConf, index) in conf.val"
            :conf="nextConf"
            :disableLabel="conf.valType === 'array'"
            :key="index"
            :index="index"
            :popConf="popConf"
            :parent="conf"
          />
          <span>]</span>
        </li>
        <li v-if="conf.valType === `object`" tabindex="1" @keydown="valInputKeydown($event)" ref="input">
          <span>{</span>
          <platform-tree
            v-for="(nextConf, index) in conf.val"
            :conf="nextConf"
            :disableLabel="conf.valType === 'array'"
            :key="index"
            :index="index"
            :popConf="popConf"
            :parent="conf"
          />
          <span>}</span>
        </li>
        <input type="number" ref="input" v-if="conf.valType === `number`" v-model="conf.val" @keydown="valInputKeydown($event)">
        <input type="text" ref="input" v-if="conf.valType === `function`" v-model="conf.val" @keydown="valInputKeydown($event)">
        <input type="text" ref="input" v-if="conf.valType === `string`" v-model="conf.val" @keydown="valInputKeydown($event)">
        <span class="tree-boolean" ref="input" tabindex="1" v-if="conf.valType === `boolean`" @click="conf.val = !conf.val"  @keydown="valInputKeydown($event)">
          <i v-for="(item, index) in booleanList" :class="{active: index ? !conf.val : conf.val}" >{{item}}</i>
        </span>
        <input type="text"  ref="input" v-if="conf.valType === `undefined`" disabled="disabled" v-model="conf.val">
        <b v-if="conf.valType === `array` || conf.valType === `object`" @click="showAddForm()">添加项</b>
      </div>
      <i v-if="conf.valType !== `array` && conf.valType !== `object`" @click="copyText()">copy</i>
    </ul>
  </div>
</template>
<script>
  import PlatPopup from "./PlatPopup";
  import {valShortCut} from "cdy-utils";
  export default {
    components: {PlatPopup},
    name: 'platform-tree',
    props: ["conf", "index", "disableLabel", "popConf", "parent"],
    data() {
      return {
        booleanList: ["true", "false"],
      }
    },
    methods: {
      prevItem(){
        const {conf, parent, popConf} = this;
        const index = parent.val.indexOf(conf);
        if (index > 0) {
          popConf.focusItem = parent.val[index - 1];
        }
      },
      nextItem(){
        const {conf, parent, popConf} = this;
        const index = parent.val.indexOf(conf);
        const maxLen = parent.val.length;
        if (index < maxLen - 1) {
          popConf.focusItem = parent.val[index + 1];
        }
      },
      addItem(){
        const {conf, parent, popConf} = this;
        const index = parent.val.indexOf(conf);
        parent.val.splice(index + 1, 0, {
          key: index + 1,
          valType: "string",
          val: ""
        });
        popConf.focusItem = parent.val[index + 1];
        parent.val.forEach((item, index) => (item.key = index));
      },
      removeItem(){
        const {conf, parent, popConf} = this;
        const index = parent.val.indexOf(conf);
        index ? parent.val.splice(index, 1) : (conf);
        popConf.focusItem = parent.val[index] || parent.val[index - 1];
        parent.val.forEach((item, index) => (item.key = index));
      },
      testFocus(){
        console.log("focus")
      },
      valInputKeydown(ev){
        valShortCut(ev, this);
      },
      copyText(){
        this.$refs.input.select();
          document.execCommand("Copy");
      },
      showAddForm(){
        this.popConf.show = true;
        this.popConf.nowConf = this.conf;
      },
    },
    mounted() {
      if (this.popConf.focusItem && this.popConf.focusItem === this.conf && this.$refs.input) {
        this.$refs[this.conf.valType === "array" ? "input" : "key"].focus();
      }
    },
    computed: {
    },
    watch: {
      "popConf.focusItem"(){
        if (this.popConf.focusItem && this.popConf.focusItem === this.conf && this.$refs.input) {
          this.$refs[this.conf.valType === "array" ? "input" : "key"].focus();
        }
      },
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
  }
  .platform-tree>i,
  .platform-tree>div>b{
    padding: 0 10px;
    background-color: #5584ff;
    color: #fff;
    border-radius: 4px;
  }
  .platform-tree>i{
    font-style: normal;
    line-height: 22px;
    margin: 6px 0;
  }
  .platform-tree>div>b{
    line-height: 28px;
  }
  .platform-tree>div{
    flex: 1 1 0;
    margin: 6px;
    padding: 0 6px;
    line-height: 20px;
    color: #333;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 4px;
    transition: all .3s;
  }
  .platform-tree>div:last-child{
    min-width: 300px;
  }
  .platform-tree>div:hover{
    border: 1px solid #5584ff;
    box-shadow: 0 2px 2px rgba(85, 132, 255, .3);
  }
  .platform-tree>div:first-child{
    /*flex: 0 0 60px;*/
    flex: 0 0 auto;
  }
  .platform-tree>div:first-child input{
    min-width: 60px;
    max-width: 80px;
    text-align: right;
  }
  .platform-tree>div{
    white-space: nowrap;
  }
  .platform-tree>div:first-child:after{
    padding: 0 4px;
    content: "：";
  }
  .platform-tree>div>li>span{
    padding: 4px 0;
    display: inline-block;
  }
</style>
