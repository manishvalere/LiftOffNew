import React, { Component } from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView,Dimensions, ScrollView,SafeAreaView } from 'react-native';
import InputText from '../../components/input_text';
import Picker_select from '../../components/picker_selecter';
import Btn_continue from '../../components/Btn_continue';
import { connect } from 'react-redux'
import { setProfileValue } from '../../actions';
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
export class CreateProfileScreen extends Component{
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
        this.props.navigation.navigate('Welcome')
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
      //  console.log('profile', this.props.fname, this.props.lname, this.props.JWT_Token)
        return(
            
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
            //keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 10}
            style={{flex:1, backgroundColor:'#1F1F1F'}}
            >
            <ScrollView style={{flex:1}}>
            <View style={styles.container}>
               <View style={styles.create_text_block}>
                   <Text style={styles.create_head}>Create Your Profile</Text>
                   <Text style={styles.create_text}>Let's set up profile so your friends can find you</Text>
               </View>
               <View style={styles.form_signup_block}>
                   
                   <InputText  
                   placeholder='First Name'
                   value={this.props.fname}
                   onChangeText={text => this._setValue('fname', text)}
                   name='fname'
                   onFocus={this.setfnameError}
                   //keyboardType={'visible-password'}
                   />
                   <Text style={styles.error}>{this.state.fnameError}</Text>
                   <InputText  
                   placeholder='Last Name'
                   value={this.props.lname}
                   onChangeText={text => this._setValue('lname', text)}
                   name='lname'
                   onFocus={this.setlnameError}
                   />
                   <Text style={styles.error}>{this.state.lnameError}</Text>
                   <InputText  
                   placeholder='Email'
                   value={this.props.email}
                   onChangeText={text => this._setValue('email', text)}
                   name='email'
                   disable={true}
                   onFocus={this.setemailError}
                   />
                   
                   <Text style={styles.error}>{this.state.emailError}</Text>
                   <InputText  
                   placeholder='Age'
                   value={this.props.age}
                   onChangeText={text => this._setValue('age', text)}
                   name='age'
                   keyboardType={'phone-pad'}
                   onFocus={this.setageError}
                   maxLength={3}
                   />
                   <Text style={styles.error}>{this.state.ageError}</Text>
                   <InputText  
                   placeholder='Weight(LBS)'
                   value={this.props.weight}
                   onChangeText={text => this._setValue('weight', text)}
                   name='weight'
                   keyboardType={'phone-pad'}
                   onFocus={this.setweightError}
                   maxLength={3}
                   />
                   
                   <Text style={styles.error}>{this.state.weightError}</Text>
                   <View style={{ flexDirection:'row'}}>
                       <View style={{flex:1,height:60}}>
                            <Picker_select challenge={true} data={feet} placeholder="Hieght" onValueChange={value => {this._setValue('height', value); this.setheightError();}} color='rgba(255, 255, 255, 0.3)' value={this.props.height} width='50%'/>
                            <View style={{width:'95%',background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)', marginRight:-30 }}>
                                
                            </View>
                            <Text style={styles.error}>{this.state.heightError}</Text>
                       </View>
                       <View style={{flex:1,height:60}}>
                            <Picker_select challenge={true} data={inch} placeholder="Height(Inch)" onValueChange={value => {this._setValue('inch', value); this.setinchError();} }color='rgba(255, 255, 255, 0.3)' value={this.props.inch} width='50%'/>
                            <View style={{width:'100%',background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)',  }}>
                                
                            </View>
                            <Text style={styles.error}>{this.state.inchError}</Text>
                       </View>
                      
                   </View>
                   
                       
               </View>
               <View style={styles.btn_signup_block}>
               <Btn_continue  onPress={this.submit} /*onPress={this.onPress}*/ title='Continue'/>
               </View>
               </View>   
               </ScrollView>
            </KeyboardAvoidingView>
           
            
        )
    }
}

const mapStateToProps = state => {
    const {fname,lname,email,age,weight,height,inch} = state.auth
   return {fname,lname,email,age,weight,height, inch }
  }
  
  const mapDispatchToProps = {
    dispatchSignup: (phone,email, password) => signup(phone,email, password),
    dispatchsignupInit:() => signupInit(),
    dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value)
  }

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfileScreen)
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
        height:windowHeight * (15/100),
        justifyContent:'space-around',

        marginTop:20,
        width:'80%'

        
    },
    form_signup_block:{
         //flex:0.6
         height:'auto',
        justifyContent:'center'
    },
    btn_signup_block:{
        //flex:0.2,
        height:windowHeight * (10/100),
        width:'80%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
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
})