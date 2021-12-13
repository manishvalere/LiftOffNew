import React, { Component } from 'react';
import { View, Text,ScrollView,StyleSheet ,Dimensions,FlatList,RefreshControl } from 'react-native';

import color from '../../constant/colors'
import {Toast, Root} from 'native-base';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import ContactCarc from '../../components/Contactcard';
import { connect } from 'react-redux';
import {  getPendingFriend,ResendRequest} from '../../actions/challenge';
const data = ['1', '2', '3', '4','5', '6', '7', '8', '9']
export  class Pending_Screen extends Component{
    constructor(props){
        super(props);
        this.state={
            pending_friend:[]
        }
    }
    onpendingpress=(item)=>{
        //console.log('item pending press', item)
        this.props.dispatchResendRequest(this.props.JWT_Token, this.props.challenge_id,item.item.number)
    }
    renderItem=(item)=>{
        //console.log('item in pending', item)
        return(
            <ContactCarc onPress={()=>this.onpendingpress(item)} item={item.item}  joined={true}/>
        )
        
    }
    componentDidUpdate(prevProps){
        
            if(this.props.invitation_sent !== prevProps.invitation_sent){
              if(this.props.invitation_sent){
                //  console.log('pending cdu ')
                this.refresh()
                
              }
            }
        if(this.props.resendRequest !== prevProps.resendRequest){
            if(this.props.resendRequest){
             //   console.log('resend request if',this.props.resendRequest)
                return Toast.show({
                    text: 'Request resend successfully!',
                    textStyle: { color: "green" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }else 
             if(this.props.resendRequest == false)
            {
               // console.log('resend request elsef',this.props.resendRequest)
                return Toast.show({
                    text: 'Something went wrong!',
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
            }
        }
        if(this.props.pendingFriend !== prevProps.pendingFriend || this.props.contact !== prevProps.contact){
            if(this.props.pendingFriend !== null && this.props.pendingFriend !== undefined && this.props.contact !== null){
                var new_joined = this.props.pendingFriend;
                var new_contact = this.props.contact;
           // console.log('contact in pending', this.props.contact)
                for(let i=0;i<new_joined.length; i++){
                    const str = new_joined[i].receiver_user_mob_no
                    //console.log('str pending',str)
                   let new_str = str.slice(str.length - 10);
                   //console.log('new str pending', new_str)
                   new_joined[i].rec_num = new_str
                }
                for(let i=0;i<new_contact.length; i++){
                    const str = new_contact[i].number
                   //console.log('str',str)
                   let new_str = str.slice(str.length - 10);
                   //console.log('new str contact', new_str)
                   new_contact[i].num = new_str
                }
                var result = this.props.contact.filter(o1 => new_joined.some(o2 => o1.num === o2.rec_num))
                var match = []
                
                    
                     match =    result.filter(e=> new_joined.some(e1=>{
                        if  (e.num == e1.rec_num){
                            return  e.number = e1.receiver_user_mob_no
                          
                         }
                     })
                         )
                    
                    //console.log('xjisdj', match)
                
               // console.log('result in cdu', result);
                this.setState({
                    pending_friend:result
                })
               }else if(this.props.pendingFriend == null){
                this.setState({
                    pending_friend:[]
                })
               }
        }
    }
    emptycomp=()=>{
        return(
            <View
            style={styles.emptyblock}>
           <Text style={styles.name_text}>No Pending Request</Text>
        </View>
        )
    }
    componentDidMount(){
        
        
        this.refresh()
        if(this.props.pendingFriend !== null && this.props.pendingFriend !== undefined && this.props.contact !== null){
            var new_pending = this.props.pendingFriend
            //console.log('contact in pending', this.props.contact)
                for(let i=0;i<new_pending.length; i++){
                    const str = new_pending[i].receiver_user_mob_no
                   
                   let new_str = str.slice(str.length - 10);
                   new_pending[i].receiver_user_mob_no = str
                }
                var result = this.props.contact.filter(o1 => new_pending.some(o2 => o1.number === o2.receiver_user_mob_no))
                
              //  console.log('result', result);
                this.setState({
                    pending_friend:result
                })
               }
        
    }
    refresh=()=>{
      //  console.log('refresh is calling in pendign')
        this.props.dispatchgetPendingFriend(this.props.JWT_Token, this.props.challenge_id)
    }
    render(){
      //  console.log('pending freind ', this.state.pending_friend, )
        return(
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.pending_friend}
                      renderItem={this.renderItem}
                      keyExtractor={(item,index)=>index.toString()}
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
    
    const {challengeLoading,challengeError,pendingFriend,challenge_id,resendRequest,contact,invitation_sent} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,pendingFriend,challenge_id,resendRequest,contact,invitation_sent}
  
  }
  const mapDispatchToProps = {
    
    dispatchgetPendingFriend:(jwt,id)=>getPendingFriend(jwt,id),
    dispatchResendRequest:(jwt,id, number)=>ResendRequest(jwt,id,number)
    
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Pending_Screen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        //marginBottom:83,
        alignItems:'center',
       // marginHorizontal:10
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