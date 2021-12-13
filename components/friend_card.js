import React, { Component } from 'react';
import {View , Text , StyleSheet,Image, TouchableOpacity} from 'react-native';

export default class FriendCard extends Component{
    render(){
      //  console.log('friend card ', this.props.item)
        return(
            <TouchableOpacity 
            onPress={this.props.onPress}
            style={styles.card_view}>
                <Image source={require('../assets/challenge/friend_profile.png')} style={styles.image}/>
                <View style={styles.text_view}>
                    {/* <Text>
                        {this.props.first_name}
                    </Text> */}
                
                
               <Text style={styles.friend_name}>
                {this.props.item.givenName } {this.props.item.familyName }
               </Text>
                
                    
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    card_view:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:80, 

    },
    image:{
        width:30, 
        height:30,
        borderRadius:30/2

    },
    friend_name:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
        letterSpacing: 0.2,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    text_view:{
        width:70,
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:5,
        height:40
    }
    
})