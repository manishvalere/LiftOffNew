import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import LoginScreen from '../screens/login/login';
import CreateProfileScreen from '../screens/signup/create_profile';
import SignupScreen from '../screens/signup/signup';
import  WelcomeScreen  from '../screens/signup/welcomescreen';
import Onboarding_One from '../screens/signup/onboarding_one';
import Onboarding_Two from '../screens/signup/onboarding_two';
import Onboarding_Three from '../screens/signup/onboarding_three';
import Onboarding_Four from '../screens/signup/onboarding_four';
import SettingScreen from '../screens/setting/settings';
import { ForgotPassword } from '../screens/signup/forgot_pass';
const Stack = createStackNavigator();

function StackNavigator({ navigation, route }) {
  const {  deviceToken } = route.params;
  

  return (
    
      <Stack.Navigator  
      initialRouteName="Login" 
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen initialParams={{deviceToken:deviceToken}} name="Login" component={LoginScreen} />
        <Stack.Screen
        initialParams={{deviceToken:deviceToken}}
        options={{gestureEnabled: false}}
         name="Signup" component={SignupScreen} />
        <Stack.Screen
       
         name="createprofile" component={CreateProfileScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboard_one" component={Onboarding_One} />
        <Stack.Screen name="Onboard_two" component={Onboarding_Two} />
        <Stack.Screen name="Onboard_three" component={Onboarding_Three} />
        <Stack.Screen name="Onboard_four" component={Onboarding_Four} />
        <Stack.Screen name="forgot" component={ForgotPassword} />
       
      </Stack.Navigator>
    
  );
}

export default StackNavigator;