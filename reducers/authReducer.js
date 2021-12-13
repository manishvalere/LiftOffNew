import { LOGIN,SET_PROFILE_VALUE, LOGIN_SUCCESS, LOGIN_FAILUARE, LOG_OUT, SIGN_UP, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_INIT, LOGIN_INIT, UPDATE,UPDATE_SUCCESS,UPDATE_FAILUARE, GET_GENDER, GET_GENDER_SUCCESS, GET_GENDER_FAILUARE, GET_WORKOUT, GET_WORKOUT_SUCCESS, GET_WORKOUT_FAILUARE, TOKENEXPIRE, LOG_OUT_SUCCESS, LOG_OUT_FAILUARE, SET_PROFILE_IMAGE, SET_PROFILE_IMAGE_SUCCESS, SET_PROFILE_IMAGE_FAILUARE, CHANGEPASS, CHANGEPASS_SUCCESS, CHANGEPASS_FAILUARE, DELETE_ACCOUNT, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILUARE, SEND_FEEDBACK, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_FAILUARE, NOTIFICATION_STATUS, NOTIFICATION_STATUS_SUCCESS, NOTIFICATION_STATUS_FAILUARE, } from '../constant';

const initialState = {
	user: {},
	isLoggedIn: false,
	user: null,
	loading: false,
	autherror: null,
	authLoading:false,
	message:null,
	signup_process:null,
	signup_success:null,
	login_succes:null,
	JWT_Token:null,
	updateError:null,
	fname:null, 
	lname:null,
	email:null,
	age:null,
	weight:null,
	height:null,
	inch:null,
	gender:null,
	workout_week:null,
	notify_workout:null,
	sigupError:null,
	signupErrorText:null,
	gender_data:null,
	workout_data:null,
	notify_data:null,
	tuttorial_data:null,
	logoutError:null,
	profile_img_error:false,
	image_url:'',
	change_password:null,
	change_password_msg:'',
	feedback:false,
	notification_status:true,
	update_succes:null,
	device_token:null
}

