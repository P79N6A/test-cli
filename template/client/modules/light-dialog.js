let state = {
    message:'',
    limit: 2 * 1000,
    isShow:false,
    handle: null
};

let mutations = {
    showLight: (state , message)=>{
        state.message = message;
        state.isShow = true;
    },
    hideLight:(state)=>{
        state.message = '';
        state.isShow = false;
    },
    setHandle: (state , handle) => state.handle = handle
};
let actions = {
    showLight({commit , state} , message){
        if ( state.handle ){
            clearTimeout(state.handle);
            commit('setHandle' , null);
        }
        commit('showLight' , message);
        return new Promise((resolve , reject)=>{
            let handle = setTimeout(()=>{
                return resolve(true);
            } , state.limit);
            commit('setHandle' , handle);
        }).then(()=>commit('hideLight'));
    }
};

export default {state , mutations , actions};
