import {GETMAIN_FAILUARE, GETMAIN_SUCCESS ,GETMAIN, GETSUB, GETSUB_SUCCESS, GETSUB_FAILUARE,GETSUB_RECORD,GETSUB_RECORD_SUCCESS,GETSUB_RECORD_FAILUARE, ADDSUB_RECORD, ADDSUB_RECORD_SUCCESS, ADDSUB_RECORD_FAILUARE ,GETLIST,GETLIST_SUCCESS,GETLIST_FAILUARE, GETLIST_TOKENEXPIRE, GETSUB_NULL} from '../constant';

const initialState = {
	fitLoading:false,
    main_category:null,
    fitError:null,
    sub_category:null,
    image_url:null,
    sub_category_detail:null,
    personal_record:null,
    addfitness:null, 
    token_expire:false, 
    record_added:null,

}

const fitnessReducer = (state = initialState, action) => {
	
	switch(action.type) {
    case GETMAIN:
  //  console.log('getmain reducer iscalling')
        return {...state, fitLoading:true,fitError:null,main_category:null,token_expire:false }
    
	case GETMAIN_SUCCESS:
       
        return {...state, fitLoading:false,fitError:null,main_category:action.payload , image_url:action.image_url,token_expire:false}
    
    case GETMAIN_FAILUARE:

        return {...state, fitLoading:false,fitError:true,main_category:null,token_expire:false }
    
    case GETSUB:
  //  console.log('get sub reducer iscalling')
        return {...state, fitLoading:true,fitError:null,sub_category:null,token_expire:false }
    case GETSUB_NULL:
        
        return {...state, fitLoading:false,fitError:null,sub_category:null,token_expire:false }
            
	case GETSUB_SUCCESS:
      // console.log('get sub reducer', action.payload)
        return {...state, fitLoading:false,fitError:null,sub_category:action.payload , image_url:action.image_url,token_expire:false }
    
    case GETSUB_FAILUARE:

        return {...state, fitLoading:false,fitError:true,sub_category:null,token_expire:false }

	case GETSUB_RECORD:
  //  console.log('get sub reducer iscalling')
        return {...state, fitLoading:true,fitError:null,sub_category_detail:null,personal_record:null,token_expire:false }
    
	case GETSUB_RECORD_SUCCESS:
       
        return {...state, fitLoading:false,fitError:null,sub_category_detail:action.payload , image_url:action.image_url,token_expire:false }
    
    case GETSUB_RECORD_FAILUARE:

        return {...state, fitLoading:false,fitError:true,sub_category_detail:null,token_expire:false }
    case ADDSUB_RECORD:
      //  console.log('get sub reducer iscalling')
            return {...state, fitLoading:true,fitError:null,record_added:null,token_expire:false }
        
    case ADDSUB_RECORD_SUCCESS:
        
        return {...state, fitLoading:false,fitError:null,record_addedLtrue,token_expire:false}
    
    case ADDSUB_RECORD_FAILUARE:

        return {...state, fitLoading:false,fitError:true,record_added:false,token_expire:false }
    case GETLIST:
        return {...state, fitLoading:true,fitError:null,personal_record:null,token_expire:false }    
    case GETLIST_SUCCESS:
    
        return {...state, fitLoading:false,fitError:null,personal_record:action.payload,token_expire:false}
    
    case GETLIST_FAILUARE:

        return {...state, fitLoading:false,fitError:true,personal_record:null,token_expire:false } 
    case GETLIST_TOKENEXPIRE:
   // console.log('get token expire is calling inn reducer')
    return {...state, fitLoading:false,fitError:true,personal_record:null, token_expire:true }     
	default:
	
	return state;
	}
	}

export default fitnessReducer;