import React, { Component } from 'react';
import { View, Text,ScrollView,StyleSheet ,Dimensions,FlatList } from 'react-native';
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
import {  getConnectedFriend, inviteFriend} from '../../actions/challenge';
import Contacts from 'react-native-contacts';
import {Toast, Root} from 'native-base';
const data = ['1', '2', '3', '4','5', '6', '7', '8', '9']
export  class Connected_Friend extends Component{
    constructor(props){
        super(props);
        this.state={
            contacts:[],
            selected_contact:[],
            connected_friend:[],
            challenge_id:''
        }
    }
    renderItem=(item)=>{
        //console.log('item in connected', item)
        return(
            <ContactCarc 
            connected={true} 
            onPress={()=>this.select_multiple(item)}
            item={item.item}/>
        )
        
    }
    select_multiple=(contact)=>{
      // console.log('onPress on item',contact)
        const cont = this.state.contacts
       var selected = this.state.selected_contact
     //  console.log(contact.item.phoneNumbers[0].number)
       this.setState(prevState => ({
         selected_contact: [...prevState.selected_contact, contact.item.phoneNumbers[0].number],
         //contact: [...prevState.contact, contact.item.phoneNumbers[0].number]
       }))

       if(contact.item['selected']){
         contact.item['selected'] = false;
      //  console.log('if in contact ', )
         selected = selected.filter(e => e !== contact.item.phoneNumbers[0].number); // will return ['A', 'C']
         this.setState({
           selected_contact:selected
         })
       }else if(!contact.item['selected']){
         contact.item['selected'] = true;
        
       }
        
       // console.log('contact after selected', contact)
      //   for (var i in cont) {
      //    if (cont[i].recordID == contact.item.recordID) {
      //  //   console.log(' cont[i].selected', cont[i].selected)
      //      // if(cont[i].selected){
      //      //   cont[i].selected = false;
      //      // }else if( !cont[i].selected){
      //      //   cont[i].selected = true;
      //      // }
           
      //       break; //Stop this loop, we found it!
      //    }
      //  }
        
     }  
    componentDidUpdate(prevProps){
      if(this.props.invitation_sent !== prevProps.invitation_sent){
        if(this.props.invitation_sent){
          this.props.navigation.navigate('challenge_created')
          //console.log('invitation send success block')
          return Toast.show({
            text: 'Invitation sent successfully!',
            textStyle: { color: "green" },
           // buttonText: "Okay",
            duration:2500
          })
        }
        
      }else{
       // console.log('out side the if in CDU')
      }
      if(this.props.challengeError !== prevProps.challengeError){
        if(this.props.challengeError){
        ///  console.log('invitation error block')
          return Toast.show({
            text: 'Something went wrong!',
            textStyle: { color: "red" },
           // buttonText: "Okay",
            duration:2500
          })
        }
      }
        if(this.props.connectedFriend !== prevProps.connectedFriend){
          if(this.state.contacts.length>0 && this.props.connectedFriend !== null&& this.props.connectedFriend != undefined){
            var new_pending = this.props.connectedFriend
 
      for(let i=0;i<new_pending.length; i++){
          const str = new_pending[i].phone_number
         // const str = 'ECMAScript 2015'; 
        // let new_str = str.slice(str.length - 10);
         new_pending[i].phone_number = str
         //console.log('str cdu', str)
      }
     // console.log('new paending, ', new_pending)
            var result = this.state.contacts.filter(o1 => new_pending.some(o2 => o1.number === o2.phone_number))
            //console.log('result in connected friebd in cdu', result);
            this.setState({
              connected_friend:result
            }) 
          }
          }
    }
    onPress=()=>{
      var new_selected_contact = [];
      const connect_friend = true;
      if(this.state.selected_contact.length == 0){

        return Toast.show({
            text: 'Please select at least one friend!',
            textStyle: { color: "red" },
           // buttonText: "Okay",
            duration:2500
          })
      }
      for(let i=0; i<this.state.selected_contact.length; i++){
      let num =   this.state.selected_contact[i]
     // console.log('num',num)
    var  new_num  = num.replace(/([-*?^=!:${}()|\[\]\/\\])/g, "");
    var  new_space_num = new_num.replace(/ /g, "")
      new_selected_contact.push(new_space_num);
      }
      //console.log('new_selected_contact',new_selected_contact)
      this.props.dispatchinviteFriend(this.props.JWT_Token,this.state.challenge_id,new_selected_contact, connect_friend);
    }
    componentDidMount=()=>{
      const { id} = this.props.route.params;
    this.setState({
      challenge_id:id
    })
        this.props.dispatchgetConnectedFriend(this.props.JWT_Token)
        if (Platform.OS === 'android') {
            //console.log('if android')
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
                    console.warn('Permission to access contacts was denied');
                  } else {
                    for(let i=0; i<states.length; i++){
                      let num =   states[i].phoneNumbers[0].number
                      //console.log('num',num)
                    var  new_num  = num.replace(/([-*?^=!:${}()|\[\]\/\\])/g, "");
                    var  new_space_num = new_num.replace(/ /g, "")
                      states[i].phoneNumbers[0].number = new_space_num;
                      // new_space_num = parseInt(new_space_num)
                      //let new_str = new_space_num.slice(new_space_num.length - 10);
                      //console.log('new_str', new_space_num)
                      states[i].number = new_space_num;
                      }
                    this.setState({
                        contacts:states
                    })
                    if(this.state.contacts.length>0 && this.props.connectedFriend !== null&& this.props.connectedFriend != undefined){
                      var new_pending = this.props.connectedFriend
           
                for(let i=0;i<new_pending.length; i++){
                    const str = new_pending[i].phone_number
                   // const str = 'ECMAScript 2015'; 
                   //let new_str = str.slice(str.length - 10);
                   //console.log('str str', str)
                   new_pending[i].phone_number = str
                }
                      var result = this.state.contacts.filter(o1 => new_pending.some(o2 => o1.number === o2.phone_number))
                      //console.log('result in connected friebd', result);
                      this.setState({
                        connected_friend:result
                      }) 
                    }
                  //console.log('contacts', this.state.contacts, this.state.connected_friend);
                  }
                });
               
                //let result = result1.filter(o1 => result2.some(o2 =>  o2.number === o1.phone_number))
                // for(let i=0;i<result.length;i++){
                //     for(let j=0;this.props.connectedFriend.length<0;j++){
                //         if(result[i].number==this.props.connectedFriend[j].phone_number){
                //             console.log('challehe is equzl',this.props.connectedFriend[j].challenge_id)
                //             result[i].challenge_id = this.props.connectedFriend[j].challenge_id
                //         }
                //     }
                //     console.log('result in', result[i].challenge_id)
                // }
                
            };
    listemptyfriend=()=>{
        return(
            <View
            style={styles.empty_block}
            
        >
            <Text style={styles.name_text}>Friends are not connected!</Text>
        </View>
        )
      }
    render(){
        return(
            <View style={styles.container}>
                
                <View style={{flex:1}}>
                    <FlatList
                      data={this.state.connected_friend}
                      renderItem={this.renderItem}
                      keyExtractor={(item,index)=>index.toString()}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={this.listemptyfriend}
                    />
                </View>
                
                <View style={styles.btn_block}>
                    <Btn_continue onPress={this.onPress} nonboard={true} title='Invite'/>
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
    dispatchinviteFriend:(jwt, id, form,connect_friend)=>inviteFriend(jwt,id,form,connect_friend),
    dispatchgetConnectedFriend:(jwt)=>getConnectedFriend(jwt)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Connected_Friend)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        marginBottom:83,
        alignItems:'center'
    },
    btn_block:{
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
      height:windowHeight *(10/100),
  },
    empty_block:{
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