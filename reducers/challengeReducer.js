import { ActionSheet } from 'native-base';
import   {CREATE_CHALLENGE,CREATE_CHALLENGE_SUCCESS, CREATE_CHALLENGE_FAILUARE,GET_CURRENT_CHALLENGE,
    GET_CURRENT_CHALLENGE_SUCCESS,GET_CURRENT_CHALLENGE_FAILUARE, INVITE, INVITE_SUCCESS, INVITE_FAILUARE,
    GET_PENDING_CHALLENGE, GET_PENDING_CHALLENGE_SUCCESS, GET_PENDING_CHALLENGE_FAILUARE, GET_HISTORY_CHALLENGE,
    GET_HISTORY_CHALLENGE_SUCCESS,GET_HISTORY_CHALLENGE_FAILUARE, SET_DENY, SET_DENY_SUCCESS, 
    SET_DENY_FAILUARE, SET_ACCEPT, SET_ACCEPT_SUCCESS, SET_ACCEPT_FAILUARE, GET_CONNECTED_FRIEND, GET_CONNECTED_FRIEND_SUCCESS, GET_CONNECTED_FRIEND_FAILUARE, GET_JOINED_FRIEND, GET_JOINED_FRIEND_SUCCESS, GET_JOINED_FRIEND_FAILUARE, GET_PENDING_FRIEND, GET_PENDING_FRIEND_SUCCESS, GET_PENDING_FRIEND_FAILUARE, ADDCOMPLETE_RECORD, ADDCOMPLETE_RECORD_SUCCESS, ADDCOMPLETE_RECORD_FAILUARE, SET_CHALLENGEID, RESEND_REQUEST, RESEND_REQUEST_SUCCESS, RESEND_REQUEST_FAILUARE, SET_CONTACT, GETSUBCATE_OBJ, GETSUBCATE_OBJ_SUCCESS, GET_CHALLENGE_DETAIL, GET_CHALLENGE_DETAIL_SUCCESS, GET_CHALLENGE_DETAIL_FAILUARE
} from '../constant';
const initialState = {
	challengeLoading:false,
    invitation_sent:false,
    challengeError:null,
    createChallenge:false,
    currentChallenges:null,
    pendingChallenges:null,
    hisoryChallenges:null,
    pendingChange:false,
    connectedFriend:null,
    joinedFriend:null,
    pendingFriend:null,
    completeChallenge:null,
    challenge_id:null,
    resendRequest:null,
    contact:null,
    subCategoryDeatail:{},
    challenge_detail:{},
    errorMessage:null
}
const challengeReducer = (state = initialState, action) => {
	
	switch(action.type) {
    case CREATE_CHALLENGE:
   // console.log('challenge reducer iscalling')
        return {...state, challengeLoading:true,challengeError:null, createChallenge:false}
    
    case CREATE_CHALLENGE_SUCCESS:
       // console.log('challenge reducer iscalling in succes', action.payload)
        return {...state, challengeLoading:false,challengeError:null, createChallenge:true, challenge_id:action.payload.id}
    case CREATE_CHALLENGE_FAILUARE:
       // console.log('challenge reducer iscalling in fail' )
        return {...state, challengeLoading:false,challengeError:true, createChallenge:false}
    
    case GET_CURRENT_CHALLENGE:
  //  console.log('GET CURRENT CHALLENGE IS CALLING')
        return {...state, challengeLoading:true,challengeError:null, currentChallenges:null}
    
    case GET_CURRENT_CHALLENGE_SUCCESS:
      //  console.log('get challenge iscalling in succes' )
        return {...state, challengeLoading:false,challengeError:null, currentChallenges:action.payload}
    case GET_CURRENT_CHALLENGE_FAILUARE:
      //  console.log('get challenge iscalling in fail' )
        return {...state, challengeLoading:false,challengeError:true, currentChallenges:null}
    case GET_PENDING_CHALLENGE:
   // console.log('GET pending CHALLENGE IS CALLING')
        return {...state, challengeLoading:true,challengeError:null, pendingChallenges:null}
    
    case GET_PENDING_CHALLENGE_SUCCESS:
      //  console.log('GET pending CHALLENGE success IS CALLING',action.payload)
        return {...state, challengeLoading:false,challengeError:null, pendingChallenges:action.payload}
    case GET_PENDING_CHALLENGE_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true, pendingChallenges:null}
    case GET_HISTORY_CHALLENGE:
  //  console.log('GET CURRENT CHALLENGE IS CALLING')
        return {...state, challengeLoading:true,challengeError:null, hisoryChallenges:null}
    
    case GET_HISTORY_CHALLENGE_SUCCESS:
    //    console.log('GET CURRENT CHALLENGE IS success')
        return {...state, challengeLoading:false,challengeError:null, hisoryChallenges:action.payload}
    case GET_HISTORY_CHALLENGE_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true, hisoryChallenges:null}
    case SET_DENY:
    //console.log('GET CURRENT CHALLENGE IS CALLING')
        return {...state, challengeLoading:true,challengeError:null, pendingChange:false}
    
    case SET_DENY_SUCCESS:
        
        return {...state, challengeLoading:false,challengeError:null,pendingChange:true }
    case SET_DENY_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true,pendingChange:false }
    case SET_ACCEPT:
   // console.log('GET CURRENT CHALLENGE IS CALLING')
        return {...state, challengeLoading:true,challengeError:null, pendingChange:false}
    
    case SET_ACCEPT_SUCCESS:
        
        return {...state, challengeLoading:false,challengeError:null,pendingChange:true }
    case SET_ACCEPT_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true,pendingChange:false }
    case INVITE:
        
        return {...state, challengeLoading:true,challengeError:null, invitation_sent:false,errorMessage:null}
        
    case INVITE_SUCCESS:
       // console.log('invite succes is calling')
        return {...state, challengeLoading:false,challengeError:null, invitation_sent:true,errorMessage:null}
    case INVITE_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true, invitation_sent:false,errorMessage:action.payload}
    case GET_CONNECTED_FRIEND:
    
        return {...state, challengeLoading:true,challengeError:null, connectedFriend:null}
        
    case GET_CONNECTED_FRIEND_SUCCESS:
       console.log('invite succes is calling', action.payload)
        return {...state, challengeLoading:false,challengeError:null, connectedFriend:action.payload}
    case GET_CONNECTED_FRIEND_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:null, connectedFriend:null}
    case GET_JOINED_FRIEND:

        return {...state, challengeLoading:true,challengeError:null, joinedFriend:null}
        
    case GET_JOINED_FRIEND_SUCCESS:
      //  console.log('invite succes is calling')
        return {...state, challengeLoading:false,challengeError:null, joinedFriend:action.payload}
    case GET_JOINED_FRIEND_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true, joinedFriend:null}
    case GET_PENDING_FRIEND:

    return {...state, challengeLoading:true,challengeError:null, pendingFriend:null}
    
    case GET_PENDING_FRIEND_SUCCESS:
     //   console.log('invite succes is calling',action.payload)
        return {...state, challengeLoading:false,challengeError:null, pendingFriend:action.payload}
    case GET_PENDING_FRIEND_FAILUARE:
      //  console.log('invite fail is calling',action.payload)
        return {...state, challengeLoading:false,challengeError:true, pendingFriend:null}
    case ADDCOMPLETE_RECORD:

        return {...state, challengeLoading:true,challengeError:null, completeChallenge:null}
        
    case ADDCOMPLETE_RECORD_SUCCESS:
     //   console.log('add succes record')
        return {...state, challengeLoading:false,challengeError:null, completeChallenge:true}
    case ADDCOMPLETE_RECORD_FAILUARE:
    
        return {...state, challengeLoading:false,challengeError:true, completeChallenge:false}
    case SET_CHALLENGEID:
    
        return {...state, challengeLoading:false,challengeError:true, challenge_id:action.payload}
    case RESEND_REQUEST:
   // console.log('add succes record')
        return {...state, challengeLoading:false,challengeError:null, resendRequest:null}
    case RESEND_REQUEST_SUCCESS:
   // console.log('resend request succes reducer')
        return {...state, challengeLoading:false,challengeError:false, resendRequest:true}
    case RESEND_REQUEST_FAILUARE:
      //  console.log('resend request fail reducer')
        return {...state, challengeLoading:false,challengeError:true, resendRequest:false}
    case GETSUBCATE_OBJ:
       
        return {...state, challengeLoading:false,challengeError:null, subCategoryDeatail:{}}
    case GETSUBCATE_OBJ_SUCCESS:
    
        return {...state, challengeLoading:false,challengeError:false, subCategoryDeatail:action.payload}
    case GETSUBCATE_OBJ_SUCCESS:
        
        return {...state, challengeLoading:false,challengeError:true, subCategoryDeatail:{}}
    case GET_CHALLENGE_DETAIL:
    
        return {...state, challengeLoading:false,challengeError:null, challenge_detail:{}}
    case GET_CHALLENGE_DETAIL_SUCCESS:
    
        return {...state, challengeLoading:false,challengeError:false, challenge_detail:action.payload}
    case GET_CHALLENGE_DETAIL_FAILUARE:
        
        return {...state, challengeLoading:false,challengeError:true, challenge_detail:{}}
    case SET_CONTACT:
      //  console.log('resend request fail reducer')
        return {...state, challengeLoading:false,challengeError:false, contact:action.payload}
    default:

        return state;
        }
    }
    
export default challengeReducer;