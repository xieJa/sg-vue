<template>
  <dl class="select-box" :value="valueArray" :class="{'multi-select':multi}">
    <dt :title="valueText" @click="selectInput($event)">{{valueText?valueText:'Please select'}}</dt>
    <dd>
      <div @click="checkbox($event)" data-value="" v-if="!multi">
        <p>Please select</p>
      </div>
      <div @click="checkbox($event)" :data-value="item.Id" v-for="item in selectData">
        <span></span>
        <p>{{item.Title}}</p>
      </div>      
    </dd>
  </dl>
</template>

<script>
export default {
  name: "select-input",
  props:["width","multi","selectData","name"],
  data(){
      return{
          valueArray:[],
          valueText:'',
      }
  },
  mounted:function(){
      $('body').click(function(){
          $('.select-box').find('dd').slideUp()
      })
      let that = this;
      for(let i in this.valueArray){
          $(this.$el).find('div').each(function(){
              if(that.valueArray[i] == $(this).data("value")){
                  $(this).addClass('checkbox')
                  that.valueText+=$(this).text()+','
              }   
          })
      }
  },
  methods:{
      selectInput(e){
          $('.select-box').find('dd').slideUp()
          if($(e.currentTarget).siblings('dd').is(':hidden')){
              $(e.currentTarget).siblings('dd').slideToggle()
          }          
      },
      checkbox(e){
          let valueAll = [];
          let textAll = '';
          if(this.multi){
            $(e.currentTarget).toggleClass('checkbox')
            $(e.currentTarget).parent().find('.checkbox').each(function(){
                valueAll.push($(this).data("value"))
                textAll+=$(this).text()+','        
            })
          }else{
            $(e.currentTarget).addClass('checkbox').siblings().removeClass('checkbox')
            valueAll = $(e.currentTarget).data("value")
            textAll = $(e.currentTarget).text()
            $('.select-box').find('dd').slideUp()
          }
          this.valueArray = valueAll
          this.valueText = textAll
          
      }
  },
  watch:{
      valueArray:function(){
          let valueArray = {}
          if(Array.isArray(this.valueArray)){
            valueArray[this.name] = this.valueArray.join(",")
          }else{
            valueArray[this.name]=this.valueArray
          }
          this.$emit('selectValue',valueArray)
      }
  }
};
</script>

<style scoped>
.select-box{
    position: relative;
    display:inline-block;
    width: 100%;    
}
.select-box dt{ 
    height:35px;
    color:#666;
    line-height: 35px;
    padding: 0 20px 0 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
    border:1px solid #e5e5e5;
    background:#fff url(/static/images/select_icon.jpg) no-repeat right center;
}
.select-box dd{
    position: absolute;
    top:35px;    
    width:100%;
    color:#666666;    
    line-height: 40px;
    background:#fff;
    display: none;
    z-index: 9;
}
.select-box dd div{
    padding:0 10px;  
    display: flex;
    align-items: center;
    cursor: pointer;
    transition:all .3s;
    background: #fff
}
.select-box dd div:hover{
    background:#f1f1f1;
}
.select-box dd div.checkbox{
    background:#f1f1f1;
}
.select-box.multi-select dd div.checkbox{
    background:none;
}
.select-box.multi-select dd div:hover{
    background:#f1f1f1;
}
.select-box dd div span{
    display: none;
    float: left;   
    margin-right:10px;
    width:18px;
    height:18px;
    background:url(/static/images/checkbox.png) no-repeat left bottom;
    background-size:100% auto;
    flex-shrink:0;
}
.select-box.multi-select dd div span{
    display: block;
}
.select-box dd div p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.select-box dd div.checkbox span{
    background:url(/static/images/checkbox.png) no-repeat left top;
    background-size:100% auto;
}
</style>
