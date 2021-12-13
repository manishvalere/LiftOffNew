import React, { Component } from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
// import { Container, Header, Content, Item, Input } from 'native-base';
import {AntDesign} from 'react-native-vector-icons'
export default class Search_Box extends Component{
    render(){
        return(
            <View style={{width:this.props.width,position:'relative',borderRadius:20}}>
            <TextInput returnKeyType='done' onChangeText={this.props.onChangeText} style={styles.input_block} placeholder={this.props.placeholder} placeholderTextColor='rgba(255, 255, 255, 0.2)'/>
            <AntDesign style={styles.icon} name ='search1' size={20} color='#FFFFFF'/>
            </View>
           
           
            
        )
    }
}
const styles  = StyleSheet.create({
    input_block:{
        width:'100%',
        height:40,
        backgroundColor:'#262727',
        borderColor:'rgba(255, 255, 255, 0.2)',
        borderWidth:1,
        marginTop:10,
        borderRadius:20,
        paddingLeft:40,
        color:'rgba(255, 255, 255, 0.2)',
        fontSize:14,
        fontWeight:'500',
        lineHeight:17,
        fontStyle:'normal',
        fontFamily:'Montserrat-Regular'
        
    },
    icon:{
        position:'absolute',
        top:20,
        left:10
    }
})