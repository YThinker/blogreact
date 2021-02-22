let defaultState = {
    token: '',
    userInfo: {},
};

const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return {...state,token:action.token};
        case 'SET_USERINFO':
            return {...state, userInfo: {...action.userInfo}};
        default:
            return state;
    }
}

export default reducer;