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
import {  getJoinedFriend} from '../../actions/challenge';
const data = ['1', '2', '3', '4','5', '6', '7', '8', '9']
export  class Joined_Screen extends Component{
    constructor(props){
        super(props);
        this.state={
            joined_friend:[]
        }
    }
    renderItem=(item)=>{
        return(
            <ContactCarc item={item.item}/>
        )
        
    }
    componentDidUpdate(prevProps){
        if(this.props.invitation_sent !== prevProps.invitation_sent){
            if(this.props.invitation_sent){
                //console.log('pending cdu ')
              this.refresh()
              
            }
          }
        if(this.props.joinedFriend !== prevProps.joinedFriend || this.props.contact !== prevProps.contact){
            if(this.props.joinedFriend !== null && this.props.joinedFriend !== undefined && this.props.contact != null){
                var new_joined = this.props.joinedFriend;
                var new_contact = this.props.contact;
           // console.log('contact in pending', this.props.contact)
                for(let i=0;i<new_joined.length; i++){
                    const str = new_joined[i].receiver_user_mob_no
                   
                   let new_str = str.slice(str.length - 10);
                   new_joined[i].rec_num = new_str
                }
                for(let i=0;i<new_contact.length; i++){
                    const str = new_contact[i].number
                   //console.log('str',str)
                   let new_str = str.slice(str.length - 10);
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
               
                this.setState({
                    joined_friend:match
                })
               
            }else if(this.props.joinedFriend == null){
                this.setState({
                    joined_friend:[]
                })
               }
        }
    }
    componentDidMount(){
        
        this.refresh();
        if(this.props.joinedFriend !== null && this.props.joinedFriend !== undefined && this.props.contact != null){
            var result = this.props.contact.filter(o1 => this.props.joinedFriend.some(o2 => o1.number === o2.receiver_user_mob_no))
        //let result = result1.filter(o1 => result2.some(o2 =>  o2.number === o1.receiver_user_mob_no))
        for(let i=0;i<result.length;i++){
            for(let j=0;this.props.joinedFriend.length<0;j++){
                if(result[i].number==this.props.joinedFriend[j].receiver_user_mob_no){
                   // console.log('challehe is equzl',this.props.joinedFriend[j].challenge_id)
                    result[i].challenge_id = this.props.joinedFriend[j].challenge_id
                }
            }
           // console.log('result in', result[i].challenge_id)
        }
     //   console.log('result in joined', result);
        this.setState({
            joined_friend:result
        })
        }
    }
    refresh=()=>{
        this.props.dispatchgetJoinedFriend(this.props.JWT_Token, this.props.challenge_id)
    }
    emptycomp=()=>{
        return(
            <View
            style={styles.emptyblock}>
           <Text style={styles.name_text}>No Joined Friends</Text>
        </View>
        )
    }
    render(){
        if(this.props.contact !== undefined){
           // console.log('Joined_screen contact', this.props.contact)
        }
        return(
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.joined_friend}
                      renderItem={this.renderItem}
                    //    keyExtractor={(index)=>index}
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
    
    const {challengeLoading,challengeError,joinedFriend, challenge_id, contact,invitation_sent} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,joinedFriend,challenge_id,contact,invitation_sent}
  
  }
  const mapDispatchToProps = {
    
    dispatchgetJoinedFriend:(jwt,id)=>getJoinedFriend(jwt, id)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Joined_Screen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
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