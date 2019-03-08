<template>
  <div class="page">
    <div class="header">
      <div class="logo t-left">
        <img src="../../static/images/logo1.png" alt>
        <p>Architecture, Urban Design + Sustainability</p>
        <a class="cn" href="#">中</a>
      </div>
    </div>
    <ul class="cb-slideshow">
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-01.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-02.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-03.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-04.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-05.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-06.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-07.jpg)"></span>
      </li>
      <li>
        <span style="background-image:url(../../static/images/SG_MAIN-PAGE_Image-08.jpg)"></span>
      </li>
    </ul>
    <div class="menu">
      <ul>
        <li>
          <a href="about.html">About</a>
        </li>
        <li>
          <a href="#">Services</a>
        </li>
        <li>
          <a href="#">Projects</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </div>

    <div class="foot">
      <div class="foot-wrap">
        <div class="foot-logo">
          <img src="../../static/images/logo2.png" alt>
          <img src="../../static/images/slogan.png" alt style="height: 25px;margin-left: 10px;">
        </div>
        <div class="nav-bottom t-right">
          <ul>
            <li>
              <a href="#">Micro-blog</a>
            </li>
            <li>
              <a href="#">WeChat</a>
            </li>
          </ul>
          <p class="copyright">blog.Softgrid © 2009-2018</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../static/js/home.js'
export default {
    name:'Home',
    mounted:function(){
        $(document).ready(function () {
			$('.cb-slideshow').imgtransition({
				speed: 6000,  //图片切换时间
				animate: 2000 //图片切换过渡时间
			});
			$('.menu li').each(function (index) {
                    $('.menu li').eq(index).css({
                        'animation-delay': index + 2 + 's'
                    })
                })
			$('.menu li a').hover(function () {
				$(this).parent().siblings().children('a').addClass('nocur')
			}, function () {
				$(this).parent().siblings().children('a').removeClass('nocur')
			})
		});
    }
};
</script>

<style>
</style>
