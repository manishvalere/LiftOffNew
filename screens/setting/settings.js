import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity ,Platform,Image, ScrollView,Linking,Switch,Alert,ActivityIndicator} from 'react-native';
import Constants from 'expo-constants'
import { logout } from '../../actions';
import { connect } from 'react-redux';
import colors from '../../constant/colors';
import {Toast, Root} from 'native-base'
import {MaterialIcons,MaterialCommunityIcons,Feather} from 'react-native-vector-icons'
import messaging from '@react-native-firebase/messaging';
import { deleteAccont  ,sendFeedback,setNotification, updateProfileValue,setProfileValue} from '../../actions';
export class SettingScreen extends Component{
    constructor(props){
        super(props);
        this.state={
             isEnabled:null,
             token:''
        }
    }
    logout_=()=>{
       // console.log('logour is calling')
        this.props.dispatchLogout(this.props.JWT_Token)
    }
    componentDidMount(){
        //this.requestUserPermission()
        //this.toggleNotification();
        if(this.props.user.notify_workout !== null){
            if(this.props.user.notify_workout == 'on'){
                this.setState({
                    isEnabled:true
                })
            }else if(this.props.user.notify_workout == 'off'){
                this.setState({
                    isEnabled:false
                })
            }
        }else{
            this.setState({
                isEnabled:false
            })
        }
        
    }
    // async toggleNotification(){
    //     const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // console.log('enable', enabled)
    // if (enabled) {
    //   this.setState({
    //       isEnabled:true
    //   })
    // }
    // }
    componentDidUpdate(prevProps){
        if(this.props.logoutError !== prevProps.logoutError){
            if(this.props.logoutError){
                return Toast.show({
                    text: 'Somethong went wrong!',
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }
        }
        if(this.props.autherror !== prevProps.autherror){
            if(this.props.autherror){
                return Toast.show({
                    text: 'Somethong went wrong!',
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }
        }
        if(this.props.update_succes !== prevProps.update_succes){
             if(this.props.update_succes == false){
              return Toast.show({
                  text: 'Something went wrong!',
                  textStyle: { color: "red" },
                  //buttonText: "Okay"
                  duration:2500
                })
            }
        }
        if(this.props.user !== prevProps.user){
            if(this.props.user.notify_workout !== null){
                if(this.props.user.notify_workout == 'on'){
                    this.setState({
                        isEnabled:true
                    })
                }else if(this.props.user.notify_workout == 'off'){
                    this.setState({
                        isEnabled:false
                    })
                }
            }else{
                this.setState({
                    isEnabled:false
                })
            }
            
        }
        
    }
    async  saveTokenToDatabase(token) {
        // Assume user is already signed in
        // const userId = auth().currentUser.uid;
        // console.log('userID',userId)
        // Add the token to the users datastore
        // await firestore()
        //   .collection('users')
        //   .doc(userId)
        //   .update({
        //     tokens: firestore.FieldValue.arrayUnion(token),
        //   });
        setToken(token)
      }
    async  UserPermission(){
        const authStatus = await messaging().hasPermission();
        return authStatus
       
      }
      async requestUserPermission(){
          const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
            messaging()
            .getToken()
            .then(token => {
             // console.log('device token', token)
              return _setValue = (fieldName, value) => {
                // console.log('Set value in uurscreen');
                 this.props.dispatchSetProfileValue('device_token', token);
                // console.log('in set value',this.props.profile)
               }
            });
      }
    }
     onPress_btn=async()=>{
        
            // const childelement = this.ChildElement.current;
            // const notify_workout = childelement.state.value
            const {fname,lname,email,age,weight,height,workout_week,notify_workout, inch, gender,device_token} = this.props
            const data={
                first_name:fname,
                last_name:lname,
                email:email,
                dob:age,
                gender:gender,
                weight:weight,
                height:height+'’ '+inch+'”',
                workout_week:workout_week,
                notify_workout:'off',
                device_token:device_token
            }
            //console.log('data',data)
            if(this.props.user.notify_workout == 'on'){
                const authStatus = await messaging().requestPermission();
                const enabled =
                  authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                  authStatus === messaging.AuthorizationStatus.PROVISIONAL;
              
                if (enabled) {
                    messaging()
                    .getToken()
                    .then(token => {
                      //console.log('device token', token)
                      return _setValue = (fieldName, value) => {
                        // console.log('Set value in uurscreen');
                         this.props.dispatchSetProfileValue('device_token', token);
                        // console.log('in set value',this.props.profile)
                       }
                    });
              }
                this.props.dispatchSetProfileValue('notify_workout', 'off');
                const data={
                    
                    notify_workout:'off',
                   
                }
               
                this.props.dispatchUpdateProfile(this.props.JWT_Token,data);
            }else {
                this.props.dispatchSetProfileValue('notify_workout', 'on');
                const data={
                    
                    notify_workout:'on',
                    
                }
               // console.log('data in btn four', data)
                this.props.dispatchUpdateProfile(this.props.JWT_Token,data);
            }
                
            
           // console.log('Set value in uurscreen');
            
    
            
        
    }
    deleteAccount=()=>{
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to delete this account",
            [
              // The "Yes" button
              {
                text: "Yes",
                onPress: () => {
                this.props.dispatchDeleteAccount(this.props.JWT_Token)
                },
              },
              // The "No" button
              // Does nothing but dismiss the dialog when tapped
              {
                text: "No",
              },
            ]
          );
    }
    // async  requestUserPermission(){
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    //   }
    render(){
        //console.log('this.props.user', this.props.user)
        if(this.props.authLoading){
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                <ActivityIndicator size='large' color='white'/>
              </View>
            )
        }else{
        const  url_base =colors.baseURL+'auth/'
       // console.log('switch', this.state.isEnabled)
        return(
            <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.text}>Account Settings</Text>
                <View style={styles.first_block}>
                    <TouchableOpacity onPress={this.onPress_btn} style={styles.btn_block}>
                        <Text style={styles.option}>Notification</Text>
                        <Switch
                            trackColor={{ false: "#ADF350", true: "#ADF350" }}
                            thumbColor={this.state.isEnabled ? "#1F1F1F" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.onPress_btn}
                            value={this.state.isEnabled}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={styles.btn_block_btm} 
                    onPress={() => {
                   this.props.navigation.navigate('change_pass')
                    }}
                    >
                        <Text style={styles.option}>Change Password</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Support</Text>
                <View style={styles.second_block}>
                <TouchableOpacity 
                style={styles.btn_block}
                onPress={() => {
                    this.props.navigation.navigate('webview',
                    {
                        title:'About Us',
                        url:url_base+'about-us'
                 
                     })
                     }}
                >
                        <Text style={styles.option}>About Us</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.navigation.navigate('webview',
                        {
                            title:'Privacy Policy',
                            url:url_base+'privacy-policy'
                     
                         })
                         }}
                    style={styles.btn_block}
                    >
                        <Text style={styles.option}>Privacy Policy</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.navigation.navigate('webview',
                        {
                            title:'Terms & Conditions',
                            url:url_base+'term-conditions'
                     
                         })
                         }}
                    style={styles.btn_block}
                    >
                        <Text style={styles.option}>Terms & Conditions</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.navigation.navigate('send_feedback')
                         }}
                    style={styles.btn_block}
                    >
                        <Text style={styles.option}>Send a Feedback</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={this.logout_} 
                    style={styles.btn_block}
                    >
                        <Text style={styles.option}>Logout</Text>
                        <MaterialCommunityIcons  style={styles.option_icon} name='logout-variant' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.deleteAccount} style={styles.btn_block_btm}>
                        <Text style={styles.option}>Delete Account</Text>
                        <Feather style={styles.option_icon} name='trash' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>More</Text>
                <View style={styles.first_block}>
                    <TouchableOpacity style={styles.btn_block_btm} onPress={()=>this.props.navigation.navigate('swr_info')}>
                        <Text style={styles.option}>SWR (Strength to Weight Ratio)</Text>
                        <MaterialIcons style={styles.option_icon} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} />
                    </TouchableOpacity>
                    
                </View>
            </View>
            </ScrollView>
        )                
    }
    }
}
const mapStateToProps = state => {
    const {user,authLoading,isLoggedIn,logoutError,JWT_Token,autherror,fname,lname,email,age,weight,height,workout_week,notify_workout, inch, gender,device_token,update_succes} = state.auth
    const {count} = state.count
   return { user,isLoggedIn,authLoading ,count,logoutError,JWT_Token,autherror,fname,lname,email,age,weight,height,workout_week,notify_workout, inch, gender,device_token,update_succes}
}

