import { GET_USERLIST } from "../constant";
import colors from "../constant/colors";
import { getHeaders, getRefreshtoken, login, logout } from './authantication';
import axios from 'axios';
export function getUserList(jwt){
    console.log('getUserList action is calling action is calling')
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