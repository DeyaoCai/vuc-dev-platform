<template>
  <div class="add-form" @click.stop="">
    <div class="add-form-title">添加字段</div>
    <div class="add-form-cont">
      <ul class="input-group">
        <div><span>字段类型：</span></div>
        <div tabindex="-1" ref="drop">
          <span class="drop-item">{{type}}</span>
          <div>
            <ul>
              <li v-for="(item ,index) in typeList" :key="index" @click="onSelect(item)">{{item}}</li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
    <div class="add-form-foot"><span @click="onCancle">取消</span><span @click="onConfirm">确认</span></div>
  </div>
</template>
<script>
  export default {
    name: 'input-group',
    props: ["conf"],
    data() {
      return {
        type: "",
        typeList: ["number", "string", "function", "boolean", "array", "object", "undefined"]
      }
    },
    methods: {
      onConfirm(){
        this.conf.onConfirm && this.conf.onConfirm(this.type);
      },
      onCancle(){
        this.conf.hide();
      },
      onSelect(item){
        this.type = item;
        this.$refs.drop.blur();
      },
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
  .add-form{
    position: absolute;
    width: 400px;
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
  .input-group{
    position: relative;
    display: flex;
    align-items: flex-start;
  }
  .input-group>div>b{
    padding: 0 10px;
    background-color: #5584ff;
    color: #fff;
    line-height: 28px;
    border-radius: 4px;
  }
  .input-group>div{
    flex: 1 1 0;
    margin: 6px;
    padding: 0 6px;
    line-height: 20px;
    color: #333;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 4px;
    position: relative;
  }
  .input-group>div:hover{
    border: 1px solid yellow;
  }
  .input-group>div:first-child{
    flex: 0 0 90px;
    text-align: right;
    border: 0;
    line-height: 22px;
  }
  .input-group>div>div{
    position: absolute;
    min-width: 100%;
    left: 0;
    top: 100%;
    height: 0;
    padding-top: 0;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transition: all .3s;
  }
  .input-group>div:focus>div{
    height: 100px;
    padding-top: 10px;
    opacity: 1;
  }
  .input-group>div>div>ul{
    background-color: #fff;
    height: 90px;
    overflow-y: scroll;
  }
  .input-group>div>div>ul::-webkit-scrollbar{
    display: none;
  }
  .input-group>div>div>ul>li{
    padding: 4px 10px;
    background-color: #fff;
    color: #333;
    transition: all .3s;
  }
  .input-group>div>div>ul>li:hover{
    background-color: #5584ff;
    color: #fff;
  }
  span.drop-item{
    display: block;
    height: 20px;
  }
</style>
