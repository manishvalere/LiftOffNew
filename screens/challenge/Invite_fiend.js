import React, { Component } from 'react';
import { View, Text,ScrollView,StyleSheet,Platform ,Dimensions,FlatList,TouchableOpacity,PermissionsAndroid, KeyboardAvoidingView, } from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
import Contacts from 'react-native-contacts';
import FriendCard from '../../components/friend_card';
import color from '../../constant/colors'
import Btn_continue from '../../components/Btn_continue';
import Invite_Check_Card from '../../components/Invite_checkcard';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Search_Box from '../../components/search_box';
import { connect } from 'react-redux';
import { inviteFriend ,getConnectedFriend} from '../../actions/challenge';
import {Toast, Root} from 'native-base';
import { GETMAIN_FAILUARE } from '../../constant';
const data = ['1', '2', '3', '4','5', '6', '7']
export  class Invite_Friends extends Component{
    constructor(props){
        super(props);
        this.state={
            contacts:[],
            selected_contact:[],
            search_result:[],
            challenge_id:'',
            connected_friend:[]
        }
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
            text: this.props.errorMessage,
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
     // console.log('iuhoqwjdoqmd', new_pending[i].phone_number)
        const str = new_pending[i].phone_number
       // const str = 'ECMAScript 2015'; 
       //let new_str = str.slice(str.length - 10);
       new_pending[i].phone_number = str
    }
   // console.log('new paending, ', new_pending)
          var result = this.state.contacts.filter(o1 => new_pending.some(o2 => o1.number === o2.phone_number))
         // console.log('result in connected friebd in cdu', result);
          this.setState({
            connected_friend:result
          }) 
        }
        }
     
    }
  async  componentDidMount(){
      const { id} = this.props.route.params;
    this.setState({
      challenge_id:id
    })
    this.props.dispatchgetConnectedFriend(this.props.JWT_Token)
    if (Platform.OS === 'android') {
     // console.log('if android')
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
                    const str = new_pending[i].phone_number
                   // const str = 'ECMAScript 2015'; 
                   let new_str = str.slice(str.length - 10);
                   new_pending[i].phone_number = new_str
                }
                      var result = this.state.contacts.filter(o1 => new_pending.some(o2 => o1.number === o2.phone_number))
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
         for (var i in cont) {
          if (cont[i].recordID == contact.item.recordID) {
        //   console.log(' cont[i].selected', cont[i].selected)
            // if(cont[i].selected){
            //   cont[i].selected = false;
            // }else if( !cont[i].selected){
            //   cont[i].selected = true;
            // }
            
             break; //Stop this loop, we found it!
          }
        }
         
      }  
    renderItem=(contact)=>{
       // console.log('contact in item', contact.item)
        return(
            <Invite_Check_Card
                key={contact.item.recordID}
                item={contact.item}
                onPress={()=>this.select_multiple(contact)}
            />
        )
        
    }
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
    onPress=()=>{
      var new_selected_contact = [];
      const connect_friend  = false;
      if(this.state.selected_contact.length == 0){

        return Toast.show({
            text: 'Please select at least one contact!',
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
      this.props.dispatchinviteFriend(this.props.JWT_Token,this.state.challenge_id,new_selected_contact,connect_friend);
    }
    render_friend=(item)=>{
     // console.log('conect friend', item)
      return(
        <FriendCard onPress={()=>this.props.navigation.navigate('connect_friend',{id:this.state.challenge_id})} item={item.item}/>
       
      )
    }
    listemptyfriend=()=>{
      return(
        <View style={{width:windowWidth-20, justifyContent:'center',alignItems:'center'}}>
        <Text style={{ color:'#ADF350',fontFamily:'Montserrat-Regular'}}>Friends are not connected!</Text>
      </View>
      )
    }
    render(){
       // console.log('selected item number', this.props.invitation_sent, this.state.selected_contact)
        return(
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F'}}
            >
                
                    <View  style={styles.container}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('connect_friend',{id:this.state.challenge_id})} style={styles.connect_block}>
                    <Text style={styles.connected_text}>Connected Friends</Text>
                    <MaterialIcons name='keyboard-arrow-right' color='#AAAAAA' size={22} />
                </TouchableOpacity>
                <View style={styles.friend_block}>
                  <FlatList
                   data={this.state.connected_friend}
                   renderItem={this.render_friend}
                   keyExtractor={(item, index)=>index.toString()}
                   horizontal
                   ListEmptyComponent={this.listemptyfriend}
                  />
                   
                </View>
                <View style={styles.invite_head_block}>
                    {/* <Text style={styles.invite_head_text}>Invite to create a Lift Off account</Text> */}
                    <Search_Box onChangeText={this.search} width='100%' placeholder='Find Your friend'/>
                </View>
                <View style={{ height:windowHeight *(45/100),}}>
                    <FlatList
                      data={this.state.search_result.length> 0 ? this.state.search_result : this.state.contacts}
                      renderItem={this.renderItem}
                      keyExtractor={(item) => item.recordID}
                      showsVerticalScrollIndicator={false}
                      initialNumToRender={20}
                    />
                </View>
                

                <View style={styles.btn_block}>
                    <Btn_continue onPress={this.onPress} nonboard={true} title='Invite'/>
                </View>
                </View>
               
            </KeyboardAvoidingView>
        )
    }
}
const mapStateToProps = state => {
  const {JWT_Token,user} = state.auth
  
  const {challengeLoading,challengeError,invitation_sent,connectedFriend,errorMessage} = state.challenge
  return { JWT_Token,challengeLoading,challengeError,invitation_sent,connectedFriend,user,errorMessage}

}
const mapDispatchToProps = {
  dispatchinviteFriend:(jwt, id, form,connect_friend)=>inviteFriend(jwt,id,form,connect_friend),
  dispatchgetConnectedFriend:(jwt)=>getConnectedFriend(jwt)
 }
export default connect(mapStateToProps, mapDispatchToProps)(Invite_Friends)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        marginBottom:83,
        alignItems:'center'
    },
    connected_text:{
        
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight:20,
        letterSpacing: 0.2,
        color:color.primary,
        fontFamily:'Montserrat-Regular',
    },
    connect_block:{
        flexDirection:'row',
        width:'90%', 
        justifyContent:'space-between', 
        alignItems:'center',
        //flex:0.
        height:windowHeight *(2/100),
        marginVertical:10

    },
    friend_block:{
        width:windowWidth-20,
        height:windowHeight *(10/100),
        //flex:0.2,
        backgroundColor:'#262727',
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    btn_block:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        height:windowHeight *(10/100),
    },
    invite_head_block:{
        width:windowWidth-50,
        height:windowHeight *(8/100),
        //marginTop:15,
        //marginBottom:10
        alignItems:'center',
        justifyContent:'center'
    },
    invite_head_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color:'#ADF350',
        fontFamily:'Montserrat-Regular',
    }
    
})