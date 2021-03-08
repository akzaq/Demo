<template>
    <div class="movie_body">
        <Loading v-if='isLoading'></Loading>
        <Scroll v-else :handleToScroll='handleToScroll' :handleToTouchEnd='handleToTouchEnd'>
            <ul>
                <li class='pullMessage'>{{pullMessage}}</li>
                <li v-for='data in movieList' :key='data.filmId' @click="handleClick(data.filmId)">
                    <div class="pic_show"><img :src="data.poster" alt=""></div>
                    <div class="info_list">
                        <h2>{{data.name}}</h2>
                        <p>观众评<span class="grade">{{data.grade}}</span></p>
                        <p>主演：{{data.actors | getActors}}</p>
                        <p>{{data.nation}} | {{data.runtime}} 分钟</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
    name: 'Now',
    data(){
        return {
            movieList : null,
            pullMessage: '',
            isLoading: true,
            isChangeCityId: 0
        }
    },
    //被 keep-alive 缓存的组件激活时调用。
    activated(){
        //只在页面初始渲染时选择城市定位
        var cityId = sessionStorage.getItem('cityId'); 
        if(cityId === null){
            setTimeout(() => {
                MessageBox({
                    title: '定位',
                    message: '北京',
                    showCancelButton: true,
                    cancelButtonText: '切换定位'
                }).then(res => {
                    if(res === 'cancel'){
                    this.$router.push('city');
                    }
                })
            },1000)
        }       
        //判断session中有没有存储cityId，没有则将将北京作为默认城市，存入session中
        if(!cityId){
            sessionStorage.setItem('cityId',110100);
            sessionStorage.setItem('name','北京');
        }
        //在此前cityId的值为null，必须重新赋值
        cityId = sessionStorage.getItem('cityId'); 
        // 将isChangeCityId与session中的cityId对比，不一致代表切换城市，进行axios请求
        if(this.isChangeCityId === cityId){
            
            return 
        }else{
            this.isLoading = true;
            this.newAxios.newAxios('film.list',{
                cityId: cityId,
                pageNum: 1,
                pageSize: 10,
                type: 1
            }).then(res => {
                this.movieList = res.data.data.films;
                this.isLoading = false;
                this.isChangeCityId = cityId;
            })
        }
    },
    methods: {
        handleClick(id){
            this.$router.push(`/detail/${id}`)
        },
        handleToScroll(pos){
            if(pos.y > 30){
                this.pullMessage = '正在更新中...'
            }
        },
        handleToTouchEnd(pos){
            // 下拉更新
            if(pos.y > 30){
                this.newAxios.newAxios('film.list',{
                    cityId: this.isChangeCityId,
                    pageNum: 1,
                    pageSize: 10,
                    type: 1
                }).then(res => {
                    this.pullMessage ='更新成功';
                    setTimeout(() => {
                        this.movieList = res.data.data.films;
                        this.pullMessage = '';
                    },500) 
                }) 
            }
        }
    }
}
</script>
<style scoped>
#content .movie_body { flex: 1; overflow: auto;}
.movie_body ul { margin: 0 12px; overflow: hidden;}
.movie_body ul li { margin-top:12px; display: flex; align-items: center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pullMessage { margin: 0px; padding: 0px; justify-content: center;}

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