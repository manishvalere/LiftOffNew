import { LOGIN,LOGIN_INIT, SET_PROFILE_VALUE,UPDATE,UPDATE_FAILUARE, LOG_OUT,SIGN_UP,SIGN_UP_INIT,NOTIFICATION_STATUS ,CHANGEPASS,DELETE_ACCOUNT,SEND_FEEDBACK} from '../constant';
import color from '../constant/colors'
import { COUNTER_CHANGE } from '../constant';
import axios from 'axios';


  export function logout(jwt){
   // console.log('logout is calling')
    return (dispatch, getState) => {
      dispatch({ type: LOG_OUT });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/logout',
        headers: getHeaders(jwt),
        // data: {
        //   email:phone,
        //   //email:email_,
        //   password:password
        // }
      })
  
      .then((response) => {
    //  console.log('response in login', response)
        if(response.status == 200) {
      // console.log('response in login', response.data.access_token)
          dispatch({ type: LOG_OUT + '_SUCCESS', payload: response.message,  })
        
        }else if(response.status == 401){
         // console.log('response in LOG_OUT 401', response.error)
          dispatch({type: LOG_OUT + '_FAILUARE',payload: response.message})
        }
        else if(response.status == 201){
        //  console.log('response in LOG_OUT 201', response.error)
          dispatch({type: LOG_OUT + '_FAILUARE',payload: response.message})
        }
        if(response.status == 422){
          dispatch({type: LOG_OUT + '_FAILUARE',payload: response.message})
        }
      })
      .catch((error) => {
         
        
        if(error) {
          
          if(error.response.data.status == 401){
           // console.log('error in if condition', error, error.response.data.message)
            dispatch({ type: LOG_OUT + '_FAILUARE', payload:error.response.data.message})
          }
          
        }else{
        //  console.log('error in catch',error);
        dispatch({ type: LOG_OUT + '_FAILUARE', payload: 'Something went wrong!'})
        }
        
      });
    }
  }

