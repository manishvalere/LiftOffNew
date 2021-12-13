import React, { Component } from 'react';
import {View , Text, StyleSheet, TouchableOpacity,Dimensions,Image} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class LeaderBoard extends Component{
    render(){
        const item = this.props.item;
       // console.log('this.props.image_url+',this.props.image_url+'/'+item.picture)
        return(
            <TouchableOpacity
                style={styles.container}
            >
                <View style={styles.first_block}>
                    {item.picture == null ? <Image style={styles.image_block} source={require('../assets/profile_new.png')}/>
                :   
                <Image style={styles.image_block} source={{ uri:this.props.image_url+'/'+item.picture }}/>    
                }
                </View>
                <View style={styles.second_block}>
                    <View style={styles.name_block}>
                        <Text style={styles.name_text}>{item.first_name}</Text>
                        {/* <Text style={styles.phone}>9874563210</Text> */}
                    </View>
                    <View style = {styles.challenges}>
                        <Text style={styles.challenge_text}>{item.total_challenge}</Text>
                        
                    </View>
                    <View style = {styles.challenges}>
                        <Text style={styles.score_text}>{item.score}</Text>
                        
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:windowWidth-20,
        height:60,
        backgroundColor:'#262727',
        marginVertical:10,
        flexDirection:'row', 
        borderRadius:10

    },
    first_block:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    second_block:{
        flex:0.8,
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
        flex:0.5
    },
    challenges:{
        justifyContent:'center',
        alignItems:'center',
        flex:0.25,
       
    },
    icon_width:{
        width:20,
        height:20, 
        backgroundColor:'rgba(255, 255, 255, 0.1)',
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

        color: 'rgba(255, 255, 255, 0.5)'
    },
    challenge_text:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: 0.2,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    score_text:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        letterSpacing: 0.2,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular',
        

    }
    
        
})