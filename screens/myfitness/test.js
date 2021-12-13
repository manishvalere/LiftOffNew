import { Row } from 'native-base';
import React, { Component } from 'react';
import { View,TextInput,LogBox, Text,StyleSheet,Button,FlatList ,TouchableOpacity, Dimensions,Image,ScrollView,SafeAreaView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,   Icon, Left, Body, Right } from 'native-base';
import {Feather,AntDesign} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { connect } from 'react-redux';
import Btn_continue from '../../components/Btn_continue';
import Video_Comp from '../../components/video';

import {getFitnessRecord,addFitnessRecord } from '../../actions/fitness';
const data=['1', '2', '3', '4', '5']
const personal=[
    {
        id:'1',
        name:'Set 1 | 10 Reps | 150 lbs Weight '
    },
    {
        id:'2',
        name:'Set 2 | 15 Reps | 250 lbs Weight '
    },
    {
        id:'3',
        name:'Set 3 | 10 Reps | 250 lbs Weight '
    }
]

export class Add_sets extends Component{
    constructor(props){
        super(props);
        this.state={
            form:[],
            change:false,
            count:0,
            personal_bloack:false,
            category_type:'',
            
            id:''

        }
    }
      componentDidMount=()=>{
         // this.changeTitleText
        const { title, id, category_type } = this.props.route.params;
        this.props.navigation.setOptions({ title: title });
        this.setState({
            category_type:category_type == 'Cardio' ? 'Cardio' : 'All',
            id:id
        })
        this.props.dispatchgetFitnessRecord(id)
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      }
     
