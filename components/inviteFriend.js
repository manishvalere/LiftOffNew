import React, { Component } from 'react';
import {View , Text, StyleSheet, TouchableOpacity,Dimensions,Image} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class InviteFriend extends Component{
    
    render(){
        const item = this.props.item 
        if(item !== null && item !== undefined){

        console.log('item in invite', item)
        return(
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <View style={styles.first_block}>
                    <Image style={styles.image_block} source={require('../assets/challenge/friend_profile.png')}/>
                </View>
                <View style={styles.second_block}>
                    <View style={styles.name_block}>
                        {/* <Text style={styles.name_text}>Eather Howard</Text> */}
                        <Text style={styles.name_text}>{item.givenName} {item.middleName} {item.familyName}</Text>
                        <Text style={styles.phone}>{item.number}</Text>
                    </View>
                    {item.user_conn_type == 'new' || item.user_conn_type == '' ? <View style = {styles.icon_block}>
                        <TouchableOpacity onPress={this.props.onPress} style={styles.icon_width}>
                           <Text style={styles.btn_text}>{item.receiver_user_status == 'Pending' ? 'Invited': 'Invite'}</Text>
                        </TouchableOpacity>
                        
                    </View> : 
                    <View style = {styles.icon_block}>
                    <TouchableOpacity onPress={this.props.onPress} style={styles.icon_width_1}>
                       <Text style={styles.btn_text}>{item.user_conn_type == 'connected' ? 'Connected': 'Connect'}</Text>
                    </TouchableOpacity>
                    
                </View>}
                    
                    
                
                </View>
            </TouchableOpacity>
        )
    }else{
        return null;
    }
}
}
const styles = StyleSheet.create({
    container:{
        width:windowWidth-50,
        height:60,
        backgroundColor:'#262727',
        marginVertical:5,
        flexDirection:'row', 
        borderRadius:10,
        marginHorizontal:5

    },
    first_block:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    second_block:{
        flex:0.7,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    image_block:{
        width:40,
        height:40, 
        borderRadius:40/2
    },
    name_block:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        flex:0.8
    },
    icon_block:{
        justifyContent:'center',
        alignItems:'center',
        flex:0.2,
       
    },
    icon_width:{
        width:80,
        height:32, 
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    icon_width_1:{
        width:80,
        height:32, 
        backgroundColor:'#ADF350',
        
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    name_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.2,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    phone:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 18,
        
        letterSpacing: 0.2,
        fontFamily:'Montserrat-Regular',

        color: 'rgba(255, 255, 255, 0.5)'
    },
    btn_text:{
        fontFamily:'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0.2,
        color: '#262727'
    }
    
})