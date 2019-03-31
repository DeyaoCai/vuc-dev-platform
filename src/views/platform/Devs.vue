<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>工作空间</span>
      <b>随意切换：个人项目 | 公司项目 / pc | 移动端</b>
      <div><span @click="getData">保存</span></div>
    </div>
    <div class="config-manager-list">
      <div>
        <div class="switch-work-space">
        <span
          v-for="(space, index) in workSpaces"
          :index="index"
          :class="{active: currentWorkSpace && space.name === currentWorkSpace.name}"
          @click="setCurrentWorkSpace(space)"
        >{{space.name}}</span>
        </div>
        <div class="switch-repertory">
          <span>仓库列表</span>
          <ul>
            <li>
              <div>仓库名称</div>
              <div>仓库地址</div>
              <div>预配置/当前 分支</div>
              <div>操作</div>
            </li>
            <li v-for="(space, index) in unChoseList" :index="index">
              <div>{{space.name}}</div>
              <div>{{space.repertory}}</div>
              <div v-if="!space.branches"><span>仓库未拉取</span> <span>{{space.branch}}</span></div>
              <div v-if="space.branches"><span>{{space.branches.default}}</span><span>{{space.branches.current}}</span>
              </div>
              <div>
                <span @click="space.disabled = false">启用</span>
              </div>
            </li>
          </ul>
          <span>已选择</span>
          <ul>
            <li v-for="(space, index) in choseList" :index="index">
              <div>{{space.name}}</div>
              <div>{{space.repertory}}</div>
              <div v-if="!space.branches">仓库丢失</div>
              <div v-if="space.branches">
                <span>{{space.branches.default}}</span> <span>{{space.branches.current}}</span>
                <span @click="showChooseBranch(space)">切换</span>
              </div>
              <div>
                <span @click="space.disabled = true">停用</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="switch-foot-btn">
          <span @click="applySetting">按当前预配置检出仓库</span>
          <span @click="getLatestCodes">拉取最新代码</span>
          <span @click="installDependence">拉取依赖</span>
          <!--<span @click="startServer">开启服务</span>-->
          <span @click="getGitDiff">提交</span>
          <span @click="openDir">打开工作空间目录</span>
        </div>
      </div>
    </div>
    <PlatPopup :conf="popConf">
      <BranchForm :conf="popConf"/>
    </PlatPopup>
    <PlatPopup :conf="gitDiffConf">
      <GitDiffForm :conf="gitDiffConf"/>
    </PlatPopup>
  </div>
</template>
<script>
  import tapeAjax from "../../tapeAjax";
  import devAjax from "../../devAjax";
  import {parseObjToTree, parseTreeToObj, parseObjectToTreeTools} from "cdy-utils";
  import PlatformTree from "../../units/PlatformTree";
  import PlatPopup from "../../units/PlatPopup";
  import BranchForm from "../../units/BranchForm";
  import GitDiffForm from "../../units/GitDiffForm";

  export default {
    name: 'home',
    components: {PlatformTree, PlatPopup, BranchForm, GitDiffForm},
    data() {
      return {
        workSpaces: [],
        currentWorkSpace: null,
        gitDiffConf: {
          workSpace: () => this.currentWorkSpace,
          show: false,
          full: true,
          diff: null,
          reset: () => this.getGitDiff(),
          onConfirm: branch => {
            devAjax.gitCommitAll({
              workspace: this.currentWorkSpace.name
            }).then(() => {
              this.gitDiffConf.hide();
            })
          },
        },
        popConf: {
          show: false,
          full: true,
          space: null,
          brances: null,
          onConfirm: branch => {
            this.checkoutBranch(this.popConf.space, branch);
          },
        },
        treeData: parseObjToTree(0, {a: 456, b: {c: 45}}),
      }
    },
    computed: {
      unChoseList() {
        const space = this.currentWorkSpace
        if (space) {
          return space.dto.repertoryList.filter(item => item.disabled)
        }
      },
      choseList() {
        const space = this.currentWorkSpace
        if (space) {
          return space.dto.repertoryList.filter(item => !item.disabled)
        }
      },
    },
    mounted() {
      devAjax.ctoolsConf().then(res => {
        this.treeData = parseObjToTree(0, res.data[0]);
      });
      this.getCurrentWorkSpace();
    },
    methods: {
      getLatestCodes(){
        devAjax.getLatestCodes().then(res => {
          console.log(res);
        });
      },
      openDir() {
        devAjax.openDir({workspace: this.currentWorkSpace.name}).then(res => console.log(res));
      },
      getGitDiff() {
        devAjax.getGitDiff({workspace: this.currentWorkSpace.name}).then(res => {
          this.gitDiffConf.diff = res.data.data;
          this.gitDiffConf.show = true;
        })
      },
      applySetting() {
        const workspace = this.currentWorkSpace;
        const sentData = JSON.parse(JSON.stringify(workspace));
        console.log(sentData);
        sentData.dto.repertoryList.forEach(item => delete item.brances);
        devAjax.applySetting(sentData).then(res => {
          if (res.data.code === 0) {
            const {workSpaces} = this;
            this.currentWorkSpace = this.initWorkSpaceList(res.data.data)[0];
            workSpaces.splice(workSpaces.indexOf(workspace), 1, this.currentWorkSpace);
            alert("apply success!");
          } else {
            alert("apply faill!");
          }
        })
      },
      startServer() {
        devAjax.startServer({workspace: this.currentWorkSpace.name}).then(res => {
          if (res.data.code === 0) {
            alert("server success!");
          } else {
            alert("start server faill!");
          }
        })
      },
      installDependence() {
        devAjax.installDependence({workspace: this.currentWorkSpace.name}).then(res => {
          if (res.data.code === 0) {
            alert("install dependence success!");
          } else {
            alert("install dependence faill!");
          }
        })
      },
      checkoutBranch(space, branch) {
        branch = branch.replace(/^\*/, "").trim();
        devAjax.checkoutBranch({
          branch,
          repertory: space.name,
          workspace: this.currentWorkSpace.name
        }).then(res => {
          this.getCurrentWorkSpace();
          this.popConf.hide();
        });
      },
      showChooseBranch(space) {
        this.popConf.space = space;
        this.popConf.brances = space.branches;
        this.popConf.show = true;
      },
      log() {
        console.log.apply(console, arguments);
      },
      getRepertoryName(repertory) {
        return repertory.split(/[\\\/]+/).pop().replace(/\.git$/, "");
      },
      initWorkSpaceList(list) {
        list.forEach(space =>
          space.dto.repertoryList.forEach(item => {
            item.disabled = !!item.disabled;
            item.name = this.getRepertoryName(item.repertory);
          })
        );
        return list;
      },
      setCurrentWorkSpace(workspace) {
        devAjax.setCurrentWorkSpace({workspace: workspace.name}).then(res => {
          const {workSpaces} = this;
          this.currentWorkSpace = this.initWorkSpaceList(res.data.data)[0];
          workSpaces.splice(workSpaces.indexOf(workspace), 1, this.currentWorkSpace);
        });
      },
      getCurrentWorkSpace() {
        devAjax.getCurrentWorkSpace().then(res => {
          const list = res.data.data.list;
          const currentEntry = res.data.data.currentEntry;
          this.workSpaces = this.initWorkSpaceList(list);
          this.currentWorkSpace = list.find(item => item.name === currentEntry);
        });
      },
      getData() {
        console.log(
          this.treeData,
          parseTreeToObj(this.treeData)
        );
      },
      getDetail() {
        tapeAjax.dockerInspect({id: this.$route.query.id}).then(res => {
          this.treeData = parseObjToTree(0, res.data);
        });
      },
    },
    watch: {},
  }
