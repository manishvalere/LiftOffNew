import { GETFEED, GETFEED_FAILUARE, GETFEED_SUCCESS,GETFEEDDETAIL ,GETFEEDDETAIL_SUCCESS,GETFEEDDETAIL_FAILUARE} from '../constant';

const initialState = {
	feedLoading:false,
    feed:null,
    feedError:null,
    feed_detail:null
}

const feedReducer = (state = initialState, action) => {
	
	switch(action.type) {
    case GETFEED:
   // console.log('feed reducer iscalling')
        return {...state, feedLoading:true,feedError:null,feed:null }
    
	case GETFEED_SUCCESS:
       
        return {...state, feedLoading:false,feedError:null,feed:action.payload }
    
    case GETFEED_FAILUARE:

        return {...state, feedLoading:false,feedError:true,feed:null }
    
    case GETFEEDDETAIL:
     //   console.log('feed reducer iscalling')
            return {...state, feedLoading:true,feedError:null,feed_detail:null }
        
    case GETFEEDDETAIL_SUCCESS:
        
        return {...state, feedLoading:false,feedError:null,feed_detail:action.payload }
    
    case GETFEEDDETAIL_FAILUARE:

        return {...state, feedLoading:false,feedError:true,feed_detail:null }
    
    
	default:
	
	return state;
	}
	}

export default feedReducer;