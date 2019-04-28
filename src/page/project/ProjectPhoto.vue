<template>
  <div class="page-wrap" :style="'background-image:url(/'+src+');'">
    <div class="page-hd nofloat">
      <div class="page-detail-hd">
        <h3>{{title}}</h3>
        <p>{{Type}} / {{Location}} / {{Function}} / {{Size}} / {{Status}}</p>
      </div>
      <div class="page-handle">
        <button class="icon prev-icon" @click="prev" v-if="index>0"></button>
        <button class="icon next-icon" @click="next" v-if="index<Images.length-1"></button>    
        <button class="icon close-icon" @click="close"></button>                
      </div>
    </div>
    <div class="title"><p>{{itemTitle}}</p></div>
  </div>
</template>

<script>
export default {
  name: "projectPhoto",
  props: ["src","title","Type","Location","Function","Size","Status","Images"],
  data:function(){
    return{      
      index:0,
      itemTitle:''
    }
  },  
  updated:function(){
    for(var x in this.Images){
      if(this.Images[x].Image === this.src){
        console.log(this.Images[x])
        this.index = x
        this.itemTitle = this.Images[x].Title
      }
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    next(){
      this.$emit("paging",parseInt(this.index)+1);
    },
    prev(){
      this.$emit("paging",parseInt(this.index)-1);  
    },
  }
};
</script>

<style scoped>
.page-wrap{
  background-color:#394047;
}
.page-handle {
  float: right;
  display: table-cell;
  vertical-align: middle;
}
.page-handle .icon{    
    display: inline-block;
    width:58px;
    height:58px;  
    border:0;  
    outline: none;
    transition:all .3s;
    cursor: pointer;
    background-size: 100%;
    border-radius: 50%;
    border:1px solid #c5c5c5;
}
.page-handle .icon:hover{
    background-size: 100%;
    background-color:#fff;
}
.close-icon {
  background: url(/static/images/close.png) no-repeat center center;
}
.close-icon:hover {
  background: url(/static/images/close_pre.png) no-repeat center center;
}
.prev-icon{
    background:url(/static/images/prev.png) no-repeat center center;
}
.next-icon{
    background:url(/static/images/next.png) no-repeat center center;
}
.prev-icon:hover{
    background:url(/static/images/prev_pre.png) no-repeat center center;
}
.next-icon:hover{
    background:url(/static/images/next_pre.png) no-repeat center center;
}
.title{
  position: absolute;
  width: 100%;
  color:#fff;
  bottom:10%;
  font-size: 20px;
  text-shadow: 2px 6px 6px rgba(0, 0, 0, .65);
}
.title p{
  width: 90%;
  max-width: 1500px;
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .page-wrap{
    background-size:contain;
  }
  .page-hd {
    display: block;
    padding-bottom: 0;
  }
  .scroll-wrap-bd {
    margin: 10px;
    padding-right: 0;
  }
  .page-handle .icon {
    width: 36px;
    height: 36px;
    background-size: 100%;
  }
  .title{
    font-size: 14px;
  }
}
</style>
