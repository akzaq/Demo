const state = {
    name: sessionStorage.getItem('city') || '北京' ,
    cityId: sessionStorage.getItem('cityId') || 110100
};

const actions = {

};

const mutations = {
    city_info(state, payload){
        state.name = payload.name;
        state.cityId = payload.cityId;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}