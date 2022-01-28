import { GET_CHALLENGE_DETAIL, GET_REQUEST,ACTION_REQUEST_SUCCESS,ACTION_REQUEST_FAILUARE, GET_USERLIST, GET_USERLIST_FAILUARE, GET_USERLIST_SUCCESS, INVITE_USER, INVITE_USER_FAILUARE, INVITE_USER_SUCCESS ,GET_REQUEST_SUCCESS, ACTION_REQUEST} from "../constant"

const initialState = {
	friendLoading:false,
    userList:[],
    friendError:null, 
    message:'',
    friend_request:[], 
    change:false
}

const friendReducer = (state = initialState, action)=>{
    switch(action.type){
        case GET_USERLIST:
            return {...state, friendLoading:true,userList:[],friendError:null}

        case GET_USERLIST_SUCCESS:
            return {...state, friendLoading:false,userList:action.payload,friendError:null}
        
        case GET_USERLIST_FAILUARE:
            return {...state, friendLoading:false,userList:[],friendError:action.payload}
        case INVITE_USER:
            return {...state, friendLoading:true,message:'',friendError:null,change:false}

        case INVITE_USER_SUCCESS:
            return {...state, friendLoading:false,message:action.payload,friendError:null,change:true}
        
        case INVITE_USER_FAILUARE:
            return {...state, friendLoading:false,message:action.payload,friendError:action.payload,change:false}
        case GET_REQUEST:
            return {...state, friendLoading:true,message:'',friendError:null,friend_request:[]}

        case GET_REQUEST_SUCCESS:
            return {...state, friendLoading:false,friendError:null,friend_request:action.payload}
        
        case GET_USERLIST_FAILUARE:
            return {...state, friendLoading:false,message:action.payload,friendError:action.payload,friend_request:[]}
        case ACTION_REQUEST:
            return {...state, friendLoading:true,message:'',friendError:null,}

        case ACTION_REQUEST_SUCCESS:
            return {...state, friendLoading:false,friendError:null,message:action.payload}
        
        case ACTION_REQUEST_FAILUARE:
            return {...state, friendLoading:false,message:action.payload,friendError:action.payload}
        
        default:
	
	    return state;
    }
}
export default friendReducer;