import React, { Component } from 'react';
import { View, Text,StyleSheet,ImageBackground  } from 'react-native';
import Btn_continue from '../../components/Btn_continue';
import Btn_White from '../../components/Btn_white';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Joined_Screen from './joined';
import Pending_Screen from './pending';
import { connect } from 'react-redux';
import Contacts from 'react-native-contacts';
import { setContact } from '../../actions';
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
            fontSize: 14,
            fontFamily:'Montserrat-Regular',
            lineHeight: 17,
            opacity:0.7
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
     
      name="Joined" component={Joined_Screen} />
     
      <Tab.Screen name="Pending" component={Pending_Screen} />
    </Tab.Navigator>
  );
}
export  class Challenge_Created extends Component{
    constructor(props){
        super();
        this.state={
            challenge:'',
            id:'',
            ex_type:'',
            contacts:'',
            subcategory_id:'',
            exercise_date:'',
            exercise_status:'',
            detail:{}
        }
    }
    onPress=()=>{
        this.props.navigation.navigate('find_friend',{id:this.props.challenge_id})
    }
    startChallenge=()=>{
        this.props.navigation.navigate('start_challenge', {
            title:this.state.challenge,
            id:this.props.challenge_id,
            history:false,
            category_type:this.state.ex_type,
            subcategory_id:this.state.subcategory_id,
            exercise_date:this.state.exercise_date,
            detail:this.state.detail
          });
    }
    componentDidMount(){
        const { challenge,id,category_type,subcategory_id,exercise_date,exercise_status, detail} = this.props.route.params;
        //console.log('cdm in challenge created', detail)
        this.setState({
            challenge:challenge,
            id:id,
            ex_type:category_type,
            subcategory_id:subcategory_id,
            exercise_date:exercise_date,
            exercise_status:exercise_status,
            detail:detail
        })
    //  console.log('exercise_date',exercise_date)
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
    loadContacts = () => {
      //  console.log('load contact is calling')
         Contacts.getAll((err, contacts) => {
          // console.log('err',err)
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
                this.props.dispatchSetContact(states)
              
             }
           });
        
       };
    render(){
     // console.log('this.pros. challenge_id', this.props.challenge_id)
        return(
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/challenge/challenge_bg_new.png')} style={styles.image}>
                      <View style={styles.first_block}>
                          <View style={{justifyContent:'center',alignItems:'center'}}>
                          <Text style={styles.title_text}>{this.state.challenge} Challenge Created</Text>
                          {/* <Text  style={styles.title_text}>Created</Text> */}
                          </View>
                          <Btn_White onPress={this.onPress} title = 'Challenge Friends / Invite'/>
                      </View>
                      <View style={styles.midblock}>
                           <MyTabs/>
                      </View>
                      {this.state.exercise_status =='Completed' ? <View style={styles.second_block}>
                          
                      </View> : <View style={styles.second_block}>
                          <Btn_continue onPress={this.startChallenge}  title='Start Challenge'/>
                      </View>}
                </ImageBackground>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {fitLoading, sub_category,image_url,main_category} = state.fitness
    const {challengeLoading,challengeError,createChallenge,challenge_id} = state.challenge
    return { JWT_Token,fitLoading, sub_category,image_url,main_category,challengeLoading,challengeError,createChallenge,challenge_id}
 
  }
  const mapDispatchToProps = {
    
    dispatchSetContact:(contact)=>setContact(contact)
   }
  export default connect(mapStateToProps,mapDispatchToProps)(Challenge_Created)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        marginBottom:70
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
        justifyContent:'space-around', 
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
        fontWeight: '400',
        fontSize: 24,
        lineHeight: 32,
        textAlign:'center',

        color:'#FFFFFF',
        opacity:1
    },
    midblock:{
        flex:0.55,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        width:'90%',
        borderRadius:10
    //    / justifyContent:'center',
        //alignItems:'center'
        
    }
    
})