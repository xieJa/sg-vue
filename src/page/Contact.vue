<template>
  <div class="page-wrap">
    <div class="page-hd">
      <h2>CONTACT</h2>
      <Handle :closeBtn="true"></Handle>
    </div>
    <div class="page-bd">
      <div class="scroll-wrap">
        <div class="scroll-wrap-hd"></div>
        <div class="scroll-wrap-bd">
          <h3>{{contactData.Title}}</h3>
          <div class="about-logo">
            <img src="/static/images/logo2.png" alt>
            <img src="/static/images/slogan.png" alt style="height: 32px; margin-left: 10px;">
          </div>
         
          <div class="contact-inner" v-html="contactData.Content">            
          </div>
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
      contactData:''
    }
  },
  created:function(){
    this.contactLoad()
  },
  methods:{
    contactLoad:function(){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=memoinfo&Type=Contact")
      .then(function(res){
        that.contactData = res.data.list[0]     
      })
    }
  }
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
.contact-inner {
	margin-top: 40px;
	font-size: 14px;
}
@media screen and (max-width: 768px){
	.scroll-wrap-bd {
      margin: 10px;
      padding-right: 0;
    }
}
</style>
