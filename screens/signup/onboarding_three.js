import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import RadioButton from '../../components/RadioButton';
import Btn_continue from '../../components/Btn_continue';
import color from '../../constant/colors';
import { connect } from 'react-redux'
import { setProfileValue } from '../../actions';
import {MaterialIcons} from 'react-native-vector-icons';
import messaging from '@react-native-firebase/messaging';
const PROP = [
	
    {
		key: 'on',
		text: 'Yes, let me know',
	},
	{
		key: 'off',
		text: 'No, I am good',
    }
	
];
export class Onboarding_Three extends Component{
    constructor(props){
        super(props);
        this.state={
            error:''
        }
        this.ChildElement = React.createRef();
    }
    async  saveTokenToDatabase(token) {
        // Assume user is already signed in
        // const userId = auth().currentUser.uid;
        // console.log('userID',userId)
        // Add the token to the users datastore
        // await firestore()
        //   .collection('users')
        //   .doc(userId)
        //   .update({
        //     tokens: firestore.FieldValue.arrayUnion(token),
        //   });
        setToken(token)
      }
    async  UserPermission(){
        const authStatus = await messaging().hasPermission();
       // console.log('authstatus has permission', authStatus)
        return authStatus
       
      }
      async requestUserPermission(){
          //console.log('request usr permission calling')
          const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
            messaging()
            .getToken()
            .then(token => {
            //  console.log('device token', token)
              return _setValue = (fieldName, value) => {
                // console.log('Set value in uurscreen');
                 this.props.dispatchSetProfileValue('device_token', token);
                // console.log('in set value',this.props.profile)
               }
            });
      }
    }
    onPress_btn=()=>{
        if(this.validate()){
            messaging()
            .getToken()
            .then(token => {
             console.log('device token on board three', token)
              //return _setValue = (fieldName, value) => {
                // console.log('Set value in uurscreen');
                 this.props.dispatchSetProfileValue('device_token', token);
                // console.log('in set value',this.props.profile)
               //}
            });
            const childelement = this.ChildElement.current;
            const notify_workout = childelement.state.value
            
           
                //console.log('calling this function')
                this.props.dispatchSetProfileValue('notify_workout', notify_workout);
                this.props.navigation.navigate('Onboard_four')   
            
           // console.log('Set value in uurscreen');
            
    
            
        }
    }
    
    validate=()=>{

        // /this.props.navigation.navigate('Onboard_two')
    //}
    //handleClick = () => {
        const childelement = this.ChildElement.current;
            const notify_workout = childelement.state.value
        
       if(notify_workout == null){
        this.setState({
               error:'Please select any option!'
           })
           return false;
       }
        
          
        return true;
          
          
    };
    render(){
        return(
            <View style={styles.container}>
                <View
                style={styles.backround_block}
                >
                
                </View>

                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}  style={{width:'85%', alignItems:'center', justifyContent:'flex-start', flexDirection:'row', marginTop:40}}>
                    <MaterialIcons name='keyboard-arrow-left' color='white' size={25} />
                    </TouchableOpacity>
                    <View style={styles.text_block}>
                        <View style={{marginTop:20}}>
                        <Text style={styles.create_head}>Would you like to be notified</Text>
                        <Text style={styles.create_head}>when your friends are</Text>
                        <Text style={styles.create_head}>working out and about challenges?</Text>
                        </View>
                        
                           <RadioButton  ref={this.ChildElement} PROP={PROP}/>
                           <Text style={{color:'red', fontFamily:'Montserrat-Regular'}}>{this.state.error}</Text>
                    </View>
                   

                    
                
                <View style={styles.bloack_2}>
                    <View style={{flex:1, flexDirection:'row', marginBottom:40}}>
                        
                        <View style={styles.pagination_small}></View>
                        
                        <View style={styles.pagination_small}></View>
                        <View style={styles.pagination_big}></View>
                    </View>
                    <View style={styles.Btn_continue}>
                    <Btn_continue onboard='true' onPress={this.onPress_btn} title='Get Started'/>
                    </View>
                </View>
                
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token, notify_workout} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token, notify_workout }
  }
  
  const mapDispatchToProps = {
    dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value)
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding_Three)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
        backgroundColor:'#363636'
    },
    backround_block:{
        position:'absolute',
        width:679,
        height:679,
        left:-150, 
        top:-140,
        backgroundColor:'#262727', 
        borderRadius:679/2
    },
    block_1:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    bloack_2:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end', 
        flexDirection:'row',
        width:'80%',
        //marginBottom:50
    },
    text_block:{
        
        flex:1,
        justifyContent:'space-between',
        alignItems:'flex-start',
        //marginTop:40,
        width:'80%'
    },
    checkbox_block:{
        flex:1
    },
    btn_block:{
        flex:1
    },
    create_head:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:28,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    Btn_continue:{
        flex:2,
       // width:'80%',
       marginBottom:40,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    pagination_big:{
        width:34,
        height:8,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        marginRight:10
    },
    pagination_small:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        marginRight:10
    },
    btn_con:{
        width:'70%',
        height:48,
        backgroundColor:color.primary,
        borderRadius:50/2,
        justifyContent:'center',
        alignItems:'center'
        
    },
    
})