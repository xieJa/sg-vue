<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted:function(){
    $('body').click(function(){console.log(1)})
  }
}
</script>