const mapDispatchToProps = {
  dispatchLogout: (jwt) => logout(jwt),
  dispatchIncriment: (count) => changeCount(count),
  dispatchDeleteAccount: (jwt) => deleteAccont(jwt),    
  dispatchsetNotification:(jwt, token, type) => setNotification(jwt, token, type),
  dispatchUpdateProfile:(token, profile)=>updateProfileValue(token, profile),
  dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value)
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)

const styles = StyleSheet.create({
    container:{
        //flex:1,
        justifyContent:'flex-start',
        //alignItems:'center', 
        marginBottom:83,
        //paddingTop:Platform.OS === 'ios' ? 0 : Constants.statusBarHeight ,
        backgroundColor:'#1F1F1F',
        marginHorizontal:10
    },
    first_block:{
        //flex:0.25,
        backgroundColor:'#262727',
        marginHorizontal:10,
        borderRadius:10,
        marginBottom:20,
        margin:10
    },
    second_block:{
        //flex:0.75,
        backgroundColor:'#262727',
        margin:10,
        borderRadius:10,

    },
    text:{
       
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF',
        marginVertical:10,
        marginHorizontal:25,
        fontFamily:'Montserrat-Regular',
        },
    btn_block:{
       // marginHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:'#151515',
        borderBottomWidth:1,
        marginHorizontal:15
    },
    btn_block_btm:{
        // marginHorizontal:10,
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
        //  borderBottomColor:'#151515',
        //  borderBottomWidth:1,
         marginHorizontal:15
     },
    option:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 44,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular',
    //    / marginHorizontal:10
    },
    option_icon:{
        fontStyle: 'normal',
        fontWeight: '500',
        //fontSize: 14,
        lineHeight: 44,
        color: 'rgba(255, 255, 255, 0.5)',
        // /marginHorizontal:10
    }
            

})
//https://stackoverflow.com/questions/61370418/enable-disable-firebase-push-notifications-in-react-native-app