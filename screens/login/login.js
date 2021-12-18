import { lOG_IN, LOGIN_SUCCESS, LOGIN_FAILUARE, LOG_OUT } from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Switch,Platform,TextInput,SafeAreaView, TouchableOpacity, Image,KeyboardAvoidingView,ScrollView,ActivityIndicator,Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { login, loginInit } from '../../actions';
import { Container, Header, Content, Item, Input, Icon,Button } from 'native-base';
import InputNormal from '../../components/Input_normal';
import colors from '../../constant/colors'
import Btn_continue from '../../components/Btn_continue';
import {Toast, Root} from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class LoginScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            phone:'',
            password:'',
            deviceToken:'',
            rememberMe:false,
            username:''
        }
    }
    async  componentDidMount(){
        this.props.loginInit();
        const {  deviceToken } = this.props.route.params;
        this.setState({
            deviceToken:deviceToken
        });
        const user = await this.getRememberedUser();
        this.setState({ 
        email: user.username || "", 
        password:user.password || "",
        rememberMe: user ? true : false });
    }
    componentDidUpdate(prevProps){
        if(prevProps.autherror !== this.props.autherror)
        if(this.props.autherror){
            return Toast.show({
                text: this.props.message,
                textStyle: { color: "yellow" },
               // buttonText: "Okay",
                duration:2500
              })
        }
        // else
        // if(this.props.login_success){
        //     this.props.navigation.navigate('createprofile')
        //     return Toast.show({
        //         text: "User register successfully",
        //         textStyle: { color: "yellow" },
        //         buttonText: "Okay",
        //         type: "success"
        //       });
            
        // }
    } 
    _loginHandler = async () => {
       // console.log('login handle is calling')
        const os = Platform.OS
        await this.props.dispatchLogin(this.state.email, this.state.password,this.state.deviceToken,os);
      };
    validate=()=>{
        let emailError = "";
       
        let passwordError = "";
        

        

        // if(!this.state.email){
        //     emailError = "Email field is required!";
        // }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         if(!this.state.email || this.state.email == ''){
            emailError = "Email is required!";
        }else
        if(reg.test(this.state.email) === false){
            emailError = "Email is invalid!";
        }
        if(!this.state.password){
            passwordError = "Password is required!";
        }else if(this.state.password.length < 6){
            passwordError = "Password must be at least 6 characters";
        }
        
        if(emailError ||  passwordError ){
            this.setState({emailError,passwordError});
            return false;
        }

        return true;
    }
    onchangeEmail=(text)=>{
        this.setState({
            email:text,
            emailError:''
        })
    }
    onchangePass=(text)=>{
        this.setState({
            password:text,
            passwordError:''
        })
    }
    submit=()=>{    
        if(this.validate()){
            //  console.warn(this.state);
            // this.setState(defaultState);
            this._loginHandler()
        }
    }
    toggleRememberMe = value => {
        console.log('toggle', value)
        this.setState({ rememberMe: value })
          if (value === true) {
        //user wants to be remembered.
          this.rememberUser();
        } else {
          this.forgetUser();
        }
    } 
    rememberUser = async () => {
        console.log('remember user is callign',)
        try {
            // obj={
            //     email:this.state.email,
            //     password:this.state.password
            // }
          await AsyncStorage.setItem('username', this.state.email);
          await AsyncStorage.setItem('pass', this.state.password);
        } catch (error) {
          console.log('eror emenbrt', error)
        }
        };
        getRememberedUser = async () => {
            console.log('get remn=mbers is calling')
        try {
          const username = await AsyncStorage.getItem('username');
          const password = await AsyncStorage.getItem('pass');
          console.log('username i get', username, password)
          if (username !== null && password !== null) {
            // We have username!!
            let obj ={
                'username':username,
                'password':password
            }
            return obj;
          }
        } catch (error) {
          console.log('getremeber', error)
        }
        };
        forgetUser = async () => {
            try {
              await AsyncStorage.removeItem('username');
              await AsyncStorage.removeItem('pass');
            } catch (error) {
             // Error removing
            }
          };        
    render(){
       
       
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 10
       
        //alert(this.props.user)
        console.log('emailllll',this.state.email)
        if(this.props.authLoading){
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                <ActivityIndicator size='large' color='white'/>
              </View>
            )
        }
        else {
        return(
            // <SafeAreaView style={{flex:1, backgroundColor:'#1F1F1F'}}>
           
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            //keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F'}}
            >
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView style={{flex:1, backgroundColor:'#1F1F1F'}}>
            <View style={styles.container}>
                <View style={{height:windowHeight *(25/100),marginTop:20, justifyContent:'center', alignItems:'center'}}>
                   <Image
                   source= {require('../../assets/Logo.png')}
                   style={styles.Logo}
                   />
                </View>
                <View  style={{height:windowHeight *(50/100), justifyContent:'center'}}>
                <InputNormal 
                   placeholder='Email' 
                   icon_type='Fontisto' 
                   icon='email'
                   value={this.state.email}
                   onChangeText={text => this.onchangeEmail(text)}
                   name='email'
                   keyboardType={'email-address'}
                   autoCapitalize = 'none'
                
                   />
                   <Text style={styles.error}>{this.state.emailError}</Text>
                   <InputNormal 
                   placeholder='Password' 
                   icon='lock-closed'
                   value={this.state.password}
                   onChangeText={(text)=>this.onchangePass(text)}
                   name='password'
                   secure={true}
                //    keyboardType={'visible-password'}
                //    /secureTextEntry={true}
                   />
                   <Text style={styles.error}>{this.state.passwordError}</Text>
                   
                   {/* {this.state.passwordError && <Text style={styles.error}>{this.state.passwordError}</Text>} */}
                   <View  style={styles.forgot_text_block}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('forgot')}>
                        <Text style={styles.forgotPassword_text}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>  
                <View  style={styles.forgot_text_block}>
                <Switch
                value={this.state.rememberMe}
                onValueChange={(value) => this.toggleRememberMe(value)}
                /><Text>Remember Me</Text>
                </View>
                
                </View>
                <View  style={styles.login_btn_block}>
                   
                    <Btn_continue onPress={this.submit} title='Sign In'/>
                
                </View>
                <View style={{height:windowHeight * (10/100), justifyContent:'center',alignItems:'flex-end'}}>
                    <TouchableOpacity style={{height:50}} onPress={()=>this.props.navigation.navigate('Signup')}>
                    
                    <Text style={styles.footer_text}>Don't have account? <Text style={{color:colors.primary,fontFamily:'Montserrat-Regular'}}>Sign Up</Text></Text>
                   
                    </TouchableOpacity>
                </View>
                
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
            
        )
    }
}
}

const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token,authLoading,message} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token,authLoading,message }
  }
  
  const mapDispatchToProps = {
   dispatchLogin: (username, password, deviceToken, os) => login(username, password, deviceToken, os),
   loginInit:()=>loginInit()
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
const styles = StyleSheet.create({
    container:{
        flex:1,
         justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#1F1F1F'
    },
    Logo: {
        width: 150,
        height: 150,
        maxWidth:'100%',
        maxHeight:'100%',
        //marginTop:20
      },
    forgotPassword_text:{
        fontSize:13,
        lineHeight:15.85,
        fontWeight:'500',
        color:colors.primary,
        marginTop:5,
        fontFamily:'Montserrat-Regular'
    },
    forgot_text_block:{

        height:windowHeight *(3/100),
        justifyContent:'flex-start',
        alignItems:'flex-end'
    },
    login_btn_block:{
        height:windowHeight * (13/100),
        flexDirection:'row', 
        width:'80%', 
        justifyContent:'flex-end', 
        alignItems:'flex-start'
    },
    footer_text:{
        fontSize:13,
        fontWeight:'500',
        lineHeight:16,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    error:{
        color:'#fa2a31',
        fontSize:12,
        marginVertical:5
    }
})