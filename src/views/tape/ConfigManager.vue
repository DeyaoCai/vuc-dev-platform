<template>
  <div class="config-manager">
    <div class="config-manager-title">
      <span>镜像列表</span>
      <b>查询结果：共查询到 0 条满足要求的配置。</b>
    </div>
    <div class="config-manager-filter">
      <div class="config-manager-input-group">
        <span>镜像名称:</span>
        <span><input type="text" placeholder="镜像名称" v-model="sort.name"></span>
      </div>
      <div class="config-manager-input-group">
        <span>开始时间:</span>
        <span><input type="text" placeholder="镜像名称" v-model="sort.startDate"></span>
      </div>
      <div class="config-manager-input-group">
        <span>结束时间:</span>
        <span><input type="text" placeholder="镜像名称" v-model="sort.endDate"></span>
      </div>
      <div class="config-manager-input-group">
        <span>最小大小:</span>
        <span><input type="number" placeholder="镜像名称" v-model="sort.minSize"><b @click="changeUnit=!changeUnit">{{changeUnit ? `mb` : `kb`}}</b></span>
      </div>
      <div class="config-manager-input-group">
        <span>最大大小:</span>
        <span><input type="number" placeholder="镜像名称" v-model="sort.maxSize"><b @click="changeUnit=!changeUnit">{{changeUnit ? `mb` : `kb`}}</b></span>
      </div>
      <div class="config-manager-input-group">
        <span>排序类型:</span>
        <span><i v-for="(item,index) in sortData.type" :class="{active: item.id === sort.type}" @click="sort.type = item.id">{{item.name}}</i></span>
      </div>
      <div class="config-manager-input-group">
        <span>排序方式:</span>
        <span><i v-for="(item,index) in sortData.index" :class="{active: item.id === sort.index}" @click="sort.index = item.id">{{item.name}}</i></span>
      </div>
      <div class="config-manager-btn">
        <span @click="getList">查询</span>
        <span>菜单</span>
      </div>
    </div>
    <div class="config-manager-list-wrap">
      <div class="config-manager-list">
        <li>
          <div>镜像名称</div>
          <div>镜像标签（版本）</div>
          <div>镜像id</div>
          <div>创建时间 </div>
          <div>大小 </div>
          <div>操作</div>
        </li>
        <li v-for="(item, index) in list" :key="index">
          <div>{{item.name}}</div>
          <div>{{item.version}}</div>
          <div>{{item.Id.split(":").pop().slice(0, 10)}}</div>
          <div>{{item.createdTime.former(`yea-mon-dat`)}}</div>
          <div>{{Math.round(item.Size/1000/1000)}}Mb</div>
          <div>
            <span @click="goDetail(item.Id)">查看详情</span>
            <span>标记</span>
            <span>推送</span>
            <span>删除</span>
          </div>
        </li>
        <li v-if="!list || !list.length">
          <div>没有数据</div>
        </li>
      </div>
    </div>
  </div>
