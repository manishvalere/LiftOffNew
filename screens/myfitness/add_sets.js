import { Row } from 'native-base';
import React, { Component } from 'react';
import { View,TextInput,LogBox, Text,StyleSheet,Button,FlatList ,TouchableOpacity, Dimensions,Image,ScrollView,SafeAreaView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,   Icon, Left, Body, Right } from 'native-base';
import {Ionicons,AntDesign} from 'react-native-vector-icons';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { connect } from 'react-redux';
import Btn_continue from '../../components/Btn_continue';
import Video_Comp from '../../components/video';
import {Toast, Root} from 'native-base';
import reps from '../../resp.json'
import {getFitnessRecord,addFitnessRecord, getFitnessRecordList } from '../../actions/fitness';
import { getPersonalBest, getPersonalByFilter } from '../../actions';
import { getRefreshtoken, logout } from '../../actions';
import Time_picker from '../../components/time_picker';
import Compete_Head from '../../components/compet_head';
import ScrollChallenge from '../../components/ScrollChallenge';
import PersonalBest_Comp from '../../components/personal_best_comp';
import KeepAwake from 'react-native-keep-awake';
import TimePicker from "react-native-24h-timepicker";

export class Add_sets extends Component{
    constructor(props){
        super(props);
        this.state={
            form:[],
            change:false,
            count:0,
            personal_bloack:false,
            category_type:'',
            category_id:'',
            Sets:'',
            id:'',
            title:'',
            Reps:null,
            second:'',
            reps_option:[],
            weight_option:[], 
            swr:'',
            time: "HH:MM"

        }
        this.ChildElement = React.createRef();
    }
    onCancel() {
        this.TimePicker.close();
      }
    
