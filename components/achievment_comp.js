import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions ,Image} from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
const data = ['1', '2','3', '4']
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {FontAwesome5} from 'react-native-vector-icons'
export default class Achievement_Comp extends Component{
    renderItem=(item)=>{
        return(
            
            <View style={styles.item_bloack}>
                <View style={styles.firstBlock}>
                   {/* {this.props.icon ? <Image source={this.props.won ? require('../assets/Badge_Icon_Color.png'): require('../assets/Badge_Icon_BW.png')}/> : null } */}
                   {this.props.type == 'won' && <Image source={require('../assets/Badge_Icon_Color.png')}/>}
                   {this.props.type == 'lose' && <Image source={require('../assets/Badge_Icon_BW.png')}/>}
                   {this.props.type == 'tie' && <Image source={require('../assets/tie.png')}/>}
                   {this.props.type == 'complete' && <Image source={require('../assets/Biceps_Icon.png')}/>}
                   <Text style={styles.comp_text}>{item.item.subcategory_name} Challenge</Text>
                </View>
                  
            </View>
            
            
        )
    }
    render(){
        return(
            
                <FlatList
                  data={this.props.data}
                  keyExtractor={(index)=>index}
                  renderItem={this.renderItem}
                  horizontal={true}
                  //showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
            
            
        )
    }
}
const styles = StyleSheet.create({
    head_block:{
        flexDirection:'row',
        justifyContent:'space-between',
       // width:'85%',
        alignItems:'center',
        marginVertical:10,
        //flex:1,
        alignItems:'center',
        backgroundColor:'white'

    },
    item_bloack:{
        width:140, 
        height:100, 
        backgroundColor:'#262727',
        marginLeft:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        position:'relative'
    },
    firstBlock:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:10
    },
    roundBlock:{
        flex:0.4,
        position:'relative'
    },
    seprator:{
        height:1, 
        backgroundColor:'#1F1F1F'
    },
    round_absolute:{
        position:'absolute',
        backgroundColor:'#262727',
        width:98,
        height:98,
        borderRadius:100/2,
        top:-7,
        right:10,
        justifyContent:'center',
        alignItems:'center'
       
    },
    challenge_name:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#FFFFFF'
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)',
        marginVertical:3
    },
    progress_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',

        color: 'rgba(173, 243, 80, 0.5)'
    },
    comp_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 10,
        lineHeight: 14,
        textAlign: 'center',
        textTransform: 'uppercase',

        color: '#FFFFFF',
        marginTop:5,
        fontFamily:'Montserrat-Regular',

// transform: matrix(1, 0, -0.01, 1, 0, 0);
    }
})