<template>
  <div class="platform-content">
    <div class="platform-content-left">
      <div class="platform-content-title" @click="$router.push({name: 'Home'})">NACOS 1.0.0-RC1</div>
      <div class="platform-content-menu">
        <DirTree v-for="(item, index) in treeList" :key="index" :conf="item" :treeConf="treeConf"/>
      </div>
    </div>
    <div class="platform-content-right"><router-view/></div>
  </div>
</template>
<script>
  import DirTree from "../../units/DirTree";
  export default {
    components: {DirTree},
    name: 'home',
    data() {
      return {
        treeConf: {
          choseNode: null,
          choseChild: null,
          choseNodeList: [],
          choseChildList: [],
        },
        treeList: [
          {name: "镜像操作", list: [], child: [{name: "镜像列表", path: `ConfigManager`,}, {name: "镜像上传"}, {name: "在线构建"}]},
          {name: "工作空间", list: [], child: []},
          {name: "图表生成", list: [], child: []},
          {name: "环境版本", list: [], child: []},
        ]
      }
    },
    methods: {
    },
    mounted() {
    },
    computed: {
    },
    watch: {
      "treeConf.choseChild"(){
        const path = this.treeConf.choseChild.path;
        // path &&
        this.$router.push({name: path});
      },
    },
  }
</script>
<style scoped>
  .platform-content{
    display: flex;
    flex: 1 1 0;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  .platform-content-left{
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
  }
  .platform-content-right{
    flex: 1 1 0;
    padding: 10px;
  }
  .platform-content-title{
    line-height: 70px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    background-color: #D9DEE4;
  }
  .platform-content-menu{
    flex: 1 1 0;
    overflow: scroll;

    background-color: #EAEDF1;
  }
  .platform-content-menu::-webkit-scrollbar{
    display: none;
  }
</style>
