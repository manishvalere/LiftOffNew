import React from 'react';
import { Component } from 'react';
import {View , Text , TouchableOpacity,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
export class Friend_Home extends Component{
    render(){
        return(
            <View style={styles.container}>
               <Text>this is friend request</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:83
    }
})