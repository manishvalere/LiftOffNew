import { Container, Content, Button } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity,Text, StyleSheet,View } from 'react-native';
import color from '../constant/colors'
import {MaterialIcons} from 'react-native-vector-icons'
export default class Btn_White extends Component{
    render(){
        
        return(
            
            <TouchableOpacity onPress={this.props.onPress} style={{ width:'80%',
            height:48,
            backgroundColor:'#FFFFFF',
            borderRadius:50/2,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'row',justifyContent:'space-around'
            //borderWidth:1,
            //borderColor:this.props.black ? 'rgba(255, 255, 255, 0.3)': null
        }}
            >
                <Text style={{
                    color:'#1F1F1F',
                    fontSize:16,
                    fontWeight:'500',
                    lineHeight:22
                }}>
                    {this.props.title}
                </Text>
                <View style={styles.icon_block}>
                <MaterialIcons name='keyboard-arrow-right' color='#AAAAAA' size={20} />
                </View>
            </TouchableOpacity>
                    
                
        )
    }
}
const styles = StyleSheet.create({
    btn_continue:{
        width:'50%',
        height:48,
        backgroundColor:color.primary,
        borderRadius:50/2,
        justifyContent:'center',
        alignItems:'center'
        
    },
    btn_continue_text:{
        color:'#1F1F1F',
        fontSize:18,
        fontWeight:'600',
        lineHeight:22
    },
    icon_block:{
        
        backgroundColor:'#1F1F1F',
        width:24,
        height:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    }
})