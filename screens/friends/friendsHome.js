import React from 'react';
import { Component } from 'react';
import {View , Text , TouchableOpacity,StyleSheet,Image,Dimensions} from 'react-native';
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
import { actionOnRequest, getFriendRequest } from '../../actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {Toast, Root} from 'native-base';
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
    constructor(props){
        super(props);
        this.ChildElement = React.createRef();
    }
    componentDidUpdate(prevProps){
        if(this.props.message !== prevProps.message){
            if(!this.props.friendLoading){
                this.props.dispatchgetFriendRequest(this.props.JWT_Token);
                return Toast.show({
                    text: this.props.message,
                    textStyle: { color: "green" },
                   // buttonText: "Okay",
                    duration:2500
                  })
            }
        }
    }
    renderItem=(item)=>{
        const i = item.item
        console.log('i',i)
        return(
            <TouchableOpacity
                style={styles.container1}
               
            >
                <View style={styles.first_block1}>
                    <Image style={styles.image_block1} source={require('../../assets/challenge/friend_profile.png')}/>
                </View>
                <View style={styles.second_block1}>
                    <View style={styles.name_block1}>
                        {/* <Text style={styles.name_text}>Eather Howard</Text> */}
                        <Text style={styles.name_text1}>{i.first_name} {i.last_name}</Text>
                        <Text style={styles.phone1}>{i.phone_number}</Text>
                    </View>
                    <View style = {styles.icon_block1}>
                        <TouchableOpacity onPress={()=> this.props.dispatchActionOnRequest('Accept', this.props.JWT_Token,i.invite_ID )} style={styles.icon_width1}>
                           <Text style={styles.btn_text1}>Accept</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style = {styles.icon_block1}>
                        <TouchableOpacity onPress={()=> this.props.dispatchActionOnRequest('Decline', this.props.JWT_Token,i.invite_ID )}  style={styles.icon_width_1}>
                           <Text style={styles.btn_text1}>Deny</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </TouchableOpacity>
        )
        
    }
    action=(item)=>{
        // const childelement = this.ChildElement;
             //const type = childelement.state.value
            // console.log('itemmdmdd',item,childelement)
    }
   componentDidMount(){
       this.props.dispatchgetFriendRequest(this.props.JWT_Token);
       
   }
    render(){
        return(
            <View style={styles.container}>
            
                  {this.props.friend_request.length > 0 ? <View style={styles.first_block }>
                      <View>
                      
                      <Text  style={styles.title_text}>Friend Request</Text>
                      
                      
                         <FlatList
                         data={this.props.friend_request}
                         renderItem={this.renderItem}
                         showsVerticalScrollIndicator={false}
                         />
                      </View>
                  </View> : null}
                  {this.props.friend_request.length > 0 ?
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
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {friendLoading,userList ,friendError,message,friend_request} = state.friend
    
    return { JWT_Token,friendLoading,userList,friendError,message,friend_request }
  
  }
  const mapDispatchToProps = {
    
    dispatchgetFriendRequest:(jwt)=>getFriendRequest(jwt),
    dispatchActionOnRequest:(type,jwt,id)=>actionOnRequest(type,jwt,id)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Friend_Home)

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

    },
    container1:{
        width:windowWidth-50,
        height:60,
        backgroundColor:'#262727',
        marginVertical:5,
        flexDirection:'row', 
        borderRadius:10,
        marginHorizontal:10,
        alignItems:'center',
        //justifyContent:'center'

    },
    first_block1:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    second_block1:{
        flex:0.75,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    image_block1:{
        width:40,
        height:40, 
        borderRadius:40/2
    },
    name_block1:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        flex:0.5
    },
    icon_block1:{
        justifyContent:'center',
        alignItems:'center',
        flex:0.2,
       
    },
    icon_width1:{
        width:60,
        height:32, 
        backgroundColor:'#ADF350',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    icon_width_1:{
        width:60,
        height:32, 
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    name_text1:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.2,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    phone1:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 18,
        
        letterSpacing: 0.2,
        fontFamily:'Montserrat-Regular',

        color: 'rgba(255, 255, 255, 0.5)'
    },
    btn_text1:{
        fontFamily:'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        letterSpacing: 0.2,
        color: '#262727'
    }
    
})