      onConfirm(hour, minute) {
        this.setState({ timePick: `${hour}:${minute}` });
        this.TimePicker.close();
        
        this.changeobject(hour, 'Minute')
        this.changeobject(minute, 'Seconds')
      }
    componentDidUpdate(prevProps){
       // console.log(' CDU is calling ', this.props.token_expire)
        if(prevProps.record_added !== this.props.record_added){
          //  console.log('cdu personal record', this.props.personal_record)
            //this.props.duspatchgetPersonalBest(this.state.category_type, this.props.JWT_Token)
            var  data = {};
            data.category_id = this.state.category_type;
            data.subcategory_id = this.state.id
            this.props.dispatchgetPersonalByFilter(data,this.props.JWT_Token);
            this.props.duspatchgetPersonalBest(this.state.category_type == 7 ? 'Cardio' : 'All', this.props.JWT_Token, this.state.id)
            this.setState((prevState) => {
                return {
                  change: !prevState.change,
                  form:[]
                 
                };
              });

        }
        if(prevProps.token_expire !== this.props.token_expire){
            //console.log('token expride change in CDU', this.props.token_expire)
            if(this.props.token_expire == true){
                this.props.dispatchLogout() 
            return Toast.show({
                text: "Session Expire!",
                textStyle: { color: "yellow" },
                //buttonText: "Okay",
                type: "Warning",
                duration:2500
            });
            
            }
        }
    }
    setWeightOption=()=>{
        const weight_op = [];
        for(i=5;i<=1500;i+=5){
            obj ={};
            const new_str = i.toString()
            obj.value = new_str;
            obj.label = i+' lbs';
            weight_op.push(obj)
        }
        this.setState({
            weight_option:weight_op
        })
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
    componentWillUnmount(){
        KeepAwake.deactivate();
    }
      componentDidMount=()=>{
        
        KeepAwake.activate();
          this.setRepsOption();
          this.setWeightOption();
        
        const { title, id, category_type,swr } = this.props.route.params;
        //console.log('compopnentdid mount is calling',swr)
        this.props.navigation.setOptions({ title: title });
        var  data = {};
        this.setState({
            category_type:category_type == 7 ? 7 : 'All',
            category_id:category_type,
            id:id,
            title:title,
            swr:swr
        });
       
        data.category_id = category_type;
        data.subcategory_id = id
        this.props.dispatchgetFitnessRecord(id);
       
        this.props.dispatchgetPersonalByFilter(data,this.props.JWT_Token);
        // this.props.getRefreshToken(this.props.JWT_Token)
      //  console.log('this.styate.cartegotry',this.state)
        this.props.duspatchgetPersonalBest(category_type == 7 ? 'Cardio' : 'All', this.props.JWT_Token, id)
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      }
     
      rendescrollItem=(item)=>{
          return(
              <TouchableOpacity contentContainerStyle={{justifyContent:'center'}} style={styles.video_block}>
                  <Image style={styles.image_tumbnail} source={require('../../assets/fitness/video_icon.png')}/>
              </TouchableOpacity>
          )
      }
      validate=()=>{
        var i = this.state.form.length-1
        var j = this.state.form
            if(this.state.form.length>0){
                // console.log('if of form length')
            
            if(this.state.category_type !== 7){
              //  console.log('cardio if in the process save')
                if(j[i].Sets == '' || j[i].Reps == '' || j[i].Weight == '' || j[i].Sets == undefined || j[i].Reps == undefined || j[i].Weight == undefined){
                    this.setState({
                        error:'Please fill all the field!'
                    })
                  //  console.log('first if in the process save')
                    return false;
                }
                
            }else if(this.state.category_type == 7){
               // console.log('if of cardio validatio')
                if(j[i].Minute == '' || j[i].Seconds == '' || j[i].Distance == '' || j[i].Calories == '' || j[i].Minute == undefined || j[i].Distance == undefined || j[i].Calories == undefined || j[i].Seconds == undefined){
                    this.setState({
                        error:'Please fill all the field!'
                    })
                    return false;
                }
                
            }
            
            }else{
                this.setState({
                    error:'Please add Records first!'
                })
                return false;
            }
        return true;
      }
      enable_personal=()=>{
      //  console.log('enable prsonal is running',this.state.form)
        if(this.validate()){
           // console.log('validation treu so the fetch')
            this.props.dispatchaddFitnessRecord(this.state.id, this.state.category_type == 7 ? 'Cardio': 'All', this.state.form, this.props.JWT_Token)
            this.setState({
                count:0
            })
        }
        
       
        

        
      }
      renderVideo(image) {
        if(this.state.videoload) {
           return(
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
              <ActivityIndicator size='large' color='#262727'/>
            </View>
           )
        }else{
          return (
            <Video source={{
              uri: image,
            }}  
                    ref={(ref) => {
                        this.player = ref
                    }} 
                    repeat                                     
                    onBuffer={this.onBuffer}               
                    onError={this.videoError}     
                    controls        
                    // onLoad={this.setState({
                    //   videoload:true
                    // })}
                    resizeMode='contain'
                    posterResizeMode='contain'
                    fullscreenAutorotate
                    fullscreenOrientation='landscape'
                   // paused
                    style={styles.backgroundVideo}
                     />
        );
        }
      
      
      }
      changeobject=(text, field)=>{
        //   var field_ = field
        this.errordisable();
        var i = this.state.form.length-1;
        // console.log('iiiii', i)
         var form_new = this.state.form;
         switch(field) {
            case 'Sets':
                form_new[i].Sets = i+1;
                break;
            case 'Reps':
               //this.setState({Reps:text})
                form_new[i].Reps = text;
                break;
            case 'Weight':
                form_new[i].Weight = text;
                break;
             case 'Minute':
                
             form_new[i].Minute = text;
             case 'Seconds':
                
             form_new[i].Seconds = text;
            //     break;
            // case 'Seconds':
            //     //console.log('form_new[i].seconds',form_new[i].Seconds )
            //     var isValid = /^([0-5][0-9])(:[0-5][0-9])?$/.test(text);
            //     if(isValid){
            //         form_new[i].Seconds = text;
            //        // console.log('form_new[i].seconds',form_new[i].Seconds );
            //         this.setState({
            //             error:''
            //         })
            //     }else{
            //         this.setState({
            //             error:'Please enter valid time format!'
            //         })
            //     }
                // if(text.valueOf() == 59){
                //     form_new[i].Seconds = text;
                // }else if(text.valueOf() > 59){
                    
                // }
                break;
            case 'Calories':
                form_new[i].Calories = text;    
                break;
            case 'Distance':
                form_new[i].Distance = text;
                break;
         }
         this.setState({
             form:form_new
         })
      }
      errordisable=()=>{
          this.setState({
              error:''
          })
      }
      removelast=()=>{
        var sampleArray = this.state.form;// Declaring the array
        var lastElement = sampleArray.pop()
      //  console.log('last array', sampleArray)
        this.setState({
            form:sampleArray
        })
        if(this.state.category_type !== 'Cardio'){
            this.setState({
                count:this.state.count-1
            })
        }
      }
      renderForm=(item, index)=>{
        const placeholder = {
            label: 'Reps',
            value: null,    
            color: '#FFFFF',
          };
          const placeholder_weight = {
            label: 'Weight',
            value: null,    
            color: '#FFFFF',
          };
         // console.log('form',item.index , this.state.form.length )
          var int =this.state.category_type !== 7 ? this.state.form[index].Sets : null ;

          var str =this.state.category_type !== 7 ?  int.toString() :null;
        //   var int_reps =this.state.category_type !== 7 ? this.state.form[index].Reps : null ;
        //   var str_reps =this.state.category_type !== 7 ?  int_reps.toString() :null;
          return(
            <View style={{width:'98%',flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginVertical:10}}>
            <View style={styles.table_content}>
                {this.state.category_type !== 7 ? <TextInput returnKeyType='done' onFocus={this.errordisable} keyboardType='numeric'  value={str}   editable={false}  placeholderTextColor='#FFFFFF'  style={styles.table_content_text} /> :
                <TextInput maxLength={3} returnKeyType='done'  onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Distance')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Distance'/>}
              
            </View>
            {this.state.category_type !== 7 ? 
            <View  style={styles.table_content}>
           <RNPickerSelect
           onFocus={this.errordisable} 
            placeholder={placeholder}
            items={this.state.reps_option}
            onValueChange={(value) => {
              this.changeobject(value, 'Reps')
            }}
            placeholderTextColor='#FFFFFF'
            style={pickerSelectStyles}
            value={this.state.form[index].Reps}
           
          />
          </View>
                //<TextInput editable={false} returnKeyType='done' value={str_reps} maxLength={3} onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Reps')}  placeholderTextColor='#FFFFFF'  style={styles.table_content_text} placeholder= 'Reps'/>  
            // </View> 
            :
             <TouchableOpacity  onPress={() => this.TimePicker.open()}  style={styles.table_content_time}>
             {/* <TextInput 
             onFocus={this.errordisable} 
             keyboardType='numeric' 
             onChangeText={(text)=>this.changeobject(text, 'Minute')}  
             placeholderTextColor='rgba(255, 255, 255, 0.5)'  
             style={styles.table_content_text1} placeholder= 'HH'
             returnKeyType="next"
             //onSubmitEditing={() => { this.secondTextInput.focus(); }}
             maxLength={2}
             />
             <Text style={styles.timecolumn}>{":"}</Text>
             <TextInput 
             onFocus={this.errordisable} 
             keyboardType='numeric' 
            // value={this.state.form[index].Seconds}
             onChangeText={(text)=>this.changeobject(text, 'Seconds')}  
             placeholderTextColor='rgba(255, 255, 255, 0.5)'  
             style={styles.table_content_text1} 
             ref={(input) => { this.secondTextInput = input; }}
             placeholder= {this.state.form[index].Seconds}
             returnKeyType='done'
             maxLength={2}
             /> */}
              <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.table_content_text1}
        >
          <Text style={styles.table_content_text1}>{this.state.form[index].Minute}:{this.state.form[index].Seconds}</Text>
          
        </TouchableOpacity>
              <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          //value={this.state.form[index].Minute}
          value={this.state.timePick}
          maxHour={100}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
             </TouchableOpacity>
             }
            
                {this.state.category_type !== 7? 
                this.state.swr == 'Disable' ? null : 
                <View style={styles.table_content}>
                <RNPickerSelect
                onFocus={this.errordisable} 
                placeholder={placeholder_weight}
                items={this.state.weight_option}
                onValueChange={(value) => {
                  this.changeobject(value, 'Weight')
                }}
                placeholderTextColor='#FFFFFF'
                style={pickerSelectStyles}
                value={this.state.form[index].Weight}
               
              />
              </View>
                :
                <View style={styles.table_content}>
                <TextInput returnKeyType='done' maxLength={4} onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Calories')}  placeholderTextColor='rgba(255, 255, 255, 0.5)' style={styles.table_content_text} placeholder= 'Calories'/>
                </View>
                }
            
            <TouchableOpacity >
                {this.state.form.length>1 && index+1 == this.state.form.length ? <Ionicons onPress={this.removelast} name='remove-circle' size={24} color='#ADF350' />: <View style={{width:24}}></View>}
            </TouchableOpacity>
            </View>
          )
      }
      renderpersonalText=(item)=>{
      // console.log('item in ipersonal', item)
            if(this.props.personal_record.exercise_type !== 'Cardio'){
                return(
            
                    <Text key={item.index} style={styles.persnal_text}>{item.item.Sets} Sets | {item.item.Reps} Reps | {item.item.Weight} lbs Weight</Text>
                )
            }else{
                return(
                    <Text key={item.index} style={styles.persnal_text}>{item.item.Distance} Miles  | {item.item.Minute+':'+item.item.Seconds} Hour | {item.item.Calories} Calories</Text>
                )
            }
    
          
      }
      cancelForm=()=>{
          this.setState({
              form:[],
              error:''
          })
      }
      add_new=()=>{
        // var i = this.state.form.length;
        // console.log('iiiii',i)
        //     var form_new = this.state.form;
        //     form_new[i] = i+1
        this.setState({
            second:''
        })
        if(this.state.form.length<=9){
       if(this.state.form.length>0){
          // console.log('if is calling', this.state.form.length)
           var i = this.state.form.length
           if(this.state.category_type !== 7){
             //  console.log('reps undefined or not', this.state.form[i-1].Reps, this.state.form[i-1], i-1)
            if(this.state.form[i-1].Reps !== "" && this.state.form[i-1].Reps !== undefined && this.state.form[i-1].Weight !== "" && this.state.form[i-1].Weight !== undefined){
                this.setState((prevState) => {
           
                    return {
                    
                      change: !prevState.change,
                      count:this.state.count+1
                    };
                  });
                  this.state.form.push(this.state.category_type !== 7 ? {Sets:this.state.count+1,Reps:'',Weight:this.state.swr == 'Disable' ? '0' : '' } :{Minute:'HH:MM', Seconds:'',Calories:'',Distance:'' });
            }else{
                this.setState({
                    error:'Please fill all the field!'
                })
            }
           }else{
            if(this.state.form[i-1].Minute !== "" && this.state.form[i-1].Minute !== undefined && this.state.form[i-1].Seconds !== "" && this.state.form[i-1].Seconds !== undefined && this.state.form[i-1].Calories !== "" && this.state.form[i-1].Calories !== undefined && this.state.form[i-1].Distance !== "" && this.state.form[i-1].Distance !== undefined){
                this.setState((prevState) => {
           
                    return {
                    
                      change: !prevState.change,
                      count:this.state.count+1
                    };
                  });
                  this.state.form.push(this.state.category_type !== 7 ? {Sets:this.state.count+1,Reps:'',Weight:this.state.swr == 'Disable' ? '0' : '' } : {Minute:'HH', Seconds:'MM',Calories:'',Distance:'' });
            }else{
                this.setState({
                    error:'Please fill all the field!'
                })
            }
           }
       }else{
           //console.log('else is calling', this.state.form.length)
        this.setState((prevState) => {
           
            return {
            
              change: !prevState.change,
              count:this.state.count+1
            };
          });
          this.state.form.push(this.state.category_type !== 7 ? {Sets:this.state.count+1,Reps:'',Weight:this.state.swr == 'Disable' ? '0' : '' } :  {Minute:'HH', Seconds:'MM',Calories:'',Distance:'' });
      }}
    }
      onBuffer(bufferObj) {
       // console.log('buffering', bufferObj.isBuffering);
      }
      
