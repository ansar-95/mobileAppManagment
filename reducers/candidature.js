const INITIAL_STATE = []

const candidature = (state = [], action) => {
    switch(action.type){
        case "SET_CANDIDATURE":
            return [
                ...state,
                action.payload
            ];
        case "RESET_CANDIDATURE":{
            return INITIAL_STATE
        }


        default:
            return state
    }
}

export default candidature;