import { lOG_IN, LOGIN_SUCCESS, LOGIN_FAILUARE, LOG_OUT } from '../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text,StyleSheet,Platform,TextInput,SafeAreaView, TouchableOpacity, Image,KeyboardAvoidingView,ScrollView,ActivityIndicator,Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { login, loginInit } from '../../actions';
import { Container, Header, Content, Item, Input, Icon,Button } from 'native-base';
import InputNormal from '../../components/Input_normal';
import colors from '../../constant/colors'
import Btn_continue from '../../components/Btn_continue';
import {Toast, Root} from 'native-base';
import { changePassword } from '../../actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            oldpassword:'',
            password:'',
            confirmpassword:''
        }
    }
    componentDidMount(){
        
        
    }
    componentDidUpdate(prevProps){
      //  console.log('prevprops change', this.props.change_password, prevProps.change_password)
        if(prevProps.change_password !== this.props.change_password)
        if(this.props.change_password){
            this.props.navigation.goBack();
            return Toast.show({
                text: this.props.change_password_msg,
                textStyle: { color: "green" },
               // buttonText: "Okay",
                duration:2500
              })
        }else if(!this.props.change_password){
            return Toast.show({
                text: this.props.change_password_msg,
                textStyle: { color: "red" },
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
      //  console.log('login handle is calling')
        
        this.props.dispatchChangePassword(this.state.oldpassword, this.state.password,this.props.JWT_Token);
      };
    validate=()=>{
        let oldError = "";
       
        let passwordError = "";

        let confirmError = ""
        

        

        // if(!this.state.email){
        //     emailError = "Email field is required!";
        // }
        if(!this.state.oldpassword){
            oldError = "Old Password is required!";
        }else if(this.state.oldpassword.length < 6){
            oldError = 'Password must be at least 6 characters'
        }
        if(!this.state.password){
            passwordError = "Password is required!";
        }else if(this.state.password.length < 6){
            passwordError = 'New password must be at least 6 characters'
        }
        if(!this.state.confirmpassword){
            confirmError = "Confirm password is required!";
        }else if(this.state.confirmpassword.length < 6){
            confirmError = 'Confirm password must be at least 6 characters'
        }else if(this.state.password !== this.state.confirmpassword){
            confirmError = "Password does not match!"
        }
        if(oldError ||  passwordError || confirmError){
            this.setState({oldError,passwordError,confirmError});
            return false;
        }
        return true;
    }
    onchangeOldPass=(text)=>{
        this.setState({
            oldpassword:text,
            oldError:''
        })
    }
    onchangeConfirmPass=(text)=>{
        this.setState({
            confirmpassword:text,
            confirmError:''
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
    render(){
       
       
        const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 10
      //  console.log('auth error',this.props.autherror,this.props.user, this.props.JWT_Token)
        //alert(this.props.user)
        // if(this.props.authLoading){
        //     return(
        //         <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
        //         <ActivityIndicator size='large' color='white'/>
        //       </View>
        //     )
        // }
        // else {
        return(
            // <SafeAreaView style={{flex:1, backgroundColor:'#1F1F1F'}}>
           
            <KeyboardAvoidingView
            //keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F', marginBottom:83}}
            >
            {/* <SafeAreaView style={styles.container}> */}
            <ScrollView style={{flex:1, backgroundColor:'#1F1F1F'}}>
            <View style={styles.container}>
                {/* <View style={{height:windowHeight *(25/100),marginTop:20, justifyContent:'center', alignItems:'center'}}>
                   <Image
                   source= {require('../../assets/Logo.png')}
                   style={styles.Logo}
                   />
                </View> */}
                <View  style={{height:windowHeight *(40/100), justifyContent:'center'}}>
                <InputNormal 
                   placeholder='Old Password' 
                   icon='lock-closed'
                   value={this.state.oldpassword}
                   onChangeText={text => this.onchangeOldPass(text)}
                   name='oldpassword'
                   secure={true}
                   />
                   <Text style={styles.error}>{this.state.oldError}</Text>
                   <InputNormal 
                   placeholder='New Password' 
                   icon='lock-closed'
                   value={this.state.password}
                   onChangeText={(text)=>this.onchangePass(text)}
                   name='password'
                   secure={true}
                //    keyboardType={'visible-password'}
                //    /secureTextEntry={true}
                   />
                   <Text style={styles.error}>{this.state.passwordError}</Text>
                   <InputNormal 
                   placeholder='Confirm Password' 
                   icon='lock-closed'
                   value={this.state.confirmpassword}
                   onChangeText={(text)=>this.onchangeConfirmPass(text)}
                   name='confirmpassword'
                   secure={true}
                //    keyboardType={'visible-password'}
                //    /secureTextEntry={true}
                   />
                   <Text style={styles.error}>{this.state.confirmError}</Text>
                   {/* {this.state.passwordError && <Text style={styles.error}>{this.state.passwordError}</Text>} */}
                
                
                </View>
                <View  style={styles.login_btn_block}>
                   
                    <Btn_continue onPress={this.submit} title='Change'/>
                
                </View>
                
                
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            
            
        )
   // }
}
}

const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token,authLoading,message,change_password,change_password_msg} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token,authLoading,message,change_password,change_password_msg }
  }
  
  const mapDispatchToProps = {
    dispatchChangePassword:(old, password, jwt)=> changePassword(old,password,jwt)
  
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
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
        justifyContent:'center', 
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