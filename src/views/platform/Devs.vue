<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>镜像详情</span>
      <b>镜像详情：镜像详情的配置。</b>
      <div><span @click="getData">保存</span></div>
    </div>
    <div class="config-manager-list"><div>

      <div class="switch-work-space">
        <span class="active">vuc</span>
        <span>vucpc</span>
        <span>ctools</span>
        <span>platForm</span>
        <span>tem</span>
      </div>
      <div class="switch-repertory">
        <span>仓库列表</span>
        <ul>
          <li><div>仓库名称</div><div>仓库地址</div><div>分支</div><div>操作</div></li>
          <li>
            <div>vuc</div>
            <div>https://github.com/DeyaoCai/vuc.git</div>
            <div>master <span>切换</span></div>
            <div>
              <span>选择</span>
              <span>移出工作空间</span>
            </div>
          </li>
        </ul>
        <span>已选择</span>
        <ul>
          <li>
            <div>vuc</div>
            <div>https://github.com/DeyaoCai/vuc.git</div>
            <div>master <span>切换</span><span>提交</span></div>
            <div>
              <span>启用</span>
              <span>删除已检出文件</span>
              <span>提交远程</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="switch-foot-btn">
        <span>检出</span>
        <span>拉取</span>
        <span>提交</span>
        <span>推送</span>
      </div>
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
  .switch-repertory{
    padding-top: 10px;
  }
  .switch-repertory>span{
    display: block;
    line-height: 30px;
    padding-left: 10px;
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
  }
  .switch-repertory>ul{
    padding: 5px 10px;
  }
  .switch-repertory>ul>li{
    display: flex;
  }
  .switch-repertory>ul>li>div{
    flex: 1 1 0;
    padding: 4px 10px;
  }
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

  .switch-work-space{
    display: flex;
    justify-content: center;
    background-color: #5584ff;
    padding: 10px;
    border-radius: 4px;
  }
  .switch-work-space>span{
    display: inline-block;
    padding: 0 20px;
    line-height: 30px;
    min-width: 90px;
    text-align: center;
    background-color: rgba(255,255,255,1);
    cursor: pointer;
    transition: all .3s;
    transform: scale(.9,.9);
    border-radius: 4px;
  }
  .switch-work-space>span:hover{
    background-color: rgba(255,255,255,.8);
  }
  .switch-work-space>span:active{
    transform: scale(1,1);
  }

  .switch-work-space>span.active{
    background-color: rgba(255,255,255,.3);
    color: #fff;
  }
  .switch-work-space>span:first-child{
  }
  .switch-work-space>span:last-child{
  }
  .switch-foot-btn{
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #f8f8f8;
    padding: 10px;
  }
  .switch-foot-btn>span{
    display: block;
    padding: 4px 10px;
    margin:  0 6px;
    color: rgba(255,255,255,.6);
    border-radius: 2px;
    background-color: #5584ff;
    cursor: pointer;
    transition: all .3s;
  }
  .switch-foot-btn>span:hover{
    color: rgba(255,255,255,1);
  }
</style>
