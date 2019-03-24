<template>
  <div class="vuc-popup" :class="popClass"  @click="sHidePop" :style="conf.wrapBg">
    <div class="vuc-popup-null" v-if="!full&& derction === 'bottom'"></div>
    <div class="vuc-popup-content" :class="{full: full}" @webkitTransitionEnd="transitionEnd" :style="conf.bg"><slot/></div>
    <div class="vuc-popup-null"  v-if="!full&& derction === 'top'"></div>
  </div>
</template>

<script>
  export default {
    name: 'vue-popup',
    data () {return {active: false, sShow: false}},
    props: ["conf"],
    watch: {
      show () {
        this.show ? this.showPop() : this.hidePop();},
    },
    computed: {
      show () {return this.conf.show;},
      full () {return this.conf.full},
      derction () {return this.conf.direction || "bottom"},
      popClass () {return [
        this.derction,
        {active: this.active, show: this.sShow}];
      },
    },
    mounted () {
      this.conf.hide = () => (this.hidePop());
    },
    methods: {
      showPop () {this.sShow = true; setTimeout(() => (this.active = true), 20) },
      sHidePop () {this.conf.stop || (this.active = false);},
      hidePop () {this.active = false;},
      transitionEnd () {this.sShow = this.conf.show = this.active;}
    },
  }
</script>

<style type="text/css" scoped>
  /*popUp开始*/
  .vuc-popup{
    display: none;
    box-orient:vertical;
    flex-direction:column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    transition: all 1s;
    z-index: 1;
  }
  .vuc-popup.show{
    display: flex;
    background-color: rgba(0,0,0,.0);
  }
  .vuc-popup.active{
    background-color: rgba(0,0,0,.5);
  }
  .vuc-popup-null{
    flex: 1;
  }
  .vuc-popup-content{
    transform: translate3d(0,0,0);
    transition: transform .3s;
    will-change: transform;
  }
  .top .vuc-popup-content{
    transform: translate3d(0, -100%, 0);
  }
  .bottom .vuc-popup-content{
    transform: translate3d(0, 100%, 0);
  }
  .left .vuc-popup-content{
    transform: translate3d(-100%, 0, 0);
  }
  .right .vuc-popup-content{
    transform: translate3d(100%, 0, 0);
  }
  .vuc-popup-content.full{
    height: 100%;
  }
  .active .vuc-popup-content{
    transform: translateY(0);
  }
  /*popUp结束*/
</style>
