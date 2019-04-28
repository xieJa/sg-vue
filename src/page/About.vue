<template>
  <div class="page-wrap">
    <div class="page-hd">
      <h2>ABOUT</h2>
      <Handle :closeBtn="true"></Handle>
    </div>
    <div class="page-bd">
      <div class="scroll-wrap">
        <div class="scroll-wrap-hd"></div>
        <div class="scroll-wrap-bd">
          <h3>{{aboutData.Title}}</h3>
          <div class="about-logo">
            <img :src="'/'+aboutData.Image" alt>
          </div>
          <a :href="'/'+aboutData.File" download>
            <img src="/static/images/download.jpg" alt class="download">
          </a>
          <div class="about-inner" v-html="aboutData.Content"></div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name:'about',
  data:function(){
    return{
      aboutData:[]
    }
  },
  created:function(){
    this.aboutLoad()
  },
  methods:{
    aboutLoad:function(){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=memoinfo&Type=About")
      .then(function(res){
        that.aboutData = res.data.list[0]     
      })
    }
  },  
};
</script>

<style scoped>
.scroll-wrap-bd {
  margin: 50px;
  margin-right: 15px;
  padding-right: 30px;
}
.scroll-wrap-bd h3 {
  font-size: 24px;
}
.about-logo {
  margin: 40px 0;
  height: 89px;
}
.about-logo img {
  height: 89px;
}
.about-inner {
	margin-top: 40px;
	font-size: 14px;
}
.download{
  width:350px ;
}
@media screen and (max-width:750px) {
    .scroll-wrap-bd {
      margin: 10px;
      padding-right: 0;
    }
}
</style>
