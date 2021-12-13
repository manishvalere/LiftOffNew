import * as React from 'react';
import { Text, View,Image,Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, TabRouter, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/home';
import RecordMainScreen from '../screens/records/records';
import AchievmentMainScreen from '../screens/achievment/achievment';
import ProfileScreen from '../screens/Profile/profile';
import ChallengeMainScreen from '../screens/challenge/challenge';
import { render } from 'react-dom';
import {AntDesign,FontAwesome5,Feather,Ionicons,MaterialCommunityIcons,Entypo} from 'react-native-vector-icons'
import MyFitnessHome from '../screens/myfitness/myfitness_home';
import  MyFitness_Subtype  from '../screens/myfitness/myfit_ex_subtype';
import  Add_sets  from '../screens/myfitness/add_sets';
import Create_Challenge from '../screens/challenge/create_challenge';
import Challenge_Created from '../screens/challenge/challenge_created';
import Invite_Friends from '../screens/challenge/Invite_fiend';
import Home_detail from '../screens/home/home_detail';
import  LeaderBoard  from '../screens/achievment/leaderboard';
import SettingScreen from '../screens/setting/settings'
import CurrentChallenge from '../screens/challenge/currrent_challenge';
import HistoryChallenge from '../screens/challenge/history_challenge';
import PendingChallenge from '../screens/challenge/pending_challenge';
import  Start_Challenge  from '../screens/challenge/start_challenge';
import Connected_Friend from '../screens/challenge/connected_friend';
import WebView_Screen from '../screens/setting/webView';
import personalBest from '../screens/myfitness/personalBest';
import Dumble from '../assets/dumble_.svg'
import FullScreen from '../screens/home/full_video_screen';
import SWR_Info from '../screens/challenge/swr_info';
import Camera from '../screens/Profile/cameratest';
import  ChangePassword  from '../screens/setting/changePassword';
import  History  from '../screens/Profile/history';
import Challenge_Detail from '../screens/challenge/challenge_details';
import  SendFeedback  from '../screens/setting/sendFeedBack';
import  EditProfile  from '../screens/Profile/edit_profile';
import { Friend_Home } from '../screens/friends/friendsHome';
var modal_flag = false
const Tab = createBottomTabNavigator();
function SettingIcon() {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("setting");
  }

  return (
    <Feather name={'settings'}  color='#FFFF' style={{paddingLeft:25}}  size = {18} onPress={navigateToCart}/>
  );
}
function FilterIcon() {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("setting");
  }

  return (
    <TouchableOpacity 
        style={styles.filter_btn}
        onPress={() => modal_flag=true}
    >
        <Entypo  name='sound-mix' size={20} color='#1F1F1F'/>
    </TouchableOpacity>
  );
}
const Stack = createStackNavigator();
const feedstack=()=>{
  return (
    
      <Stack.Navigator  
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' ,
          
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        color:'#FFFFFF',
        //fontFamily:'Montserrat',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal',
       fontFamily:'Montserrat-Regular',
        
        
      },
      }}
      initialRouteName="myfitness">
        <Stack.Screen 
        options={{
           title: 'News Feed',
           headerShown:false,
          headerTitleAlign:'center',
          // headerRight: ({ color, size }) => (
          //   <Feather name="bell" color='#FFFF' style={{paddingRight:20}} size={18} onPress={()=>alert('hello')} />
          // ),
          
            //headerLeft: props => <SettingIcon  {...props} />,
          
         

          
          //headerShown: false,
          // headerTintColor: '#fff',
         
        }}  
        name="Feed" 
        component={HomeScreen} />
         <Stack.Screen 
        name="home_detail"
        component={Home_detail} 
        options={{
          title: 'Articles & Information'
       }}
        />
        <Stack.Screen 
        name="full_video"
        component={FullScreen} 
        options={{
          title: 'Recommended Workouts',
          
       }}
        />
         <Stack.Screen 
        name="setting"
        component={SettingScreen} 
        options={{
          title: 'Settings'
       }}
        />
        <Stack.Screen 
    name="swr_info"
    component={SWR_Info} 
    options={{
      title: 'SWR (Strength to Weight Ratio)'
    }}
    />
    <Stack.Screen 
    name="change_pass"
    component={ChangePassword} 
    options={{
      title: 'Change Password'
    }}
    />
    <Stack.Screen 
    name="webview"
    component={WebView_Screen} 
    
    />
    <Stack.Screen 
    options={{
      title: 'Send Feedback'
    }}
    name = 'send_feedback' 
    component={SendFeedback}/>
      </Stack.Navigator>
    
  );
}
const fitnesstack=()=>{
  return (
    
      <Stack.Navigator  
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        color:'#FFFFFF',
        //fontFamily:'Montserrat',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal',
        fontFamily:'Montserrat-Regular',
        
      },
      }}
      initialRouteName="myfitness">
        <Stack.Screen 
        options={{
          title: 'My Fitness',
          headerShown:false,
          headerTitleAlign:'center',
          // headerRight: ({ color, size }) => (
          //   <Feather name="bell" color='#FFFF' style={{paddingRight:20}} size={18} />
          // ),
          // headerLeft: props => <SettingIcon  {...props} />,
        //  headerLeft: props => <Text>Lift Off</Text>,
         
        }}  
        name="My Fitness" 
        component={MyFitnessHome} />
        <Stack.Screen name="fitnes_sub" component={MyFitness_Subtype} />
        <Stack.Screen name="add_sets" component={Add_sets} />
        <Stack.Screen 
        name="setting"
        component={SettingScreen} 
        options={{
          title: 'Settings'
       }}
        />
        <Stack.Screen 
       options={{
        title: 'Exercise Log',
        headerShown: false,
        headerBackTitleVisible: false,
        headerRight: props => <FilterIcon  {...props} />,
        // headerRight: () => (
        //   <TouchableOpacity  onPress={() => alert('This is a button!')}>
        //     <Entypo style={{marginRight:10}} name='sound-mix' size={20} color='#ADF350'/>

        //   </TouchableOpacity>
        // ),
        // headerRight: () => (
        //   <Button
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#fff"
        //   />
        // ),
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        //color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
        name="personal_best"
        component={personalBest} 
       
        />
        <Stack.Screen 
    name="swr_info"
    component={SWR_Info} 
    options={{
      title: 'SWR (Strength to Weight Ratio)'
    }}
    />
    <Stack.Screen 
    name="change_pass"
    component={ChangePassword} 
    options={{
      title: 'Change Password'
    }}
    />
    <Stack.Screen 
    name="webview"
    component={WebView_Screen} 
    
    />
    <Stack.Screen 
    options={{
      title: 'Send Feedback'
    }}
    name = 'send_feedback' 
    component={SendFeedback}/>
      </Stack.Navigator>
    
  );
}
const challengestack = () =>{
  return(
  <Stack.Navigator  
  screenOptions={{
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: '#262727',
      borderBottomWidth: 0,
      shadowColor: 'transparent' 
    },
    cardStyle: { backgroundColor: '#1F1F1F' },
    activeTintColor:'#FFFFF',
    inactiveTintColor:'#FFFFF',
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: '600',
    color:'#FFFFFF',
    //fontFamily:'Montserrat',
    fontSize:16,
    lineHeight:20,
    fontStyle:'normal',
    fontFamily:'Montserrat-Regular',
    
  },
  }}
  initialRouteName="Compete">
    <Stack.Screen 
    options={{
       title: 'Compete Against Friends',
       
      headerTitleAlign:'center',
      // headerRight: ({ color, size }) => (
      //   <Feather name="bell" color='#FFFF' style={{paddingRight:20}} size={18} onPress={()=>alert('hello')} />
      // ),
      //headerLeft: props => <SettingIcon  {...props} />,
     

      
      //headerShown: false,
      // headerTintColor: '#fff',
     
    }}  
    name="Compete" 
    component={ChallengeMainScreen} />
    <Stack.Screen 
    options={{
       title: 'Create a Challenge'
    }}
    name = 'create_challenge' 
    component={Create_Challenge}/>
    <Stack.Screen 
    options={{
       title: 'Challenge Created'
    }}
    name = 'challenge_created' 
    component={Challenge_Created}/>
    <Stack.Screen 
    options={{
       title: 'Find Friends'
    }}
    name = 'find_friend' 
    component={Invite_Friends}/>
    <Stack.Screen 
    
    name = 'current_challenge' 
    component={CurrentChallenge}/>
    <Stack.Screen 
    
    name = 'history_challenge' 
    component={HistoryChallenge}/>
    <Stack.Screen 
    
    name = 'pending_challenge' 
    component={PendingChallenge}/>
    <Stack.Screen 
    
    name = 'start_challenge' 
    component={Start_Challenge}/>
    <Stack.Screen 
    
    name = 'challenge_detail' 
    component={Challenge_Detail}/>
    <Stack.Screen 
     options={{
      title: 'Connected Friends'
   }}
    name = 'connect_friend' 
    component={Connected_Friend}/>
     <Stack.Screen 
        name="setting"
        component={SettingScreen} 
        options={{
          title: 'Settings'
       }}
        />
    <Stack.Screen 
    name="swr_info"
    component={SWR_Info} 
    options={{
      title: 'SWR (Strength to Weight Ratio)'
    }}
    />
   
    <Stack.Screen 
    name="change_pass"
    component={ChangePassword} 
    options={{
      title: 'Change Password'
    }}
    />
    <Stack.Screen 
    name="webview"
    component={WebView_Screen} 
    
    />
    <Stack.Screen 
    options={{
      title: 'Send Feedback'
    }}
    name = 'send_feedback' 
    component={SendFeedback}/>
      
  </Stack.Navigator>
  )
}
const friendStack=()=>{
  return(
    <Stack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#262727',
        borderBottomWidth: 0,
        shadowColor: 'transparent' 
      },
      cardStyle: { backgroundColor: '#1F1F1F' },
      activeTintColor:'#FFFFF',
      inactiveTintColor:'#FFFFF',
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: '600',
      color:'#FFFFFF',
      //fontFamily:'Montserrat',
      fontSize:16,
      lineHeight:20,
      fontStyle:'normal',
      fontFamily:'Montserrat-Regular',
      
    },
    }}
    initialRouteName="Friend"
    >
      <Stack.Screen 
    options={{
       title: 'Friends',
       
      headerTitleAlign:'center',
      
    }}  
    name="Friend" 
    component={Friend_Home} />
    </Stack.Navigator>
  )
}
const profilestack=()=>{
  return (
    
      <Stack.Navigator  
       
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        color:'#FFFFFF',
        //fontFamily:'Montserrat',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal',
        fontFamily:'Montserrat-Regular',
        
        
      },
      }}
      initialRouteName="Profile"
      >
        <Stack.Screen 
        screenOptions={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#262727',
            borderBottomWidth: 0,
            shadowColor: 'transparent' 
          },
          cardStyle: { backgroundColor: '#1F1F1F' },
          activeTintColor:'#FFFFF',
          inactiveTintColor:'#FFFFF',
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: '500',
          color:'#FFFFFF',
          fontFamily:'Montserrat-Regular',
          fontSize:16,
          lineHeight:20,
          fontStyle:'normal',
          
          
        },
        }}
        options={{
          title: 'Profile',
          headerShown: false,
          cardStyle: { backgroundColor: '#1F1F1F' },
          headerTitleAlign:'center',
         
         

          
          //headerShown: false,
          // headerTintColor: '#fff',
         
        }}  
        name="Profile" 
        component={ProfileScreen} />
      <Stack.Screen 
      options={{
        headerBackTitleVisible: false,
        headerShown:'true',
        title:'Achievements',
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
      name = 'Achivements' 
      component={AchievmentMainScreen}/>
      <Stack.Screen 
      options={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
      name = 'Leaderboard' 
      component={LeaderBoard}/>
       <Stack.Screen 
       options={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        //color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
        name="setting"
        component={SettingScreen} 
        options={{
          title: 'Settings'
       }}
        />
        <Stack.Screen 
       options={{
        title: 'Personal Best',
        headerShown: false,
        headerBackTitleVisible: false,
        headerRight: props => <FilterIcon  {...props} />,
        // headerRight: () => (
        //   <TouchableOpacity  onPress={() => alert('This is a button!')}>
        //     <Entypo style={{marginRight:10}} name='sound-mix' size={20} color='#ADF350'/>

        //   </TouchableOpacity>
        // ),
        // headerRight: () => (
        //   <Button
        //     onPress={() => alert('This is a button!')}
        //     title="Info"
        //     color="#fff"
        //   />
        // ),
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        //color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
        name="personal_best"
        component={personalBest} 
       
        />
        <Stack.Screen 
       options={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        //color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
        name="camera"
        component={Camera} 
        options={{
          title: 'Camera'
       }}
        />
        <Stack.Screen 
       options={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#262727',
          borderBottomWidth: 0,
          shadowColor: 'transparent' 
        },
        cardStyle: { backgroundColor: '#1F1F1F' },
        activeTintColor:'#FFFFF',
        inactiveTintColor:'#FFFFF',
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: '600',
        //color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        fontSize:16,
        lineHeight:20,
        fontStyle:'normal'
        }
      }}
        name="webview"
        component={WebView_Screen} 
        options={{
          
       }}
        />
        <Stack.Screen 
    name="swr_info"
    component={SWR_Info} 
    options={{
      title: 'SWR (Strength to Weight Ratio)'
    }}
    />
    <Stack.Screen 
    name="edit_profile"
    component={EditProfile} 
    options={{
      title: 'Edit Profile'
    }}
    />
    <Stack.Screen 
    name="change_pass"
    component={ChangePassword} 
    options={{
      title: 'Change Password'
    }}
    />
    <Stack.Screen 
    name="history"
    component={History} 
    options={{
      title: 'History'
    }}
    />
    <Stack.Screen 
    
    name = 'challenge_detail' 
    component={Challenge_Detail}/>
    <Stack.Screen 
    options={{
       title: 'Challenge Created'
    }}
    name = 'challenge_created' 
    component={Challenge_Created}/>
    <Stack.Screen 
    options={{
      title:'Send Feedback'
    }}
    name = 'send_feedback' 
    
    component={SendFeedback}/>
    <Stack.Screen 
    options={{
       title: 'Find Friends'
    }}
    name = 'find_friend' 
    component={Invite_Friends}/>
    <Stack.Screen 
     options={{
      title: 'Connected Friends'
   }}
    name = 'connect_friend' 
    component={Connected_Friend}/>
      </Stack.Navigator>
    
  );
}
export default class TabNavigation extends React.Component {
  render(){
//console.log('in tabnavigator',this.props.route.params)
const {  initial } = this.props.route.params;

  return (
    
      <Tab.Navigator 
      initialRouteName={initial}
      tabBarOptions={{
        activeTintColor: '#ADF350',
        inactiveTintColor:'#FFFFFF',
        iconStyle:'#fff',
        keyboardHidesTabBar: true,
        
        style: {
           borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 0,
          height: 83,
          fontFamily:'Montserrat-Regular',
          // shadowOpacity: 0.1,
         // shadowRadius: 20,
          backgroundColor:'#262727',
         // borderRadius: 20,
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          position:'absolute',
          bottom:0,
          borderWidth:0
          //shadowOffset: { width: 0, height: 0 }
        }
      }}
      
      >
        <Tab.Screen 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
            
          ),
        }}
        name="Home" 
        component={feedstack} 
        />
        <Tab.Screen 
        name="Fitness" 
        component={fitnesstack} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
          // <Dumble width={40} height={20} fill={color}/>
            <Image
            source={require('../assets/dumble_new.png')}
            style={[
              
              {
                width: 40,
                height: 17,
                tintColor: color,
                height:20
              }
            ]}
          />
          ),
        }}
        />
        <Tab.Screen 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" color={color} size={size} />
          ),
        }}
        name="Compete"
         component={challengestack} 
         />
         <Tab.Screen 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" color={color} size={28} />
          ),
        }}
        name="Friend"
         component={friendStack} 
         />
        <Tab.Screen 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
        name="Profile" 
        initialParams={{modalVisible:modal_flag}}
        component={profilestack} 
        />
       
      </Tab.Navigator>
    
  );
  }
}
const styles=StyleSheet.create({
  filter_btn:{
    //position:'absolute',
       // top:-10,
       // right:10,
        width:44,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#81a84c",
        borderRadius:5,
        marginBottom:5,
        marginRight:5
        //zIndex:99999
  }
})