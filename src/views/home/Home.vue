<template>
  <div class="platform-wrap">
    <div class="platform-menu">
      <div class="logo">tape</div>
      <ul>
        <li @click="goPage(`Tape`)">tape</li>
        <li @click="goPage(`Platform`)">dev-platform</li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    goPage(routerName){this.$router.push({name: routerName})},
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
</style>
<style>
  *{
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  li{
    list-style: none;
  }
  html,body{
    width: 100%;
    height: 100%;
    overflow:auto;
    position: fixed;
    -webkit-overflow-scrolling:auto;
    -webkit-user-select: none;
    -webkit-touch-callout:none;
  }


  .b-top{
    border-top: 1px solid #f1f1f1;
  }
  .b-bottom{
    border-bottom: 1px solid #f1f1f1;
  }

  .m-top{
    margin-top: .3rem;
  }
  .m-bottom{
    margin-bottom: .3rem;
  }
  /*padding*/
  .padding{
    padding: .3rem .15rem;
  }
  .padding>*{
    margin: 0 .3rem;
    border-radius: .25rem;
  }
  .dark{
    color: #333;
  }
  .gray{
    color: #666;
  }
  .light{
    color: #999;
  }
  *.more{
    position: relative;
    padding-right: .75rem!important;
  }
  *.more:after{
    position: absolute;
    top: 50%;
    right: 0;
    content: "\E601";
    display: inline-block;
    transform: translateY(-50%) rotate(180deg);
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .iconfont{
    font-size: inherit;
  }
  input{
    width: 100%;
    background-color: transparent;
  }
  .html>*{
    display: block;
  }
  .html p{
    padding: .5rem .75rem;
    white-space: normal;
    word-break: break-all;
  }
  .html img{
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
