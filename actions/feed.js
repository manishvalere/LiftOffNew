import {GETFEED,GETFEEDDETAIL} from '../constant';
import color from '../constant/colors'

import axios from 'axios';

export function getFeed(token){
    //console.log('get feed action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: GETFEED });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/blog-list',
       // headers: getHeaders(jwt),
        // data: {
        //  token:token
        // }
      })
  
      .then((response) => {
    //  console.log('response in login', response.data, response.status)
        if(response.status == 200) {
          //console.log('response in login', response.data.access_token)
          dispatch({ type: GETFEED + '_SUCCESS', payload: response.data,  })
        
        }else if(response.status == 401){
         // console.log('response in login 401', response.error)
          dispatch({type: GETFEED + '_FAILUARE',payload:response.message})
        }
        if(response.status == 422){
          dispatch({type: GETFEED + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          
        }
        if(error) {
          dispatch({ type: GETFEED + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GETFEED + '_FAILUARE', payload: error})
      });
    }
  }

  export function getBlockDetail(id){
    console.log('get feed action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: GETFEEDDETAIL });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/blog-details?id='+id,
       // headers: getHeaders(jwt),
        // data: {
        //  token:token
        // }
      })
  
      .then((response) => {
      console.log('response in login', response.data, response.status)
        if(response.status == 200) {
          //console.log('response in login', response.data.access_token)
          dispatch({ type: GETFEEDDETAIL + '_SUCCESS', payload: response.data.data,  })
        
        }else if(response.status == 401){
         // console.log('response in login 401', response.error)
          dispatch({type: GETFEEDDETAIL + '_FAILUARE',payload:response.message})
        }
        if(response.status == 422){
          dispatch({type: GETFEEDDETAIL + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          // console.log(error.response.data);
          // console.log(error.response.status);
          
        }
        if(error) {
          dispatch({ type: GETFEEDDETAIL + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: GETFEEDDETAIL + '_FAILUARE', payload: error})
      });
    }
  }