</template>
<script>
import {Time} from "cdy-utils";
import tapeAjax from "../../tapeAjax";
export default {
  name: 'home',
  data() {
    return {
      changeUnit: false,
      pageNo: 1,
      pageSize: 10,
      sortData: {
        type: [{name: "时间", id: "created"}, {name: "大小", id: "size"},],
        index: [{name: "升序", id: "asc"},{name: "降序", id: "desc"},],
      },
      sort: {
        name: "",
        startDate: "",
        endDate: "",
        minSize: 0,
        maxSize: 0,
        type: "created",
        index: "desc",
      },
      list: [],
    }
  },
  computed: {
  },
  methods: {
    goDetail(id){
      this.$router.push({name: "ConfigDetail", query: {id}});
    },
    getList(){
      const data = this.getListData();
      tapeAjax.dockerImages(data).then(res=>{
        res.data.list.forEach(item=>{
          const [name, version] = item.RepoTags[0].split(":");
          item.name = name;
          item.version = version;
          item.createdTime = new Time(new Date(item.Created * 1000));
        });
        this.list = res.data.list;
      });
    },
    getListData(){
      let startDate;
      let endDate;
      try { startDate = new Date(this.sort.startDate).getTime() /1000} catch (e) {console.log(e)}
      try { endDate = new Date(this.sort.endDate).getTime() /1000} catch (e) {console.log(e)}
      const ret = {
        name: this.sort.name,
        startDate: startDate,
        endDate: endDate,
        minSize: this.sort.minSize * 1000 * (this.changeUnit ? 1000 : 1),
        maxSize: this.sort.maxSize * 1000 * (this.changeUnit ? 1000 : 1),
        sort: `${this.sort.type}:${this.sort.index}`,
      };
      Object.keys(ret).forEach(item => {
        if (!ret[item]) {
          delete ret[item];
        }
      });
      return ret;
    }
  },
  mounted() {
    this.getList();
  },
  watch: {
  },
}
</script>

<style scoped>
  .config-manager-list-wrap{
    overflow-y: hidden;
    flex: 1 1 0;
    padding-top: 40px;
    position: relative;
  }
  .config-manager-list{
    overflow-y: scroll;
    height: 100%;
  }
  .config-manager-list>li{
    display: flex;
    line-height: 40px;
    border-bottom: 1px solid #eee;
  }
  .config-manager-list>li:first-child{
    position: absolute;
    top: 0;
    width: 100%;
  }
  .config-manager-list>li:not(:first-child){
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  .config-manager-list>li:first-child{
    background-color: #ebecf0;
    color: #333;
  }
  .config-manager-list>li>div{
    padding: 0 10px;
  }
  .config-manager-list>li:first-child>div{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .config-manager-list>li>div:only-child{
    line-height: 80px;
    text-align: center;
  }
  .config-manager-list>li>div:not(:first-child){
    border-left: 1px solid #eee;
  }
  .config-manager-list>li>div:nth-child(1){
    flex: 1.5 1.5 0;
  }
  .config-manager-list>li>div:nth-child(2){
    flex: 1 1 0;
  }
  .config-manager-list>li>div:nth-child(3){
    flex: 1 1 0;
  }
  .config-manager-list>li>div:nth-child(4){
    flex: 1 1 0;
  }
  .config-manager-list>li>div:nth-child(5){
    flex: 1 1 0;
  }
  .config-manager-list>li>div:nth-child(6){
    flex: 1 1 0;
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
  .config-manager-filter{
    display: flex;
    padding: 10px 0;
    flex-wrap: wrap;
  }
  .config-manager-input-group{
    display: flex;
    padding: 10px 0;
  }
  .config-manager-input-group>span:first-child{
    flex: 0 0 auto;
    padding: 0 10px;
    line-height: 28px;
    color: #666;
    font-weight: bold;
  }
  .config-manager-input-group>span:last-child{
    display: flex;
    width: 120px;
    line-height: 26px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 10px;
  }
  .config-manager-input-group>span>input{
    flex: 1 1 0;
  }
  .config-manager-input-group>span>i{
    font-style: normal;
    font-size: 12px;
    flex: 1 1 0;
    margin: 4px;
    text-align: center;
    line-height: 18px;
    border-radius: 2px;
  }
  .config-manager-input-group>span>i.active{
    background-color: #5584ff;
    color: #fff;
  }
  .config-manager-input-group>span>b{
    flex: 0 0 auto;
    margin-right: -10px;
    border-radius: 0 4px 4px 0;
    background-color: #eee;
    width: 40px;
    text-align: center;
  }
  .config-manager-btn{
    flex: 1 1 0;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  .config-manager-btn>span{
    padding: 0 10px;
    margin-left: 10px;
    background-color: #5584ff;
    color: #fff;
    line-height: 28px;
    border-radius: 4px;
  }
</style>
