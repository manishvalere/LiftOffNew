import { GET_COMPLETE_CHALLENGE,SET_PROFILE_IMAGE,GET_PERSONAL_BEST ,GET_PERSONAL_BEST_FILTER,GET_LEADER,GET_GYM_PARTNER} from "../constant";
import color from '../constant/colors'
import { getHeaders, getRefreshtoken, login, logout } from './authantication';
import axios from 'axios';
export function getCompleteChallenges(jwt){
   
    //console.log('form in invite friend ',id , number)
    return (dispatch, getState) => {
      dispatch({ type:  GET_COMPLETE_CHALLENGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/users-achievement',
       headers: getHeaders(jwt),
        // data: {
        //   challenge_id:id,
        //   receiver_user_mob_no:number
        // }
      })
  
      .then((response) => {
      //console.log('response in get complete challenge ', response.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type:  GET_COMPLETE_CHALLENGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_COMPLETE_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_COMPLETE_CHALLENGE + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_COMPLETE_CHALLENGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   GET_COMPLETE_CHALLENGE + '_FAILUARE',payload:response.message})
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
          dispatch({ type:  GET_COMPLETE_CHALLENGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type:    GET_COMPLETE_CHALLENGE + '_FAILUARE', payload: error})
      });
    }
  }
  export function setProfileImage(jwt,image){
   
  //  console.log('form in invite friend ',image)
    return (dispatch, getState) => {
      var data = new FormData();
      data.append('picture',
      {
         uri:image.uri,
         name:image.fileName,
         type:image.type
      });
      dispatch({ type:  SET_PROFILE_IMAGE });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/update-profile-pic',
       headers: getHeaders(jwt),
        data: data
      })
  
      .then((response) => {
     // console.log('response IN SET PROFILE', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type:  SET_PROFILE_IMAGE + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   SET_PROFILE_IMAGE + '_FAILUARE',payload:response.message})
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   SET_PROFILE_IMAGE + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type:   SET_PROFILE_IMAGE + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   SET_PROFILE_IMAGE + '_FAILUARE',payload:response.message})
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
         // console.log('error in catch in if' ,error);
          dispatch({ type:  SET_PROFILE_IMAGE + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type:    SET_PROFILE_IMAGE + '_FAILUARE', payload: error})
      });
    }
  }
  export function getPersonalBest(jwt){
   
    console.log('log  details calling')
    return (dispatch, getState) => {
      dispatch({ type:  GET_PERSONAL_BEST });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/log-deatils',
        headers: getHeaders(jwt),
        // data: {
        //   challenge_id:id,
        //   receiver_user_mob_no:number
        // }
      })
      
      .then((response) => {
         console.log('response in personal best ', response.data.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type:  GET_PERSONAL_BEST + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }
        else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
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
          dispatch({ type:  GET_PERSONAL_BEST + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type:    GET_PERSONAL_BEST + '_FAILUARE', payload: error})
      });
    }
  }
  export function getPersonalBestNewFilter(data,jwt){
   
    console.log('log  details calling')
    return (dispatch, getState) => {
      dispatch({ type:  GET_PERSONAL_BEST });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/log-deatils',
        headers: getHeaders(jwt),
        data: data
      })
      
      .then((response) => {
         console.log('response in personal best ', response.data.data, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type:  GET_PERSONAL_BEST + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }
        else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   GET_PERSONAL_BEST + '_FAILUARE',payload:response.message})
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
          dispatch({ type:  GET_PERSONAL_BEST + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type:    GET_PERSONAL_BEST + '_FAILUARE', payload: error})
      });
    }
  }
  export function getPersonalByFilter(data,jwt){
   
    console.log('get personal filter action is calling ******', data)
    return (dispatch, getState) => {
      dispatch({ type:  GET_PERSONAL_BEST_FILTER });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/personal-best',
       headers: getHeaders(jwt),
        data: data
      })
  
      .then((response) => {
        console.log('response in personal best ', response.data.data, response.status)
        if(response.data.status == 200) {
          console.log('status 200 is callign')
          dispatch({ type:  GET_PERSONAL_BEST_FILTER + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST_FILTER + '_FAILUARE',payload:response.message})
        }
        else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_PERSONAL_BEST_FILTER + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
        //  console.log('response in login 201', response.error)
          dispatch({type:   GET_PERSONAL_BEST_FILTER + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   GET_PERSONAL_BEST_FILTER + '_FAILUARE',payload:response.message})
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
          dispatch({ type:  GET_PERSONAL_BEST_FILTER + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type:    GET_PERSONAL_BEST_FILTER + '_FAILUARE', payload: error})
      });
    }
  }
  export function getLeaderBoard(jwt){
   
   // console.log('form in leader board ')
    return (dispatch, getState) => {
      dispatch({ type:  GET_LEADER });
      axios({
        method: 'GET',
        url: color.baseURL + 'auth/leaderboard',
       headers: getHeaders(jwt),
        // data: {
        //   challenge_id:id,
        //   receiver_user_mob_no:number
        // }
      })
  
      .then((response) => {
    //  console.log('response in get leader board ', response.data.url, response.status)
        if(response.data.status == 200) {
          
          dispatch({ type:  GET_LEADER + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 400){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_LEADER + '_FAILUARE',payload:response.message})
        }
        else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_LEADER + '_FAILUARE',payload:response.message})
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type:   GET_LEADER + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type:   GET_LEADER + '_FAILUARE',payload:response.message})
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
          dispatch({ type:  GET_LEADER + '_FAILUARE', payload: error})
        }
      //  console.log('error in catch',error);
        dispatch({ type:    GET_LEADER + '_FAILUARE', payload: error})
      });
    }
  }
  export function getGymPartner(jwt){
   
    // console.log('get personal action is calling')
     return (dispatch, getState) => {
       dispatch({ type:  GET_GYM_PARTNER });
       axios({
         method: 'POST',
         url: color.baseURL + 'auth/get-gym-partner',
        headers: getHeaders(jwt),
         // data: {
         //   challenge_id:id,
         //   receiver_user_mob_no:number
         // }
       })
   
       .then((response) => {
          //console.log('response in GYM PARTENER best ', response.data.data, response.status)
         if(response.data.status == 200) {
           
           dispatch({ type:  GET_GYM_PARTNER + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
         
         }else if(response.data.status == 400){
           //console.log('response in login 401', response.error)
           dispatch({type:   GET_GYM_PARTNER + '_FAILUARE',payload:response.message})
         }
         else if(response.data.status == 401){
           //console.log('response in login 401', response.error)
           dispatch({type:   GET_GYM_PARTNER + '_FAILUARE',payload:response.message})
         }else if(response.data.status == 201){
           //console.log('response in login 401', response.error)
           dispatch({type:   GET_GYM_PARTNER + '_FAILUARE',payload:response.message})
         }
         if(response.data.status == 422){
           dispatch({type:   GET_GYM_PARTNER + '_FAILUARE',payload:response.message})
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
           dispatch({ type:  GET_GYM_PARTNER + '_FAILUARE', payload: error})
         }
        // console.log('error in catch',error);
         dispatch({ type:    GET_GYM_PARTNER + '_FAILUARE', payload: error})
       });
     }
   }