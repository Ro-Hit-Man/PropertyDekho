export function canPostProperty(state = false , action){
    switch(action.type){
        case "BUYER":
            state = true;
            return state;
        case "NOT_BUYER":
            state = false;
            return state;
        default :
            return state;
    }
}