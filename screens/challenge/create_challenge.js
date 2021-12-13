import React, { Component } from 'react';
import { View, Text, StyleSheet,Image ,Dimensions, ScrollView,ActivityIndicator,Button, KeyboardAvoidingView, Switch, TouchableOpacity, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Picker_select from '../../components/picker_selecter';
import Btn_continue from '../../components/Btn_continue';
import InputText from '../../components/input_text';
import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import  {getSubcategory,getMaincategory, createChallenge, setSubcategoryNull } from '../../actions';
import { connect } from 'react-redux';
import { Date_picker } from '../../components/date_time_picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Challenge_picker from '../../components/challenge_picker';
import Days_Picker from '../../components/days_picker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import colors from '../../constant/colors';
import InputText_challenge from '../../components/Text_input_challenge';
import Date_picker_Native from '../../components/native_date_picker';
import DatePicker from 'react-native-date-ranges';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const days = [
    {
        'days':'1 Day',
        'value':'1'
    },
    {
        'days':'2 Day',
        'value':'2'
    },
    {
        'days':'3 Day',
        'value':'3'
    },
    {
        'days':'4 Day',
        'value':'4'
    },
    {
        'days':'5 Day',
        'value':'5'
    },
    {
        'days':'6 Day',
        'value':'6'
    },
    {
        'days':'1 Week',
        'value':'7'
    },
    {
        'days':'2 Week',
        'value':'14'
    },
]
const reps = [
    {
        label:'5',
        value:'5'
    },
    {
        label:'10',
        value:'10'
    },
    {
        label:'15',
        value:'15'
    },
    {
        label:'20',
        value:'20'
    },
    {
        label:'25',
        value:'25'
    },
    {
        label:'30',
        value:'30'
    },
    {
        label:'35',
        value:'35'
    },
    {
        label:'40',
        value:'40'
    },
    {
        label:'45',
        value:'45'
    },
    {
        label:'50',
        value:'50'
    },
]

export  class Create_Challenge extends Component{
    constructor(props) {
        super(props);
        this.state = {
          challenge: null,
          date:'',
          sets:null,
          reps:null,
          weight:null,
          distance:null,
          time:null,
          calories:null,
          duration:null,
          category_id:'',
          minute:null,
          second:null,
          main_name:null,
          isEnabled: false ,
          challengeError:'',
          setsError:'',
          repsError:'',
          weightError:'',
          distanceError:'',
          minuteError:'',
          durationError:'',
          sub_category_id:'',
          reps_option:[],
          sets_option:[]
        };
        this.ChildElement = React.createRef();
      }
     
    setRepsOption=()=>{
        const reps_op = [];
        for(i=1;i<=100;i++){
            obj ={};
            const new_str = i.toString()
            obj.value = new_str;
            obj.label = i+' reps';
            reps_op.push(obj)
        }
        this.setState({
            reps_option:reps_op
        })
    }
    setSetsOption=()=>{
        const reps_op = [];
        for(i=1;i<=100;i++){
            obj ={};
            const new_str = i.toString()
            obj.value = new_str;
            obj.label = i+' sets';
            reps_op.push(obj)
        }
        this.setState({
            sets_option:reps_op
        })
    }
      componentDidMount(){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = today.getMonth()+1 //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
          this.setState({
              date:today
          })
          this.setRepsOption();
          this.setSetsOption();
          this.props.dispatchgetMaincategory();
          this.props.dispatchsetSubcategoryNull()
      }
      componentDidUpdate(prevProps){
          if(this.props.createChallenge !== prevProps.createChallenge){
            var description_all={sets:this.state.sets,reps:this.state.reps, duration:this.state.duration};
            var description_cardio={distance:this.state.distance, time:this.state.minute+':'+this.state.second, duration:this.state.duration};
    
              if(this.props.createChallenge){
                  this.props.navigation.navigate('challenge_created',{
                      challenge:this.state.challenge,
                      id:this.state.sub_category_id,
                      category_type:this.state.category_id ==7 ?'Cardio': 'All',
                      subcategory_id:this.state.sub_category_id,
                      exercise_date:this.state.date,
                      detail:this.state.category_id == '7' ? description_cardio : description_all,
                  });
                  this.setState({
                    challenge: null,
                    date:'',
                    sets:null,
                    reps:null,
                    weight:null,
                    distance:null,
                    time:null,
                    calories:null,
                    duration:null,
                    category_id:'',
                    minute:null,
                    second:null,
                    main_name:null,
                    isEnabled: false ,
                    challengeError:'',
                    setsError:'',
                    repsError:'',
                    weightError:'',
                    distanceError:'',
                    minuteError:'',
                    durationError:'',
                    sub_category_id:'',
                    reps_option:[],
                    weight_option:[]
                  })
              }
          }
      }
      onChallengeChange=(value, id)=> {
        this.setState({
           main_name: value,
            category_id:value
        });
        //console.log('challnge selected', value);
        this.props.dispatchgetSubcategory(value)
      }
      onsubChallengeChange=(value, id)=> {
        this.setState({
           // challenge: value,
            sub_category_id:value
        });
       // console.log('sub challnge selected', value);
       // this.props.dispatchgetSubcategory(id)
       var item = this.props.sub_category.find(item => item.id === value);
       if(item.swr_status == 'Enable'){
           this.setState({
               isEnabled:true
           })
       }else{
           this.setState({
               isEnabled:false
           })
       }
       this.setState({
           challenge:item.subcategory_name,
           
       })
      }
      changeCategory_id=(value)=>{
          this.setState({
              category_id:value
          })
      }
      onselctItem=(id)=>{
        //  console.log('get subcategoty on select is calling')
        this.props.dispatchgetSubcategory(id)
      }
      onDateChange=(value)=> {
        this.setState({
            date: value
        });
      }
       onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date
        //setShow(Platform.OS === 'ios');
        //setDate(currentDate);
        this.setState({
            date: currentDate
        });
      };
      onSetsChange=(value)=> {
        this.setState({
            sets: value
        });
      }
      onRepsChange=(value)=> {
        this.setState({
            reps: value
        });
      }
      onWeightChange=(value)=> {
        this.setState({
            weight: value
        });
      }
      onDurationChange=(value)=> {
        this.setState({
            duration: value
        });
      }
      onDistanceChange=(value)=> {
        
        this.setState({
            distance: value
        });
      }
      oncaloryChange=(value)=>{
          this.setState({
            calories:value
          })
      }
      onMinuteChange=(value)=>{
        if (value.length === 2) {
            this.secondTextInput.focus();
            // this.setState({
            //     second:'00'
            // })
          }
          this.setState({
            minute:value
          })
      }
      onSecondChange=(value)=>{
        //let minuteError = "";
        var isValid = /^([0-5][0-9])(:[0-5][0-9])?$/.test(value);
        if(isValid){
            //form_new[i].Seconds = text;
            //console.log('socond valid')
            this.setState({
                minuteError:''
            })
        }else{
            this.setState({
                minuteError:'Please enter valid time format!',
                //second:''
            })
            //console.log('socond not valid valid')
        }
        this.setState({
            second:value
        })
          
      }
      customButton = (onConfirm) => (
        <Button
            onPress={onConfirm}
            style={{ container:{ width:'80%', marginHorizontal:'3%',backgroundColor:'#1f1f1f' }, text:{ fontSize: 20 , color:'#1f1f1f'} }}
            primary
            text={'Submit'}
            title='Submit'
        />
    )
      onPress=()=>{
        if(this.validate()){
        //this.props.navigation.navigate('challenge_created')
        var description_all={sets:this.state.sets,reps:this.state.reps, duration:this.state.duration};
        var description_cardio={distance:this.state.distance, time:this.state.minute+':'+this.state.second, duration:this.state.duration};

        //const childelement = this.ChildElement.current;
        // const date = childelement.state.date
        // this.setState({
        //     date:date
        // })
        //console.log('date form child elemnet',date, this.state.isEnabled )
        this.props.dispatchCreateChallenge(this.state.sub_category_id, this.state.category_id == '7' ? 'Cardio':'All', this.state.category_id == '7' ? description_cardio : description_all, this.props.JWT_Token, this.state.date, this.state.isEnabled)
       } }
      toggleSwitch=()=>{
        this.setState(prevState => ({
            isEnabled:!prevState.isEnabled
          }));
      }
      validate=()=>{
        let challengeError = "";
        let distanceError = "";
        let minuteError = "";
        let caloryError = "";
        let setsError  = "";
        let repsError = "";
        let durationError = "";

        if(this.state.category_id == '7'){
            if(this.state.challenge == null){
                challengeError='Please select any challenge!'
            }
            if(this.state.distance == null){
                distanceError="Please enter distance!"
            }
            if(this.state.minute == null){
                minuteError="Please enter time!"
            }
            if(this.state.second == null){
                minuteError="Please enter time!"
            }
            if(this.state.duration == null){
                durationError="Please enter duration!"
            }
        }else{
            if(this.state.challenge == null){
                challengeError='Please select any challenge!'
            }
            if(this.state.sets == null){
                setsError='Please enter sets!'
            }
            if(this.state.reps == null){
                repsError = 'Please enter reps!'
            }
            if(this.state.duration == null){
                durationError="Please enter duration!"
            }
        }
        if(challengeError || distanceError || minuteError || caloryError || setsError || repsError || durationError){
            this.setState({challengeError, distanceError,minuteError,caloryError,setsError,repsError,durationError});
            return false;
        }
        return true;
      }
      setErrorNull=()=>{
        this.setState({challengeError:'', distanceError:'',minuteError:'',caloryError:'',setsError:'',repsError:'',durationError:''});
      }
      getdate=()=>{
        const childelement = this.ChildElement.current;
        const date = childelement.state.date
        //console.log('date form child elemnet',date )
      }
      sethh=()=>{
        //   this.setState({
        //       minute:'00',
              
        //   })
      }
      setmm=()=>{
        // this.setState({
        //     second:'00',
            
        // })
    }
    render(){
        
        const placeholder = {
            label: 'Reps',
            value: null,
            color: 'rgba(255, 255, 255, 0.3)',
          };
          const placeholder_set= {
            label: 'Sets',
            value: null,    
            color: 'rgba(255, 255, 255, 0.3)',
          };
        //category_id
       // console.log('isenabled0', this.state.isEnabled)
        var main_new_category =[]
        var main =[]
        var sub= []
        if(this.props.main_category !== null){
            if(this.props.main_category.length >8){
                main_new_category = this.props.main_category
                main =  main_new_category.slice(0, -1);
            //console.log('main item', main)
            }
             
           // main_new_category.pop()
        }
        if(this.props.sub_category !== null){
             sub = this.props.sub_category;
        //console.log('sub', sub.category_id)
        }
        if (this.props.challengeLoading) {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', marginTop: 40}}>
                <ActivityIndicator size='large' color='white'/>
              </View>
            )
          } else {
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : null}>
            <ScrollView style={{minHeight:windowHeight-83, flex:1}}>
            <View style={styles.container}>
                <View style={styles.img_block}>
                <Image style={styles.img}  source={require('../../assets/challenge/challenge_home.png')}/>
                </View>
                <View style={styles.form_block}>
                    <View style={{height:70, }}>
                    
                    {main_new_category !== null ?
                    <>
                    <Challenge_picker placeholder='Please select workout' main={true} data={main} color='white' value={this.state.category_id} onValueChange={this.onChallengeChange} {...this.state} width='80%'/>
                    <View style={{background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)', height:60, }}>
                        
                    </View>
                    </> : null}
                    
                            
                    </View>
                    {this.props.sub_category !== null &&this.props.sub_category.length > 0 ?
                    <View style={{height:70}}>
                    
                    
                    <>
                    <Challenge_picker placeholder='Please select challenge' main={false} data={this.props.sub_category} color='white' value={this.state.sub_category_id} onValueChange={this.onsubChallengeChange} {...this.state} width='80%'/>
                    <View style={{background:'#363636', borderTopWidth:1,borderTopColor:' rgba(255, 255, 255, 0.3)', height:60, }}>
                    <Text style={styles.error}>{this.state.challengeError}</Text>
                    </View>
                    
                       </>  
                    </View>
                     :null}  
                    <View style={{height:60,width:'100%', flexDirection:'row',justifyContent:'space-between', marginBottom:10}}>
                            <View style={{width:'50%'}}>
                            {/* <Date_picker mode='date'  ref={this.ChildElement}
                            /> */}
                            <DatePicker
                        style={ { 
                            height:60,
                            width:'90%',
                            //borderRadius:10,
                            border:'none',
                            borderRadius:0,
                            borderBottomWidth:1,
                            borderBottomColor:'rgba(255, 255, 255, 0.3)',
                            borderTopWidth:0,
                            borderLeftWidth:0,
                            borderRightWidth:0,
                            //borderWidth:1,
                            //borderRadius:5 ,
                            //marginTop:20,
                            fontSize:14,
                            fontFamily: 'Montserrat-Regular',
                            fontStyle: 'normal',
                            fontWeight: "400",
                            justifyContent:'center',
                            alignItems:'flex-start',
                            backgroundColor:'#1F1F1F'
                        } }
                        customStyles = { {
                            placeholderText:{ 
                                fontSize:20, 
                                color:'#FFFFFF',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "400",
                                fontSize: 14,
                                lineHeight: 18
                        }, // placeHolder style
                            headerStyle : {
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "400",
                                fontSize: 14,
                                lineHeight: 18
                            },			// title container style
                            headerMarkTitle : { 
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "400",
                                fontSize: 14,
                                lineHeight: 18
                            }, // title mark style 
                            headerDateTitle: {
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "400",
                                fontSize: 14,
                                lineHeight: 18
                             }, // title Date style
                            contentInput: {
                                paddingLeft:10
                            }, //content text container style
                            contentText: {fontSize:20, 
                                color:'#FFFFFF',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "400",
                                fontSize: 14,
                                lineHeight: 18,
                               paddingLeft:10
                            }, //after selected text Style
                        } } // optional 
                        dateSplitter='-'
                        centerAlign ={false}// optional text will align center or not
                        headFormat={('MM/DD/YYYY')}
                        outFormat={('MM/DD/YYYY')}
                        ButtonTextStyle={{
                            fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                            fontStyle: 'normal',
                            fontWeight: "400",
                            fontSize: 14,
                            lineHeight: 18
                        }}
                        //selectedBgColor="#ADF350"
                        selectedTextColor='#FFFFFF'
                        blockBefore={true}
                        allowFontScaling = {true} // optional
                        placeholder={this.state.date}
                        onConfirm={text=>this.setState({date:text})}
                        mode={this.state.value}
                        customButton = {this.customButton}
                        markText='Range'
                        />
                            {/* <Date_picker_Native/> */}
                            {/* <InputText  
                            placeholder='Date'
                            value={this.state.date}
                            onChangeText={text => this.onDateChange( text)}
                            name='Date'
                            keyboardType={'phone-pad'}
                            disable={true}
                            
                   
                //    onFocus={this.setageError}
                   /> */}
                            
                            </View>
                            <View  style={{width:'50%'}}>
                            {this.state.category_id == '7' ? <InputText_challenge
                            placeholder='Distance (Miles)'
                            value={this.state.distance}
                            onChangeText={text => this.onDistanceChange( text)}
                            name='Distance'
                            keyboardType={'phone-pad'}
                            maxLength={3}
                            required
                            returnKeyType='done'
                            placeholderTextColor='#FFFFFF'
                            onFocus={this.setErrorNull }
                        
                            />:
                            <RNPickerSelect
                                placeholder={placeholder_set}
                                items={this.state.sets_option}
                                onValueChange={(value) => {
                                    this.onSetsChange(value)
                                }}
                                style={pickerSelectStyles1}
                                value={this.state.sets}
                                textInputProps={{color:'#FFFFFF',fontWeight:'400'}}
                            
                            />
                            
                            }
                            {this.state.setsError !== '' ? <Text style={styles.error}>{this.state.setsError}</Text>:null}
                            {this.state.distanceError !== '' ? <Text style={styles.error}>{this.state.distanceError}</Text>:null}
                            </View>
                            
                    </View>
                    
                    <View style={{height:60,width:'100%', flexDirection:'row',justifyContent:'space-between', marginBottom:10}}>
                            <View style={{width:'50%'}}>
                            {this.state.category_id == '7' ?  
                            <Item style={styles.item} >
                            <TextInput 
                           placeholder='HH'
                           placeholderTextColor='#FFFFFF'
                           value={this.state.minute}
                           onChangeText={text => this.onMinuteChange(text)}
                           name='minute'
                           keyboardType={'phone-pad'}
                           maxLength={2}
                           //returnKeyType="next"
                           returnKeyType="next"
                           style={styles.input}
                           //defaultValue='00'
                        //    onFocus={()=>{this.setErrorNull}}
                        onFocus={()=>{this.setErrorNull, this.sethh()}}
                           defaultValue={this.state.minute}
                          // onSubmitEditing={() => { this.secondTextInput.focus(); }}
                           
                            />
                            <Text style={{color:'#FFFFFF'}}>{":"}</Text>
                            <TextInput  
                            placeholder='MM'
                            placeholderTextColor='#FFFFFF'
                            value={this.state.second}
                            onChangeText={text => this.onSecondChange(text)}
                            name='second'
                            keyboardType={'phone-pad'}
                            maxLength={2}
                            returnKeyType='done'
                             ref={(input) => { this.secondTextInput = input; }}
                            style={styles.input_1}
                            //defaultValue={this.state.second}
                            onFocus={()=>{this.setErrorNull, this.setmm()}}
                            />
                        </Item>
                           :
                            // <InputText  
                            // placeholder='Reps'
                            // value={this.state.reps}
                            // onChangeText={text => this.onRepsChange( text)}
                            // name='reps'
                            // keyboardType={'phone-pad'}
                            // maxLength={3}
                            // returnKeyType='done'
                            // onFocus={this.setErrorNull}
                            // />
                            <RNPickerSelect
                                placeholder={placeholder}
                                items={this.state.reps_option}
                                onValueChange={(value) => {
                                    this.onRepsChange(value)
                                }}
                                style={pickerSelectStyles}
                                value={this.state.reps}
                                textInputProps={{color:'#FFFFFF',fontWeight:'400', }}
                            
                            />
                           }
                            
                            {this.state.minuteError !== '' ? <Text style={styles.error}>{this.state.minuteError}</Text>: null}
                            {this.state.repsError !== '' ? <Text style={styles.error}>{this.state.repsError}</Text>: null}
                            </View>
                            <View  style={{width:'50%',}}>
                            {/* <View style={{width:'100%',marginLeft:10, justifyContent:'flex-end'}}> */}
                            
                            <Days_Picker placeholder='Duration (Days)' main={false} data={days} color='white' value={this.state.duration} onValueChange={this.onDurationChange} {...this.state} />
                            
                            
                            {this.state.durationError !== '' ? <Text style={styles.error}>{this.state.durationError}</Text>: null}
                            
                            {/* </View> */}
                            
                            </View>
                            
                    </View>
                    {this.state.category_id == '7' || this.state.isEnabled == false? null :
                    <View style={styles.SWR_block}>
                    <View style={styles.switch_block}>
                        <Text style={styles.challenge_text}>Challenge in SWR<Text style={{color:'red'}}>*</Text></Text>
                        <Switch
                            trackColor={{ false: "#ADF350", true: "#ADF350" }}
                            thumbColor={this.state.isEnabled ? "#1F1F1F" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch}
                            value={this.state.isEnabled}
                        />
                    </View>
                    <View style={styles.swr_text_block}>
                        <Text style={styles.swr_text}>
                        *SWR (Strength to Weight Ratio)
It’s simply your strenght or the amount of weight you can lift divided  by your body weight. 
                        
                        </Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('swr_info')} style={{justifyContent:'flex-end', alignItems:'flex-end',flex:1, width:'100%'}}>
                             <Text style={{color:'#ADF350',fontFamily:'Montserrat-Regular',}}>More info...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                    }
                    <View style={{justifyContent:'center',alignItems:'center', marginTop:10}}>
                    <Text style={styles.invite_text}>Invite friends after you create this challenge</Text>
                    </View>
               
                </View>
                <View style={{flex:0.1,justifyContent:'center', width:'100%' ,alignItems:'center', marginVertical:20}}>
                    
                        <Btn_continue onPress={this.onPress} title='Create Challenge'/>
                        
                    </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }}
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {fitLoading, sub_category,image_url,main_category} = state.fitness
    const {challengeLoading,challengeError,createChallenge} = state.challenge
    return { JWT_Token,fitLoading, sub_category,image_url,main_category,challengeLoading,challengeError,createChallenge}
 
  }
  const mapDispatchToProps = {
    dispatchgetMaincategory: () => getMaincategory(),
    dispatchgetSubcategory: (id) => getSubcategory(id),
    dispatchCreateChallenge: (id, type, desription,jwt,date, SWR) => createChallenge(id, type, desription,jwt,date,SWR),
    dispatchsetSubcategoryNull: () => setSubcategoryNull()
   }
  export default connect(mapStateToProps, mapDispatchToProps)(Create_Challenge)
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom:83
    },
    img_block:{
        //flex:0.35, 
        height:150,
        width:windowWidth, 
        backgroundColor:'white'
    },
    form_block:{
        flex:0.55,
        justifyContent:'center',
        width:'90%',
        marginTop:20,
        
    },
    title_challenge:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        alignItems: 'center',
        color: '#FFFFFF'
    },
    invite_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
        color:colors.primary,
        fontFamily:'Montserrat-Regular'
    },
    img:{
        width:'100%',
        height:'100%',
        maxWidth:'100%',
        maxHeight:'100%'
    },
    SWR_block:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#262727',
        borderRadius:10,
        marginTop:20
    },
    switch_block:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between', 
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        paddingVertical:5
    },
    challenge_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        fontFamily:'Montserrat-Regular',
        color: '#ADF350'
    },
    swr_text_block:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        textAlign:'justify'
    },
    swr_text:{
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 26,
        textAlign:'justify',
        fontFamily:'Montserrat-Regular'
    },
    time_view:{
        width:'50%',
        flexDirection:'row', 
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        height:60,
        borderBottomWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
        fontSize:16,
        //lineHeight:20,
        fontWeight:'300',
        color:'#FFFFFF',
        width:'20%',
        //backgroundColor:'green',
        height:60,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        textAlign:'right'
       // width:'100%'
    },
    input_1:{
        fontSize:16,
        //lineHeight:20,
        fontWeight:'300',
        color:'#FFFFFF',
        width:'20%',
      //  backgroundColor:'yellow',
        height:60,
        justifyContent:'flex-start',
        alignItems:'center',
        textAlign:'left'
       // width:'100%'
    },
    item:{
        height:60,
        width:'90%',
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    error:{
        color:'#fa2a31',
        fontSize:12,
        marginVertical:5,
        fontFamily:'Montserrat-Regular',
        textAlign:'left',
        width:'100%',
        height:15
    },
})
const pickerSelectStyles = StyleSheet.create({
    
    inputIOS: {
        height:60,
        width:'90%',
        paddingLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        fontSize:16,
        lineHeight:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        //width:'100%',
        justifyContent:'flex-end',
        fontFamily:'Montserrat-Regular'
    },
    inputAndroid: {
        height:60,
        width:'90%',
        paddingLeft:15,
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        fontSize:16,
        lineHeight:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
       // width:'100%',
        fontFamily:'Montserrat-Regular'
    },
  });
  const pickerSelectStyles1 = StyleSheet.create({
    
    inputIOS: {
        height:60,
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        fontSize:16,
        lineHeight:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        //width:'100%',
        justifyContent:'flex-end',
        fontFamily:'Montserrat-Regular',
        paddingLeft:15
    },
    inputAndroid: {
        height:60,
        paddingLeft:15, 
        width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        fontSize:16,
        lineHeight:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
       // width:'100%',
        fontFamily:'Montserrat-Regular'
    },
  });