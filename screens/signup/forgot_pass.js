import React from 'react';
import { Component } from 'react';
import {Toast, Root} from 'native-base';
import {View , Text, StyleSheet,Image,KeyboardAvoidingView,ScrollView, Dimensions,ActivityIndicator} from 'react-native';
import InputNormal from '../../components/Input_normal';
import Btn_continue from '../../components/Btn_continue';
import colors from '../../constant/colors';
import axios from 'axios';
import  Icon  from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class  ForgotPassword extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            loading:false
        }
    }
    validate=()=>{
       
       
        let emailError = "";
        

        
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email || reg.test(this.state.email) === false){
            emailError = "Email Field is Invalid!";
        }
       
        
        if(emailError ){
            this.setState({emailError});
            return false;
        }

        return true;
    }
    getHeaders=(jwt)=> {
      return {
        'Authorization': 'Bearer ' + jwt,
        
      };
    }
    forgotHandler=()=>{
       console.log('fogot is calling')
       //const url =  colors.baseURL+'auth/forgotpassword'
       this.setState({
         loading:true
       })
       axios({
        method: 'POST',
        url:colors.baseURL+'auth/forgotpassword',
       headers: {'header' :' X-Requested-With:XMLHttpRequest',
                 'Accept':'application/json'
                },
        data: {
          email:this.state.email,
          //email:email_,
         
        }
      })
  
      .then((response) => {
      console.log('respons elogout', response.data)
        if(response.status == 200) {
         // console.log('response in login', response.data.access_token)
          this.props.navigation.navigate('Login')
          this.setState({
            loading:false
          })
          return Toast.show({
            text: "Varification code hase been send to you email",
            textStyle: { color: "yellow" },
            buttonText: "Okay",
            type: "success"
          })
        }else if(response.status == 401){
        // console.log('response in login', response.error)
         this.setState({
          loading:false
        })
         return Toast.show({
            text: "Something went wrong",
            textStyle: { color: "yellow" },
            buttonText: "Okay",
            type: "success"
          })
        }
        if(response.status == 422){
          this.setState({
            loading:false
          })
            return Toast.show({
                text: "Something went wrong",
                textStyle: { color: "yellow" },
                buttonText: "Okay",
                type: "success"
              })
        }
      })
      .catch((error) => {
        this.setState({
          loading:false
        })
        if(error.response.status == 422) {
          console.log('error in catch',error.response.status);
            return Toast.show({
                text: "This email is not registered with us",
                textStyle: { color: "red" },
                buttonText: "Okay",
                //type: "success"
              })
        }else {
          console.log('error in catch',error);
          return Toast.show({
            text: "Something went wrong!",
            textStyle: { color: "red" },
            buttonText: "Okay",
            //type: "success"
          })
        }
       
        console.log('error in catch',error);
      });
       
     
    }
    submit=()=>{    
        if(this.validate()){
            //  console.warn(this.state);
            // this.setState(defaultState);
            this.forgotHandler()
        }
    }
    render(){
      if(this.state.loading){
        return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#363636', }}>
            <ActivityIndicator size='large' color='#262727'/>
          </View>
        )
    }
    else {
        return(
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F'}}
            >
            {/* <SafeAreaView style={styles.container}> */}
            
            <ScrollView contentContainerStyle={{flex:1, backgroundColor:'#1F1F1F', justifyContent:'center'}}>
            
            <View style={{height:windowHeight * (30/100), justifyContent:'center', alignItems:'center'}}>
            <View style={{marginTop:20, width:'100%',alignItems:'flex-start', justifyContent:'flex-start', marginLeft:5}}>
              <Icon name ='arrow-back' size={24} color='#FFFFFF' onPress={()=>this.props.navigation.goBack()}/>
            </View>
                   <Image
                   source= {require('../../assets/Logo.png')}
                   style={styles.Logo}
                   />
            </View>
            
            <View style={{justifyContent:'flex-end', alignItems:'center'}}>
           
            <View style={{height:windowHeight * (50/100), width:'90%',justifyContent:'center', alignItems:'center', marginBottom:20}}>
            <View style={{justifyContent:'center', alignItems:'center', marginBottom:20}}>
                <Text style={styles.text}>Enter the email associated with your
account to reset your password</Text>
            </View>
            <InputNormal 
                   placeholder='youremail@gmail.com' 
                   icon_type='Fontisto' 
                   icon='email'
                   value={this.state.email}
                   onChangeText={(text)=>this.setState({email:text})}
                   name='phone'
                   keyboardType={'email-address'}
                   autoCapitalize = 'none'
                   />
                   <Text style={styles.error}>{this.state.emailError}</Text>
            </View>
            </View>
           <View style={{height:windowHeight * (10/100), width:'90%', justifyContent:'center', alignItems:'flex-end'}}>
           <Btn_continue onPress={this.submit} title='Send'/>
           </View>
           </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    Logo: {
        width: 170,
        height: 170,
        maxWidth:'100%',
        maxHeight:'100%'
      },
    text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,

        alignItems: 'center',

        color:'#FFFFFF'
    },
    error:{
        color:'#fa2a31',
        fontSize:12,
        marginVertical:5,
        textAlign:"left",
        width:'90%',
        marginLeft:35
    }
})