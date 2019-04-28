<template>
    <div class="page-wrap">
		<div class="page-hd">
			<h2>PROJECTS</h2>
			<Handle :closeBtn="true"></Handle>
		</div>
		<div class="page-bd">
			<div class="scroll-wrap">
				<div class="scroll-wrap-hd" @click.stop>
					<div class="select-btn" @click="SelectShow">
						MENU
					</div>
					<div class="select-wrap">											
						<div class="select-group"><span>TYPE</span><div class="input-div"><select-input multi="true" :selectData="productsType" @selectValue='selectVal' name="Type"></select-input></div></div>
						<div class="select-group"><span>LOCATION</span><div class="input-div"><select-input :selectData="productsLocation" @selectValue='selectVal' name="Loaction"></select-input></div></div>
						<div class="select-group"><span>FUNCTION</span><div class="input-div"><select-input multi="true" :selectData="productsFunction" @selectValue='selectVal' name="Function"></select-input></div></div>
						<div class="select-group"><span>SIZE</span><div class="input-div"><select-input :selectData="productsSize" @selectValue='selectVal' name="Size"></select-input></div></div>
						<div class="select-group"><span>STATUS</span><div class="input-div"><select-input :selectData="productsStatus" @selectValue='selectVal' name="Status"></select-input></div></div>
					</div>
					
                </div>
				<div class="scroll-wrap-bd">
					<ul class="col4">
						<transition-group name="css">
							<li v-for="item in Products" :key="item.Id">
								<router-link :to="{path:'/ProjectDetail',query:{Id:item.Id}}"><div class="img"><img v-lazy="'/'+(item.Images!=''?item.Images[0].Image:'')" alt=""></div><p>{{item.Title}}</p><span>{{item.Location}}</span></router-link>
							</li>
						</transition-group>
					</ul>
					<div class="shade" @click="SelectShow"></div>
				</div>
			</div>
		</div>	
		<Footer></Footer>
		<transition :name="transitionName">
      		<router-view/>
    	</transition> 
	</div>
</template>

<script>
export default {
	name:'Project',	
	data(){
		return {
			transitionName:'',
			productsType:[],
			productsLocation:[],
			productsFunction:[],
			productsSize:[],
			productsStatus:[],
			Products:[{
				Id:'',
				Images:[{
					'Image':''
				}],
				Location:'',
				Title:'',
			}],
			selectValue:{
				Type:'',
				Loaction:'',
				Function:'',
				Size:'',
				Status:'',
				Title:'',
			}
		}
	},
	created:function(){
		this.productsTypeLoad()
		this.productsLocationLoad()
		this.productsFunctionLoad()
		this.productsSizeLoad()
		this.productsStatusLoad()
		this.productsLoad()
	},
	mounted:function(){
		
	},
	methods:{
		SelectShow:function(){
			$('.select-wrap').slideToggle();
			$('.shade').fadeToggle();
		},
		productsTypeLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productstype")
      .then(function(res){
				that.productsType = res.data.list
      })
		},
		productsLocationLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productslocation")
      .then(function(res){
				that.productsLocation = res.data.list
      })
		},
		productsFunctionLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productsfunction")
      .then(function(res){
				that.productsFunction = res.data.list
      })
		},
		productsSizeLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productssize")
      .then(function(res){
				that.productsSize = res.data.list
      })
		},
		productsStatusLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productsstatus")
      .then(function(res){
				that.productsStatus = res.data.list
      })
		},
		selectVal:function(data){
			$.extend(this.selectValue, data);
		},
		productsLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=products",{
				params:{
					Type:this.selectValue.Type,
					Loaction:this.selectValue.Loaction,
					Function:this.selectValue.Function,
					Size:this.selectValue.Size,
					Status:this.selectValue.Status,
				}
			})
      .then(function(res){
				that.Products = res.data.list
				localStorage.Products = JSON.stringify(res.data.list)
      })
		}
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

		},
		selectValue:{
			handler(){
				this.productsLoad()
			},
			deep: true,
		}
	}
}
</script>

<style scoped>
.page-wrap{
	background: #394047;
}
.scroll-wrap{
	background:none;
}
.scroll-wrap-hd .select-group{
    float:left;
	line-height: 35px;
	height:35px;
    width:20%;
	margin:26px 0;
	display: table;
}
.scroll-wrap-hd .select-group span{
	float: left;
	width:1%;
	display: table-cell;
	margin:0 5px 0 20px;
	font-weight:bold;
}
.input-div{
	width:100%;
	height:35px;
	display: table-cell;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  z-index: 999;
}

.select-btn{
	display: none;
}
/* 设置持续时间和动画函数 */
.css-enter, .css-leave-to
{
		opacity: 0;
		transform: translateY(30px);
}
.css-leave-active {
		/* 主要是这段，不加绝对定位就不会触发enter\leave的动画效果 */
		position: absolute;
}
@media screen and (max-width: 1200px){
	.scroll-wrap-hd .select-group{
		font-size:14px;
		padding-right: 10px;
		box-sizing: border-box;
	}
	.scroll-wrap-hd .select-group span{
		margin-left:0;
	}
}

@media screen and (max-width: 1024px){
	.select-btn{
		display: block;
		background:#202428 url(/static/images/down.png) no-repeat 98% center;;
		padding:10px;
		background-size: 10px auto;
	}
	.scroll-wrap-hd{
		position: relative;		
		z-index: 2;
		background:#394047;
		padding-bottom: 10px;
	}
	.select-wrap{
		position: absolute;
		display: none;
		z-index: 2;
		background:#202428;
		padding-bottom:20px;
	}
	.shade{
		position: absolute;
		display: none;
		width:100%;
		height:100%;
		bottom:0;
		background:rgba(0,0,0,.5);
		z-index: 1;
	}
	.scroll-wrap-hd .select-group{
		width: 50%;
		margin:5px 0;
	}
	.scroll-wrap-hd .select-group:first-child{
		margin-top:20px;
	}
	.scroll-wrap-hd .select-group span{
		width: 80px;
		text-align: right;
	}
	.input-div{
		float: left;
		width: calc(100% - 90px)
	}
	
}
@media screen and (max-width: 768px){
	.scroll-wrap-hd .select-group{
		width: 100%;
		margin-top:10px;
	}
	.scroll-wrap-bd {
      margin: 10px 0;
      padding-right: 0;
    }
}

</style>
