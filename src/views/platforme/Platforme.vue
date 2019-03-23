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
        <PlatformTree :conf="treeData" :index="treeData.key"  :disableLabel="true"/>
      </div>
      <div class="platform-content-right"><router-view/></div>
    </div>
  </div>
</template>
<script>
import PlatformTree from "./PlatformTree.vue";
import {type} from "cdy-utils";


export default {
  components: {PlatformTree},
  name: 'home',
  methods: {

  },
  mounted() {
  },
  data() {
    const oriData = {
      num: 566,
      str: "556",
      bool: true,
      obj: {next: 456},
      list: [456, "789", {aa: 789}]
    };
    const oriData2 = {"Id":"sha256:4161e91dcc290f291aa7ad17d20212e99704db82b24e7ee3acaa09bd739fc8e9","Parent":"","Comment":"","Created":1553554094562,"Container":"5b45d0e65a6678ad899a346704ed6844392333dd476e83d3bcf3af96ce404709","ContainerConfig":{"Hostname":"5b45d0e65a66","Domainname":"","User":"","AttachStdin":false,"AttachStdout":false,"AttachStderr":false,"PortSpecs":null,"ExposedPorts":["6379/tcp"],"Tty":false,"OpenStdin":false,"StdinOnce":false,"Env":["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","GOSU_VERSION=1.10","REDIS_VERSION=5.0.4","REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.4.tar.gz","REDIS_DOWNLOAD_SHA=3ce9ceff5a23f60913e1573f6dfcd4aa53b42d4a2789e28fa53ec2bd28c987dd"],"Cmd":["/bin/sh","-c","#(nop) ","CMD [\"redis-server\"]"],"Image":"sha256:854cf5984e88fa60c9378373587dca0c0db789158c47e0127ca21dff003ff532","Volumes":["/data"],"WorkingDir":"/data","Entrypoint":["docker-entrypoint.sh"],"NetworkDisabled":null,"OnBuild":null,"Labels":{},"MacAddress":null,"HostConfig":null,"StopSignal":null,"Healthcheck":null,"NetworkingConfig":null},"DockerVersion":"18.06.1-ce","Author":"","Config":{"Hostname":"","Domainname":"","User":"","AttachStdin":false,"AttachStdout":false,"AttachStderr":false,"PortSpecs":null,"ExposedPorts":["6379/tcp"],"Tty":false,"OpenStdin":false,"StdinOnce":false,"Env":["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","GOSU_VERSION=1.10","REDIS_VERSION=5.0.4","REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-5.0.4.tar.gz","REDIS_DOWNLOAD_SHA=3ce9ceff5a23f60913e1573f6dfcd4aa53b42d4a2789e28fa53ec2bd28c987dd"],"Cmd":["redis-server"],"Image":"sha256:854cf5984e88fa60c9378373587dca0c0db789158c47e0127ca21dff003ff532","Volumes":["/data"],"WorkingDir":"/data","Entrypoint":["docker-entrypoint.sh"],"NetworkDisabled":null,"OnBuild":null,"Labels":null,"MacAddress":null,"HostConfig":null,"StopSignal":null,"Healthcheck":null,"NetworkingConfig":null},"Architecture":"amd64","Os":"linux","Size":95000703,"VirtualSize":95000703,"RootFS":{"Type":"layers","Layers":["sha256:6744ca1b11903f4db4d5e26145f6dd20f9a6d321a7f725f1a0a7a45a4174c579","sha256:4f442ee57ce8d8bd2cd0a84b07404f1bfb982999f568c46ea8883d0164179d25","sha256:0a5fa8924bd600cdf8167cd211dc595206c1da11c4f232b1cd39e81c8267ddbc","sha256:89c4334d2c46e67fbb5d3534a540f19a0bca45d36d9a1403d811d64772418d24","sha256:bdd4deeab9353cf33451f6e90edc28a8c2d973a36583b50396ad8388769b2d34","sha256:d766f9e5eaefcd805b93e932130637f70485554168f16be8880d50f1484d10fe"]}};
    return {
      treeData: parseObjToTree(0 , oriData2)
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
    flex: 0 0 1200px;
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
    background-color: #fff;
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
