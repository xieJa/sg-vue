<template>
  <div class="page-wrap" :style="'background-image:url(/'+ProductDetail.Image+')'">
    <div class="page-hd nofloat" ref="pageHd">
      <div class="page-detail-hd">
        <h3>{{ProductDetail.Title}}</h3>
        <p>{{ProductDetail.Type}} / {{ProductDetail.Location}} / {{ProductDetail.Function}} / {{ProductDetail.Size}} / {{ProductDetail.Status}}</p>
      </div>

      <Handle :backBtn="true" :nextBtn="Nid" :prevBtn="Pid"></Handle>
    </div>
    <div class="page-bd" ref="pageBd">
      <div class="scroll-wrap" :style="'height:'+scrollHeight+'px'">
        <div class="scroll-wrap-bd">
          <div class="project-item">
            <div class="title">Project Data:</div>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="white-space: nowrap;">Total GFA:</td>
                <td>{{ProductDetail.TotalGFA}}</td>
              </tr>
              <tr>
                <td style="white-space: nowrap;">Location:</td>
                <td>{{ProductDetail.Location}}</td>
              </tr>
              <tr>
                <td>Land Use:</td>
                <td>{{ProductDetail.LandUse}}</td>
              </tr>
              <tr>
                <td>Features:</td>
                <td>{{ProductDetail.Features}}</td>
              </tr>
              <tr>
                <td style="white-space: nowrap;">Scope of Work:</td>
                <td>{{ProductDetail.ScopeofWork}}</td>
              </tr>
            </table>
          </div>
          <div class="project-item">
            <div class="project-part">
              <div class="title">Project Summary:</div>
              <div v-html="ProductDetail.ProjectOverview" class="detail"></div>
            </div>
            <div class="project-part">
              <ul class="col2">
                <li @click="photo(item.Image)" v-for="item in ProductDetail.Images">
                  <div class="img">
                    <img :src="'/'+item.Image" alt>
                  </div>
                  <p>{{item.Title}}</p>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <transition name="fade">
      <ProjectPhoto v-show="ProjectPhoto" :src="Image" @close="close" :title="ProductDetail.Title" :Type="ProductDetail.Type" :Location="ProductDetail.Location" :Function="ProductDetail.Function" :Size="ProductDetail.Size" :Status="ProductDetail.Status" :Images="ProductDetail.Images" @paging="paging"></ProjectPhoto>
    </transition>
  </div>
</template>

<script>
import ProjectPhoto from "@/page/project/ProjectPhoto";
export default {
  name: "projectDetail",
  data() {
    return {
      ProjectPhoto: false,
      Image: "",
      ProductDetail:{Images:''},
      Pid:'',
      Nid:'',
      scrollHeight:'',
    };
  },
  created:function(){
    this.productsLoad()    
  },
  mounted:function(){
   
  },
  methods: {
    photo: function(img) {
      this.Image = img;
      this.ProjectPhoto = true;
    },
    close: function() {
      this.ProjectPhoto = false;
    },
    paging: function(index) {
      this.Image = this.ProductDetail.Images[index].Image
    },
    productsLoad:function(){
			let that =this
      this.$axios.get("/ajaxdata.aspx?Action=productsdetail",{
				params:{
					Id:this.$route.query.Id,
				}
			})
      .then(function(res){
        that.ProductDetail = res.data.list[0]
         that.$nextTick(function(){
           if(document.body.clientWidth<1000){
              that.scrollHeight = document.body.clientHeight - that.$refs.pageHd.clientHeight - 70
           }
        })
      })
		}
  },
  components: {
    ProjectPhoto
  },
  updated:function(){
    let Products = JSON.parse(localStorage.Products)
    for(let i in Products){
      if(Products[i].Id === this.$route.query.Id){
        if(i-1 > -1){
          this.Pid = Products[i-1].Id
        }else{
          this.Pid = ''
        }
        if(parseInt(i)+1 < Products.length){
          this.Nid = Products[parseInt(i)+1].Id
        }else{
          this.Nid = ''
        }
      }
    }
  },
  watch:{
    $route(to, from) {
      this.productsLoad()
    }
  }
};
</script>

<style scoped>
.page-wrap {
  background-image: url(/static/images/page_bg.jpg);
  z-index: 1;
  background-size: cover;
}
.scroll-wrap-bd {
  margin: 50px;
  margin-right: 15px;
  padding-right: 30px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}
table {
  margin-bottom: 60px;
}
table td {
  padding-right: 10px;
  line-height: 26px;
  vertical-align: text-top;
}
.project-part {
  width: 50%;
  float: left;
}
ul.col2 {
  margin-left: 4%;
}
ul.col2 li .img::before {
  display: block;
  content: "";
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.3s;
}
ul.col2 li:hover .img::before {
  opacity: 1;
  background: rgba(0, 0, 0, 0.6) url(/static/images/zoom.png) center center
    no-repeat;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .page-hd {
    display: block;
    padding-bottom: 0;
  }
  .scroll-wrap-bd {
    margin: 10px;
    padding-right: 0;
  }
  .project-part {
    width: 100%;
  }
  ul.col2 {
    margin-top: 10px;
    margin-left: 0;
    display: flex;
    flex-wrap: wrap;
  }
  .scroll-wrap {
    height: calc(100vh - 92px - 120px);
  }
}
</style>