export function login(phone, password, deviceToken, os){
//  console.log('login action is calling')
  return (dispatch, getState) => {
    dispatch({ type: LOGIN });
    axios({
      method: 'POST',
      url: color.baseURL + 'auth/login',
     // headers: getHeaders(jwt),
      data: {
        email:phone,
        //email:email_,
        password:password,
        device_token: deviceToken,
        device_type:os     
      }
    })

    .then((response) => {
    console.log('response in login', response.data)
      if(response.data.status == 200) {
      //  console.log('response in login 200', response.data.access_token)
        dispatch({ type: LOGIN + '_SUCCESS', payload: response.data, image_url:response.data.url  })
      
      }else if(response.data.status == 401){
      //  console.log('response in login 401', response.error)
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
      else if(response.data.status == 201){
      //  console.log('response in login 201', response.error)
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
      if(response.data.status == 422){
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
    })
    .catch((error) => {
       console.log('error in catch login',JSON.stringify(error.response))
      
      if(error) {
        
        if(error.response.status == 401){
        //  console.log('error in if condition', error, error.response.data.message)
        dispatch({ type: LOGIN + '_FAILUARE', payload: error.response.data.message})
       
      }else
        if(error.response.status == 422){
          if(error.response.data.hasOwnProperty('email') && error.response.data.hasOwnProperty('password') ){
            dispatch({ type: LOGIN + '_FAILUARE', payload:'Email and password in not valid'})
          
          }else
          if((error.response.data.hasOwnProperty('email'))){
            dispatch({ type: LOGIN + '_FAILUARE', payload:'Email is invalid'})
          
          }else
          if((error.response.data.hasOwnProperty('phone'))){
            dispatch({ type: LOGIN + '_FAILUARE', payload:'Phone is invalid'})
          
          }else
          if((error.response.data.hasOwnProperty('password'))){
            dispatch({ type: LOGIN + '_FAILUARE', payload:'password is invalid'})
          
          }else{
            dispatch({ type: LOGIN + '_FAILUARE', payload: 'Something went wrong!'})
          }
        }else{
        dispatch({ type: LOGIN + '_FAILUARE', payload: 'Something went wrong!'})
      }
    }
    });
  }
}
export function signup(phone, email_,password_, deviceToken, os) {
// console.log('sign up action is calling',phone, email_,password_)
  return (dispatch, getState) => {
    dispatch({ type: SIGN_UP });
    axios({
      method: 'POST',
      url: color.baseURL + 'auth/register',
     // headers: getHeaders(jwt),
      data: {
        phone_number:phone,
        email:email_,
        password:password_,
        device_token:deviceToken,
        device_type:os
      }
    })
    .then((response) => {
    //  console.log('signup action response', response.data)
      if(response.data.status == 200) {
      //  console.log('sign up success', response.data)
        dispatch({ type: SIGN_UP + '_SUCCESS', payload: response.data,image_url:response.data.url , message:response.data.message, access_token:response.data.access_token })
      
      }else if(response.status == 400){
      //  console.log('signup failuare 400', response)
        dispatch({type: SIGN_UP + '_FAILURE',payload:response.data.message})
      
    }else if(response.status == 201){
    //  console.log('signup failuare 400', response)
      dispatch({type: SIGN_UP + '_FAILURE',payload:response.data.message})
    }
      if(response.status == 422){
      //  console.log('signup failuare 422', response)
        dispatch({type: SIGN_UP + '_FAILURE',payload:response.message})
      }
      if(response.status == 500){
      //  console.log('signup failuare 422', response)
        dispatch({type: SIGN_UP + '_FAILURE',payload:response.message})
      }
    })
    .catch((error) => {
    //  console.log('error in signup ', error)
      if (error.response) {
       console.log('error responmse', error.response)
        if(error.response.status == 400){
         // console.log('error',error.response)
          if(error.response.data.message.hasOwnProperty('email') && error.response.data.message.hasOwnProperty('phone_number')){
            dispatch({type: SIGN_UP + '_FAILURE',payload:'Email and Phone already register!'})
          }
          else if(error.response.data.message.hasOwnProperty('email')){
            dispatch({type: SIGN_UP + '_FAILURE',payload:'The email has already been taken!'})
          }
          else if(error.response.data.message.hasOwnProperty('phone_number')){
            dispatch({type: SIGN_UP + '_FAILURE',payload:'The phone number has already been taken!'})
          }
          else if(error.response.data.message.hasOwnProperty('password')){
            dispatch({type: SIGN_UP + '_FAILURE',payload:error.response.data.message.password})
          }
          
        }else 
        if(error.response.status == 500){
          dispatch({type: SIGN_UP + '_FAILURE',payload:'Something went wrong!'})
        }
      //  console.log('error  without', error)
        
      }
      dispatch({ type: SIGN_UP + '_FAILURE', payload: error})
    //  console.log('signup failuare catch', error)
    });
  }
}

export function getHeaders(jwt) {
  return {
    'Authorization': 'Bearer ' + jwt,
    
  };
}
export function updateProfileValue(token, profile) {
 //console.log('update action is calling action is calling', profile)
   return (dispatch, getState) => {
     dispatch({ type: UPDATE });
     axios({
       method: 'POST',
       url: color.baseURL + 'auth/update-profile',
      headers: getHeaders(token),
       data: profile
     })
     .then((response) => {
       console.log('signup action', response.data)
       if(response.data.status == 200) {
         
         dispatch({ type: UPDATE + '_SUCCESS', payload: response.data.data, message:response.data.message,image_url:response.data.url  })
       
       }else if(response.data.status == 201){
        console.log('erorr in 201', response)
         dispatch({type: UPDATE_FAILUARE,payload:response.message})
       }
       if(response.data.status == 422){
      //  console.log('erorr in 422', response)
         dispatch({type: UPDATE_FAILUARE,payload:response.message})
       }
     })
     .catch((error) => {
      // console.log('erorr in update catch', error)
       if(error) {
         dispatch({ type: UPDATE_FAILUARE, payload: error})
       }
       dispatch({ type: UPDATE_FAILUARE, payload: error})
     });
   }
 }
 export function getGender() {
  
   return (dispatch, getState) => {
     dispatch({ type: GET_GENDER });
     axios({
       method: 'POST',
       url: color.baseURL + 'auth/register',
      
     })
     .then((response) => {
      // console.log('signup action', response.data.status)
       if(response.data.status == 200) {
        // console.log('sign up success', response.data)
         dispatch({ type: GET_GENDER + '_SUCCESS', payload: response.data, message:response.data.message, access_token:response.data.access_token })
       
       }
     })
     .catch((error) => {
       if (error.response) {
         //console.log('error responmse', error.response)
         if(error.response.status == 400){
          // console.log('error',error.response)
           
           dispatch({type: GET_GENDER + '_FAILURE',payload:'The phone number has already been taken!'})
         }else 
         if(error.response.status == 500){
           dispatch({type: GET_GENDER + '_FAILURE',payload:'Something went wrong!'})
         }
         //console.log('error  without', error)
         
       }
       dispatch({ type: GET_GENDER + '_FAILURE', payload: error})
      // console.log('signup failuare catch', error)
     });
   }
 }
 export function getWorkoutWeek() {
 
   return (dispatch, getState) => {
     dispatch({ type: GET_WORKOUT });
     axios({
       method: 'POST',
       url: color.baseURL + 'auth/register',
      
     })
     .then((response) => {
       
       if(response.data.status == 200) {
        // console.log('sign up success', response.data)
         dispatch({ type: GET_WORKOUT + '_SUCCESS', payload: response.data, message:response.data.message, access_token:response.data.access_token })
       
       }
     })
     .catch((error) => {
       if (error.response) {
         //console.log('error responmse', error.response)
         if(error.response.status == 400){
          // console.log('error',error.response)
           
           dispatch({type: GET_WORKOUT + '_FAILURE',payload:'The phone number has already been taken!'})
         }else 
         if(error.response.status == 500){
           dispatch({type: GET_WORKOUT + '_FAILURE',payload:'Something went wrong!'})
         }
         //console.log('error  without', error)
         
       }
       dispatch({ type: GET_WORKOUT + '_FAILURE', payload: error})
      // console.log('signup failuare catch', error)
     });
   }
 }
export function getRefreshtoken(jwt){
//  console.log('refresh  action is calling in refresh ',jwt)
 return (dispatch, getState) => {
   
    dispatch({ type: LOGIN });
    axios({
      method: 'POST',
      url: color.baseURL + 'auth/refresh',
      headers: getHeaders(jwt),
      // data: {
      //   email:phone,
      //   //email:email_,
      //   password:password
      // }
    })

    .then((response) => {
   /// console.log('response in login', response.data)
      if(response.data.status == 200) {
      //  console.log('response in login', response.data.access_token)
        dispatch({ type: LOGIN + '_SUCCESS', payload: response.data,  })
      
      }else if(response.data.status == 401){
      //  console.log('response in login 401', response.error)
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
      else if(response.data.status == 201){
      //  console.log('response in login 401', response.error)
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
      if(response.data.status == 422){
        dispatch({type: LOGIN + '_FAILUARE',payload: response.data.message})
      }
    })
    .catch((error) => {
       
    //  console.log('error ', error, error.response)
      if(error) {
        
        if(error.response.data.status == 401){
        //  console.log('error in if condition', error, error.response.data.status)
          dispatch({ type: LOGIN + '_FAILUARE', payload:error.response.data.message})
        }
        
      }else{
      //  console.log('error in catch min refresh',error);
      dispatch({ type: LOGIN + '_FAILUARE', payload: 'Something went wrong!'})
      }
      
    });
  }
}
export function changePassword(old, password, jwt){
 // console.log('login action is calling')
  return (dispatch, getState) => {
    dispatch({ type: CHANGEPASS });
    axios({
      method: 'POST',
      url: color.baseURL + 'auth/change-password',
      headers: getHeaders(jwt),
      data: {
        old_password:old,
        new_password:password
      }
    })

    .then((response) => {
    //console.log('response in CHANGE PASS', response.data)
      if(response.status == 200) {
      //  console.log('response in CHANGE PASS 200', response.data.access_token)
        dispatch({ type: CHANGEPASS + '_SUCCESS', message: response.data.message,  })
      
      }else if(response.status == 400){
      //  console.log('response in CHANGEPASS 401', response.error)
        dispatch({type: CHANGEPASS + '_FAILUARE',message: response.data.message})
      }
      else if(response.status == 201){
       // console.log('response in CHANGEPASS 201', response.error)
        dispatch({type: CHANGEPASS + '_FAILUARE',message: response.data.message})
      }
      if(response.status == 422){
        dispatch({type: CHANGEPASS + '_FAILUARE',message: response.data.message})
      }
    })
    .catch((error) => {
       
      
      if(error) {
        
        if(error.response.data.status == 400){
        //  console.log('error in if condition', error, error.response.data.message)
          dispatch({ type: CHANGEPASS + '_FAILUARE', message:error.response.data.message})
        }
        
      }else{
      //  console.log('error in catch',error);
      dispatch({ type: CHANGEPASS + '_FAILUARE', message: 'Something went wrong!'})
      }
      
    });
  }
}
export function deleteAccont(jwt){
//  console.log('login action is calling')
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ACCOUNT });
    axios({
      method: 'POST',
      url: color.baseURL + 'auth/delete-account',
      headers: getHeaders(jwt),
     
    })

    .then((response) => {
  //  console.log('response in CHANGE PASS', response.data)
      if(response.status == 200) {
      //  console.log('response in CHANGE PASS 200', response.data.access_token)
        dispatch({ type: DELETE_ACCOUNT + '_SUCCESS', message: response.data.message,  })
      
      }else if(response.status == 400){
      //  console.log('response in DELETE_ACCOUNT 401', response.error)
        dispatch({type: DELETE_ACCOUNT + '_FAILUARE',message: response.data.message})
      }
      else if(response.status == 201){
      //  console.log('response in DELETE_ACCOUNT 201', response.error)
        dispatch({type: DELETE_ACCOUNT + '_FAILUARE',message: response.data.message})
      }
      if(response.status == 422){
        dispatch({type: DELETE_ACCOUNT + '_FAILUARE',message: response.data.message})
      }
    })
    .catch((error) => {
       
      
      if(error) {
        
        if(error.response.data.status == 400){
        //  console.log('error in if condition', error, error.response.data.message)
          dispatch({ type: DELETE_ACCOUNT + '_FAILUARE', message:error.response.data.message})
        }
        
      }else{
      // console.log('error in catch',error);
      dispatch({ type: DELETE_ACCOUNT + '_FAILUARE', message: 'Something went wrong!'})
      }
      
    });
  }
}
export function setNotification(jwt, device_token, device_type){
   // console.log('sendFeedback action is calling')
    return (dispatch, getState) => {
      dispatch({ type: NOTIFICATION_STATUS });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/update-device-token',
        headers: getHeaders(jwt),
        data:{
          device_token:device_token,
          device_type:device_type
        }
      })
  
      .then((response) => {
      //console.log('response in NOTIFICATION', response.data)
        if(response.status == 200) {
        //  console.log('response in CHANGE PASS 200', response.data.access_token)
          dispatch({ type: NOTIFICATION_STATUS + '_SUCCESS', message: response.data.message,  })
        
        }else if(response.status == 400){
        //  console.log('response in NOTIFICATION_STATUS 401', response.error)
          dispatch({type: NOTIFICATION_STATUS + '_FAILUARE',message: response.data.message})
        }
        else if(response.status == 201){
        //  console.log('response in NOTIFICATION_STATUS 201', response.error)
          dispatch({type: NOTIFICATION_STATUS + '_FAILUARE',message: response.data.message})
        }
        if(response.status == 422){
          dispatch({type: NOTIFICATION_STATUS + '_FAILUARE',message: response.data.message})
        }
      })
      .catch((error) => {
         
        
        if(error) {
          
          if(error.response.data.status == 400){
            //console.log('error in if condition', error, error.response.data.message)
            dispatch({ type: NOTIFICATION_STATUS + '_FAILUARE', message:error.response.data.message})
          }
          
        }else{
        // console.log('error in catch',error);
        dispatch({ type: NOTIFICATION_STATUS + '_FAILUARE', message: 'Something went wrong!'})
        }
       // console.log('error in catch',error);
        dispatch({ type: NOTIFICATION_STATUS + '_FAILUARE', message: 'Something went wrong!'})
      });
    }
  }
  export function sendFeedback(jwt, feedback){
   // console.log('sendFeedback action is calling')
    return (dispatch, getState) => {
      dispatch({ type: SEND_FEEDBACK });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/sendfeedback',
        headers: getHeaders(jwt),
        data:{
          feedback:feedback
        }
      })
  
      .then((response) => {
     // console.log('response in send notification', response.data)
        if(response.status == 200) {
        //  console.log('response in CHANGE PASS 200', response.data.access_token)
          dispatch({ type: SEND_FEEDBACK + '_SUCCESS', message: response.data.message,  })
        
        }else if(response.status == 400){
        //  console.log('response in NOTIFICATION_STATUS 401', response.error)
          dispatch({type: SEND_FEEDBACK + '_FAILUARE',message: response.data.message})
        }
        else if(response.status == 201){
        //  console.log('response in SEND_FEEDBACK 201', response.error)
          dispatch({type: SEND_FEEDBACK + '_FAILUARE',message: response.data.message})
        }
        if(response.status == 422){
          dispatch({type: SEND_FEEDBACK + '_FAILUARE',message: response.data.message})
        }
      })
      .catch((error) => {
         
        
        if(error) {
          
          if(error.response.data.status == 400){
         //   console.log('error in if condition', error, error.response.data.message)
            dispatch({ type: SEND_FEEDBACK + '_FAILUARE', message:error.response.data.message})
          }
          
        }else{
        // console.log('error in catch',error);
        dispatch({ type: SEND_FEEDBACK + '_FAILUARE', message: 'Something went wrong!'})
        }
      //  console.log('error in catch',error);
        dispatch({ type: SEND_FEEDBACK + '_FAILUARE', message: 'Something went wrong!'})
      });
    }
  }
  
export function  signupInit(){
  return(dispatch) =>{
    dispatch({type:SIGN_UP_INIT})
  }
}

export function  loginInit(){
  return(dispatch) =>{
    dispatch({type:LOGIN_INIT})
  }
}

export function setProfileValue(field, value) {
  return (dispatch, getState) => {
    console.log("setUurValue: " + field + '=' + value);
    dispatch({ type: SET_PROFILE_VALUE, field: field, value: value })
  }
}