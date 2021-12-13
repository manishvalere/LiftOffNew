import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabNavigation from './tabnavigation';
import { connect } from 'react-redux'
import StackNavigator from './stackNavigator';
import { login, login_true } from '../actions';
import SplashScreen from '../screens/signup/splashScreen';
const Stack = createStackNavigator();

export  class Navigation extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true
    }
  }
  UNSAFE_componentWillMount(){
    setTimeout(() => {
      this.setState({
        loading:false
      })
    }, 2000);
  }
    
    render(){
      //console.log('this.props.initial',this.props.initial)
      if(this.state.loading){
        return(
          <SplashScreen/>
        )
        
      }else{
    return (
    
      <Stack.Navigator  
      screenOptions={{
        headerShown: false
      }}
      >
        {
         this.props.isLoggedIn  ? <Stack.Screen initialParams={{initial:this.props.initial}} name="tab" component={TabNavigation} /> : 
         <Stack.Screen name="Login" 
         initialParams={{deviceToken:this.props.deviceToken}}
         options={{
          
          headerShown: false,
          
        }} 
         component={StackNavigator} /> 
        }
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        
      </Stack.Navigator>
    
  );
      }
}
}
const mapStateToProps = state => {
  const { user, LoginError,isLoggedIn } = state.auth
  const {count} = state.count
    return { user, LoginError,isLoggedIn,count }
}

const mapDispatchToProps = {
  dispatchLogin: (username, password) => login(username, password),
  dispatchLogin_true:()=>login_true()
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
