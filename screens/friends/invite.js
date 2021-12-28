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
import ConnectInvite from '../../components/Connect_invite';
import Contacts from 'react-native-contacts';
import { getUserList,inviteUser } from '../../actions';
import InviteFriend from '../../components/inviteFriend';
import {Toast, Root} from 'native-base';
const data = ['1', '2', '3', '4','5', '6', '7', '8', '9']
export  class Invite extends Component{
    constructor(props){
        super(props);
        this.state={
            contact:[],
            contact_:[]
        }
    }
    renderItem=(item)=>{
        return(
            <InviteFriend onPress={()=>this.inviteUser(item.item)} item={item.item} invite={true}/>
        )
        
    }
    inviteUser=(item)=>{
      console.log('invire', item)
      this.props.dispatchInviteUser(this.props.JWT_Token,item)
    }
    emptycomp=()=>{
        return(
            <View
            style={styles.emptyblock}>
           <Text style={styles.name_text}>No Joined Friends</Text>
           </View>
        )
    }
    
    componentDidUpdate(prevProps){
        if(this.props.userList !== prevProps.userList){
            let contact =this.state.contact;
            let users = this.props.userList;
           
            let result = contact.filter(o1 => {
             
             var flag=0;
              users.forEach((s) => {
                  console.log('numbr and phone', o1.number, s.phone_number)
                  if (o1.number == s.phone_number) {

                     
                      flag=1;
                      
                      
                      }
                  
              })
              if(flag==1)
              {
                o1.connected = true;
              }else{
                o1.connected = false;
              }
            return contact;  
          });
                console.log('contacttcctc', result)
              this.setState({
                contact_:result
              })
            //}
            // if(users !== null){
            // let result = contact_.filter(o1 => users.some(o2 => o1.number === o2.phone_number));
            // console.log('resulttttt',result)
            // }
        };
        if(this.props.message !== prevProps.message){
          if(!this.props.friendLoading){
            return Toast.show({
              text: this.props.message,
              textStyle: { color: "green" },
             // buttonText: "Okay",
              duration:2500
            })
          }
        }

    }
    refresh=()=>{
        this.props.dispatchgetUserList(this.props.JWT_Token);
    }
    componentDidMount(){
        console.log('cdm is calling')
    this.refresh()
    
    if (Platform.OS === 'android') {
      console.log('if android')
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
          }).then(() => {
            this.loadContacts();
          }
        );
      } else {
        this.loadContacts();
      }
    }
    loadContacts = () => {
        console.log('load contact is calling')
         Contacts.getAll((err, contacts) => {
          // console.log('err',err, contacts)
             contacts.sort(
               (a, b) => 
                 a.givenName.toLowerCase() > b.givenName.toLowerCase(),
             );
             var states=contacts.filter((e)=> { return e.phoneNumbers.length > 0})
             if (err === 'denied') {
               alert('Permission to access contacts was denied');
             //  console.warn('Permission to access contacts was denied');
             } else {
            //    this.setState({
            //        contacts:states
            //    })
            for(let i=0; i<states.length; i++){
                let num =   states[i].phoneNumbers[0].number
              //  console.log('num',num)
              var  new_num  = num.replace(/([-*?^=!:${}()|\[\]\/\\])/g, "");
              var  new_space_num = new_num.replace(/ /g, "")
                states[i].phoneNumbers[0].number = new_space_num;
                //new_space_num = parseInt(new_space_num)
                // let new_str = new_space_num.slice(new_space_num.length - 10);
                
                states[i].number = new_space_num;
                }
                this.setState({
                    contact:states
                }) 
              
             }
           });
        
       };
    render(){
        console.log('contact',this.state.contact_,)
        return(
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.contact_}
                      renderItem={this.renderItem}
                        keyExtractor={(item,index)=>item.recordID}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={this.emptycomp}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.props.friendLoading}
                          onRefresh={()=>this.refresh()}
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
    const {friendLoading,userList ,friendError,message} = state.friend
    
    return { JWT_Token,friendLoading,userList,friendError,message }
  
  }
  const mapDispatchToProps = {
    
    dispatchgetUserList:(jwt)=>getUserList(jwt),
    dispatchInviteUser:(jwt,invite)=>inviteUser(jwt,invite)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Invite)
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