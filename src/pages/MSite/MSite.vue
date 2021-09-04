<template>
  <div class="msite">
    <!--首页头部 start-->
    <header-top :title="address.name">
      <router-link slot="left" to="/search" class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link slot="right" :to="userInfo._id ? '/userinfo': '/login'" class="header_login">
        <span class="header_login_text" v-if="!userInfo._id">
          登陆|注册
        </span>
        <span class="header_login_text" v-else>
           <i class="iconfont icon-person"></i>
        </span>
      </router-link>
    </header-top>
    <!--首页头部 end-->
    <!--首页导航 start-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorysArr.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(cs, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index2) in cs" :key="index2">
              <div class="food_container">
                <img :src="imgBaseUrl+c.image_url" alt="">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" v-else>
    </nav>
    <!--首页导航 end-->
    <!--首页附近商家 start-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <shop-list/>
    </div>
    <!--首页附近商家 end-->
  </div>
</template>
<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
export default {
  name: 'MSite',
  components: {
    HeaderTop,
    ShopList,
    Swiper
  },
  data () {
    return {
      imgBaseUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getShops')
  },
  computed: {
    ...mapState(['address', 'categorys', 'userInfo']),
    /*
    根据categorys一维数组生成一个2维数组
    小数组中的元素个数最大是8
     */
    categorysArr () {
      const max = 8
      // 准备空的2维数组
      const arr = []
      let smallArr = []
      const {categorys} = this
      // 遍历categorys
      categorys.forEach((c, index) => {
        // 如果smallArr是空的，将小数组保存到大数组中
        if (smallArr.length === 0) {
          arr.push(smallArr)
        }
        // 将当前分类保存到小数组中
        smallArr.push(c)
        // 如果小数组满了，将创建新的小数组
        if (smallArr.length === max) {
          smallArr = []
        }
      })
      return arr
    }
  },
  watch: {
    categorys (value) { // categorys数组中有数据了,在异步更新界面之前执行
      this.$nextTick(() => { // 一旦完成界面更新立即调用
        // 创建一个swiper实例对象，来实现轮播
        var swiper = new Swiper('.swiper-container', { // eslint-disable-line no-unused-vars
          loop: true, // 可以循环轮播
          pagination: { // 如果需要分页器
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.msite_nav
  border-border-1px(#e4e4e4)
  margin-top 45px
  height: 200px
  background: #fff
  .swiper-container
    width: 100%
    height: 100%
    .swiper-wrapper
      width: 100%
      height: 100%
      .swiper-slide
        display flex
        justify-content center
        align-items flex-start
        flex-wrap wrap
        .link_to_food
          width: 25%
          .food_container
            display block
            width: 100%
            text-align center
            padding-bottom 10px
            font-size 0
            img
              display inline-block
              width 50px
              height: 50px
          span
            display block
            width: 100%
            text-align center
            font-size 13px
            color #666
    .swiper-pagination
      >span.swiper-pagination-bullet-active
        background: #02a774
.msite_shop_list
  top-border-1px(#e4e4e4)
  margin-top:10px
  background: #fff
  .shop_header
    padding 10px 10px 0 10px
    .shop_icon
      margin-left:5px
      color #999
    .shop_header_title
      color #999
      font-size 14px
      line-height 20px
</style>
