import React, { Component } from 'react';

import {AntDesign} from 'react-native-vector-icons';
import { View, Text, Image, StyleSheet,Dimensions,TouchableOpacity, ImageBackground } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Video_Thumb extends Component{
    render(){
        return(
            <View style={styles.video_block}>
                 <ImageBackground style={styles.image} 
                 source={{uri: this.props.thumbnail}}>
                <TouchableOpacity style={styles.fullscreen_icon_block} onPress={this.props.onPlayPress}>
                    <AntDesign color='white' name='caretright' size={30}/>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    video_block:{
        borderRadius:10, 
        position:'relative',
        width: windowWidth-25  ,
        height: windowWidth-25 ,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
     },
     backgroundVideo: {
      
        alignSelf: 'center',
       
        width: windowWidth-25  ,
         height: windowWidth-25 ,
        //flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // resizeMode: 'contain',
        borderRadius:10,
        backgroundColor:'rgba(255, 255, 255, 0.2)'
      },
      image:{
        width: windowWidth-25  ,
        height: windowWidth-25 ,
        //flex: 1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
      },
      fullscreen_icon_block:{
        // position:'absolute',
        // right:20, 
        // bottom:20,
        width:60, 
        height:60,
        borderRadius:60/2,
        backgroundColor:'rgba(255, 255, 255, 0.4)',
        justifyContent:'center',
        alignItems:'center'
        
      },
  
})