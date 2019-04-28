<template>
    <div class="page-handle">
        <button class="icon prev-icon" @click="prev" v-if="prevBtn"></button>
        <button class="icon next-icon" @click="next" v-if="nextBtn"></button>        
        <button class="icon back-icon" @click="back" v-if="backBtn"></button>        
        <button class="icon close-icon" @click="back" v-if="closeBtn"></button>        
    </div>
</template>

<script>
export default {
    name:'handle',
    props:['prevBtn','nextBtn','backBtn','closeBtn'],
    methods:{
        back(){                  
            if(this.$route.path === '/ProjectDetail'){
                this.$router.push("/Project");
            }else if(this.$route.path === '/Project'){
                this.$router.push("/");
            }else if(sessionStorage.referrer){   // 是否从首页路过
                this.$router.go(-1);               
            }else{
                this.$router.push("/");
            }
        },
        next(){
            this.$router.push({
                path:'/ProjectDetail',
                query:{Id:this.nextBtn}
            });
        },
        prev(){
            this.$router.push({
                path:'/ProjectDetail',
                query:{Id:this.prevBtn}
            });
        },
    },    
}
</script>

<style scoped>
.page-handle{
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
.close-icon{
    background:url(/static/images/close.png) no-repeat center center;
}
.back-icon{
    background:url(/static/images/back.png) no-repeat center center;
}
.prev-icon{
    background:url(/static/images/prev.png) no-repeat center center;
}
.next-icon{
    background:url(/static/images/next.png) no-repeat center center;
}
.close-icon:hover{
    background:url(/static/images/close_pre.png) no-repeat center center;
}
.back-icon:hover{
    background:url(/static/images/back_pre.png) no-repeat center center;
}
.prev-icon:hover{
    background:url(/static/images/prev_pre.png) no-repeat center center;
}
.next-icon:hover{
    background:url(/static/images/next_pre.png) no-repeat center center;
}
/* mobile css */
@media screen and (max-width: 768px){
	.page-handle .icon{
        width:36px;
        height:36px; 
    }
}
</style>
