<template>
    <div class="movie_body">
        <Loading v-if='isLoading'></Loading>
        <Scroll v-else>
            <ul>
                <li v-for='data in comingList' :key='data.filmId' @click="handleClick(data.filmId)">
                    <div class="pic_show"><img :src="data.poster" alt=""></div>
                    <div class="info_list">
                        <h2>{{data.name}}</h2>
                        <p>观众评<span class="person"></span>人想看</p>
                        <p>主演：{{data.actors | getActors}}</p>
                        <p>上映日期：{{data.premiereAt}}</p>
                    </div>
                    <div class="btn_pre">
                        预售
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</template>
<script>
export default {
     name: 'Coming',
     data(){
         return {
             comingList: null,
             isLoading: true,
             isChangeCityId: 0
         }
     },
     activated(){
         var cityId = sessionStorage.getItem('cityId');  
        if(this.isChangeCityId === cityId){
            return 
        }
        this.isLoading = true;
        this.newAxios.newAxios('film.list',{
            cityId: cityId,
            pageNum: 1,
            pageSize: 10,
            type: 2
        }).then(res => {
            // console.log(res)
            this.comingList = res.data.data.films;
            this.isLoading = false;
            this.isChangeCityId = cityId;
        })  
     },
     methods: {
         handleClick(id){
            this.$router.push(`/detail/${id}`)
        }
     }
}
</script>
<style scoped>
#content .movie_body { flex: 1; overflow: auto;}
.movie_body ul { margin: 0 12px; overflow: hidden;}
.movie_body ul li { margin-top:12px; display: flex; align-items: center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show { width: 64px; height:90px;}
.movie_body .pic_show img { width: 100%;}
.movie_body .info_list { margin-left:10px; flex: 1px; position: relative;}
.movie_body .info_list h2 { font-size: 17px; line-height: 24px; width: 150px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.movie_body .info_list p { font-size: 13px; color: #666; line-height: 22px; width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.movie_body .info_list .grade { font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img { width: 50px; position: absolute; right: 10px; top: 5px;}
.movie_body .btn_mall, .movie_body .btn_pre { width: 47px; height:27px; line-height: 28px; text-align: center; background-color:#f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre { background-color: #3c9fe6;}
</style>