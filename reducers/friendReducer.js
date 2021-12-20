import { GET_CHALLENGE_DETAIL, GET_USERLIST, GET_USERLIST_FAILUARE, GET_USERLIST_SUCCESS } from "../constant"

const initialState = {
	friendLoading:false,
    userList:[],
    friendError:null
}

const friendReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_USERLIST:
            return {...state, friendLoading:true,userList:[],friendError:null}

        case GET_USERLIST_SUCCESS:
            return {...state, friendLoading:false,userList:action.payload,friendError:null}
        
        case GET_USERLIST_FAILUARE:
            return {...state, friendLoading:false,userList:[],friendError:action.payload}
        
        default:
	
	    return state;
    }
}
export default friendReducer;