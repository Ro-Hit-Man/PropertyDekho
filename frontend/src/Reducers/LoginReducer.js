export function isLogin(state = false,action){
    switch(action.type){
        case "LOGIN_TRUE":
            state = true;
            return state;
        case "LOGIN_FALSE":
            state = false;
            return state;
        default :
            return state;
    }
}