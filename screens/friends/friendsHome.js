import React from 'react';
import { Component } from 'react';
import {View , Text , TouchableOpacity,StyleSheet} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { connect } from 'react-redux';
import  Connected_ from './connect';
import Invite from './invite';
import Btn_White from '../../components/Btn_white';
import { FlatList } from 'react-native';
const data = ['1', '2', '3'];
//  const data = []
import ConnectInvite from '../../components/Connect_invite';
import AcceptDeny from '../../components/accept_deny';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    sceneContainerStyle={{
        backgroundColor: 'trannsparent',
 }}

    tabBarOptions={{
        activeTintColor: '#ADF350',
        inactiveTintColor:'#ffff',
        cardStyle: { backgroundColor: 'trannsparent' },
        iconStyle:'#fff',
       
        indicatorStyle:{
            backgroundColor:'#ADF350',

        },
        labelStyle: {
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 12,
            fontFamily:'Montserrat-Regular',
            lineHeight: 14,
            opacity:0.7, 
          },
        upperCaseLabel:false,
        style: {
           borderTopWidth: 0,
          //paddingTop: 10,
          paddingBottom: 0,
         // height: 43,
        //   shadowOpacity:0,
        //   shadowColor: '#000',
        //   shadowOpacity: 0.1,
        //  shadowRadius: 20,
          backgroundColor:'transparent',
         // borderRadius: 20,
         // borderTopLeftRadius:40,
         // borderTopRightRadius:40,
         // justifyContent:'',
          borderWidth:0,
          textAlign:'left',
          width:'95%',
          marginHorizontal:10
         // fontFamily:'Montserrat-Regular',
         // shadowOffset: { width: 0, height: 0 },
         
          
        }
      }}
    >
      <Tab.Screen 
     
      name="Connected Friends" component={Connected_} />
     
      <Tab.Screen name="Invite/Connect" component={Invite} />
    </Tab.Navigator>
  );
}
export class Friend_Home extends Component{
    renderItem=(item)=>{
        return(
            <AcceptDeny />
        )
        
    }
   
    render(){
        return(
            <View style={styles.container}>
            
                  {data.length > 0 ? <View style={styles.first_block }>
                      <View>
                      
                      <Text  style={styles.title_text}>Friend Request</Text>
                      
                      
                         <FlatList
                         data={data}
                         renderItem={this.renderItem}
                         showsVerticalScrollIndicator={false}
                         />
                      </View>
                  </View> : null}
                  {data.length > 0 ?
                <View style={[styles.midblock, {flex:0.7}]}>
                <MyTabs/>
                </View>  
                : 
                  <View style={[styles.midblock, {flex:1}]}>
             <MyTabs/>
                 </View> 
                 } 
                  
           
        </View>
        )
    }
}
export default Friend_Home;
const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent:'space-between',
        marginBottom:83,
        alignItems:'center'
    },
    image:{
        flex:1,
        resizeMode:'stretch',
        justifyContent:'space-between',
        alignItems:'center'
    },
    first_block:{
        flex:0.3,
        width:'100%', 
        justifyContent:'flex-start', 
        alignItems:'center'
    },
    second_block:{
        flex:0.15, 
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center'
    },
    title_text:{
        fontStyle: 'normal',
        fontFamily:'Montserrat-Regular',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        textAlign:'left',

        color:'#ADF350',
        opacity:1
    },
    midblock:{
        flex:0.55,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        width:'90%',
        borderRadius:10,
        marginTop:20,
        marginBottom:10
        //justifyContent:'center',
        //alignItems:'center'
        
    },
    request_block:{

    }
    
})