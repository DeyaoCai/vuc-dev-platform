<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>镜像详情</span>
      <b>镜像详情：镜像详情的配置。</b>
      <div><span @click="getData">保存</span></div>
    </div>
    <div class="config-manager-list"><div>
      <PlatformTree :conf="treeData" :index="treeData.key"  :disableLabel="true" v-if="treeData" :popConf="popConf"/>
    </div></div>
    <PlatPopup :conf="popConf"><AddForm :conf="popConf"/></PlatPopup>
  </div>
</template>
<script>
  import tapeAjax from "../../tapeAjax";
  import {parseObjToTree, parseTreeToObj} from "cdy-utils";
  import PlatformTree from "../../units/PlatformTree";
  import PlatPopup from "../../units/PlatPopup";
  import AddForm from "../../units/AddForm";

  function getNextVal(type) {
    return {
      array: [],
      object: [],
      string: "",
      number: 0,
      boolean: false,
      funtion: ``,
    }[type];
  }
  export default {
    name: 'home',
    components: {PlatformTree, PlatPopup, AddForm},
    data() {
      return {
        popConf: {show: false, full: true, nowConf: null, onConfirm: type => {
            // nowConf
          const conf = this.popConf.nowConf;
          const {valType, val} = conf;
          val.push({
            key: valType === "array" ? val.length : "",
            valType: type,
            val: getNextVal(type),
          });
          this.popConf.hide();
        }},
        treeData: null,
      }
    },
    computed: {
    },
    methods: {
      getData(){
        console.log(
          this.treeData,
          parseTreeToObj(this.treeData)
        )
      },
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
    display: flex;
    border-left: 3px solid #0099cc;
    line-height: 30px;
    margin-bottom: 20px;
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
  .config-manager-title>div{
    flex: 1 1 0;
    text-align: right;
  }
  .config-manager-title>div>span{
    display: inline-block;
    line-height: 24px;
    margin: 4px 0;
    background-color: #5584ff;
    color: #fff;
    padding: 0 20px;
    border-radius: 4px;
  }
</style>