const authReducer = (state = initialState, action) => {
	
	switch(action.type) {
	// 	case LOG_OUT:
	// 	console.log('reducer logout')
	// return {...state,user:null, isLoggedIn:false,logoutError:false};
	case LOG_OUT_SUCCESS:
	//	console.log('reducer logout')
		return {...initialState};
	case LOG_OUT_FAILUARE:
	//	console.log('reducer logout succes')
		return {...initialState};
    case TOKENEXPIRE:
	//	console.log('reducer logout')
	return {...initialState};
	case SIGN_UP:
		return {...state,user:null, authLoading:true,sigupError:null,signupErrorText:null, signup_success:null}

	case SIGN_UP_SUCCESS:
	//	console.log('sign up succes')
		return{...state, authLoading:false, signupErrorText:null, user:action.payload.data.user,JWT_Token:action.payload.data.access_token, message:action.message,image_url:action.image_url, signup_process:true, sigupError:null, signup_success:true}

	case SIGN_UP_FAILURE:
	//	console.log('signup failuare')
		return{...state, user:null,authLoading:false, user:null, sigupError:true,signupErrorText:action.payload, signup_success:false}

	case SIGN_UP_INIT:
	//	console.log('sign up in it is calling')
		return{...state,user:null, authLoading:false,JWT_Token:null,sigupError:null,email:null,signupErrorText:null, signup_success:null, signup_process:null, signup_success:null}
	case LOGIN_INIT:
		return {...state,user:{}, authLoading:false,email:null,JWT_Token:null, autherror:null, login_succes:null}
	case LOGIN:
		return {...state,user:{},message:null, authLoading:true,signupErrorText:null,JWT_Token:null, autherror:null, login_succes:null}

	case LOGIN_SUCCESS:
	//	console.log('action suces',action)
		return{...state, authLoading:false,image_url:action.image_url, user:action.payload.data.user, message:null, signup_process:true,isLoggedIn:true, autherror:null,JWT_Token:action.payload.data.access_token, login_succes:true}
	
	case LOGIN_FAILUARE:
	//	console.log('action fail',action)
		return{...state,JWT_Token:null, authLoading:false, message:action.payload, user:{}, autherror:true,signupErrorText:action.payload, login_succes:false,isLoggedIn:false}
	
	case UPDATE:
	return {...state,update_succes:null, authLoading:true, updateError:null,}

	case UPDATE_SUCCESS:
	//	console.log('action suces',action)
		return{...state,update_succes:true, authLoading:false,image_url:action.image_url, user:action.payload, message:action.message,isLoggedIn:true, updateError:null}
		
	case UPDATE_FAILUARE:
		console.log('action fail in update',action)
		return{...state,update_succes:false, authLoading:false,user:{},  message:action.payload, updateError:true,}
	case GET_GENDER:
		return {...state, authLoading:true, updateError:null,}
	
	case GET_GENDER_SUCCESS:
	//	console.log('action suces',action)
		return{...state, authLoading:false, gender_data:action.payload, updateError:null}
		
	case GET_GENDER_FAILUARE:
	//	console.log('action fail',action)
		return{...state, authLoading:false,  message:action.payload, updateError:true,}

	case GET_WORKOUT:
	return {...state, authLoading:true, updateError:null,}
	
	case GET_WORKOUT_SUCCESS:
	//	console.log('action suces',action)
		return{...state, authLoading:false, workout_data:action.payload, updateError:null}
		
	case GET_WORKOUT_FAILUARE:
	//	console.log('action fail',action)
		return{...state, authLoading:false,  message:action.payload, updateError:true,}
	case SET_PROFILE_IMAGE:
	    return {...state, authLoading:true, updateError:null,profile_img_error:false}
	
	case SET_PROFILE_IMAGE_SUCCESS:
	//	console.log('action suces',action)
		return{...state, authLoading:false,profile_img_error:false, user:action.payload, message:action.message,isLoggedIn:true, updateError:null, image_url:action.image_url}
		
	case SET_PROFILE_IMAGE_FAILUARE:
	//	console.log('action fail',action)
		return{...state, authLoading:false,profile_img_error:true,  message:action.payload, updateError:true,}
	case CHANGEPASS:
		return {...state, authLoading:true, change_password:null, change_password_msg:action.message}
	
	case CHANGEPASS_SUCCESS:
	//	console.log('action suces',action)
		return{...state, authLoading:false,change_password:true,  change_password_msg:action.message}
		
	case CHANGEPASS_FAILUARE:
	//	console.log('action fail',action)
		return{...state, authLoading:false,change_password:false,  change_password_msg:action.message}
	case DELETE_ACCOUNT:
		return {...state, authLoading:true, }
	
	case DELETE_ACCOUNT_SUCCESS:
	//	console.log('action suces',action)
		return {...initialState};
		
	case DELETE_ACCOUNT_FAILUARE:
	//	console.log('action fail',action)
		return{...state, authLoading:false,autherror:true}
	case SEND_FEEDBACK:
		return {...state, authLoading:true, autherror:null,message:null,feedback:null}
	
	case SEND_FEEDBACK_SUCCESS:
	//	console.log('action suces',action)
		return {...state, authLoading:false, autherror:null,message:action.message, feedback:true};
		
	case SEND_FEEDBACK_FAILUARE:
	//	console.log('action fail',action)
	    return {...state, authLoading:false, autherror:true,message:action.message, feedback:false};
	case NOTIFICATION_STATUS:
		return {...state, authLoading:true, autherror:null,message:null,notification_status:true}
	
	case NOTIFICATION_STATUS_SUCCESS:
	//	console.log('action suces',action)
		return {...state, authLoading:false, autherror:null,message:action.message, notification_status:action.message};
		
	case NOTIFICATION_STATUS_FAILUARE:
	//	console.log('action fail',action)
	    return {...state, authLoading:false, autherror:true,message:action.message, notification_status:true};
	case SET_PROFILE_VALUE:
        
	//	console.log('reducer field field: ' + action.field);

		switch(action.field) {
			case 'fname':
			//	console.log('lname is calling')
			return { ...state, autherror: null,  fname: action.value  }
			case 'lname':
			return { ...state, autherror: null,  lname: action.value } 
			case 'email':
			return { ...state, autherror: null,  email: action.value }  
			case 'age':
			return { ...state, autherror: null,  age: action.value }
			case 'weight':
			return { ...state, autherror: null,  weight: action.value }
			case 'height':
			return { ...state, autherror: null,  height: action.value  }
			case 'inch':
			return { ...state, autherror: null,  inch: action.value  }
			case 'gender':
				console.log('gender reducre',action.value)
			return { ...state, autherror: null,  gender: action.value  } 
			case 'workout_week':
			return { ...state, autherror: null,  workout_week: action.value  }             
			 
			case 'notify_workout':
			return { ...state, autherror: null,  notify_workout: action.value  }  
			case 'device_token':
				console.log('device_token',action.value)
			return { ...state, autherror: null,  device_token: action.value  }  
			default:
			
			return state
		}                
	default:
	
	return state;
	}
	}

export default authReducer;