export function searchData(state = "",action){
    switch(action.type){
        case "SEARCHED":
            state = action.payload;
            return state;
        default :
            return state;
    }
}