export function UserData(state = "",action){
    switch(action.type){
        case "LOGGEDIN":
            state = action.payload;
            return state
        case "LOGGEDOUT" :
            state = "";
            return state;
        default :
            return state;
    }
}