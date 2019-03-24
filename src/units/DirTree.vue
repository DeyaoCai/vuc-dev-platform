<template>
  <div class="dir-tree" :class="{active}">
    <div @click="active=!active">{{conf.name}}</div>
    <ul class="dir-list" :style="{height: `${ active ? (conf.child.length + conf.list.length) * 40 : 0}px`}">
      <dir-tree  v-for="(nextConf, index) in conf.list" :conf="nextConf" :treeConf="treeConf" :key="index"/>
      <div v-for="(item, index) in conf.child" :class="{chose: treeConf.choseChild === item}" :key="`_${index}`" @click="treeConf.choseChild = item">{{item.name}}</div>
    </ul>
  </div>
</template>
<script>
  // choseNode: null,
  // choseChild: null,
  // choseNodeList: [],
  // choseChildList: [],
  export default {
    name: 'dir-tree',
    props: ["conf", "treeConf"],
    data() {return {
      active: false
    }},
    methods: {
    },
  }
</script>

<style scoped>
  .dir-tree,
  .dir-list>div{
    padding: 5px 0 5px 20px;
    line-height: 30px;
    color: #333;
    cursor: pointer;
  }
  .dir-tree>div{
    position: relative;
    padding-left: 5px;
  }
  .dir-tree>div:hover{
    background-color: #e0e4e8;
  }
  .dir-tree>ul>div.chose{
    background-color: #e0e4e8;
  }
  .dir-tree>div:before{
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    left: -14px;
    content: "";
    display: block;
    border-top: 5px solid #333;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    transition: all .3s;
  }
  .dir-tree.active>div:before{
    transform: translateY(-50%) rotate(0deg);
  }
  .dir-tree > ul{
    opacity: 0;
    transition: all .3s;
    overflow: hidden;
  }
  .dir-tree.active > ul{
    opacity: 1;
  }
</style>
