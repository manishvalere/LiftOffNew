import React, { Component } from 'react';
import { View, Text,StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import RadioButton from '../../components/RadioButton';
import Btn_continue from '../../components/Btn_continue';
import color from '../../constant/colors';
import CheckList from '../../components/checklist';
import CheckList_Child from '../../components/checklist_child';
import { connect } from 'react-redux'
import { setProfileValue,updateProfileValue } from '../../actions';
import {MaterialIcons} from 'react-native-vector-icons';
const PROP = [
    {
        key:1,
        value:'Track your Workouts',
        details:[
            'Easy to find exercises.',
            'Track and record progress for every session.',
            'Customize your routines/workouts.'
           
        ]
    },
    {
        key:2,
        value:'Compete against Friends',
        details:[
            'Connect and compete with other friends/users.',
            'Compete in ANY lift or exercise.',
            'Customize your workouts.',
            'When competing with others, you are 7x more likely to achieve your fitness goals.'
        ]
    },
    {
        key:3,
        value:'Add Friends',
        details:[
            'Connect to view profile, chat, and challenge others.',
            'Grow your workout group/community.',
            ' View other user’s wins and loss record from previous matches.'
            
        ]
    },
    {
        key:4,
        value:'SWR (Strength To Weight Ratio)',
        details:[
            "It's simply your strength — or the amount of weight you can lift — divided by your body weight.",
            'Allows you to establish a true strength rating.',
            'Helps level the playing field for all users.',
            
        ]
    }
]
export class Onboarding_Four extends Component{
    constructor() {  
        super();  
        this.state = {  
              
            showHideComp1: false,  
            showHideComp2: false,  
            showHideComp3: false,
        };  
        
    } 
    
    onPress_btn=()=>{
        const {fname,lname,email,age,weight,height,workout_week,notify_workout, inch, gender,device_token} = this.props
        const data={
            first_name:fname,
            last_name:lname,
            email:email,
            dob:age,
            gender:gender,
            weight:weight,
            height:height+' ’ '+inch+' ”',
            workout_week:workout_week,
            notify_workout:notify_workout,
            device_token:device_token
        }
       // console.log('data in btn four', data)
        this.props.dispatchUpdateProfile(this.props.JWT_Token,data);
    }
    hideComponent=(name)=> {  
       // console.log(name);  
        switch (name) {  
            case "showHideComp1":  
                this.setState({ showHideComp1: !this.state.showHideComp1 });  
                break;  
            case "showHideComp2":  
                this.setState({ showHideComp2: !this.state.showHideComp2 });  
                break;  
            case "showHideComp3":  
                this.setState({ showHideComp3: !this.state.showHideComp3 });  
                break;
            default:  
                null;  
        }  
    } 
    
    render(){
        return(
            
            <ScrollView contentContainerStyle={styles.container}>
                <View
                style={styles.backround_block}
                >
                
                </View>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}  style={{width:'85%', alignItems:'center', justifyContent:'flex-start', flexDirection:'row', marginTop:40}}>
                    <MaterialIcons name='keyboard-arrow-left' color='white' size={25} />
                    </TouchableOpacity>
                
                    <View style={styles.text_block}>
                        <View style={{flex:0.3, justifyContent:'space-around', marginTop:20}}>
                           <Text style={styles.create_head}>You're Ready to go!</Text>
                        <View>
                            <Text style={styles.create_text}>To get you started, here is a</Text>
                            <Text  style={styles.create_text}>checklist</Text>
                        </View>
                        
                        </View>
                        
                        <View style={{width:'100%', flex:0.7, justifyContent:'space-between'}}>
                        <Text  style={styles.create_text}>Tap to learn</Text>
                           <CheckList PROP={PROP}/>
                        </View>    
                    </View>
                   
                    
                    
                
                <View style={styles.bloack_2}>
                  <Btn_continue  onPress={this.onPress_btn} title='Let’s Workout'/>
                    
                </View>
                
            </ScrollView>
            
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token,gender,fname,lname,email,age,weight,height,inch,workout_week,notify_workout, updateError,device_token} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token, gender,fname,lname,email,age,weight,height,inch,workout_week,notify_workout ,updateError,device_token}
  }
  
  const mapDispatchToProps = {
    dispatchUpdateProfile:(token, profile)=>updateProfileValue(token, profile)
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Onboarding_Four)

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
        flex:0.3,
        justifyContent:'flex-end',
        alignItems:'flex-end', 
        flexDirection:'row',
        width:'80%',
        marginBottom:50
    },
    text_block:{
        
        flex:0.7,
        justifyContent:'space-between',
        alignItems:'stretch',
       // marginTop:40,
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
    create_text:{
        fontSize:18,
        lineHeight:26,
        fontWeight:'normal',
        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    }
    
})