      videoError(error) {
       // console.log('video error:', error);
      }
    render(){
        console.log('reps_option', this.props.personal_record)
        var detail = '';
        var url='';
        var uri='';
        var video_uri = '';
        var today = new Date();
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = months[today.getMonth()] //January is 0!
        var yyyy = today.getFullYear();

        today = mm + ' ' + dd + ', ' + yyyy;
        
        if( this.props.sub_category_detail !== null &&  this.props.sub_category_detail != undefined){
            detail = this.props.sub_category_detail;
            url = this.props.image_url
            uri = url+'/'+detail.subcategory_image;
            video_uri = url+'/'+detail.subcategory_video
        }
        
        console.log('this form',this.props.personal_best_filter)
        
        return(
            // <SafeAreaView style={{flex:1}}>
            <ScrollView>
                
                <View style={styles.container}>
                    <View style={styles.image_block}>
                        <Image style={styles.img} resizeMode='contain' source={{uri: uri}}/>
                    </View>
                <View style={styles.add_set_block}>
                   <View style={styles.picker_block}>
                      <Text style={styles.date}>{today}</Text>
                      
                   </View>
                   
                   <View style={styles.form_block}>
                       {this.state.form.length > 0 ? <View style={styles.tablehead}>
                           <View style={styles.head_text_View}><Text style={styles.head_text}>{this.state.category_type !== 7 ? 'Sets' : 'Distance (Miles)'}</Text></View>
                           <View style={styles.head_text_View}><Text  style={styles.head_text}>{this.state.category_type !== 7 ? 'Reps' : 'Time'}</Text></View>
                           {/* <View style={styles.head_text_View}><Text  style={styles.head_text}>{this.state.category_type !== 7 ? this.state.swr == 'Disable' ? null : 'Weight' : 'Calories'}</Text></View> */}
                           {this.state.category_type !== 7 ? this.state.swr == 'Disable' ? null:  <View style={styles.head_text_View}><Text  style={styles.head_text}>Weight</Text></View>:
                           <View style={styles.head_text_View}><Text  style={styles.head_text}>Calories</Text></View>
                           }
                           <View>
                <View style={{width:30}}></View>
            </View>
                       </View> : null}
                       {/* <SafeAreaView style={{flex:1}}> */}
                       <View style={{width:'98%',justifyContent:'center', alignItems:'center'}}>
                       {/* <FlatList 
                        //horizontal={true} 
                        data={this.state.form}
                        renderItem={(i, index)=>this.renderForm(i, index)}
                        keyExtractor={(item,index)=>index.toString()}
                        showsHorizontalScrollIndicator={false}
                        />  */}
                        {this.state.form.map((i,index)=>{
                            return this.renderForm(i, index)
                        })}
                       
                        </View>
                        {this.state.error !== '' ? <Text style={{color:'red',fontFamily:'Montserrat-Regular', fontSize:13, marginTop:5}}>{this.state.error}</Text>:null}
                       {/* </SafeAreaView> */}

                       <TouchableOpacity onPress={this.add_new} style={styles.addbtn}>
                           <AntDesign name='pluscircle' color='#ADF350' size={16}/>
                           <Text style={styles.add_set_text}>Add Activity</Text>
                      </TouchableOpacity>
                   </View>
                   <View style={{flexDirection:'row', width:'95%', marginHorizontal:10,marginTop:10,marginBottom:20, justifyContent:'center', alignItems:'center' }}>
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true} black={true} onPress={this.cancelForm}  title='Cancel' />
                       </View>
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true} onPress={this.enable_personal} title='Save'/>
                       </View>
                      
                       
                   </View>
                </View>
                {
                    this.props.personal_record !== null && this.props.personal_record !== undefined ? <View style={{width:'95%',justifyContent:'center',marginTop:10,alignItems:'flex-start' }}>
                    <Text style={styles.excercise_text_1}>Personal Best</Text>
                </View> : null
                }
                {
                    this.props.personal_record !== null && this.props.personal_record !== undefined? <View style={styles.personal_block}>
                    <View style={styles.personal_subtitle}>
                        <View style={{flex:6}}>
                        <Text style={styles.pers_sub_text}>{this.state.title}</Text>
                        </View >
                        <View style={{flex:4}}>
                            <Text style={styles.pers_date}>{this.props.personal_record.exercise_date}</Text>
                        </View>
                    </View>
                <View style={{width:'95%', justifyContent:'center', marginBottom:10}}>
                <FlatList 
                   
                   data={ JSON.parse(this.props.personal_record.description)}
                   renderItem={(item)=>this.renderpersonalText(item)}
                   keyExtractor={(item,index)=>index.toString()}
                   />
                </View> 
                </View> : null
                }
                 
