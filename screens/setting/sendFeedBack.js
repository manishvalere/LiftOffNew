import React from 'react';
import { Component } from 'react';
import {View , TextInput, StyleSheet, Text} from 'react-native';
import { connect } from 'react-redux';
import {Toast, Root} from 'native-base';
import Btn_continue from '../../components/Btn_continue';
import { sendFeedback } from '../../actions';
export class SendFeedback extends Component{
    constructor(props){
        super(props);
        this.state={
            feedback:'', 
            error:''
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.feedback !== this.props.feedback){
            if(this.props.feedback){
                this.props.navigation.goBack();
                return Toast.show({
                    text: this.props.message,
                    textStyle: { color: "green" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }else if(!this.props.feedback){
                
                return Toast.show({
                    text: this.props.message,
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }
        }
    }
    valid=()=>{
        if(this.state.feedback == ''){
            this.setState({
                error:'Please fill the feedback'
            })
            return false;
        }
       // console.log('if in treu is calling')
        return true;
    }
    submit=()=>{
        if(this.valid()){
       // console.log('in submit after valid true')
            this.props.dispatchSendFeedback(this.props.JWT_Token, this.state.feedback)
        }
    }
    render(){
        return(
            <View style={StyleSheet.container}>
               <View style={styles.textBlock}>
                   <Text style={styles.text}>
                   Send us some feedback, or ask us  for help!
                   </Text>
               </View>
               <View style={styles.textAreaContainer} >
                    <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Write your feedback......."
                    placeholderTextColor="grey"
                    numberOfLines={4}
                    multiline={true}
                    maxLength={250}
                    onChangeText={(text)=>this.setState({feedback:text})}
                    
                    />
                </View>
                <View style={styles.error_block}>
                    {this.state.error !== ''? <Text style={styles.error_text}>Please fill the feedback!</Text> : null}
                </View>
                <View style={styles.btn_block}>
                <Btn_continue onPress={this.submit} title='Submit'/>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn,logoutError,JWT_Token,autherror,feedback,message} = state.auth
    
   return { user,isLoggedIn ,logoutError,JWT_Token,autherror,feedback,message}
}

const mapDispatchToProps = {
  dispatchLogout: (jwt) => logout(jwt),
  dispatchSendFeedback:(jwt, feedback) => sendFeedback(jwt,feedback)
}


export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback)
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:83,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    error_block:{
        justifyContent:'center',
        alignItems:'center',
        padding: 5,
    },
    text:{
        width:'90%',
        justifyContent:'flex-start',
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 26,
        color: '#FFFFFF'
    },
    error_text:{
        color:'red',
        width:'90%',
        fontSize:14,
        fontFamily:'Montserrat-Regular',
        textAlign:'left'
    },
    textBlock:{
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        marginVertical:10,
        padding:5
    },
    textAreaContainer: {
        //width:'90%',
        justifyContent:'center',
        alignItems:'center',
        padding: 5,
        borderRadius:10
      },
      textArea: {
        height: 229,
        padding:10,
        width:'90%',
        justifyContent: "flex-start",
        backgroundColor:'#262727',
        borderRadius:10,
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: 'rgba(255, 255, 255, 0.5)'
      },
      input:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        //lineHeight: 20,
        color: 'rgba(255, 255, 255, 0.5)'
      },
      btn_block:{
          height:120,
          justifyContent:'center',
          alignItems:'center'
      }
})