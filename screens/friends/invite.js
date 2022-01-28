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
            contact_:[], 
            contacts:[],
            search_result:[],

            
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
           <Text style={styles.name_text}>No Contacts Found</Text>
           </View>
        )
    }
    
    componentDidUpdate(prevProps){
      if(this.props.change !== prevProps.change){
        console.log('this.calinng in didupdate')
        this.props.dispatchgetUserList(this.props.JWT_Token);
      }
        if(this.props.userList !== prevProps.userList){
            let contacts =this.state.contacts;
            let users = this.props.userList;
           
            let result = contacts.filter(o1 => {
             
             var flag=0;
             var receiver_user_status = '';
             var connection_type = '';
             var user_conn_type = '';
              users.forEach((s) => {
                  //console.log('numbr and phone', o1.number, s.phone_number)
                  if (o1.number == s.user_phone) {

                     
                      flag=1;
                      receiver_user_status = s.receiver_user_status;
                      connection_type = s.connection_type;
                      user_conn_type = s.user_conn_type

                      
                      }
                  
              })
              if(flag==1)
              {
                o1.connected = true;
                o1.receiver_user_status = receiver_user_status;
                o1.connection_type = connection_type;
                o1.user_conn_type = user_conn_type;
              }else{
                o1.connected = false;
                o1.receiver_user_status = receiver_user_status;
                o1.connection_type = connection_type;
                o1.user_conn_type = user_conn_type;
              }
            return contacts;  
          });
                //console.log('contacttcctc', result)
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
    // loadContacts = () => {
    //     console.log('load contact is calling')
    //      Contacts.getAll((err, contacts) => {
    //       // console.log('err',err, contacts)
    //          contacts.sort(
    //            (a, b) => 
    //              a.givenName.toLowerCase() > b.givenName.toLowerCase(),
    //          );
    //          var states=contacts.filter((e)=> { return e.phoneNumbers.length > 0})
    //          if (err === 'denied') {
    //            alert('Permission to access contacts was denied');
    //          //  console.warn('Permission to access contacts was denied');
    //          } else {
    //         //    this.setState({
    //         //        contacts:states
    //         //    })
    //         for(let i=0; i<states.length; i++){
    //             let num =   states[i].phoneNumbers[0].number
    //           //  console.log('num',num)
    //           var  new_num  = num.replace(/([-*?^=!:${}()|\[\]\/\\])/g, "");
    //           var  new_space_num = new_num.replace(/ /g, "")
    //             states[i].phoneNumbers[0].number = new_space_num;
    //             //new_space_num = parseInt(new_space_num)
    //             // let new_str = new_space_num.slice(new_space_num.length - 10);
                
    //             states[i].number = new_space_num;
    //             }
    //             this.setState({
    //                 contact:states
    //             }) 
              
    //          }
    //        });
        
    //    };


    loadContacts = async() => {
      // console.log('load contact is calling')
        Contacts.getAll((err, contacts) => {
         // console.log('err',err)
            contacts.sort(
              (a, b) => 
                a.givenName.toLowerCase() > b.givenName.toLowerCase(),
            );
            var states=contacts.filter((e)=> { return e.phoneNumbers.length > 0})
            if (err === 'denied') {
              alert('Permission to access contacts was denied');
              //console.warn('Permission to access contacts was denied');
            } else {
              for(let i=0; i<states.length; i++){
                let num =   states[i].phoneNumbers[0].number
                //console.log('num',num)
              var  new_num  = num.replace(/([-*?^=!:${}()|\[\]\/\\])/g, "");
              var  new_space_num = new_num.replace(/ /g, "")
                states[i].phoneNumbers[0].number = new_space_num;
                //new_space_num = parseInt(new_space_num)
                //console.log('newspace name', new_space_num)
                let new_str = new_space_num.slice(new_space_num.length - 10);
                states[i].number = new_space_num;
                }
              this.setState({
                  contacts:states
              })
              if(this.state.contacts.length>0 && this.props.connectedFriend !== null&& this.props.connectedFriend != undefined){
                var new_pending = this.props.connectedFriend
           
                for(let i=0;i<new_pending.length; i++){
                    const str = new_pending[i].receiver_user_mob_no
                   // const str = 'ECMAScript 2015'; 
                   let new_str = str.slice(str.length - 10);
                   new_pending[i].receiver_user_mob_no = new_str
                }
                      var result = this.state.contacts.filter(o1 => new_pending.some(o2 => o1.number === o2.receiver_user_mob_no))
                    //  console.log('result in connected friebd', result);
                      this.setState({
                        connected_friend:result
                      }) 
                    }
                  //console.log('contacts', this.state.contacts, this.state.connected_friend);
                  }
          });
         
          //let result = result1.filter(o1 => result2.some(o2 =>  o2.number === o1.receiver_user_mob_no))
          // for(let i=0;i<result.length;i++){
          //     for(let j=0;this.props.connectedFriend.length<0;j++){
          //         if(result[i].number==this.props.connectedFriend[j].receiver_user_mob_no){
          //             console.log('challehe is equzl',this.props.connectedFriend[j].challenge_id)
          //             result[i].challenge_id = this.props.connectedFriend[j].challenge_id
          //         }
          //     }
          //     console.log('result in', result[i].challenge_id)
          // }
          
      };

       search=(text)=>{
        // console.log('handler change is calling ', text)
         
   // this.reset_filter()
   if(text !== '' && text !== null){
     if(text == ''){
      // console.log('text value is blank')
     }
    // console.log('e target', this.state.contacts)
     let val =text
     let matches = this.state.contacts.filter(v => v.givenName.toUpperCase().includes(val.toUpperCase()) || v.familyName.toUpperCase().includes(val.toUpperCase()) || v.number.toString().includes(val) );
    // console.log('match result', matches)
     if(matches.length > 0 && matches !== undefined){
       // this.setState({
       //   serach_result:matches
       // })
       
       this.state.search_result = matches;
       //console.log('item in supplier filter',matches);
       this.setState(prevState => ({
         
         search_result :matches
       }))
      
     }
   
   
   }else{
     //console.log('target value null ', )
    this.setState({
      search_result:[],
      
    })
  
 }
     }

       
    render(){
        console.log('contact',this.state.contact_,)
        return(
            <View style={styles.container}>

              <View style={styles.invite_head_block}>
                    {/* <Text style={styles.invite_head_text}>Invite to create a Lift Off account</Text> */}
                    <Search_Box onChangeText={this.search} width='100%' placeholder='Find Your friend'/>
                </View>
                
                <View style={{flex:1}}>
                    <FlatList
                      // data={this.state.contact_}
                                            data={this.state.search_result.length> 0 ? this.state.search_result : this.state.contacts}

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
    const {friendLoading,userList ,friendError,message, change} = state.friend
    
    return { JWT_Token,friendLoading,userList,friendError,message , change}
  
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