                <View>
                {/* <View style={{width:'95%',justifyContent:'center',marginVertical:10,alignItems:'flex-start' }}>
                    <Text style={styles.excercise_text}>Excercise Videos</Text>
                </View>
                <View>
                <Card style={{borderRadius:10, backgroundColor:'#262727', borderWidth:0, borderColor:'transparent'}}>
            
                <CardItem cardBody style={{borderRadius:10, backgroundColor:'#262727'}}>
              <View 
             
              style={styles.video_block}
              >
            <Video_Comp src={video_uri}/>
              
              </View>
            </CardItem>
           
          </Card>
                
                </View> */}
                {/* <View style={styles.personal_block}> */}
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Compete_Head onPress={()=>this.props.navigation.navigate('personal_best',{cat_id:this.state.category_id,sub_id:this.state.id, specific:true})} title='Exercise Log'/>
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                        { this.props.personal_best_filter != null && this.props.personal_best_filter.length >  0  ? <PersonalBest_Comp data = {this.props.personal_best_filter}/> : null}
                        </View>
                    </View>
                </View>
                {/* </View> */}
                </ScrollView>
            // </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {fitLoading, sub_category_detail,image_url,personal_record,addfitness,token_expire,record_added} = state.fitness
    const {personal_best_filter} = state.profile
   return { JWT_Token,fitLoading, sub_category_detail,image_url,personal_record,addfitness,token_expire,record_added,personal_best_filter}
  }
  const mapDispatchToProps = {
    dispatchgetFitnessRecord: (id) => getFitnessRecord(id),
    // getRefreshToken:(jwt)=>getRefreshtoken(jwt),
    duspatchgetPersonalBest:(category_type, JWT_Token,id) => getFitnessRecordList( category_type,JWT_Token,id),
     dispatchaddFitnessRecord:(id, category_type, form, JWT_Token) => addFitnessRecord(id, category_type, form,JWT_Token),
    dispatchLogout:()=>logout(),
    dispatchgetPersonalByFilter:(data,jwt) => getPersonalByFilter(data,jwt)
   }
