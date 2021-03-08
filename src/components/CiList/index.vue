<template>
    <div class="cinema_body">
        <Loading v-if='isLoading'></Loading>
        <Scroll v-else>
            <ul>
                <li v-for='data in cinemaList' :key='data.cinemaId'>
                    <div>
                        <span>{{data.name}}</span>
                        <span class="q"><span class="price">{{data.lowPrice/100}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{data.address}}</span>
                        <span>1763.5km</span>
                    </div>
                    <div class='card'>
                        <div>小吃</div>
                        <div>折扣卡</div>
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</template>
<script>
export default {
    name: 'CiList',
    data(){
        return{
            cinemaList: null,
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
        this.newAxios.newAxios('cinema.list',{
            cityId: cityId,
            ticketFlag: 1
        }).then(res => {
            this.cinemaList = res.data.data.cinemas;
            this.isLoading = false;
            this.isChangeCityId = cityId;
        })
    }
}
</script>
<style scoped>
#content .cinema_body { flex: 1; overflow: auto;}
.cinema_body ul { padding: 20px;}
.cinema_body li { border-bottom: 1px solid #e6e6e6; margin-bottom: 20px; }
.cinema_body div { margin-bottom: 10px; }
.cinema_body div { position: relative; }
.cinema_body .q { font-size: 11px; color: #f03d37; position: absolute; left: 80%; }
.cinema_body .price { font-size: 18px;}
.cinema_body .address { font-size: 13px; color: #666;}
.cinema_body .address span:nth-of-type(2) { float: right;}
.cinema_body .card { display: flex;}
.cinema_body .card div { padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or { color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl { color: #589daf; border: 1px solid #589daf;}
</style>