import { GET_COMPLETE_CHALLENGE, GET_COMPLETE_CHALLENGE_SUCCESS,GET_PERSONAL_BEST_FILTER,GET_PERSONAL_BEST_FILTER_SUCCESS ,GET_PERSONAL_BEST_FILTER_FAILUARE,GET_COMPLETE_CHALLENGE_FAILUARE, GET_PERSONAL_BEST, GET_PERSONAL_BEST_FAILUARE, GET_PERSONAL_BEST_SUCCESS, GET_LEADER, GET_LEADER_SUCCESS, GET_LEADER_FAILUARE, GET_GYM_PARTNER, GET_GYM_PARTNER_SUCCESS, GET_GYM_PARTNER_FAILUARE } from "../constant";

const initialState = {
	profileLoading:null,
    completedChallenge:[],
    challengeError:false,
    personal_best:null,
    personal_best_filter:null,
    leader:[],
    image_url:'',
    gym_partner:{}
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COMPLETE_CHALLENGE:
            return {...state, profileLoading:true,completedChallenge:[]}
        
        case GET_COMPLETE_CHALLENGE_SUCCESS:
            
            return {...state, profileLoading:false,completedChallenge:action.payload}

        case GET_COMPLETE_CHALLENGE_FAILUARE:
            return {...state, profileLoading:false,completedChallenge:[],challengeError:true}
        case GET_PERSONAL_BEST_FILTER:
            console.log('completyed challenge rucer init', action.payload)
            return {...state, profileLoading:true,personal_best_filter:null}
        
        case GET_PERSONAL_BEST_FILTER +'_SUCCESS':
            console.log('completyed challenge rucer', action.payload)
            return {...state, profileLoading:false,personal_best_filter:action.payload}

        case GET_PERSONAL_BEST_FILTER+'_FAILUARE':
          //  console.log('personal best record failuare reducer')
            return {...state, profileLoading:false,personal_best_filter:null}
        case GET_PERSONAL_BEST:
            return {...state, profileLoading:true,personal_best:null}
        
        case GET_PERSONAL_BEST_SUCCESS:
            
            return {...state, profileLoading:false,personal_best:action.payload}

        case GET_PERSONAL_BEST_FAILUARE:
          //  console.log('personal best record failuare reducer')
            return {...state, profileLoading:false,personal_best:null}
        case GET_LEADER:
            return {...state, profileLoading:true,leader:[], image_url:''}
        
        case GET_LEADER_SUCCESS:
            
            return {...state, profileLoading:false,leader:action.payload,image_url:action.image_url}

        case GET_LEADER_FAILUARE:
            //  console.log('personal best record failuare reducer')
            return {...state, profileLoading:false,leader:[], image_url:''}
        case GET_GYM_PARTNER:
            return {...state, profileLoading:true,gym_partner:{}}
        
        case GET_GYM_PARTNER_SUCCESS:
            
            return {...state, profileLoading:false,gym_partner:action.payload}

        case GET_GYM_PARTNER_FAILUARE:
            //  console.log('personal best record failuare reducer')
            return {...state, profileLoading:false,gym_partner:{}}
        default:

            return state;
            }
}
export default profileReducer;