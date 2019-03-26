<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>镜像详情</span>
      <b>镜像详情：镜像详情的配置。</b>
      <div><span @click="getData">保存</span></div>
    </div>
    <div class="config-manager-list"><div>
    </div></div>
    <PlatPopup :conf="popConf"><AddForm :conf="popConf"/></PlatPopup>
  </div>
</template>
<script>
  import tapeAjax from "../../tapeAjax";
  import {parseObjToTree, parseTreeToObj, parseObjectToTreeTools} from "cdy-utils";
  import PlatformTree from "../../units/PlatformTree";
  import PlatPopup from "../../units/PlatPopup";
  import AddForm from "../../units/AddForm";
  const {getAllVal} = parseObjectToTreeTools;
  export default {
    name: 'home',
    components: {PlatformTree, PlatPopup, AddForm},
    data() {
      return {
        popConf: {
          show: false,
          full: true,
          nowConf: null,
          focusItem: null,
          onConfirm: type => {
            const conf = this.popConf.nowConf;
            const {valType, val} = conf;
            const key = valType === "array" ? val.length : "";
            const values =getAllVal();
            val.push({key, values,  val: values[type], valType: type});
            this.popConf.hide();
          },
        },
        treeData: parseObjToTree(0, {a:456,b: {c:45}}),
      }
    },
    computed: {
    },
    methods: {
      getData(){
        console.log(
          this.treeData,
          parseTreeToObj(this.treeData)
        );
        // saveCtoolsConf
        fetch(`http://localhost:9898/dev-tool/saveCtoolsConf`, {method: 'POST', headers: {
            "Content-Type": "application/json"
          }, body: JSON.stringify(parseTreeToObj(this.treeData)[0])}).then(res=> {
          res.json().then(res=>{
            console.log(res);
            // this.treeData = parseObjToTree(0, res.data);
          })
        })
      },
      getDetail () {
        tapeAjax.dockerInspect({id: this.$route.query.id}).then(res=> {
          this.treeData = parseObjToTree(0 , res.data);
        });
      },
    },
    mounted() {
      // this.getDetail();
      fetch(`http://localhost:9898/dev-tool/ctoolsConf`, {method: 'GET', headers: {
          "Content-Type": "application/json"
        }}).then(res=> {
        res.json().then(res=>{
          this.treeData = parseObjToTree(0, res.data[0]);
        })
      })
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
