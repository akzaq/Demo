<template>
    <div>
      <div class="head">
        <div class="back" @click="handleClick">返回</div>
      </div>
      <Loading v-if='isLoading'></Loading>
      <div v-else>
        <div v-if='dataInfo' class='detail'>
            <figure >
                <img :src="dataInfo.poster" alt="" class='poster'>
            </figure>
            <div>
                <h3>{{dataInfo.name}}</h3>
                <br>
                <p>{{dataInfo.category}}</p>
                <p>{{dataInfo.nation}} | {{dataInfo.runtime}}分钟</p>
            </div>
            <br>
            <div>{{dataInfo.synopsis}}</div>
            <div class='footer'>
                <h3>演职人员</h3>
                <detailswiper perview='4' myclass='actorsswiper' :key='dataInfo.length' class='actorsswiper'>
                  <div class='swiper-slide' v-for='(data,index) in dataInfo.actors' :key='index' >
                    <figure>
                      <img :src='data.avatarAddress' class='actorImg'>
                    </figure>
                    <p>{{data.name}}</p>
                    <p>{{data.role}}</p>
                  </div>
                </detailswiper>
                <h3>剧照</h3>
                <detailswiper perview='3' myclass='photoswiper' :key='dataInfo.length' class='photoswiper'>
                  <div class='swiper-slide' v-for='(data,index) in dataInfo.photos' :key='index'>
                    <img :src="data" class='photoImg'>
                  </div>
                </detailswiper>
            </div>
        </div>
      </div>
    </div>
</template>
<script>

import detailswiper from './detailBanner'

export default {
  components: {
    detailswiper,

  },
  data () {
    return {
      dataInfo: null, // 解决初始渲染报dataInfo
      isLoading: true
    }
  },
  activated () {
    this.isLoading = true;
    //匹配路由，进行axios请求
    var filmId = this.$route.params.id;
    this.newAxios.newAxios('film.info',{
        filmId: filmId
    }).then(res => {
        this.dataInfo = res.data.data.film;
        this.isLoading = false;
    })
  },
  methods: {
    handleClick(){
      //通过this.$router.back()返回前一页
      this.$router.back()
    }
  }
}   
</script>

<style lang='scss' scoped>
.head{
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background:#e54847;
  .back {
    font-size: 18px;
    padding-left: 10px;
  }
}
.detail {
  :not(figure,img) {
    margin: 5px;
  }
  margin-top: 50px;
  .footer {
    margin-top: 20px;
  }
}
  figure{
    height: 300px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-around;
    background: rgba(#ccc,0.55);
    .poster {
        width: 100%;
    }
  }
  .actorsswiper {
    .swiper-slide {
    figure {
      width: 85px;
      height: 85px;
      position: relative;
      display: flex;
      .actorImg{
        width:100%;
        position: absolute;
        top: -20%;
      }
    }
    p {
      font-size: 12px;
      text-align: center;
      margin-left:-15px;
    }

    }
  }
  .photoswiper{
    .swiper-slide{
      display: flex;
      width: 150px;
      height: 85px;
      .photoImg{
      width: 150px;
      }
    }

  }

</style>