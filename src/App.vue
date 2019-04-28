<template>
  <div id="app">
    <Home></Home>
    <transition :name="transitionName">
        <router-view/>
    </transition>       
  </div>
</template>

<script>
import Home from '@/page/Home'
export default {
  name: 'App',
  data(){
      return {
          transitionName:''
      }
  },
  mounted:function(){
  },
  components:{
    Home
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }      
    }
  }
}
</script>

<style scoped>

</style>
