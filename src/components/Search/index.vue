<template>
    <div  id="search_body" class="search_body">
        <div class="search_input">
            <div class="search_input_wrapper">
                <i class="icongont iconsousuo"></i>
                <input type="text" v-model='message'>
            </div>
        </div>
        <div class="search_result">
            <h3>电影/电视/综艺</h3>
            <ul>
                <li v-for='data in movieList' :key='data.filmId'>
                    <div class="img"><img :src="data.poster" alt=""></div>
                    <div class="info">
                        <p><span>{{data.name}}</span><span>{{data.grade}} 分</span></p>
                        <p>主演：{{data.actors | getActors}}</p>
                        <p>{{data.category}}</p>
                        <p>{{data.nation}} | {{data.runtime}} 分钟</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Search',
    data(){
        return {
            message: '',
            movieList: []   
        }
    },
    methods: {
        getSearch(data,films){
            //通过匹配字段查询相应的电影名称
            var list = films.filter(item => item.name.match(data))
            return list
        },
        cancelRequest(){
            if(typeof this.source ==='function'){
                this.source('终止请求')
            }
        }
    },
    watch: {
        message(newVal){
            var cancel = {
                msg: 'true',
                this: this  //需要传入当前组件的this，才能激发拦截器
            }

            var cityId = sessionStorage.getItem('cityId');
            this.cancelRequest();
            
            this.newAxios.newAxios('film.list',{
                cityId: cityId,
                pageNum: 1,
                pageSize: 10,
                type: 1
            },cancel).then(res => {
                // console.log(res) 
                this.movieList = this.getSearch(newVal,res.data.data.films);
            }).catch(err => {
                if (this.axios.isCancel(err)) {
                    console.log('Rquest canceled', err.message); //请求如果被取消，这里是返回取消的message
                } else {
                    //handle error
                    console.log(err);
                }
            })
        }
    }
}
</script>
<style scoped>
#content .search_body { flex: 1; overflow: auto;}
.search_body .search_input { padding: 8px 10px; background: #f5f5f5; border-bottom: 1px solid #e5e5e5;}
/* 1 */
.search_body .search_input_wrapper { padding: 0 10px; border: 1px solid #e6e6e6; border-radius: 5px; background: #fff; display: flex; }
.search_body .search_input_wrapper i { font-size: 16px; padding: 4px 0;}
.search_body .search_input_wrapper input { border: none; font-size: 13px; color:#333; padding: 4px 0; outline: none; margin-left: 5px; width: 100%;}
.search_body .search_result h3 { font-size: 15px; color: #999; padding: 9px 15px; border-bottom: 1px solid #e6e6e6;}
.search_body .search_result li { border-bottom: 1px dashed #c9c9c9; padding: 10px 15px; box-sizing: border-box; display: flex;}
.search_body .search_result .img { width: 60px; float: left;}
.search_body .search_result .img img { width: 100%;}
.search_body .search_result .info { float: left; margin-left: 15px; flex: 1}
.search_body .search_result .info p { height: 22px; display: flex; line-height: 22px; font-size: 12px;overflow: hidden; text-overflow: ellipsis;}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) { font-size: 18px; flex: 1;}
.search_body .search_result .info p:nth-of-type(1) spam:nth-of-type(2) { font-size: 16px; color: #fc7103;}


</style>