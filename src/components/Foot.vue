<template>
    <div class="foot">
        <div class="foot-wrap">
            <div class="foot-logo"><img src="/static/images/logo2.png" alt=""><img src="/static/images/slogan.png" alt="" style="height: 25px;margin-left: 10px;"></div>
            <div class="nav-bottom t-right" v-if="BLOG">
                <ul>
                    <li><a href="#">Micro-blog</a></li>
                    <li><a href="#">WeChat</a></li>
                </ul>
                <p class="copyright">blog.Softgrid © 2009-2018</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Footer',
    props:["LOGO","BLOG"]
}
</script>