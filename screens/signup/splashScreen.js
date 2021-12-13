import React from 'react';
import { Component } from 'react';
import {View , Text, StyleSheet,Image,Dimensions, ImageBackground} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class SplashScreen extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Image
                style={styles.img}
            style={styles.img}
            resizeMode='cover'
            source={require('../../assets/splash_1.png')}
                />
            </View>
            // <ImageBackground
            // style={styles.img}
            //     resizeMode='cover'
            //     source={require('../../assets/splash_1.png')}
            // >

            // </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        //flex:1,
        width:windowWidth,
        height:windowHeight,
         justifyContent:'center',
         alignItems:'center',
        backgroundColor:'#1F1F1F'
    },
    img:{
        // width:windowWidth,
        // height:windowHeight,
        //position:'absolute',
        // maxWidth:windowWidth,
        // maxHeight:windowHeight
        //flex:1
    }
})