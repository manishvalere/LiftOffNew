import React, { Component } from 'react';
import { View, Text,StyleSheet, Image,SafeAreaView,ImageBackground, Dimensions  } from 'react-native';

import Btn_continue from '../../components/Btn_continue';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { connect } from 'react-redux'
export  class WelcomeScreen extends Component{
    onPress=()=>{
       this.props.navigation.navigate('Onboard_one')
    }
    render(){
        console.log(windowHeight, windowHeight*(50/100))
        return(
            <SafeAreaView  style={styles.container}>
                <View
                style={styles.backround_block}
                >
                    
                </View>
                <View style = {styles.image_container}>
                   <Image 
                   style={styles.image_size} 
                   source={require('../../assets/onboard_png.png')}
                   resizeMode="stretch"
                   />
                </View>
                <View style={styles.text_block}>
                   <Text style={styles.create_head}>Welcome, {this.props.fname} {this.props.lname}{this.props.fname ? '!' : null}</Text>
                   <Text style={styles.create_text}>Let's tailor your experience</Text>
                </View>
                <View style={styles.Btn_continue}>
                   <Btn_continue onPress={this.onPress} title='Continue'/>
                </View>
            </SafeAreaView >
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token,fname,lname,email,age,weight,height,workout_week,notify_workout} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token, fname,lname,email,age,weight,height,workout_week,notify_workout }
  }
  
  const mapDispatchToProps = {
    dispatchUpdateProfile:(token, profile)=>updateProfileValue(token, profile)
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#363636',
        position:'relative'
    },
    image_container:{
        flex:7,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    text_block:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:20,
        width:'80%'
    },
    Btn_continue:{
        flex:2,
        width:'80%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    create_text:{
        fontSize:18,
        lineHeight:26,
        fontWeight:'normal',
        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular',
        //textAlign:'left'
    },
    create_head:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:24,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
        //textAlign:'left'
    },
    image_size:{
        width:windowWidth,
        height:'100%',
        // maxWidth:'100%',
        maxHeight:'100%',
        alignSelf: 'center',
        
    },
    backround_block:{
        position:'absolute',
        width:windowWidth*(83/100)*2,
        height:windowHeight*(90/100),
        left:-windowWidth*(27/100), 
        top:-windowHeight*(20/100),
        backgroundColor:'#262727', 
        borderRadius:679/2
    }

})