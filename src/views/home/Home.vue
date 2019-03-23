<template>
  <div class="platform-wrap">
    <div class="platform-menu">
      <div class="logo">tape</div>
      <ul>
        <li>首页</li>
        <li>文档</li>
        <li>博客</li>
        <li>社区</li>
        <li>tape</li>
      </ul>
    </div>
    <div class="platform-content">
      <div class="platform-content-left">
        <div class="platform-content-title">NACOS 1.0.0-RC1</div>
        <div class="platform-content-menu">
          <ul class="platform-tree">
            <div>镜像操作</div>
            <li>
              <ul class="platform-tree">
                <div @click="$router.push({name: 'ConfigManager'})">镜像列表</div>
              </ul>
              <ul class="platform-tree">
                <div>镜像上传</div>
              </ul>
              <ul class="platform-tree">
                <div>在线构建</div>
              </ul>
            </li>
          </ul>
          <ul class="platform-tree">
            <div>工作空间</div>
          </ul>
          <ul class="platform-tree">
            <div>图表生成</div>
          </ul>
          <ul class="platform-tree">
            <div>环境版本</div>
          </ul>
        </div>
      </div>
      <div class="platform-content-right"><router-view/></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {

  },
  mounted() {
  },
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
}
</script>

<style scoped>
  .platform-wrap{
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .platform-menu{
    display: flex;
    height: 66px;
    background: #252a2f;
  }
  .platform-menu .logo{
    width: 160px;
    text-align: center;
    line-height: 66px;
    color: #fff;
  }
  .platform-menu>ul{
    flex: 1 1 0;
    justify-content: flex-end;
    display: flex;
    padding: 22px;
  }
  .platform-menu>ul>li{
    padding: 0 20px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    opacity: .6;
    transition: all .3s;
  }
  .platform-menu>ul>li:hover{
    opacity: 1;
  }
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
  .platform-tree{
    padding: 10px 0 10px 10px;
  }
  .platform-tree>div{
    position: relative;
    padding-left: 30px;
    line-height: 20px;
    color: #333;
    cursor: pointer;
  }
  .platform-tree>div:hover{
    background-color: #e0e4e8;
  }
  .platform-tree>div:before{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 6px;
    content: "";
    display: block;
    border-top: 5px solid #333;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
