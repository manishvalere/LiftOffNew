import React from 'react';
import { Component } from 'react';
import { View, Text ,StyleSheet , Dimensions,TouchableOpacity} from 'react-native';
import {AntDesign,Entypo,Feather,Ionicons} from 'react-native-vector-icons';
import colors from '../constant/colors';

import Btn_header from './Btn_header';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class FitnessHeader extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.back_block}>
                   
                   <Text style={styles.brand}>Lift Off</Text>
                </View>
                <View style={styles.mid_block}>
                <Text style={styles.title}>{this.props.title}</Text>
                </View>
                {this.props.feed ? <View style={styles.icon_block}></View> :<View style={styles.icon_block}>
                    {/* <TouchableOpacity 
                        style={styles.filter_btn}
                        onPress={this.props.onPress}
                    >
                        <Ionicons style={{fontWeight:'800'}}   name='md-timer-outline' size={22} color='#FFFF'/>
                    </TouchableOpacity> */}
                    <Btn_header onPress={this.props.onPress} title='Daily Exercise Log'/>
                </View>}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        width:width,
        height:height * (10/100),
        backgroundColor:'#262727',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    back_block:{
        //flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center',
        marginBottom:10,
        flex:1,
        paddingLeft:10
        //backgroundColor:'red'
        //marginLeft:5
    },
    mid_block:{
       marginBottom:10,
       flex:1,
       alignItems:'center',
       justifyContent:'center'
    },
    icon_block:{
        //flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10,
        paddingRight:8,
        //marginRight:5,
        flex:1
    },
    brand:{
        fontFamily: 'Montserrat-BoldItalic',
        fontStyle: 'normal',
        //fontWeight: 'bold',
        fontSize: 22,
        lineHeight: 30,
        color: colors.primary,
        letterSpacing:0.5
    },
    filter_btn:{
        paddingHorizontal:10
        // position:'absolute',
        // top:-10,
        // right:10,
        // width:44,
        // height:44,
        // justifyContent:'center',
        // alignItems:'center',
        // backgroundColor:"#81a84c",
        // borderRadius:5,
        // marginRight:10,
        // marginBottom:5
    },
    backbtn:{
        fontWeight:'700'
    },
    title:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#FFFFFF'
    }
})