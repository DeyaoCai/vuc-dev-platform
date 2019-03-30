<template>
  <div class="add-form" @click.stop="">
    <div class="add-form-title">选择/添加分支</div>
    <div class="add-form-cont">
      <div v-for="diff in difference">
        <ul  v-for="block in diff">
          <div>
            <div>{{block.name}}</div>
            <div>
              <span @click="dropBlock(block)">丢弃块</span>
              <span @click="dropChose(block)">丢弃选中</span>
              <span @click="block.isActive = !block.isActive">展开</span>
            </div>
          </div>
          <li v-for="lines in block.list" :style="{height: `${block.isActive ? lines.list.length * 20 : 0}px`}">
            <div
              v-for="line in lines.list"
              :class="{enc: isEnc(line.name), dec: isDec(line.name), active: line.isActive}"
              @click="line.isActive=!line.isActive"
            >
              <b>{{line.ori}}</b>
              <b>{{line.now}}</b>
              <span v-html="line.name.replace(/ /, '&nbsp;')"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="add-form-foot" @click=""><span @click="onCancle">取消</span><span @click="onConfirm">确认</span></div>
  </div>
</template>
<script>
  import Drop from "./Drop";
  import devAjax from "../devAjax";

  export default {
    name: 'input-group',
    components: {Drop},
    props: ["conf"],
    data() {return {}},
    methods: {
      isEnc(item){return /^\+/.test(item);},
      isDec(item){return /^-/.test(item);},
      dropChose(dto, isAll){
        const workSpace = this.conf.workSpace().name;
        const sentData = {
          workSpace,
          repertory: dto.repertory,
          name: dto.name.replace(/-- a/, "."),
          list: dto.list.map(block =>
            block.list.filter(item => isAll ? /^[\+-]/.test(item.name) : item.isActive)
          )
        };
        devAjax.dropChose(sentData).then(res =>{
          this.conf.reset();
        })
      },
      dropBlock(dto){
        this.dropChose(dto, true)
      },


      onConfirm() {
        this.conf.onConfirm && this.conf.onConfirm();
      },
      onCancle() {
        this.conf.hide();
      },
      onSelect(item) {
      },
    },
    mounted() {
    },
    computed: {
      difference(){
        return this.conf.diff
      }
    },
    watch: {
      "conf.brances"() {
        if (this.conf.brances) {
          const list = this.conf.brances[this.typeConf.val] || [];
          this.oriBranchConf.list = list;
          this.oriBranchConf.val = this.conf.brances.current || list[0];
        }
      },
      "typeConf.val"(val) {
        if (this.conf.brances) {
          const list = this.conf.brances[this.typeConf.val] || [];
          function trim(item) {
            return item && item.replace(/^\*/, "").trim()
          }
          const branchReg = new RegExp(`\\/${trim(this.oriBranchConf.val)}$`);
          this.oriBranchConf.val = list.find(item => branchReg.test(item)) || list.find(item => /^\*/.test(item));
        }
      }
    },
  }
</script>

<style scoped>
  .add-form-cont{
    height: 400px;
    width: 100%;
    overflow: scroll;
  }
  .add-form-cont>div>ul{
    padding: 4px 0;
  }
  .add-form-cont>div>ul>div{
    display: flex;
    font-weight: bold;
    padding: 10px 10px;
    color: #fff;
    line-height: 20px;
    font-size: 14px;
    background-color: rgba(85,132,255,.5);
    border-top: 1px solid #f8f8f8;
  }
  .add-form-cont>div>ul>div>div:last-child{
    flex: 1 1 0;
    text-align: right;
  }
  .add-form-cont>div>ul>div>div:last-child>span{
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    background-color: #fff;
    font-size: 12px;
    line-height: 12px;
    font-weight: normal;
    margin-left: 8px;
    cursor: pointer;
    color: rgba(85,132,255,1);;
  }
  .add-form-cont>div>ul>div>div:last-child>span:active{
    color: rgba(85,132,255,.8);;
  }
  .add-form-cont>div>ul>li{
    transition: all .3s;
    overflow: hidden;
    padding: 0;
    border-bottom: 0 solid transparent;
  }
  .add-form-cont>div>ul.active>li{
    padding: 4px 0;
    border-bottom: 1px solid #5584ff;
  }
  .add-form-cont>div>ul>li>div{
    white-space: nowrap;
    font-size: 12px;
    line-height: 20px;
    padding: 0 10px;
    margin: 2px 0;
    cursor: pointer;
  }
  .add-form-cont>div>ul>li>div.enc{
    background-color: rgba(78,186,15,.5);
    color: #fff;
  }
  .add-form-cont>div>ul>li>div.dec{
    background-color: rgba(236,83,21,.5);
    color: #fff;
  }
  .add-form-cont>div>ul>li>div.enc.active{
    background-color: rgba(78,186,15,.8);
  }
  .add-form-cont>div>ul>li>div.dec.active{
    background-color: rgba(236,83,21,.8);
  }
  .add-form-cont>div>ul>li>div>b{
    display: inline-block;
    min-width: 30px;
    opacity: .6;
    font-size: 12px;
    text-align: center;
  }
  .add-form{
    position: absolute;
    width: 800px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -40%);
  }
  .add-form-title{
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  .add-form-foot{
    display: flex;
    justify-content: flex-end;
  }
  .add-form-foot>span{
    line-height: 30px;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 4px;
    margin-left: 10px;
  }
  .add-form-foot>span:last-child{
    background-color: #5584ff;
    color: #fff;
  }
</style>
