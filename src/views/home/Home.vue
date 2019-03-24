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