export default connect(mapStateToProps, mapDispatchToProps)(Add_sets);
const styles = StyleSheet.create({
    container:{
        //flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        marginBottom:83
    },
    add_set_block:{
        backgroundColor:'#262727',
        borderRadius:10,
        width:'95%',
        marginTop:10
    },
    picker_block:{
        //flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10,
        // borderBottomWidth:1,
        // borderBottomColor:'#1F1F1F'
    },
    date:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    addbtn:{
        height:44,
        backgroundColor:'#1F1F1F',
        marginVertical:20,
        borderRadius:10,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'

    },
    form_block:{
        width:'95%',
        marginBottom:10, 
        marginHorizontal:10, 
        borderTopWidth:1, 
        borderTopColor:'#1F1F1F',
        borderBottomWidth:1, 
        borderBottomColor:'#1F1F1F',
        justifyContent:'center'
    },
    add_set_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        marginLeft:5,
        color:'#ADF350',
        fontFamily:'Montserrat-Regular'
    },
    tablehead:{
        
        width:'98%',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-start', 
        marginVertical:5
        
    },
    head_text:{
       
        textAlign:'center',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
       
    },
    head_text_View:{
        //flex:1,
        textAlign:'center',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF',
        width:85,
        //backgroundColor:'blue'
        

    },
    table_content:{
        width:84,
        height:44,
        backgroundColor:'#1F1F1F',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        color:'rgba(255, 255, 255, 0.5)',
    },
    table_content_time:{
        width:84,
        height:44,
        backgroundColor:'#1F1F1F',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        color:'rgba(255, 255, 255, 0.5)',
    },
    table_content_text:{
        width:84,
        height:44,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.2,
        color:'rgba(255, 255, 255, 0.5)',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Montserrat-Regular',
        textAlign:'center',
        borderRadius:10
    },
    table_content_text1:{
        // width:84,
        // height:44,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.2,
        color:'rgba(255, 255, 255, 0.5)',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Montserrat-Regular',
        textAlign:'center'
    },
    video_block:{
        width:windowWidth - 25, 
        height:windowWidth - 25, 
        borderRadius:10,
        marginLeft:10
    },
    image_tumbnail:{
        width:'100%',
        height:'100%',
        borderRadius:10
    },
    excercise_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#ADF350',
        textAlign:'left', 
        marginLeft:10,
        fontFamily:'Montserrat-Regular'
    },
    excercise_text_1:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular',
        
        textAlign:'left', 
        
        
    },
    image_block:{
        width:windowWidth,
        height:200
    },
    img:{
        width:windowWidth,
        height:200,
        maxWidth:windowWidth,
        maxHeight:'100%'
    },
    personal_block:{
        width:'95%',
        margin:10,
        backgroundColor:'#262727',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    persnal_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        /* identical to box height */
        marginHorizontal:10,
        marginVertical:5,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    },
    personal_subtitle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:10,
        width:'95%',
        marginHorizontal:10
    },
    pers_sub_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,

        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    pers_date:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        fontFamily:'Montserrat-Regular',
        color: 'rgba(255, 255, 255, 0.3)',
        textAlign:'right'

    },
    backgroundVideo: {
      
    
    
        alignSelf: 'center',
        
        width: windowWidth-25  ,
        height: windowWidth-25 ,
        //flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // resizeMode: 'contain',
        borderRadius:10,
        backgroundColor:'rgba(255, 255, 255, 0.2)'
        
      },
      img_block:{
        borderRadius:10, 
        position:'relative',
        width: windowWidth-20  ,
        height:windowWidth-20 ,
        justifyContent:'center',
        alignItems:'center',
       // backgroundColor:'yellow'
     },
     video_block:{
        borderRadius:10, 
        position:'relative',
        width: windowWidth-25  ,
        height: 250 ,
        justifyContent:'center',
        alignItems:'center',
     },
     timecolumn:{
         color:'rgba(255, 255, 255, 0.5)',
         textAlign:'center',
         marginRight:3
        },
    picker:{
        height:100,
        width:80
    }
    

    
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width:84,
        height:44,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.2,
        color:'rgba(255, 255, 255, 0.5)',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Montserrat-Regular',
        textAlign:'center',
        borderRadius:10
    },
    inputAndroid: {
        width:84,
        height:44,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.2,
        color:'rgba(255, 255, 255, 0.5)',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Montserrat-Regular',
        textAlign:'center',
        borderRadius:10
    },
  });