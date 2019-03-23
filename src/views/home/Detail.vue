<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>镜像列表</span>
      <b>查询结果：共查询到 0 条满足要求的配置。</b>
    </div>
    <div class="config-manager-list"><div>
      <PlatformTree :conf="treeData" :index="treeData.key"  :disableLabel="true" v-if="treeData"/>
    </div></div>
  </div>
</template>
<script>
  import tapeAjax from "../../tapeAjax";
  import {parseObjToTree} from "cdy-utils";
  import PlatformTree from "../../units/PlatformTree";
  export default {
    name: 'home',
    components: {PlatformTree},
    data() {
      return {
        treeData: null,
      }
    },
    computed: {
    },
    methods: {
      getDetail () {
        tapeAjax.dockerInspect({id: this.$route.query.id}).then(res=> {
          this.treeData = parseObjToTree(0 , res.data);
        });
      },
    },
    mounted() {
      this.getDetail();
    },
    watch: {
    },
  }
</script>

<style scoped>
  .config-manager-list{
    flex: 1 1 0;
    overflow: hidden;
  }
  .config-manager-list>div{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .config-manager{
    background-color: #fff;
    padding: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .config-manager-title{
    border-left: 3px solid #0099cc;
    line-height: 30px;
  }
  .config-manager-title>span{
    padding: 0 10px;
    font-size: 14px;
  }
  .config-manager-title>b{
    color: #ccc;
    font-size: 12px;
    font-weight: normal;
  }
</style>
