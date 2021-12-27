import React, { Component } from 'react';
import { View, Text,ScrollView,StyleSheet ,Dimensions,FlatList ,RefreshControl} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
import FriendCard from '../../components/friend_card';
import color from '../../constant/colors'
import Btn_continue from '../../components/Btn_continue';
import Invite_Check_Card from '../../components/Invite_checkcard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Search_Box from '../../components/search_box';
import ContactCarc from '../../components/Contactcard';
import { connect } from 'react-redux';
import {  getConnectedFriend_} from '../../actions/challenge';
import ConnectInvite from '../../components/Connect_invite';
const data = ['1', '2', '3', '4','5', '6', '7', '8', '9']
export  class Connected_ extends Component{
    constructor(props){
        super(props);
        this.state={
            joined_friend:[]
        }
    }
    renderItem=(item)=>{
        return(
            <ConnectInvite item={item.item} />
        )
        
    }
    refresh=()=>{
         this.props.dispatchgetConnectedFriend(this.props.JWT_Token)
    }
    componentDidMount(){
        this.props.dispatchgetConnectedFriend(this.props.JWT_Token)
    }
    // componentDidUpdate(prevProps){
    //     if(this.props.connectedFriend !== prevProps.connectedFriend){
    //         this.props.dispatchgetConnectedFriend(this.props.JWT_Token)
    //     }
    // }
    emptycomp=()=>{
        return(
            <View
            style={styles.emptyblock}>
           <Text style={styles.name_text}>No Joined Friends</Text>
        </View>
        )
    }
    render(){
        
        console.log('this.props.connectedFriend',this.props.connectedFriend, this.props.challengeLoading,this.props.challenge_id)
        return(
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <FlatList
                      data={this.props.connectedFriend}
                      renderItem={this.renderItem}
                    
                      keyExtractor={(item,index)=>index}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={this.emptycomp}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.props.challengeLoading}
                          onRefresh={this.refresh}
                          tintColor='white'
                          color='white'
                          progressBackgroundColor='white'
                          
                        />
                      }
                    />
                </View>
                

                
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    
    const {challengeLoading,challengeError,connectedFriend,invitation_sent} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,connectedFriend,invitation_sent}
  
  }
  const mapDispatchToProps = {
    //dispatchinviteFriend:(jwt, id, form,connect_friend)=>inviteFriend(jwt,id,form,connect_friend),
    dispatchgetConnectedFriend:(jwt)=>getConnectedFriend_(jwt)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Connected_)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        //marginBottom:83,
        alignItems:'center'
    },
    connected_text:{
        
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight:20,
        letterSpacing: 0.2,
        color:color.primary
    },
    connect_block:{
        flexDirection:'row',
        width:'90%', 
        justifyContent:'space-between', 
        alignItems:'center',
        //flex:0.
        marginVertical:10

    },
    friend_block:{
        width:windowWidth-20,
        flex:0.2,
        backgroundColor:'#262727',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn_block:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flex:0.2
    },
    invite_head_block:{
        width:windowWidth-50,
        marginTop:15,
        marginBottom:10
    },
    invite_head_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color:'#ADF350'
    },
    emptyblock:{
        width:windowWidth-50,
        height:60,
        backgroundColor:'#262727',
        marginVertical:5,
        flexDirection:'row', 
        borderRadius:10,
        marginHorizontal:5,
        justifyContent:'center',
        alignItems:'center'
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
    
})