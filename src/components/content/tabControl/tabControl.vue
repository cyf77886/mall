<template>
  <div class="tabControl">
    <div v-for="(item ,index) in titles"
         class="tab-control-item"
    :class="{active:index === currentIndex}"
    @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    data(){
      return {
        currentIndex : 0
      }
    },
    props:{
      titles: {
        type: Array ,
        default() {
          return []
        }
      }
    },
    methods:{
      itemclick(index) {
        this.currentIndex = index;
        this.$emit('itemChange',index)
      }
    }
  }
</script>

<style scoped>
.tabControl{
  display: flex;
}
  .tab-control-item{
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: palevioletred;
  }
  .active span{
    border-bottom: 3px solid blue;
  }
</style>
