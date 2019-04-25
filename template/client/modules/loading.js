let state = {
    isShow: false,
    index: 0
};

let mutations = {
    initLoading: state => { state.isShow = false ; state.index = 0;},
    showLoading: state => {state.isShow = true ; state.index += 1;},
    hideLoading: state => {
        state.index -= 1;
        if ( state.index <= 0 ){
            state.index = 0;
            state.isShow = false;
        }
    }
};

export default {state , mutations};
