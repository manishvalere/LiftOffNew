import React from 'react';
import { Component } from 'react';
import { View, Text ,StyleSheet , Dimensions,TouchableOpacity} from 'react-native';
import {AntDesign,Entypo} from 'react-native-vector-icons';
const width = Dimensions.get('window').width;
export default class CustomHeader extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.back_block}>
                   <AntDesign style={styles.backbtn} name='left' size = {28} color='white' onPress={this.props.onback}/>
                   
                </View>
                <View style={styles.mid_block}>
                <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.icon_block}>
                    <TouchableOpacity 
                        style={styles.filter_btn}
                        onPress={this.props.onmodalbtn}
                    >
                        <Entypo   name='sound-mix' size={20} color='#1F1F1F'/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        width:width,
        height:90,
        backgroundColor:'#262727',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end'
    },
    back_block:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        marginLeft:5
    },
    mid_block:{
       marginBottom:10
    },
    icon_block:{

    },
    filter_btn:{
        // position:'absolute',
        // top:-10,
        // right:10,
        width:44,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#81a84c",
        borderRadius:5,
        marginRight:10,
        marginBottom:5
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