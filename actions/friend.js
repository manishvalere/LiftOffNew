import { ACTION_REQUEST, GET_REQUEST, GET_USERLIST, INVITE_USER ,TOKENEXPIRE} from "../constant";
import colors from "../constant/colors";
import { getHeaders, getRefreshtoken, login, logout } from './authantication';
import axios from 'axios';
export function getUserList(jwt){
   // console.log('getUserList action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: GET_USERLIST });
      axios({
        method: 'POST',
        url: colors.baseURL + 'auth/get-user-list',
        headers: getHeaders(jwt),
        // data: {
        //  token:token
        // }
      })
  
      .then((response) => {
  console.log('response in user list', response.data)
        if(response.data.status == 200) {
         // console.log('response in login', response.data)
          dispatch({ type: GET_USERLIST + '_SUCCESS', payload: response.data.data  })
        
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_USERLIST + '_FAILUARE',payload:response.message})
        
      }else if(response.data.status == 401){
        //console.log('response in login 401', response.error)
        dispatch({type: GET_USERLIST + '_FAILUARE',payload:response.message})
      }else
        if(response.data.status == 422){ 
          dispatch({type: GET_USERLIST + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
         //   console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: GET_USERLIST + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: GET_USERLIST + '_FAILUARE', payload: error})
      });
    }
  }
  export function inviteUser(jwt,item){
    console.log('getUserList action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: INVITE_USER });
      axios({
        method: 'POST',
        url: colors.baseURL + 'auth/request_friend_connection',
        headers: getHeaders(jwt),
        data: {
          receiver_user_mob_no:item.number,
          connection_type:!item.connect ? 'invite' : 'connect'
        }
      })
  
      .then((response) => {
  //console.log('response in user list',response.data.message)
        if(response.data.status == 200) {
         // console.log('response in login', response.data)
          dispatch({ type: INVITE_USER + '_SUCCESS', payload: response.data.message  })
        
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: INVITE_USER + '_FAILUARE',payload:response.data.message})
        
      }else if(response.data.status == 401){
        //console.log('response in login 401', response.error)
        dispatch({type: INVITE_USER + '_FAILUARE',payload:response.data.message})
      }else
        if(response.data.status == 422){ 
          dispatch({type: INVITE_USER + '_FAILUARE',payload:response.data.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
            console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: INVITE_USER + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: INVITE_USER + '_FAILUARE', payload: error})
      });
    }
  }
  export function getFriendRequest(jwt,item){
    console.log('getUserList action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: GET_REQUEST });
      axios({
        method: 'POST',
        url: colors.baseURL + 'auth/pending_request_connection',
        headers: getHeaders(jwt),
        // data: {
        //   receiver_user_mob_no:item.number,
        //   connection_type:!item.connect ? 'invite' : 'connect'
        // }
      })
  
      .then((response) => {
  console.log('response in friend request',response.data.data)
        if(response.data.status == 200) {
         // console.log('response in login', response.data)
          dispatch({ type: GET_REQUEST + '_SUCCESS', payload: response.data.data  })
        
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_REQUEST + '_FAILUARE',payload:response.data.message})
        
      }else if(response.data.status == 401){
        //console.log('response in login 401', response.error)
        dispatch({type: GET_REQUEST + '_FAILUARE',payload:response.data.message})
      }else
        if(response.data.status == 422){ 
          dispatch({type: GET_REQUEST + '_FAILUARE',payload:response.data.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
            console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: GET_REQUEST + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: GET_REQUEST + '_FAILUARE', payload: error})
      });
    }
  }
  export function actionOnRequest(type,jwt,id){
    console.log('getUserList action is calling action is calling', type, id)
    return (dispatch, getState) => {
      dispatch({ type:  ACTION_REQUEST});
      axios({
        method: 'POST',
        url: colors.baseURL + 'auth/accept_connection',
        headers: getHeaders(jwt),
        data: {
          receiver_user_status:type,
          invite_ID:id
        }
      })
  
      .then((response) => {
  console.log('response at action',response.data)
        if(response.data.status == 200) {
         // console.log('response in login', response.data)
          dispatch({ type: ACTION_REQUEST + '_SUCCESS', payload: response.data.message  })
        
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: ACTION_REQUEST + '_FAILUARE',payload:response.data.message})
        
      }else if(response.data.status == 401){
        //console.log('response in login 401', response.error)
        dispatch({type: ACTION_REQUEST + '_FAILUARE',payload:response.data.message})
      }else
        if(response.data.status == 422){ 
          dispatch({type: ACTION_REQUEST + '_FAILUARE',payload:response.data.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
            console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: ACTION_REQUEST + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: ACTION_REQUEST + '_FAILUARE', payload: error})
      });
    }
  }