import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class CheckList_Child extends Component{
    render(){
        return(
           
                <View style={{flexDirection: 'row', marginVertical:8}}>
                    <Text style={styles.child_text_bullet}>{'\u2022'}</Text>
                    <Text style={styles.child_text}>{this.props.detail}</Text>
                </View>
                
            
        )
    }
}
const styles= StyleSheet.create({
    container:{
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        //justifyContent:'space-between'
    },
    child_text:{
        flex: 1, 
        paddingLeft: 5,
        fontWeight:'500',
        fontStyle:'normal',
        fontSize:14,
        lineHeight:17,
        color:' rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    },
    child_text_bullet:{
        
        fontWeight:'500',
        fontStyle:'normal',
        fontSize:14,
        lineHeight:17,
        color:' rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    }
})