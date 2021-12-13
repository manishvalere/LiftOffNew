import React, { Component } from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView,Dimensions, ScrollView,SafeAreaView, TouchableOpacity } from 'react-native';
import TextInputEdit from '../../components/TextInput_Edit';
import Picker_select from '../../components/picker_selecter';
import Btn_continue from '../../components/Btn_continue';
import { connect } from 'react-redux'
import {Toast, Root, Item} from 'native-base';
import { setProfileValue, updateProfileValue } from '../../actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const feet=[
    {name:'Height (Feet)', value:null},
    {name:'1', value:'1'},
    {name:'2', value:'2'},
    {name:'3', value:'3'},
    {name:'4', value:'4'},
    {name:'5', value:'5'},
    {name:'6',value:'6'},
    {name:'7',value:'7'},
    {name:'8',value:'8'},
    {name:'9',value:'9'},
    {name:'10',value:'10'},


]
const inch=[
    
    {name:'Height (Inch)',value:null},
    {name:'0',value:'0'},
    {name:'1',value:'1'},
    {name:'2',value:'2'},
    {name:'3',value:'3'},
    {name:'4',value:'4'},
    {name:'5',value:'5'},
    {name:'6',value:'6'},
    {name:'7',value:'7'},
    {name:'8',value:'8'},
    {name:'9',value:'9'},
    {name:'10',value:'10'},
    {name:'11',value:'11'},
    
]
const PROP = [
	{
		key: 'male',
		text: 'Male',
	},
	{
		key: 'female',
		text: 'female',
	},
	
];
export class EditProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selected: "key1",
          fname:'',
          lname:'',
          email:'',
          age:'',
          weight:'',
          height:null,
          inch:null

        };
      }
      _setValue = (fieldName, value) => {
       // console.log('Set value in uurscreen');
        this.props.dispatchSetProfileValue(fieldName, value);
       // console.log('in set value',this.props.profile)
      }
      componentDidUpdate(prevProps){
          if(this.props.update_succes !== prevProps.update_succes){
              if(this.props.update_succes){
                  this.props.navigation.goBack();
                return Toast.show({
                    text: 'Profile Updated successfully!',
                    textStyle: { color: "green" },
                    //buttonText: "Okay"
                    duration:2500
                  })
              }else if(this.props.update_succes == false){
                return Toast.show({
                    text: 'Something went wrong!',
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
              }
          }
      }
    componentDidMount(){
        const user = this.props.user;
        const fname = user.first_name;
        const lname = user.last_name;
        const email = user.email;
        const age = user.dob;
        const weight = user.weight;
        const height = user.height;
        const gender = user.gender;
        const new_height =   height.split(" ")
             //console.log('Set value in uurscreen', new_height);
             this.props.dispatchSetProfileValue('fname', fname);
             this.props.dispatchSetProfileValue('lname', lname);
             this.props.dispatchSetProfileValue('email', email);
             this.props.dispatchSetProfileValue('age', age);
             this.props.dispatchSetProfileValue('weight', weight);
             this.props.dispatchSetProfileValue('height', new_height[0]);
             this.props.dispatchSetProfileValue('inch', new_height[2]);
             this.props.dispatchSetProfileValue('gender', gender);
            // console.log('in set value',this.props.profile)
    
    }
      onValueChange=(value)=> {
        this.setState({
            height_feet: value
        });
      }
      onValueChange_inch=(value)=> {
        this.setState({
            inch: value
        });
      }
      onPress=()=>{
        const {fname,lname,email,age,weight,height,workout_week,notify_workout, inch, gender} = this.props;
       // console.log('gender onpress', gender)
        const data={
            first_name:fname,
            last_name:lname,
            email:email,
            dob:age,
            gender:gender,
            weight:weight,
            height:height+' ’ '+inch+' ”',
            
        }
       // console.log('data in btn four', data)
        this.props.dispatchUpdateProfile(this.props.JWT_Token,data);
      }
      validate=()=>{
        let fnameError = "";
        let lnameError = "";
        let emailError = "";
        let ageError = "";
        let weightError = "";
        let heightError = "";
        let inchError = "";

        if(!this.props.fname){
            fnameError = "First Name is required";
        
    }
    else if(!/^(?:[A-Za-z]+|\d+)$/.test(this.props.fname)){
            fnameError= "First Name is not valid!"
    }
        if(!this.props.lname){
            lnameError = "Last Name is required";
        }
        else if(!/^(?:[A-Za-z]+|\d+)$/.test(this.props.lname)){
            lnameError= "Last Name is not valid!"
    }
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.props.email || reg.test(this.props.email) === false){
            emailError = "Email is Invalid!";
        }

        if(!this.props.age){
            ageError = "Age is required";
        }
        if(!this.props.weight){
            weightError = "Weight is required";
        }
        if(!this.props.inch){
            inchError = "Inch is required";
        }
        if(!this.props.height){
            heightError = "Height is required";
        }
        if(emailError || fnameError || lnameError || ageError || weightError || heightError || inchError){
            this.setState({emailError , fnameError , lnameError , ageError , weightError ,heightError , inchError});
            return false;
        }

        return true;
    }
    setfnameError=()=>{
        this.setState({
            fnameError:''
        })
    }
    setlnameError=()=>{
        this.setState({
            lnameError:''
        })
    }
    setemailError=()=>{
        this.setState({
            emailError:''
        })
    }
    setageError=()=>{
        this.setState({
            ageError:''
        })
    }
    setweightError=()=>{
        this.setState({
            weightError:''
        })
    }
    setheightError=()=>{
        this.setState({
            heightError:''
        })
    }
    setinchError=()=>{
        this.setState({
            inchError:''
        })
    }
    submit=()=>{
        if(this.validate()){
            // console.warn(this.state);
            // this.setState(defaultState);
            this.onPress();
        }
    }
    
    render(){
        //console.log('his.props.gender ',this.props.height,)
      if(this.props.user.first_name !== null)
        return(
            
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            //keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F', marginBottom:83, alignItems:'center'}}
            >
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{alignItems:'center', width:windowWidth}}>
               
               <View style={styles.form_signup_block}>
                   
                   <TextInputEdit  
                   placeholder='First Name'
                   value={this.props.fname}
                   onChangeText={text => this._setValue('fname', text)}
                   name='fname'
                   onFocus={this.setfnameError}
                   //keyboardType={'visible-password'}
                   />
                   <Text style={styles.error}>{this.state.fnameError}</Text>
                   <TextInputEdit  
                   placeholder='Last Name'
                   value={this.props.lname}
                   onChangeText={text => this._setValue('lname', text)}
                   name='lname'
                   onFocus={this.setlnameError}
                   />
                   <Text style={styles.error}>{this.state.lnameError}</Text>
                   <TextInputEdit  
                   placeholder='Email'
                   value={this.props.email}
                   onChangeText={text => this._setValue('email', text)}
                   name='email'
                   disable={true}
                   onFocus={this.setemailError}
                   />
                   
                   <Text style={styles.error}>{this.state.emailError}</Text>
                   <TextInputEdit  
                   placeholder='Age'
                   value={this.props.age}
                   onChangeText={text => this._setValue('age', text)}
                   name='age'
                   keyboardType={'phone-pad'}
                   onFocus={this.setageError}
                   maxLength={3}
                   />
                   <Text style={styles.error}>{this.state.ageError}</Text>
                   <TextInputEdit  
                   placeholder='Weight(LBS)'
                   value={this.props.weight}
                   onChangeText={text => this._setValue('weight', text)}
                   name='weight'
                   keyboardType={'phone-pad'}
                   onFocus={this.setweightError}
                   maxLength={3}
                   />
                   <Text style={styles.error}>{this.state.weightError}</Text>
                   <View style={{ flexDirection:'row',justifyContent:'space-around',width:windowWidth *(95/100)}}>
                       {/* <View style={{height:60}}> */}
                            <Picker_select challenge={true} data={feet} placeholder="Height" onValueChange={value => {this._setValue('height', value); this.setheightError();}} color='rgba(255, 255, 255, 0.3)' value={this.props.height} width='50%'/>
                            {/* <View style={{width:'90%',background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)', marginRight:-30 }}>
                                
                            </View> */}
                            <Text style={styles.error}>{this.state.heightError}</Text>
                       {/* </View> */}
                       {/* <View style={{height:60}}> */}
                            <Picker_select challenge={true} data={inch} placeholder="Height(Inch)" onValueChange={value => {this._setValue('inch', value); this.setinchError();} }color='rgba(255, 255, 255, 0.3)' value={this.props.inch} width='50%'/>
                            {/* <View style={{width:'90%',background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)',  }}>
                                
                            </View> */}
                            {/* <Text style={styles.error}>{this.state.inchError}</Text> */}
                       {/* </View> */}
                      
                   </View>
                  <View style={styles.item}>
                   <Text style={styles.input}>Gender</Text>
                  </View>
                   <View style={styles.switch_block}>
                       
                {PROP.map((res,index) => {
                    // console.log('his.props.gender === res.key',this.props.gender,res.key)
                    return (
                        <View key={res.key} style={styles.touch_bloack}>
                            {/* <Text style={styles.radioText}>{res.text}</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    this.setState({
                                        value: res.key,
                                    });
                                }}>
                                  {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity> */}
                            <TouchableOpacity 
                            style={{
                                //flex:1,
                                width:16,
                                backgroundColor:this.props.gender === res.key ? '#ADF350' : null,
                                height:16,
                                borderRadius:16/2,
                                justifyContent:'center',
                                alignItems:'stretch',
                                borderWidth:1,
                                borderColor:'#ADF350'
                                // borderWidth:value === res.key ? 1.5 : null,
                                // borderColor:value === res.key ? '#ADF350' : null
                            }}
                            onPress={() => {
                                this._setValue('gender',res.key)
                            }}
                            >
                                
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                this._setValue('gender',res.key)
                            }}
                            >
                            <Text style={styles.date_range}>{index == 0 ? 'Male' : 'Female'}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                </View>
                   
            
               </View>
               <View style={styles.btn_signup_block}>
               <Btn_continue  onPress={this.submit} /*onPress={this.onPress}*/ title='Submit'/>
               </View>
               </View>   
               </ScrollView>
            </KeyboardAvoidingView>
           
            
        )
    }
}

const mapStateToProps = state => {
    const {fname,lname,email,age,weight,height,inch,user,isLoggedIn,gender, JWT_Token,profile_img_error,image_url,authLoading,update_succes} = state.auth
    
   return {fname,lname,email,age,weight,height,gender, inch ,user,isLoggedIn, JWT_Token,profile_img_error,image_url,authLoading,update_succes}
  }
  
  const mapDispatchToProps = {
    dispatchSignup: (phone,email, password) => signup(phone,email, password),
    dispatchsignupInit:() => signupInit(),
    dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value),
    dispatchUpdateProfile:(token, profile)=>updateProfileValue(token, profile)
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
const styles = StyleSheet.create({
    container:{
        flex:1,
        //height:'auto',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#1F1F1F'
    },
    create_text_block:{
        // flex:0.2,
      //  height:windowHeight * (20/100),
        justifyContent:'space-around',

        marginTop:20,
        width:'80%'

        
    },
    form_signup_block:{
         //flex:0.6
        // height:windowHeight * (70/100),
        justifyContent:'center',
        alignItems:'flex-start'
    },
    btn_signup_block:{
        //flex:0.2,
        height:windowHeight * (10/100),
        width:'90%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
       
    },
    create_head:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:24,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    create_text:{
        fontSize:18,
        lineHeight:26,
        fontWeight:'normal',
        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    },
    error:{
        color:'#fa2a31',
        fontSize:12,
        marginVertical:5
    },
    switch_block:{
        width:windowWidth * (95/100),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:10
    },
    touch_bloack:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:windowWidth * (30/100)
    },
    date_range:{
        fontFamily:'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        color: '#FFFFFF',
        marginLeft:10
    },
    input:{
        fontSize:16,
        lineHeight:20,
        fontWeight:'500',
        color:'#FFFFFF',
        width:'100%',
        fontFamily:'Montserrat-Regular',
        textAlign:'left'
    },
    item:{
        // height:30,
        // width:'90%',
        // borderWidth:0,
         marginTop:20,
        // justifyContent:'flex-start',
        // alignItems:'flex-start',
        // borderBottomColor:'red',
        //flex:1,
        flexDirection:'row',
        height:30,
        width:'90%',
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        //backgroundColor:'red'
    },
})