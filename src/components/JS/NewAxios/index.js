import axios from 'axios';
import Vue from 'vue';
function newAxios(info,params,cancel=''){
    var options = {
        method: 'get',
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1612757317494342145835009"}',
            'X-Host': `mall.film-ticket.${info}`    //info: city.list || film.list || film.info
        },
        baseURL: 'https://m.maizuo.com/gateway',
        params: params        
    }
    if(cancel.msg === 'true'){
        options.cancelToken = new axios.CancelToken(function(c){
            // cancel.this是需要进行拦截器的组件环境（this），由组件将其所有的this传入
            cancel.this.source = c;
        })
    }
    return axios(options).then(res => {
        if(res.data.msg === 'ok'){
            return res
        }
    })
}

export default {
    newAxios
}
