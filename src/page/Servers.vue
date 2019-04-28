<template>
    <div class="page-wrap">
		<div class="page-hd">
			<h2>SERVERS</h2>
			<Handle :closeBtn="true"></Handle>
		</div>
		<div class="page-bd">
			<div class="scroll-wrap">
				<div class="scroll-wrap-hd">
					<div class="server-tab">
						<a href="javascript:;" :class="who===item.Id?'active':''" @click="tab(item.Id)"  v-for="item in serverType">{{item.Title}}</a>
					</div>
				</div>
				<div class="scroll-wrap-bd">
					<transition-group name="slide-fade">
							<div v-show="who===item.Id" v-for="item in serverData" :id="item.Id" :key="item.Id" v-html="item.Content" class="page-inner"></div>
					</transition-group>						
					
				</div>
			</div>
		</div>	
		<Footer></Footer>
	</div>
</template>

<script>
export default {
	name:"server",
	data(){
		return{
			who:'Architecture',
			serverType:[],
			serverData:[],
		}
	},
	created:function(){
		this.serverTypeLoad()
	},
	methods:{
		tab:function(str){
			this.who=str
		},
		serverTypeLoad:function(){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=service")
      .then(function(res){
				that.serverType = res.data.list     
				that.who = res.data.list[0].Id
				for(let i = 0;i<that.serverType.length;i++){
					that.serverDataLoad(that.serverType[i].Id)
				}
      })
    },
		serverDataLoad:function(id){
      let that =this
      this.$axios.get("/ajaxdata.aspx?Action=servicecontent",{
				params:{
					Id:id
				}
			})
      .then(function(res){
        console.log(res.data.list)
        that.serverData.push(res.data.list[0])
      })
    }
	}
}
</script>

<style scoped>
.server-tab {
	margin:30px;
}
.server-tab a{
	color:#bbbbbb;
	font-size:16px;
	margin-right: 80px;
	font-weight:bold;
	position: relative;
	padding-left:18px;
	transition: all .3s;
}
.server-tab a:after{
	content: '';
	display: block;
	position: absolute;
	top:50%;
	left:0;
	margin-top:-4px;
	width:8px;
	height:8px;
	background:#bbbbbb;
	border-radius: 50%;
	transition: all .3s;
}
.server-tab a.active,.server-tab a:hover{
	color:#fff;
	text-shadow: 0 5px 10px 10px rgba(0,0,0,.8);
}
.server-tab a.active:after,.server-tab a:hover:after{
	background:#fff;
	box-shadow: 0 0 2px 4px rgba(0,0,0,.1)

}
.scroll-wrap-bd {
  margin-left: 30px;
  margin-right: 15px;
  padding-right: 30px;
	margin-bottom: 50px;
	position: relative;
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active,.slide-fade-leave-active {
transition: all .3s ease;
}
.slide-fade-enter
	/* .slide-fade-leave-active for below version 2.1.8 */ {
	transform: translateX(100%);
	opacity: 0;
}
.slide-fade-leave-to{
	transform: translateX(-100%);
opacity: 0;
}
@media screen and (max-width:750px) {
		.server-tab{
			 margin: 10px;
			 display: flex;
			 justify-content: flex-start;
		}
		.server-tab a{
			margin-right: 10px;
			font-size: 12px;
			padding-left: 12px;
		}
		.server-tab a:last-child{
			margin-right: 0;
		}
		.server-tab a:after{
			top:6px;
		}
    .scroll-wrap-bd {
      margin: 10px;
      padding-right: 0;
    }
}
</style>
