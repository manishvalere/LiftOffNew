import { Row } from 'native-base';
import React, { Component } from 'react';
import { View,TextInput,LogBox, Text,StyleSheet,Button,FlatList ,TouchableOpacity, Dimensions,Image,ScrollView,SafeAreaView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,   Icon, Left, Body, Right } from 'native-base';
import {Ionicons,AntDesign} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { connect } from 'react-redux';
import Btn_continue from '../../components/Btn_continue';
import Video_Comp from '../../components/video';
import {Toast, Root} from 'native-base';
import { getFitnessRecord } from '../../actions';
import {addCompleteChallnge } from '../../actions/challenge';
import { getRefreshtoken, logout } from '../../actions';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import KeepAwake from 'react-native-keep-awake';
const data=['1', '2', '3', '4', '5']
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

export class Start_challenge extends Component{
    constructor(props){
        super(props);
        this.state={
            form:[],
            change:false,
            count:0,
            personal_bloack:false,
            category_type:'',
            sets:'',
            id:'',
            title:'',
            history:'',
            history_record:[],
            subcategory_id:'',
            exercise_date:'',
            weight_option:[],
            reps_option:[],
            detail:{}

        }
    }
    componentDidUpdate(prevProps){
       // console.log(' CDU is calling ', this.props.completeChallenge)
        if(prevProps.completeChallenge !== this.props.completeChallenge){
          //  console.log('cdu personal record', this.props.personal_record)
            //this.props.duspatchgetPersonalBest(this.state.category_type, this.props.JWT_Token)
            if(this.props.completeChallenge){
                this.props.navigation.navigate('Compete')
                return Toast.show({
                    text: 'Challenge Completed!',
                    textStyle: { color: "green" },
                    //buttonText: "Okay"
                    duration:2500
                  })
                  
            }else if(!this.props.completeChallenge && this.props.completeChallenge !== null){ 
                console.log('hjqwojjjkj',this.props.completeChallenge )
                return Toast.show({
                    text: 'Something went wrong!',
                    textStyle: { color: "red" },
                    //buttonText: "Okay"
                    duration:2500
                  })
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
          this.setWeightOption();
          this.setRepsOption();
         // this.changeTitleText
       // console.log('compopnentdid mount is calling',)
        const { title, id, category_type, history,history_record,subcategory_id,exercise_date ,detail} = this.props.route.params;
        //console.log('cdm props',detail)
        this.props.navigation.setOptions({ title: title });
        this.setState({
            category_type:category_type == "Cardio" ? 7 : 'All',
            id:id,
            title:title, 
            history:history,
            history_record:history_record,
            subcategory_id:subcategory_id,
            exercise_date:exercise_date,
            detail:detail
        })
        var new_form = []
        if(category_type != 7){
            //console.log('detail.sets',detail.sets)
            for(let i=0; i<=detail.sets-1; i++){
                let obj = {};
                obj.sets = i+1;
                //obj.sets = detail.sets;
                obj.reps = detail.reps;
                obj.weight = ''
                new_form.push(obj)
            }
            //console.log('new_form', new_form)
            this.setState({
                form:new_form
            })
        }
       // console.log('this.state.form in CDM',this.state.form)
        var d1 = new Date();
        var d2 = new Date(exercise_date);
       // console.log('dates.compare(a,b)',d1 > d2,d1 >= d2,exercise_date  )
        const result = d1 >= d2
        if(!result){
            this.props.navigation.goBack();
            return Toast.show({
                text: 'Challenge not started yet!',
                textStyle: { color: "red" },
                //buttonText: "Okay"
                duration:3000
              })
        }
        // this.props.getRefreshToken(this.props.JWT_Token)
       //console.log('this.styate.cartegotry',subcategory_id)
        this.props.dispatchgetFitnessRecord(subcategory_id)
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
                for( let k=0; k<j.length; k++){
                   // console.log('j[k]',j[0])
                    if(this.props.sub_category_detail !== null ){
                       // console.log('entering yes')
                        if(this.props.sub_category_detail.swr_status == "Enable"){
                           // console.log('entering in to enable')
                            
                                if(j[k].sets == '' || j[k].reps == '' || j[k].weight == '' || j[k].sets == undefined || j[k].reps == undefined || j[k].weight == undefined){
                                    this.setState({
                                        error:'Please fill all the field!'
                                    })
                                    //console.log('second if in the process save')
                                    return false;
                                }
                            
                        }else{
                        if(j[k].sets == '' || j[k].reps == '' ||  j[k].sets == undefined || j[k].reps == undefined ){
                            this.setState({
                                error:'Please fill all the field!'
                            })
                            //console.log('first if in the process save')
                            return false;
                        } 
                    }
                }else{
                        //console.log('entering no')
                        if(j[k].sets == '' || j[k].reps == '' || j[k].weight == '' || j[k].sets == undefined || j[k].reps == undefined || j[k].weight == undefined){
                            this.setState({
                                error:'Please fill all the field!'
                            })
                          //  console.log('first if in the process save')
                            return false;
                        }
                    }
                    
            }
            }else if(this.state.category_type == 7){
               // console.log('if of cardio validatio')
                if(j[i].minute == '' || j[i].seconds == '' || j[i].distance == ''  || j[i].minute == undefined || j[i].distance == undefined ||  j[i].seconds == undefined){
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
            this.props.dispatchaddCompleteChallnge(this.state.id, this.state.category_type == 7 ? 'Cardio': 'All', this.state.form, this.props.JWT_Token)
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
      changeobject=(text, field, index)=>{
        //   var field_ = field
         var i = this.state.form.length-1;
        // console.log('iiiii', i)
         var form_new = this.state.form;
         switch(field) {
            case 'Sets':
                form_new[i].sets = i+1;
                break;
            case 'Reps':
                form_new[index].reps = text;
                break;
            case 'Weight':
                form_new[index].weight = text;
                break;
            case 'Minute':
                if (text.length === 2) {
                    this.secondTextInput.focus();
                    form_new[i].seconds = '00'
                  }
                form_new[i].minute = text;
                break;
            case 'Seconds':
                var isValid = /^([0-5][0-9])(:[0-5][0-9])?$/.test(text);
                if(isValid){
                    form_new[i].seconds = text;
                    this.setState({
                        error:''
                    })
                }else{
                    this.setState({
                        error:'Please enter valid time format!'
                    })
                }
                break;
            case 'Calories':
                form_new[i].calories = text;    
                break;
            case 'Distance':
                form_new[i].distance = text;
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
            color: '#FFFFFF',
          };
          const placeholder_weight = {
            label: 'Weight',
            value: null,    
            color: '#FFFFF',
          };
         // console.log('form',item.index , this.props.sub_category_detail)
          var int =this.state.category_type !== 7 ? this.state.form[index].sets : null 
          var str =this.state.category_type !== 7 ?  int.toString() :null;
          var int_reps =this.state.category_type !== 7 ? this.state.form[index].reps : null ;
          var str_reps =this.state.category_type !== 7 ?  int_reps.toString() :null;
        var swr = this.props.sub_category_detail !== null && this.props.sub_category_detail.swr_status == 'Enable' ? true : false;
          return(
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginVertical:10}}>
            <View style={styles.table_content}>
                {this.state.category_type !== 7 ? <TextInput returnKeyType='done' onFocus={this.errordisable} keyboardType='numeric'  value={str}   editable={false}  placeholderTextColor='#FFFFFF'  style={styles.table_content_text} /> :
                <TextInput maxLength={3}  returnKeyType='done' onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Distance')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Distance'/>}
              
            </View>
            {this.state.category_type !== 7 ? 
            <View style={styles.table_content}>
                {/* <TextInput maxLength={3} editable={!swr} value={str_reps} returnKeyType='done' onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Reps', index)}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Reps'/> */}
                <RNPickerSelect
                disabled={swr} 
                placeholder={placeholder}
                items={this.state.reps_option}
                onValueChange={(value) => {
                  this.changeobject(value, 'Reps', index)
                }}
                style={pickerSelectStyles}
                value={this.state.form[index].reps}
               
              />
                {/* <TextInput returnKeyType='done' value={str_reps} maxLength={3} onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Reps')}  placeholderTextColor='#FFFFF'  style={styles.table_content_text} placeholder= 'Reps'/>  */}
            </View> :
             <View  style={styles.table_content_time}>
             <TextInput 
             onFocus={this.errordisable} 
             keyboardType='numeric' 
             onChangeText={(text)=>this.changeobject(text, 'Minute')}  
             placeholderTextColor='rgba(255, 255, 255, 0.5)'  
             style={styles.table_content_text1} placeholder= 'HH'
             returnKeyType="next"
             onSubmitEditing={() => { this.secondTextInput.focus(); }}
             maxLength={2}
             />
             <Text style={styles.timecolumn}>{":"}</Text>
             <TextInput 
             onFocus={this.errordisable} 
             keyboardType='numeric' 
             onChangeText={(text)=>this.changeobject(text, 'Seconds')}  
             placeholderTextColor='rgba(255, 255, 255, 0.5)'  
             style={styles.table_content_text1} 
             ref={(input) => { this.secondTextInput = input; }}
             placeholder= {this.state.form[index].seconds}
             returnKeyType='done'
             maxLength={2}
             />
             </View>}
            
                {this.state.category_type !== 7? 
                (this.props.sub_category_detail !== null && this.props.sub_category_detail.swr_status == 'Enable' ? 
                <View style={styles.table_content}>
                <RNPickerSelect
                placeholder={placeholder_weight}
                items={this.state.weight_option}
                onValueChange={(value) => {
                  this.changeobject(value, 'Weight', index)
                }}
                style={pickerSelectStyles}
                value={this.state.form[index].Weight}
               
              />
              </View> : null)
                :
                <View style={styles.table_content}>
                <TextInput returnKeyType='done' maxLength={4} onFocus={this.errordisable} keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Calories')}  placeholderTextColor='rgba(255, 255, 255, 0.5)' style={styles.table_content_text} placeholder= 'Calories'/>
                </View>
                }
           
            
            </View>
          )
      }
      renderpersonalText=(item)=>{
      // console.log('item in ipersonal', item)
            if(this.state.category_type !== 7){
                return(
            
                    <Text key={item.index} style={styles.persnal_text}>{item.item.sets} Sets | {item.item.reps} Reps | {item.item.weight} lbs Weight</Text>
                )
            }else{
                return(
                    <Text key={item.index} style={styles.persnal_text}>{item.item.minute} : {item.item.seconds} Hours | {item.item.distance} Miles | {item.item.calories} Calories</Text>
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
        if(this.state.form.length<=9){
       if(this.state.form.length>0){
          // console.log('if is calling', this.state.form.length)
           var i = this.state.form.length
           if(this.state.category_type !== 7){
             //  console.log('reps undefined or not', this.state.form[i-1].Reps, this.state.form[i-1], i-1)
            if(this.state.form[i-1].sets !== "" && this.state.form[i-1].reps !== undefined && this.state.form[i-1].weight !== "" && this.state.form[i-1].weight !== undefined){
                this.setState((prevState) => {
           
                    return {
                    
                      change: !prevState.change,
                      count:this.state.count+1
                    };
                  });
                  this.state.form.push(this.state.category_type !== 7 ? {sets:this.state.count+1,reps:this.state.count+1,weight:'' } :{minute:'', seconds:'MM',calories:'',distance:'' });
            }else{
                this.setState({
                    error:'Please fill all the field!'
                })
            }
           }else if(this.state.form.length == 0 && this.state.category_type == 7){
            if(this.state.form[i-1].minute !== "" && this.state.form[i-1].minute !== undefined && this.state.form[i-1].seconds !== "" && this.state.form[i-1].seconds !== undefined && this.state.form[i-1].calories !== "" && this.state.form[i-1].distance !== "" && this.state.form[i-1].distance !== undefined){
                this.setState((prevState) => {
           
                    return {
                    
                      change: !prevState.change,
                      count:this.state.count+1
                    };
                  });
                  this.state.form.push(this.state.category_type !== 7 ? {sets:this.state.count+1,reps:this.state.count+1,weight:'' } : {minute:'', seconds:'MM',calories:'',distance:'' });
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
          this.state.form.push(this.state.category_type !== 7 ? {sets:this.state.count+1,reps:this.state.count+1,weight:'' } :  {minute:'', seconds:'MM',calories:'',distance:'' });
      }}
    }
      onBuffer(bufferObj) {
       // console.log('buffering', bufferObj.isBuffering);
      }
      
      videoError(error) {
       // console.log('video error:', error);
      }
    render(){
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
        
       //    console.log('detail', this.props.sub_category_detail)
        
        return(
            // <SafeAreaView style={{flex:1}}>
            <ScrollView>
                
                <View style={styles.container}>
                    <View style={styles.image_block}>
                        <Image style={styles.img} source={require('../../assets/challenge/challenge_home.png')}/>
                    </View>
                    {!this.state.history ? 
                <View style={styles.add_set_block}>
                   <View style={styles.picker_block}>
                      <Text style={styles.date}>{today}</Text>
                      
                   </View>
                   
                   <View style={styles.form_block}>
                       {this.state.form.length > 0 ? <View style={styles.tablehead}>
                           <View style={styles.head_text_View}><Text style={styles.head_text}>{this.state.category_type !== 7 ? 'Sets' : 'Distance'}</Text></View>
                           <View style={styles.head_text_View}><Text  style={styles.head_text}>{this.state.category_type !== 7 ? 'Reps' : 'Time'}</Text></View>
                           {this.state.category_type !== 7 ?
                        this.props.sub_category_detail !== null && this.props.sub_category_detail.swr_status !== 'Enable' ? null :
                        <View style={styles.head_text_View}><Text  style={styles.head_text}>{this.state.category_type !== 7 ? 'Weight' : 'Calories'}</Text></View>
                        : <View style={styles.head_text_View}><Text  style={styles.head_text}>{this.state.category_type !== 7 ? 'Weight' : 'Calories'}</Text></View>
                        }
                          
                       </View> : null}
                       {/* <SafeAreaView style={{flex:1}}> */}
                       <View style={{width:'98%',justifyContent:'center', alignItems:'center'}}>
                       {/* <FlatList 
                        //horizontal={true} 
                        data={this.state.form}
                        renderItem={(i, index)=>this.renderForm(i, index)}
                        keyExtractor={(item,index)=>index.toString()}
                        />  */}
                        {this.state.category_type == 7 && this.state.form.map((i,index)=>{
                            return this.renderForm(i, index)
                        })}
                        {this.state.category_type !== 7 && this.state.form.map((i,index)=>{
                            return this.renderForm(i, index)
                        })}
                        </View>
                        {this.state.error !== '' ? <Text style={{color:'red',fontFamily:'Montserrat-Regular', fontSize:13, marginTop:5}}>{this.state.error}</Text>:null}
                       {/* </SafeAreaView> */}
                    {this.state.form.length == 0 && this.state.category_type == 7 ? <TouchableOpacity onPress={this.add_new} style={styles.addbtn}>
                           <AntDesign name='pluscircle' color='#ADF350' size={16}/>
                           <Text style={styles.add_set_text}>Add Activity</Text>
                      </TouchableOpacity> : null}
                      {/* { this.state.category_type !== 7 ?  null: <TouchableOpacity onPress={this.add_new} style={styles.addbtn}>
                           <AntDesign name='pluscircle' color='#ADF350' size={16}/>
                           <Text style={styles.add_set_text}>Add Activity</Text>
                      </TouchableOpacity> }  */}
                       
                   </View>
                   <View style={{flexDirection:'row', width:'95%', marginHorizontal:10,marginTop:10,marginBottom:20, justifyContent:'center', alignItems:'center' }}>
                       {/* <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true}  onPress={this.cancelForm}  title='Complete Challenge' />
                       </View> */}
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true} onPress={this.enable_personal} title='Complete Challenge'/>
                       </View>
                      
                       
                   </View>
                </View>: 
                <>
                    <View style={{width:'95%',justifyContent:'center',marginTop:10,alignItems:'flex-start' }}>
                    <Text style={styles.excercise_text_1}>Your record</Text>
                </View>
                
                
                     <View style={styles.personal_block}>
                   
                <View style={{width:'95%', justifyContent:'center', marginVertical:10}}>
                <FlatList 
                   
                   data={ this.state.history_record.description}
                   renderItem={(item)=>this.renderpersonalText(item)}
                   keyExtractor={(item,index)=>index.toString()}
                   />
                </View> 
                </View> 
                </>
                }
                
                <View>
                <View style={{width:'95%',justifyContent:'center',marginVertical:10,alignItems:'flex-start' }}>
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
                
                </View>
                </View>
                </View>
                </ScrollView>
            // </SafeAreaView>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {sub_category_detail,image_url} = state.fitness
    const {challengeLoading,challengeError,completeChallenge} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,completeChallenge,sub_category_detail,image_url}
}
  const mapDispatchToProps = {
    
    // getRefreshToken:(jwt)=>getRefreshtoken(jwt),
    dispatchgetFitnessRecord: (id) => getFitnessRecord(id),
    dispatchaddCompleteChallnge:(id, category_type, form, JWT_Token) => addCompleteChallnge(id, category_type, form,JWT_Token),
    
   }
export default connect(mapStateToProps, mapDispatchToProps)(Start_challenge);
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
        alignItems:'center', 
        marginVertical:10
        
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
        textAlign:'center',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF',
        width:85,
        

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
        textAlign:'center'
    },
    table_content_text1:{
       
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
        borderRadius:10, 
        position:'relative',
        width: windowWidth-25  ,
        height: 250 ,
        justifyContent:'center',
        alignItems:'center',
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
        fontSize: 14,
        lineHeight: 17,
        color: '#ADF350',
        textAlign:'left', 
        //marginLeft:10,
        fontFamily:'Montserrat-Regular'
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
        color: 'rgba(255, 255, 255, 0.3)'

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
     
     timecolumn:{
         color:'#FFFFFF',
         textAlign:'center',
         marginRight:3
        }
    

    
});
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