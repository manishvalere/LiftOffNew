import React from 'react';
import { Component } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {View , Text, Image,StyleSheet,Dimensions, TouchableOpacity} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
export default class Home_Image extends Component{
    render(){
        return(
            <View style={styles.container}>
                 <Image style={styles.image} 
                resizeMode={'stretch'} 
               source={{uri: this.props.uri}}
              /> 
              <TouchableOpacity onPress={this.props.onPress} style={styles.arrow}>
              <MaterialIcons name='keyboard-arrow-right' color='black' size={25} />
              </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius:10
      },
    image:{
        width: windowWidth-25  ,
        height:250 ,
        //flex: 1,\
        // aspectRatio: 1 ,
        // maxHeight:'100%',
        // maxHeight:'100%',
       justifyContent:'center',
       alignItems:'center',
        borderRadius:10,
        //backgroundColor:'rgba(255, 255, 255, 0.1)',
        borderRadius:10
      },
      arrow:{
          position:'absolute', 
          right:10, 
          bottom:10,
          backgroundColor:'rgba(173, 243, 80, 0.5)',
          width:30,
          height:30,
          borderRadius:30/2,
          justifyContent:'center',
          alignItems:'center'
        }
})