</script>

<style scoped>
  .switch-repertory {
    padding-top: 10px;
  }

  .switch-repertory > span {
    display: block;
    line-height: 30px;
    padding-left: 10px;
    border-top: 1px solid #f8f8f8;
    border-bottom: 1px solid #f8f8f8;
  }

  .switch-repertory > ul {
    padding: 5px 10px;
  }

  .switch-repertory > ul > li {
    display: flex;
    overflow: hidden;
  }

  .switch-repertory > ul > li > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 0;
    padding: 4px 10px;
  }

  .switch-repertory > ul > li > div:nth-child(1) {
    flex: 1 1 0;
  }

  .switch-repertory > ul > li > div:nth-child(2) {
    flex: 3 3 0;
  }

  .switch-repertory > ul > li > div:nth-child(3) {
    flex: 2 2 0;
  }

  .switch-repertory > ul > li > div:nth-child(4) {
    flex: 1.5 1.5 0;
  }

  .config-manager-list {
    flex: 1 1 0;
    overflow: hidden;
  }

  .config-manager-list > div {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .config-manager {
    background-color: #fff;
    padding: 4px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .config-manager-title {
    display: flex;
    border-left: 3px solid #0099cc;
    line-height: 30px;
    margin-bottom: 20px;
  }

  .config-manager-title > span {
    padding: 0 10px;
    font-size: 14px;
  }

  .config-manager-title > b {
    color: #ccc;
    font-size: 12px;
    font-weight: normal;
  }

  .config-manager-title > div {
    flex: 1 1 0;
    text-align: right;
  }

  .config-manager-title > div > span {
    display: inline-block;
    line-height: 24px;
    margin: 4px 0;
    background-color: #5584ff;
    color: #fff;
    padding: 0 20px;
    border-radius: 4px;
  }

  .switch-work-space {
    display: flex;
    justify-content: center;
    background-color: #5584ff;
    padding: 10px;
    border-radius: 4px;
  }

  .switch-work-space > span {
    display: inline-block;
    padding: 0 20px;
    line-height: 30px;
    min-width: 90px;
    text-align: center;
    background-color: rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: all .3s;
    transform: scale(.9, .9);
    border-radius: 4px;
  }

  .switch-work-space > span:hover {
    background-color: rgba(255, 255, 255, .8);
  }

  .switch-work-space > span:active {
    transform: scale(1, 1);
  }

  .switch-work-space > span.active {
    background-color: rgba(255, 255, 255, .3);
    color: #fff;
  }

  .switch-work-space > span:first-child {
    /*flex: 1 1 0;*/
  }

  .switch-work-space > span:last-child {
    /*flex: 2 2 0;*/
  }

  .switch-foot-btn {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #f8f8f8;
    padding: 10px;
  }

  .switch-foot-btn > span {
    display: block;
    padding: 4px 10px;
    margin: 0 6px;
    color: rgba(255, 255, 255, .6);
    border-radius: 2px;
    background-color: #5584ff;
    cursor: pointer;
    transition: all .3s;
  }

  .switch-foot-btn > span:hover {
    color: rgba(255, 255, 255, 1);
  }
</style>
