import {} from '../constant';
import color from '../constant/colors'
import { getHeaders, getRefreshtoken, login, logout } from './authantication';
import axios from 'axios';
import   {CREATE_CHALLENGE,TOKENEXPIRE,GET_CURRENT_CHALLENGE,INVITE,GET_PENDING_CHALLENGE,GET_HISTORY_CHALLENGE,SET_DENY,SET_ACCEPT,GET_CONNECTED_FRIEND,GET_JOINED_FRIEND,GET_PENDING_FRIEND,ADDCOMPLETE_RECORD, SET_CHALLENGEID,RESEND_REQUEST,SET_CONTACT,GETSUBCATE_OBJ,GET_CHALLENGE_DETAIL} from '../constant';
export function createChallenge(id,type, description,jwt,date,SWR){
   // console.log('create challenge', SWR)
    return (dispatch, getState) => {
      dispatch({ type: CREATE_CHALLENGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/add-challenge',
       headers: getHeaders(jwt),
        data: {
          subcategory_id:id,
          description:JSON.stringify(description),
          exercise_type:type,
          exercise_date:date,
          swr:SWR
        }
      })
  
      .then((response) => {
     // console.log('response in at the time od sub', response.data)
        if(response.data.status == 200) {
        // console.log('action in if of 200')
          dispatch({ type: CREATE_CHALLENGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }
        if(response.data.status == 201) {
         // console.log('action in if of 201')
           dispatch({ type: CREATE_CHALLENGE + '_FAILUARE', payload: response.data.data, image_url:response.data.url })
         
         }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: CREATE_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: CREATE_CHALLENGE + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE , payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: CREATE_CHALLENGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: CREATE_CHALLENGE + '_FAILUARE', payload: error})
      });
    }
  }

  export function getCurrentChallenge(jwt){
  //  console.log('get current challenge is calling ')
    return (dispatch, getState) => {
      dispatch({ type: GET_CURRENT_CHALLENGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/challenge-list',
       headers: getHeaders(jwt),
        // data: {
          
          
        //   //exercise_type:type
        // }
      })
  
      .then((response) => {
    //  console.log('response in at the time current', response.data)
        if(response.data.status == 200) {
        // console.log('action in if of 200')
          dispatch({ type: GET_CURRENT_CHALLENGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_CURRENT_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_CURRENT_CHALLENGE + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE , payload: 'token_expire'})
          }

         
          
        }
        if(error.response.status == 404) {
        //  console.log('eroor in get current', error.response.status)
          dispatch({ type: GET_CURRENT_CHALLENGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_CURRENT_CHALLENGE + '_FAILUARE', payload: error})
      });
    }
  }
  export function getPendingChallenge(jwt){
  //  console.log('get pending challenge is calling ')
    return (dispatch, getState) => {
      dispatch({ type: GET_PENDING_CHALLENGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/pending-challenge',
       headers: getHeaders(jwt),
        // data: {
          
          
        //   //exercise_type:type
        // }
      })
  
      .then((response) => {
    //  console.log('response in at the time pending', response.data)
        if(response.data.status == 200) {
        // console.log('action in if of 200',response.data.data)
          dispatch({ type: GET_PENDING_CHALLENGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_PENDING_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_PENDING_CHALLENGE + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE , payload: 'token_expire'})
          }

         
          
        }
        if(error.response.status == 404) {
        //  console.log('eroor in get current', error.response.status)
          dispatch({ type: GET_PENDING_CHALLENGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_PENDING_CHALLENGE + '_FAILUARE', payload: error})
      });
    }
  }
  export function getHistoryChallenge(jwt){
   // console.log('get history challenge is calling ')
    return (dispatch, getState) => {
      dispatch({ type: GET_HISTORY_CHALLENGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/history-challenge',
       headers: getHeaders(jwt),
        // data: {
          
          
        //   //exercise_type:type
        // }
      })
  
      .then((response) => {
    //  console.log('response in at the timehistory', response.data.data)
        if(response.data.status == 200) {
       //  console.log('action in if of 200')
          dispatch({ type: GET_HISTORY_CHALLENGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_HISTORY_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_HISTORY_CHALLENGE + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE , payload: 'token_expire'})
          }

         
          
        }
        if(error.response.status == 404) {
        //  console.log('eroor in get current', error.response.status)
          dispatch({ type: GET_HISTORY_CHALLENGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_HISTORY_CHALLENGE + '_FAILUARE', payload: error})
      });
    }
  }
  export function getSubcategoryVideo(id){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
  //  / console.log('form in add fitness action ', form)
    return (dispatch, getState) => {
      dispatch({ type: GETSUBCATE_OBJ });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/getsubcategory',
      // headers: getHeaders(jwt),
        data: {
          subcategory_id:id
        }
      })  
  
      .then((response) => {
    //  console.log('response in login', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: GETSUBCATE_OBJ + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GETSUBCATE_OBJ + '_FAILUARE',payload:response.message})
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GETSUBCATE_OBJ + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GETSUBCATE_OBJ + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type:  'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: GETSUBCATE_OBJ + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GETSUBCATE_OBJ + '_FAILUARE', payload: error})
      });
    }
  }
  export function addCompleteChallnge(id, category_type,form , jwt){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
   console.log('form in add fitness action ', form)
    return (dispatch, getState) => {
      dispatch({ type: ADDCOMPLETE_RECORD });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/add-challengeexercise',
       headers: getHeaders(jwt),
        data: {
          challenge_id:id,
          exercise_type:category_type,
          description:JSON.stringify(form)
        }
      })
  
      .then((response) => {
      console.log('response in add complete', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: ADDCOMPLETE_RECORD + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: ADDCOMPLETE_RECORD + '_FAILUARE',payload:response.message})
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: ADDCOMPLETE_RECORD + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: ADDCOMPLETE_RECORD + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type:  'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: ADDCOMPLETE_RECORD + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: ADDCOMPLETE_RECORD + '_FAILUARE', payload: error})
      });
    }
  }
  export function setDenyChallenge(id, category_type,form , jwt){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
 //   console.log('form in add fitness action ', form)
    return (dispatch, getState) => {
      dispatch({ type: SET_DENY });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/add-fitnessrecords',
       headers: getHeaders(jwt),
        data: {
          subcategory_id:id,
          exercise_type:category_type,
        description:JSON.stringify(form)
        }
      })
  
      .then((response) => {
    //  console.log('response in login', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: SET_DENY + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: SET_DENY + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: SET_DENY + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: SET_DENY + '_FAILUARE', payload: error})
        }
        //console.log('error in catch',error);
        dispatch({ type: SET_DENY + '_FAILUARE', payload: error})
      });
    }
  }
  export function setAcceptChallenge(type, status , jwt){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
  ///  console.log('accept action is calling', status)
    return (dispatch, getState) => {
      dispatch({ type: SET_ACCEPT });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/accept-challenge',
       headers: getHeaders(jwt),
        data: {
          challenge_id:JSON.stringify(status),
          receiver_user_status:type
       // description:JSON.stringify(form)
        }
      })
  
      .then((response) => {
    //  console.log('response in login', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: SET_ACCEPT + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: SET_ACCEPT + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: SET_ACCEPT + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: SET_ACCEPT + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: SET_ACCEPT + '_FAILUARE', payload: error})
      });
    }
  }
  export function inviteFriend(jwt,id,form,connect_friend){
   
   //console.log('form in invite friend ', form, id)
    return (dispatch, getState) => {
      dispatch({ type: INVITE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/invite-challenge',
       headers: getHeaders(jwt),
        data: {
          challenge_id:id,
          receiver_user_mob_no:JSON.stringify(form),
          connect_friend:connect_friend
        }
      })
  
      .then((response) => {
      console.log('response in invite', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type: INVITE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: INVITE + '_FAILUARE',payload:response.data.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: INVITE + '_FAILUARE',payload:response.data.message})
        }
        if(response.data.status == 422){
          dispatch({type: INVITE + '_FAILUARE',payload:response.data.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: INVITE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: INVITE + '_FAILUARE', payload: error})
      });
    }
  }
  export function getConnectedFriend_(jwt){
   
  //  console.log('connected friend is calling ')
    return (dispatch, getState) => {
      dispatch({ type: GET_CONNECTED_FRIEND });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/connected_friend_connection',
       headers: getHeaders(jwt),
        // data: {
        //   challenge_id:id,
        //   receiver_user_mob_no:JSON.stringify(form)
        
        // }
      })
  
      .then((response) => {
      console.log('response in connected friend', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type: GET_CONNECTED_FRIEND + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
           // console.log('get logout  is caliing in catch')
            dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: GET_CONNECTED_FRIEND + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_CONNECTED_FRIEND + '_FAILUARE', payload: error})
      });
    }
  }
  export function getConnectedFriend(jwt){
   
    //  console.log('connected friend is calling ')
      return (dispatch, getState) => {
        dispatch({ type: GET_CONNECTED_FRIEND });
        axios({
          method: 'POST',
          url: color.baseURL + 'auth/connected-friends',
         headers: getHeaders(jwt),
          // data: {
          //   challenge_id:id,
          //   receiver_user_mob_no:JSON.stringify(form)
          
          // }
        })
    
        .then((response) => {
        console.log('response in connected friend', response.data, response.status)
          if(response.data.status == 200) {
            
            dispatch({ type: GET_CONNECTED_FRIEND + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
          
          }else if(response.data.status == 401){
            //console.log('response in login 401', response.error)
            dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
          }else if(response.data.status == 201){
            //console.log('response in login 401', response.error)
            dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
          }
          if(response.data.status == 422){
            dispatch({type: GET_CONNECTED_FRIEND + '_FAILUARE',payload:response.message})
          }
        })
        .catch((error) => {
          if (error.response) {
            if(error.response.data.status == 401){
             // console.log('get logout  is caliing in catch')
              dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
            }
          }
          if(error) {
            dispatch({ type: GET_CONNECTED_FRIEND + '_FAILUARE', payload: error})
          }
         // console.log('error in catch',error);
          dispatch({ type: GET_CONNECTED_FRIEND + '_FAILUARE', payload: error})
        });
      }
    }
  export function getJoinedFriend(jwt, id){
   
    // console.log('get joined friend ', id)
    return (dispatch, getState) => {
      dispatch({ type: GET_JOINED_FRIEND });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/joined-users',
       headers: getHeaders(jwt),
       data: {
        challenge_id:id,
       
      
      }
      })
  
      .then((response) => {
     // console.log('response in joined friend', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type: GET_JOINED_FRIEND + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_JOINED_FRIEND + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_JOINED_FRIEND + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_JOINED_FRIEND + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: GET_JOINED_FRIEND + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_JOINED_FRIEND + '_FAILUARE', payload: error})
      });
    }
  }
  export function getPendingFriend(jwt, id){
   
  //  console.log('fget pending friend ', id)
    return (dispatch, getState) => {
      dispatch({ type: GET_PENDING_FRIEND });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/pending-users',
       headers: getHeaders(jwt),
        data: {
          challenge_id:id,
         
        
        }
      })
  
      .then((response) => {
     console.log('response in get pending ', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type: GET_PENDING_FRIEND + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_PENDING_FRIEND + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GET_PENDING_FRIEND + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GET_PENDING_FRIEND + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
      //  console.log('error in pending',error)
        if (error.response) {
          if(error.response.data.status == 401){
           // console.log('get logout  is caliing in catch')
            dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: GET_PENDING_FRIEND + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GET_PENDING_FRIEND + '_FAILUARE', payload: error})
      });
    }
  }
  export function ResendRequest(jwt,id, number){
   
    console.log('form in invite friend ',id , number)
    return (dispatch, getState) => {
      dispatch({ type: RESEND_REQUEST });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/resend-request',
       headers: getHeaders(jwt),
        data: {
          challenge_id:id,
          receiver_user_mob_no:number
        }
      })
  
      .then((response) => {
      console.log('response in RESEND REQUEST ', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type: RESEND_REQUEST + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: RESEND_REQUEST + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: RESEND_REQUEST + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: RESEND_REQUEST + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
          //  console.log('get logout  is caliing in catch')
            dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: RESEND_REQUEST + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: RESEND_REQUEST + '_FAILUARE', payload: error})
      });
    }
  }
  export function getChallengeDetail(jwt, id){
   
      console.log('get challenge detail is calling  ', id)
      return (dispatch, getState) => {
        dispatch({ type: GET_CHALLENGE_DETAIL });
        axios({
          method: 'POST',
          url: color.baseURL + 'auth/challenge-user-reocrds',
         headers: getHeaders(jwt),
          data: {
            challenge_id:id,
           
          
          }
        })
    
        .then((response) => {
        console.log('response in challenge detail ', response.data, response.status)
          if(response.data.status == 200) {
            
            dispatch({ type: GET_CHALLENGE_DETAIL + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
          
          }else if(response.data.status == 401){
            //console.log('response in login 401', response.error)
            dispatch({type: GET_CHALLENGE_DETAIL + '_FAILUARE',payload:response.message})
          }else if(response.data.status == 201){
            //console.log('response in login 401', response.error)
            dispatch({type: GET_CHALLENGE_DETAIL + '_FAILUARE',payload:response.message})
          }
          if(response.data.status == 422){
            dispatch({type: GET_CHALLENGE_DETAIL + '_FAILUARE',payload:response.message})
          }
        })
        .catch((error) => {
        //  console.log('error in pending',error)
          if (error.response) {
            if(error.response.data.status == 401){
             // console.log('get logout  is caliing in catch')
              dispatch({ type: 'TOKENEXPIRE', payload: 'token_expire'})
            }
          }
          if(error) {
            dispatch({ type: GET_CHALLENGE_DETAIL + '_FAILUARE', payload: error})
          }
         // console.log('error in catch',error);
          dispatch({ type: GET_CHALLENGE_DETAIL + '_FAILUARE', payload: error})
        });
      }
    }
  export function setChallengeId(id){
    
   // console.log('sub category id',id)
  return {type: SET_CHALLENGEID, payload:id}
  }
  export function setContact(contact){
    
  //  console.log('sub contact')
  return {type: SET_CONTACT, payload:contact}
  }