<template>
    <div class="city_body">
        <Loading v-if='isLoading'></Loading>
        <Scroll v-else>
            <div>
                <div class="city_list">
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for='data in hotCities' :key='data.cityId' @click='handleClick(data.name,data.cityId)'>{{data.name}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for='(data,index) in citiesList' :key='index'>
                            <h2>{{index}}</h2>
                            <ul>
                                <li v-for='city in data' :key='city.cityId' @click='handleClick(city.name,city.cityId)'>
                                    {{city.name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="city_index">
                    <ul>
                        <li v-for='(data,index,val) in citiesList' :key='index' @touchstart='handleToIndex(val)'>
                            {{index}}
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>
</template>
<script>
export default {
    name: 'City',
    data(){
        return {
            citiesList: {},
            hotCities: [],
            isLoading: true
        }
    },
    mounted(){
        var cityList = sessionStorage.getItem('cityList');
        var hotList = sessionStorage.getItem('hotList');
        //若session中有储存的数据，则取出渲染，若没有则进行axios请求
        if(cityList && hotList){
            this.citiesList = JSON.parse(cityList);
            this.hotCities = JSON.parse(hotList);
            this.isLoading = false;
        }else{
            this.newAxios.newAxios('city.list').then(res => {
                // console.log(res.data.data.cities)
                this.isLoading = false;
                // citiesList = {obj}
                this.citiesList = this.getNewList(res.data.data.cities).List;
                // hotCities = [obj]
                this.hotCities = this.getNewList(res.data.data.cities).Hot; 

                //将数据储存到session中，由于session存储类型为字符串，为了不破坏数据通过JSON转换
                sessionStorage.setItem('cityList',JSON.stringify(this.citiesList));
                sessionStorage.setItem('hotList',JSON.stringify(this.hotCities));
            })
        }   
    },
    methods: {
        getNewList(data){

            var list = {};  //储存所有城市
            var hot = [];   //储存热门城市
            var newList = {};
            for(var i = 65; i < 91; i++){
                var index = String.fromCharCode(i);
                var city1 = null;          
                city1 = data.filter(item => item.pinyin.substring(0,1).toUpperCase() === index)
                if(city1.length > 0){
                   list[index] = city1
                }         
            }
            var city2 = null; 
            city2 = data.filter(item => item.isHot === 1)  
            hot = city2
            newList.List = list
            newList.Hot = hot
            return newList
        },
        handleToIndex(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2')
            this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
        },
        handleClick(name,id){
            
            this.$store.commit('city/city_info',{name,id});
            sessionStorage.setItem('city',name);
            sessionStorage.setItem('cityId',id);
            this.$router.push('/movie/now');
        }
    }
}
</script>

<style scoped>
#content .city_body { margin-top: 45px; display: flex; width: 100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list { flex: 1; overflow: auto; background: #fff5f0;}
.city_body .city_list::-webkit-scrollbar { background-color: transparent; width: 0;}
.city_body .city_hot { margin-top: 20px;}
.city_body .city_hot h2 { padding-left: 15px; line-height: 30px; font-size: 14px; background: #f0f0f0; font-weight: normal;}
.city_body .city_hot ul li { float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box; }
.city_body .city_sort div { margin-top: 20px;}
.city_body .city_sort h2 { margin-left: 15px; line-height: 30px; font-size: 14px; background: #f0f0f0; font-weight: normal;}
.city_body .city_sort ul { padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li { line-height: 30px;}
.city_body .city_index { width: 20px; display: flex; flex-direction: column; justify-content: center; text-align: center; border-left: 1px solid #e6e6e6; }


</style>