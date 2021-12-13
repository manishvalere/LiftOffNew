import { GETMAIN,GETSUB,GETSUB_RECORD, ADDSUB_RECORD, GETLIST,GETSUB_NULL,TOKENEXPIRE} from '../constant';
import color from '../constant/colors'
import { getHeaders, getRefreshtoken, login, logout } from './authantication';
import axios from 'axios';

export function getMaincategory(token){
    //console.log('main category action is calling action is calling')
    return (dispatch, getState) => {
      dispatch({ type: GETMAIN });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/category-list',
       // headers: getHeaders(jwt),
        // data: {
        //  token:token
        // }
      })
  
      .then((response) => {
  //console.log('response in main category', response.data)
        if(response.data.status == 200) {
         // console.log('response in login', response.data)
          dispatch({ type: GETMAIN + '_SUCCESS', payload: response.data.data,image_url:response.data.url  })
        
        }else if(response.data.status == 201){
          //console.log('response in login 401', response.error)
          dispatch({type: GETMAIN + '_FAILUARE',payload:response.message})
        
      }else if(response.data.status == 401){
        //console.log('response in login 401', response.error)
        dispatch({type: GETMAIN + '_FAILUARE',payload:response.message})
      }else
        if(response.data.status == 422){ 
          dispatch({type: GETMAIN + '_FAILUARE',payload:response.message})
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
          dispatch({ type: GETMAIN + '_FAILUARE', payload: error})
        }
        console.log('error in catch',error);
        dispatch({ type: GETMAIN + '_FAILUARE', payload: error})
      });
    }
  }

  export function getSubcategory(id){
  //  console.log('sub category action is calling action is calling', id)
    return (dispatch, getState) => {
      dispatch({ type: GETSUB });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/sub-category-list?id='+id
       // headers: getHeaders(jwt),
        // data: {
        //  id:id
        // }
      })
  
      .then((response) => {
     // console.log('response in at the time od sub', response.data)
        if(response.data.status == 200) {
         
          dispatch({ type: GETSUB + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GETSUB + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GETSUB + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
          if(error.response.data.status == 401){
           // console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
          
        }
        if(error) {
          dispatch({ type: GETSUB + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GETSUB + '_FAILUARE', payload: error})
      });
    }
  }

  export function getFitnessRecord(id){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
  //  console.log('get sub category', id)
    return (dispatch, getState) => {
      dispatch({ type: GETSUB_RECORD });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/sub-category-details?id='+id
       // headers: getHeaders(jwt),
        // data: {
        //  id:id
        // }
      })
  
      .then((response) => {
     // console.log('response in su detail action', response.data)
        if(response.data.status == 200) {
         
          dispatch({ type: GETSUB_RECORD + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GETSUB_RECORD + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GETSUB_RECORD + '_FAILUARE',payload:response.message})
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
          dispatch({ type: GETSUB_RECORD + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: GETSUB_RECORD + '_FAILUARE', payload: error})
      });
    }
  }
  export function addFitnessRecord(id, category_type,form , jwt){
    //console.log('sub category action is calling action is calling', id,color.baseURL + 'auth/sub-category-list?id='+id)
   // console.log('form in add fitness action ', form)
    return (dispatch, getState) => {
      dispatch({ type: ADDSUB_RECORD });
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
     //console.log('response in login', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: ADDSUB_RECORD + '_SUCCESS', payload: response.data.data, image_url:response.data.url })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: ADDSUB_RECORD + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: ADDSUB_RECORD + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
      //  console.log('error.response',error.response)
        if (error.response) {
          if(error.response.data.status == 401){
           // console.log('get logout  is caliing in catch')
             dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
          }
        }
        if(error) {
          dispatch({ type: ADDSUB_RECORD + '_FAILUARE', payload: error})
        }
       // console.log('error in catch',error);
        dispatch({ type: ADDSUB_RECORD + '_FAILUARE', payload: error})
      });
    }
  }

  export function getFitnessRecordList( category_type, jwt,id){
   console.log('sub category action is calling action is calling',category_type,id)
    
    return (dispatch, getState) => {
      dispatch({ type: GETLIST });
      axios({
        method: 'POST',
        url: color.baseURL + 'auth/best-records-list',
       headers: getHeaders(jwt),
        data: {
          
          exercise_type:category_type,
          subcategory_id:id
        }
      })
  
      .then((response) => {
      //console.log('response in ADD SETS', response.data)
        if(response.data.status == 200) {
          
          dispatch({ type: GETLIST + '_SUCCESS', payload: response.data.data[0] })
        
        }else if(response.data.status == 401){
          //console.log('response in login 401', response.error)
          dispatch({type: GETLIST + '_FAILUARE',payload:response.message})
        }
        if(response.data.status == 422){
          dispatch({type: GETLIST + '_FAILUARE',payload:response.message})
        }
      })
      .catch((error) => {
        if (error.response) {
         if(error.response.data.status == 401){
         // console.log('get logout  is caliing in catch')
            dispatch({ type: TOKENEXPIRE, payload: 'token_expire'})
         }
          
        }
        // if(error) {
        //   dispatch({ type: GETLIST + '_FAILUARE', payload: error})
        // }
        // // console.log('error in catch list',error);
        //  dispatch({ type: GETLIST + '_FAILUARE', payload: error})

      });
    }
  }
  export function setMaincategoryNull(){
    
    //  console.log('main category null')
  return {type: GETMAIN}
  }
  
  export function setSubcategoryNull(){
    
  //  console.log('sub category null')
return {type: GETSUB_NULL}
}
