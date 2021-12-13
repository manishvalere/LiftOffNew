import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList ,Image} from 'react-native';

import LeaderCrad from '../../components/leader_card';
const data = ['1', '2', '3', '4', '5', '6']
export default class Alltime_Screen extends Component{
    rendersItems=()=>{
        return(

            <LeaderCrad/>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.first_block}>
                    <View style={styles.rounded_first}>

                    </View>
                    <View style={styles.rounded_second}>

                    </View>
                    <View style={styles.congratulation_block}>
                        <View>
                        <Text style={styles.congo_text}>Congratulations!</Text>
                        <Text style={styles.tagline_text}>Today’s top 3 scorer</Text>
                        </View>
                        
                    </View>
                    <View style={styles.icon_block}>
                       <View style={{width:100, height:160,position:'absolute',top:-15, justifyContent:'center', alignItems:'center'}}>
                       <Image style={{maxWidth:'100%', maxHeight:'100%'}} source={require('../../assets/Medal.png')}/>
                       </View>
                    </View>
                </View>
                <View style={styles.second_block}>
                    <View style={styles.table_head}>
                        <View style={styles.table_head_t1}>
                            <Text style={styles.table_text}>USER</Text>
                        </View>
                        <View style={styles.table_head_t2}>
                            <Text style={styles.table_text}>CHALLANGES</Text>
                        </View>
                        <View style={styles.table_head_t3}>
                            <Text style={styles.table_text}>SCORE</Text>
                        </View>
                    </View>
                    <View style={styles.flatlist_block}>
                        <FlatList
                            renderItem={this.rendersItems} 
                            data={data}
                            keyExtractor={(index)=>index}
                            showsVerticalScrollIndicator={false}

                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#1F1F1F',
        marginBottom:83
    },
    first_block:{
        flex:0.3,
        backgroundColor:'#262727', 
        position:'relative',
        flexDirection:'row'
    },
    second_block:{
        flex:0.7
    },
    rounded_first:{
        position:'absolute',
        backgroundColor:'#1F1F1F',
        width:179,
        height:179, 
        borderRadius:179/2, 
        top:-90,
        left:-80
    },
    rounded_second:{
        width:208,
        height:208,
        borderRadius:208/2,
        backgroundColor:'#1F1F1F',
        right:-65,
        top:-15,
        position:'absolute'
    },
    congratulation_block:{
        flex:0.6, 
        //justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        textAlign:'left'
    },
    icon_block:{
        flex:0.4,
        alignItems:'center',
        position:'relative'
    },
    congo_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular',
    },
    tagline_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        opacity:0.8,
        fontFamily:'Montserrat-Regular',
    },
    table_head:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        marginHorizontal:10
    },
    table_head_t1:{
        flex:0.6,
        
        justifyContent:'center',
        alignItems:'center'
    },
    table_head_t2:{
        flex:0.3,
       
        justifyContent:'center',
        alignItems:'center'
    },
    table_head_t3:{
        flex:0.21,
       
        justifyContent:'center',
        alignItems:'center'
    },
    table_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 13,
        letterSpacing: 0.1,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular',
    },
    flatlist_block:{
        flex:0.9,
        margin:10
    }
    
})