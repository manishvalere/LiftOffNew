
import React, { Component } from 'react';
import {Toast, Root} from 'native-base';
import { View, Text,StyleSheet,Platform,Dimensions,Keyboard,TouchableWithoutFeedback, ActivityIndicator,TouchableOpacity, Image ,SafeAreaView, ScrollView,KeyboardAvoidingView} from 'react-native';
import { connect } from 'react-redux'
import { login,signup,signupInit } from '../../actions';
import { Container, Header, Content, Item, Input, Icon,Button } from 'native-base';
import InputNormal from '../../components/Input_normal';
import colors from '../../constant/colors'
import Btn_continue from '../../components/Btn_continue';
import { setProfileValue } from '../../actions';
import PhoneInput from "react-native-phone-number-input";
import * as Font from 'expo-font'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const defaultState = {
    phone:'',
    email:'',
    password:'',
    confirmpass:''
}
export class SignupScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            phone:'',
            realphone:'',
            email:'',
            password:'',
            confirmpass:'',
            showToast: false,
            loading: true,
            deviceToken:''
        }
    }
   
    componentDidUpdate(prevProps){
        if(prevProps.sigupError  !== this.props.sigupError){
            if(this.props.sigupError){
              //  console.log('')
                return Toast.show({
                    text: this.props.signupErrorText,
                    textStyle: { color: "yellow" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }
        }
        else
        if(prevProps.signup_success  !== this.props.signup_success){
        if(this.props.signup_success){
            this.props.navigation.navigate('createprofile')
            return Toast.show({
                text: "User register successfully",
                textStyle: { color: "yellow" },
                //buttonText: "Okay",
                type: "success",
                duration:2500
            });
            
        }
    }
    }   
    componentWillUnmount(){
       // console.log('component will unmount is calling in sign up ')
        //this.props.dispatchsignupInit()
    }
    
    validate=()=>{
        let phoneError = "";
        let emailError = "";
        let passwordError = "";
        let confirmpassError = ""

        if(!this.state.realphone){
            phoneError = "Phone is required";
        }else if(this.state.realphone.length != 10){
            phoneError = "Please enter valid 10 digit number";
        }

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.props.email || this.props.email == null){
            emailError = "Email is required!";
        }else
        if(reg.test(this.props.email) === false){
            emailError = "Email is invalid!";
        }
        

        if(!this.state.password){
            passwordError = "Password is required!";
        }else if(this.state.password.length < 6){
            passwordError = "The password must be at least 6 characters";
        }
        if(!this.state.confirmpass ){
            confirmpassError = "Confirm password is required!";
        }else if(this.state.confirmpass.length < 6){
            confirmpassError = "The password must be at least 6 characters";
        }
        else if(this.state.password !== this.state.confirmpass){{
            confirmpassError = "Password and confirm password does not match!"
        }}
        if(emailError || phoneError || passwordError || confirmpassError){
            this.setState({phoneError,emailError,passwordError,confirmpassError});
            return false;
        }

        return true;
    }
    UNSAFE_componentWillMount = async() => {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        })
        this.setState({ loading: false })
      }
    submit=()=>{
        if(this.validate()){
            // console.warn(this.state);
            // this.setState(defaultState);
            this.signup_handler()
        }
    }
    componentDidMount=()=>{
        this.props.dispatchsignupInit();
        const {  deviceToken } = this.props.route.params;
//console.log('device token in sign ',deviceToken);
        this.setState({
            deviceToken:deviceToken
        })
    }
    signup_handler = async () => {
        const os = Platform.OS
      //  console.log('signup handler is calling')
      //  console.log('state', this.state)
        const {phone, email, password, confirmpass} = this.state
        await this.props.dispatchSignup(phone, this.props.email, password, this.state.deviceToken, os);
      };
      _setValue = (fieldName, value) => {
      //  console.log('Set value in uurscreen');
        this.props.dispatchSetProfileValue(fieldName, value);
       // console.log('in set value',this.props.profile)
      }
    onchangePhone=(text)=>{
      //  console.log('phone',text)
        this.setState({
            phoneError:'',
            phone:text
        })
    }
    onchangeRealPhone=(text)=>{
      //  console.log('phone',text)
        this.setState({
            phoneError:'',
            realphone:text
        })
    }
    onchangeEmail=(fieldName,value )=>{
        this.setState({
            emailError:'',
            
        });
        this._setValue(fieldName,value)
    }
    onchangePassword=(text)=>{
        this.setState({
            passwordError:'',
            password:text
        })
    }
    onchangeConfirmpass=(text)=>{
        this.setState({
            confirmpassError:'',
            confirmpass:text
        })
    }
    
    render(){
       
        //console.log('sing height ', windowHeight * (20/100), windowHeight)
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 10
         //console.log('sigup screen sigupError', this.props.email)
        if(this.props.loading){
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                <ActivityIndicator size='large' color='white'/>
              </View>
              )
            } else 
        
        if (this.props.authLoading) {
            return (
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                <ActivityIndicator size='large' color='white'/>
              </View>
            )
          } else {
        //console.log('sign up page', this.state)
        return(
        //     <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : null}
        //     keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        //     <ScrollView>
        //       {...}
        //     </ScrollView>
        //   </KeyboardAvoidingView>
            
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
           // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F'}}
            >
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView style={{flex:1, backgroundColor:'#1F1F1F'}}>
            <View style={styles.container}>
            
                
                <View style={{height:windowHeight * (25/100),marginTop:20, justifyContent:'center', alignItems:'center'}}>
                   <Image
                   source= {require('../../assets/Logo.png')}
                   style={styles.Logo}
                   />
                </View>
                <View style={{height:windowHeight * (50/100), justifyContent:'center'}}>
                   
                   <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Item  style={styles.item}>
                    
                    <PhoneInput
                    ref={(ref) => { this.phone = ref; }}
                    defaultValue={this.state.realphone}
                    defaultCode="US"
                    layout="first"
                    onChangeText={(text)=>this.onchangeRealPhone(text)}
                    onChangeFormattedText={(text)=>this.onchangePhone(text)}
                    style={styles.input}
                    withDarkTheme={true}
                    withShadow
                    autoFocus
                    textInputStyle = {styles.input }
                    containerStyle={styles.input_container}
                    textContainerStyle={styles.input_container}
                    codeTextStyle={styles.input_code}
                    flagButtonStyle={styles.flag_btn}
                    textInputProps={{placeholderTextColor:'rgba(255, 255, 255, 0.3)',selectionColor:'#4287f5'}}
                    disableArrowIcon
                    placeholder='Phone Number'
                    
                />
            </Item>
            </TouchableWithoutFeedback>
                  
           

           
                   <Text style={styles.error}>{this.state.phoneError}</Text>
                   <InputNormal 
                   placeholder='Email' 
                   icon_type='Fontisto' 
                   icon='email'
                   value={this.props.email}
                   onChangeText={text => this.onchangeEmail('email',text)}
                   name='email'
                   keyboardType={'email-address'}
                   autoCapitalize = 'none'
                   />
                   <Text style={styles.error}>{this.state.emailError}</Text>
                   <InputNormal 
                   placeholder='Password' 
                   icon='lock-closed'
                   value={this.state.password}
                   onChangeText={(text)=>this.onchangePassword(text)}
                   name='password'
                   secure={true}
                //    keyboardType={'visible-password'}
                //    /secureTextEntry={true}
                   />
                   <Text style={styles.error}>{this.state.passwordError}</Text>
                   <InputNormal 
                   placeholder='Confirm Password' 
                   icon='lock-closed'
                   value={this.state.confirmpass}
                   onChangeText={(text)=>this.onchangeConfirmpass(text)}
                   name='confirmpassword'
                   secure={true}
                   />
                   <Text style={styles.error}>{this.state.confirmpassError}</Text>
                   
                </View>
                
                <View  style={styles.login_btn_block}>
                   
                    <Btn_continue onPress={this.submit} /*onPress={()=>this.props.navigation.navigate('createprofile')}*/  title='Sign Up'/>
                
                </View>
                
               
            
            <View style={{height:windowHeight * (10/100), justifyContent:'flex-end',alignItems:'center'}}>
                    <TouchableOpacity style={styles.already} onPress={()=>this.props.navigation.navigate('Login')}>
                    
                    <Text style={styles.footer_text}>Already have an account? <Text style={{color:colors.primary,fontFamily:'Montserrat-Regular'}}>Sign In</Text></Text>
                   
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
    const {user,isLoggedIn, authLoading,sigupError, signup_success, email,signupErrorText} = state.auth
   return { user,isLoggedIn,authLoading,sigupError,signup_success,email,signupErrorText }
  }
  
  const mapDispatchToProps = {
    dispatchSignup: (phone,email, password, deviceToken, os) => signup(phone,email, password, deviceToken, os),
    dispatchsignupInit:() => signupInit(),
    dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        // /backgroundColor:'yellow',
       // height:'100%'
       
    },
    Logo: {
        width: 150,
        height: 150,
        maxWidth:'100%',
        maxHeight:'100%'
      },
    forgotPassword_text:{
        fontSize:13,
        lineHeight:15.85,
        fontWeight:'500',
        color:colors.primary,
        marginTop:5,
       
    },
    forgot_text_block:{
        
        justifyContent:'flex-start',
        alignItems:'flex-end',
       
    },
    login_btn_block:{
        
        flexDirection:'row', 
        width:'80%', 
        height: windowHeight * (13/100),
        justifyContent:'flex-end', 
        alignItems:'center',
        
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
    },
    already:{
        height:50
    },
    input:{
        fontSize:16,
        lineHeight:20,
        height:40,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular',
        //backgroundColor:'blue'
    },
    input_code:{
        fontSize:16,
        //lineHeight:20,
        height:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular',
        justifyContent:'flex-end',
        alignItems:'center',
       // backgroundColor:'yellow'
    },
    item:{
        width:'80%',
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        height:40
    },
    input_container:{
        backgroundColor:'transparent',
        height:40
    },
    flag_btn:{
        backgroundColor:'transparent',
        justifyContent:'flex-start',
        alignItems:'center',
        height:40,
        width:40
    }
})