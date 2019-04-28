<template>
  <div class="page">
    <div class="header">
      <div class="logo t-left">
        <img src="/static/images/logo1.png" alt>
        <p>Architecture, Urban Design + Sustainability</p>
        <a class="cn" href="#">中</a>
      </div>
    </div>
    <ul class="cb-slideshow">
      <li v-for="item in bannerData">
        <span :style="'background-image:url(/'+item.Image+')'"></span>
      </li>      
    </ul>
    <div class="menu">
      <ul>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/Servers">Services</router-link>
        </li>
        <li>
          <router-link to="/Project">Projects</router-link>
        </li>
        <li>
          <router-link to="/Contact">Contact</router-link>
        </li>
      </ul>
    </div>
    <div class="foot">
        <div class="foot-wrap">
            <div class="foot-logo"><img src="/static/images/logo2.png" alt=""><img src="/static/images/slogan.png" alt="" style="height: 25px;margin-left: 10px;"></div>
            <div class="nav-bottom t-right">
                <ul>
                    <li v-for="item in shareData"><a :href="item.Url">{{item.Title}}</a></li>
                </ul>
                <p class="copyright">blog.Softgrid © 2009-2018</p>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import "../../static/js/home.js";
export default {
  name: "Home",
  data:function(){
      return{
        bannerData:[],
        shareData:[],
      }
  },
  created:function(){
    this.bannerLoad()
    this.shareLoad()
    sessionStorage.referrer=true;
  },
  mounted: function() {
    $(document).ready(function() {
      
      $(".menu li").each(function(index) {
        $(".menu li")
          .eq(index)
          .css({
            "animation-delay": index + 2 + "s"
          });
      });
      $(".menu li a").hover(
        function() {
          $(this)
            .parent()
            .siblings()
            .children("a")
            .addClass("nocur");
        },
        function() {
          $(this)
            .parent()
            .siblings()
            .children("a")
            .removeClass("nocur");
        }
      );
    });
  },
  methods:{
    bannerLoad:function(){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=banner")
      .then(function(res){
        that.bannerData = res.data.list
        that.$nextTick(function(){
          $(".cb-slideshow").imgtransition({
            speed: 6000, //图片切换时间
            animate: 2000 //图片切换过渡时间
          });
        })
      })
    },
    shareLoad:function(){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=share")
      .then(function(res){
        that.shareData = res.data.list        
      })
    }
  },  
};
</script>

<style scoped>
@media screen and (max-width:750px) {
  .foot-logo{
    display: none;
  }
}
</style>
