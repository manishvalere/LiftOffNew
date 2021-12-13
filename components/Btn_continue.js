import { Container, Content, Button } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity,Text, StyleSheet } from 'react-native';
import color from '../constant/colors'

export default class Btn_continue extends Component{
    render(){
        
        return(
            
            <TouchableOpacity onPress={this.props.onPress} style={{ width:this.props.onboard ? '80%' : '50%',
            height:48,
            backgroundColor:this.props.black ? '#1F1F1F': color.primary,
            borderRadius:50/2,
            justifyContent:'center',
            alignItems:'center',
            borderWidth:this.props.black? 1 : null,
            borderColor:this.props.black ? 'rgba(255, 255, 255, 0.3)': null
        }}
            >
                <Text style={{
                    color:this.props.black ? 'rgba(255, 255, 255, 0.3)': '#1F1F1F',
                    fontSize:18,
                    fontWeight:'600',
                    lineHeight:22,
                    fontFamily:'Montserrat-Regular'
                }}>
                    {this.props.title}
                </Text>
                
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
    }
})