<template>
   <div class="wrapper" ref="wrapper">
       <div>
           <slot></slot>
       </div>
   </div>
</template>

<script>
    import BScroll from "better-scroll"
    export default {
        name: "Scroll",
        props: {
            probeType: {
                type : Number,
                default: 0
            },
          data: {
            type: Array,
            default: () => {
              return []
            }
          },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll : null
            }
        },
        mounted() {
            //1、创建BScroll对象
          if (!this.$refs.wrapper) return
            this.scroll = new BScroll('.wrapper',{
                click:true,
                probeType:this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            //2、监听滚动位置
            this.scroll.on('scroll',(position)=> {
                // console.log(position);
                this.$emit('scroll',position)
            })
            //3、监听上拉事件
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            })


        },
        methods: {
            scrollTo(x,y,time=300) {
               this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
              // console.log('......123124wr');
            },
            scrollY(){
              return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>
    /*.wrapper{*/
    /*    position: fixed;*/
    /*    top: 44px;*/
    /*    bottom:49px ;*/
    /*}*/
</style>