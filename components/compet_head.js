import React, { Component } from 'react';
import {View, Text,StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {MaterialIcons} from 'react-native-vector-icons'
export default class Compete_Head extends Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={styles.challenge_head}>
                <Text style={styles.challenge_head_text}>{this.props.title}</Text>
                <TouchableOpacity >
                {this.props.ach ?  null :  <MaterialIcons onPress={this.props.onPress} name='keyboard-arrow-right' color='rgba(255, 255, 255, 0.5)' size={20} /> }
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    
}
const styles =StyleSheet.create({
    challenge_head:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        width:windowWidth-30, 
        marginTop:15
    },
    challenge_head_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular'
    }
})