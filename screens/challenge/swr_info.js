import React from 'react';
import { Component } from 'react';
import { View, Text , Image,StyleSheet,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class SWR_Info extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.image_block}>
                     <Image style={styles.image} source={require('../../assets/challenge/swr.png')}/>
                </View>
                <View style={styles.first_block}>
                    <Text style={styles.text}>It’s simply your strength or the amount of weight you can lift divided  by your body weight. </Text>
                </View>
                <View style={styles.second_bloack}>
                    <Text style={styles.text_1}>ie. 150 lbs man who can bench 200 lbs has an SWR for the chest of 1.3 expressed by SWR (200/150 = 1.3)</Text>
                </View>
            </View>
        )
    }
}
export default SWR_Info;
const styles =  StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    image_block:{
        width:windowWidth,
        height:windowHeight * (50/100)
    },
    image:{
        width:windowWidth,
        height:windowHeight * (50/100),
        resizeMode:'cover',
        
    },
    first_block:{
        margin:20
    },
    text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 26,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',

    },
    text_1:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 26,
        color: '#FFFFFF',
        textAlign:'justify',
        margin:10,
        fontFamily:'Montserrat-Regular',

    },
    second_bloack:{
        width:'90%',
        backgroundColor:'#262727',
        borderRadius:18
    }
})