      rendescrollItem=(item)=>{
          return(
              <TouchableOpacity contentContainerStyle={{justifyContent:'center'}} style={styles.video_block}>
                  <Image style={styles.image_tumbnail} source={require('../../assets/fitness/video_icon.png')}/>
              </TouchableOpacity>
          )
      }
      enable_personal=()=>{
          this.setState({
              personal_block:true
          });
          //this.props.dispatchaddFitnessRecord(this.state.id, this.state.category_type, this.state.count, this.props.JWT_Token)

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
         var i = this.state.form.length-1;
         //console.log('iiiii', i)
         var form_new = this.state.form;
         switch(field) {
            case 'Sets':
                form_new[i].Sets = text;
                break;
            case 'Reps':
                form_new[i].Reps = text;
                break;
            case 'Weight':
                form_new[i].Weight = text;
                break;
            case 'Time':
                form_new[i].Time = text;
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
      renderForm=()=>{
          return(
            <View style={{width:'98%',flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginVertical:10}}>
            <View style={styles.table_content}>
                {this.state.category_type !== 'Cardio' ? <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Sets')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Sets'/> :
                <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Time')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Time'/>}
              
            </View>
            <View style={styles.table_content}>
                {this.state.category_type !== 'Cardio' ? <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Reps')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Reps'/> :
                <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Calories')}  placeholderTextColor='rgba(255, 255, 255, 0.5)'  style={styles.table_content_text} placeholder= 'Calories'/>
                }
            </View>
            <View style={styles.table_content}>
                {this.state.category_type !== 'Cardio' ? <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Weight')}  placeholderTextColor='rgba(255, 255, 255, 0.5)' style={styles.table_content_text} placeholder= 'Weight'/>:
                <TextInput keyboardType='numeric' onChangeText={(text)=>this.changeobject(text, 'Distance')}  placeholderTextColor='rgba(255, 255, 255, 0.5)' style={styles.table_content_text} placeholder= 'Distance'/>
                }
            </View>
            </View>
          )
      }
      renderpersonalText=(item)=>{
         
          return(
           
                <Text style={styles.persnal_text}>Set 2 | 15 Reps | 250 lbs Weight</Text>
              
           
          )
      }
      add_new=()=>{
       
       
        this.setState((prevState) => {
            return {
              change: !prevState.change,
              count:this.state.count+1
            };
          });
          this.state.form.push(this.state.category_type !== 'Cardio' ? {Sets:'',Reps:'',Weight:'' } : {Time:'',Calories:'',Distance:'' });
      }
      onBuffer(bufferObj) {
       // console.log('buffering', bufferObj.isBuffering);
      }
      
      videoError(error) {
        //console.log('video error:', error);
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
        
        //console.log('this form',this.state)
        return(
            // <SafeAreaView style={{flex:1}}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.image_block}>
                        <Image style={styles.img} source={{uri: uri}}/>
                    </View>
                <View style={styles.add_set_block}>
                   <View style={styles.picker_block}>
                      <Text style={styles.date}>{today}</Text>
                      
                   </View>
                   
                   <View style={styles.form_block}>
                       {this.state.form.length > 0 ? <View style={styles.tablehead}>
                           <Text style={styles.head_text}>{this.state.category_type !== 'Cardio' ? 'Sets' : 'Time'}</Text>
                           <Text  style={styles.head_text}>{this.state.category_type !== 'Cardio' ? 'Reps' : 'Calories'}</Text>
                           <Text  style={styles.head_text}>{this.state.category_type !== 'Cardio' ? 'Weight' : 'Distance'}</Text>
                       </View> : null}
                       {/* <SafeAreaView style={{flex:1}}> */}
                       <View style={{justifyContent:'space-around', alignItems:'center'}}>
                       <FlatList 
                        //horizontal={true} 
                        data={this.state.form}
                        renderItem={(item)=>this.renderForm()}
                        keyExtractor={(index)=>index}
                        /> 
                        </View>
                       {/* </SafeAreaView> */}

                       <TouchableOpacity onPress={this.add_new} style={styles.addbtn}>
                           <AntDesign name='pluscircle' color='#ADF350' size={16}/>
                           <Text style={styles.add_set_text}>Add Sets</Text>
                      </TouchableOpacity>
                   </View>
                   <View style={{flexDirection:'row', width:'95%', marginHorizontal:10,marginTop:10,marginBottom:20, justifyContent:'center', alignItems:'center' }}>
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true} black={true}  title='Cancel' />
                       </View>
                       <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
                       <Btn_continue onboard={true} onPress={this.enable_personal} title='Save'/>
                       </View>
                      
                       
                   </View>
                </View>
                {/* {
                    this.props.personal_record !== null ? <View style={{width:'95%',justifyContent:'center',marginTop:10,alignItems:'flex-start' }}>
                    <Text style={styles.excercise_text_1}>Personal Best</Text>
                </View> : null
                }
                {
                    this.props.personal_record !== null ? <View style={styles.personal_block}>
                    <View style={styles.personal_subtitle}>
                        <Text style={styles.pers_sub_text}>Shoulder Lunges</Text>
                        <Text style={styles.pers_date}>July 17, 2021</Text>
                    </View>
                <View style={{width:'95%', justifyContent:'center', marginBottom:10}}>
                <FlatList 
                   
                   data={ this.props.personal_record.description}
                   renderItem={(item)=>this.renderpersonalText(item)}
                   keyExtractor={(index)=>index}
                   />
                </View> 
                </View> : null
                } */}
                 
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
    const {fitLoading, sub_category_detail,image_url,personal_record} = state.fitness
   return { JWT_Token,fitLoading, sub_category_detail,image_url,personal_record}
  }
  const mapDispatchToProps = {
    dispatchgetFitnessRecord: (id) => getFitnessRecord(id),
    // dispatchaddFitnessRecord:(id, category_type, form, JWT_Token) => addFitnessRecord(id, category_type, form,JWT_Token)
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
        // fontFamily:'Montserrat-Regular'
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
        borderBottomColor:'#1F1F1F'
    },
    add_set_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        marginLeft:5,
        color:'#ADF350'
    },
    tablehead:{
        flexDirection:'row',
        //display:'flex', 
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:20,
        
        
    },
    head_text:{
        flex:1,
        textAlign:'center',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color:'#FFFFFF'
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
    table_content_text:{
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.2,
        color:'rgba(255, 255, 255, 0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    video_block:{
        width:windowWidth - 80, 
        height:182, 
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
        //fontFamily:'Montserrat-Medium'
    },
    excercise_text_1:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#ADF350',
        textAlign:'left', 
        //marginLeft:10,
       // fontFamily:'Montserrat-Medium'
    },
    image_block:{
        width:windowWidth,
        height:180
    },
    img:{
        width:windowWidth,
        height:180,
        // maxWidth:'100%',
        // maxHeight:'100%'
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
        color: 'rgba(255, 255, 255, 0.3)'
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

        color: '#FFFFFF'
    },
    pers_date:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,

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
     video_block:{
        borderRadius:10, 
        //position:'relative',
        width: windowWidth-25  ,
        height: windowWidth-25 ,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow'
     }
    

    
})