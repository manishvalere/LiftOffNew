import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialIcons} from 'react-native-vector-icons'
import CheckList_Child from './checklist_child';
export default class CheckList extends Component{
    state = {
		value: null,
	};
    render(){
        const { PROP } = this.props;
        const { value } = this.state;
        return(
            <View >
                 {PROP.map((res,i) => {
                    return(
                    <View key={i}>
                    <TouchableOpacity style={styles.check_view}
                    onPress={() => {
                        this.setState({
                            value: res.key,
                        });
                    }}
                    >
                
                        <Text style={styles.text_head}>{res.value}</Text>
                            {value === res.key ?  <MaterialIcons name='keyboard-arrow-up' color='#FFFF' size={20} onPress={this.props.onPress}/> :
                        <MaterialIcons name='keyboard-arrow-down' color='#FFFF' size={20} onPress={this.props.onPress}/>}
                   </TouchableOpacity>
                {value === res.key && 
                    
                    res.details.map((item,index)=><CheckList_Child key={index} detail= {item}/>)
                    
                }
                </View>
                     )
                 })}
                 
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    check_view:{
        height:30,
        flexDirection:'row',
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        justifyContent:'space-between',
        marginVertical:15
    },
    text_head:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    }
})