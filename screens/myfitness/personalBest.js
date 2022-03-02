import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity ,Platform,Image, ScrollView,Button,Dimensions,FlatList,RefreshControl} from 'react-native';
import Constants from 'expo-constants'
import { logout,changeCount, getPersonalBest } from '../../actions';
import { connect } from 'react-redux';
import {MaterialCommunityIcons,Feather,Entypo,AntDesign} from 'react-native-vector-icons';
import { getRefreshtoken } from '../../actions';
import Compete_Head from '../../components/compet_head';
import DatePicker from 'react-native-date-ranges';
import CustomModal from '../../components/customModal';
import Challenge_picker from '../../components/challenge_picker';
import  {getSubcategory,getMaincategory, createChallenge, setSubcategoryNull ,getPersonalBestNewFilter} from '../../actions';
import FilterPicker from '../../components/filterPicker';
import CustomHeader from '../../components/customeHeader';
const data = ['1', '2','3', '4']
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const PROP = [
	{
		key: 'single',
		text: 'single',
	},
	{
		key: 'range',
		text: 'range',
	},
	
];
export class PersonalBest extends Component{
    constructor(props){
        super(props);
        this.state={
            startdate:'',
            enddate:'',
            singleDate:'',
            modalVisible:false,
            main_name:null,
            category_id:'',
            sub_category_id:'',
            challenge:null,
            value: 'single',
            change:false,
            specific:null,
            filterData:false,
        }
    }
    // componentWillUnmount(){
    //     this.applyFilter(this.state.category_id, this.state.sub_category_id, this.state.specific, )
    // }

    applyFilter=(cat_id, sub_id, specific)=>{
      var  data = {};
      //console.log('this.state in apply filter', this.state);
     // console.log('cat_id, sub_id, specific)',cat_id, sub_id, specific)
      if(this.state.category_id !== ''){
        data.category_id = this.state.category_id 
          
      }
      if(this.cat_id !== '' && specific){
          data.category_id = cat_id
      }
      if(this.state.sub_category_id !== ''){
        data.subcategory_id =  this.state.sub_category_id
      }
      if(this.sub_id != '' && specific){
        data.subcategory_id = sub_id
      }
      if(this.state.startdate !== ''){
        data.from_date = this.state.startdate
      }
      if(this.state.enddate !== ''){
        data.to_date = this.state.enddate
      }
      if(this.state.singleDate !== ''){
        data.perticular_date = this.state.singleDate
      }
      //console.log('dataa in filter' , data )
       this.props.dispatchgetPersonalByFilter(data,this.props.JWT_Token);
       //this.clear_all();
       this.setState({
           filterData:true
       })
       this.close_modal();
    }
    personalRecord = (item)=>{
        
        return(
            <Text style={styles.challenge_detail}>3 Sets | 5 Reps | 300 Lbs Weight</Text>
        )
    }
    emptyComponent=()=>{
        return(
            <View style={styles.item_bloack1}>
            <Text style={styles.challenge_name}>No Record Found</Text>
        </View>
        )
    }
    componentDidUpdate(prevProps){
        // console.log(' prosp in personal bers',this.props.personal_best,'prev    ',prevProps.personal_best)
        if(this.props.personal_best !== prevProps.personal_best){
            this.setState({
                change:true
            })
        }
    }
    renderDateData =(item)=>{
        const ii = item.item;
        console.log('log',ii)
        return(
            // <View><Text>{ii.date}</Text></View>
            <View style={styles.item_bloack} key={item.index}>
                {/* <View style={styles.firstBlock}> */}
                   <View style={styles.head_bloack}>
                   <View style={{width:12, height:12, borderRadius:6, backgroundColor:'#ADF350', opacity:0.7, marginRight:10}}/>
                   <Text style={styles.challenge_name}>{ii.date}</Text>
                   
                   {/* <Text style={styles.date_text}>{ii.exercise_date}</Text> */}
                   </View>
                   
                    {
                     ii.log_details !== undefined ?   ii.log_details.map((_i,ind)=>{
                            return(
                                <View style={{height:'auto', marginTop:5, marginBottom:5,backgroundColor:'#1F1F1F',alignItems:'center',justifyContent:'center', width:'90%',borderRadius:5, paddingVertical:10}}>
                                    <View style={{width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderBottomColor:'rgba(255, 255, 255, 0.3)', borderBottomWidth:1.5}}>
                                        <Text style={styles.challenge_name_}>
                                           {_i.subcategory_name}
                                           
                                        </Text>
                                        <Text style={styles.challenge_detail}>
                                           {_i.exercise_time}
                                        </Text>
                                    </View>
                                    {/* <View style={styles.seprator}>

                                    </View> */}
                <View style={{width:'90%',alignItems:'flex-start',flexDirection:'row', paddingVertical:5,justifyContent:'space-between'  }}>
                <View style={{alignItems:'flex-start', paddingVertical:5  }}>
                    {
                       JSON.parse(_i.description).map((i, index)=>{
                     //  console.log('i.exercise_type',ii.exercise_type)
                            if(_i.exercise_type == 'All'){
                                
                                return(
                            
                                    <Text key={ index} style={styles.challenge_detail}>{i.Sets} Sets | {i.Reps} Reps | {i.Weight} lbs Weight</Text>
                                )
                            }else{
                                return(
                                    <Text key={ index} style={styles.challenge_detail}>{i.Distance} Miles  | {i.Minute+':'+i.Seconds} Hour | {i.Calories} Calories</Text>
                                )
                            }
                        
                       })
                   }
                   
                   </View>
                   <View>
                  {_i.exercise_type == 'All' && _i.swr_status == true ?  <Text  style={styles.challenge_SWR}>SWR : {_i.swr_result}</Text>: null}
                   </View>
                   </View>
                       {/* <FlatList
                       data={JSON.parse(i.description)}
                       renderItem={(item)=>this.personalRecord}
                       keyExtractor={(item,index)=>index.toString}
                       /> */}
                    </View>
                            )
                        })
                    :null}
                {/* </View> */}
                  
            </View>
        )
    }
    renderItem=(item)=>{
        const ii = item.item
        console.log('iiii',ii)
        return(
            
             
            <View style={styles.item_bloack} key={item.index}>
                {/* <View style={styles.firstBlock}> */}
                   <View style={styles.head_bloack}>
                   
                   <Text style={styles.challenge_name}>{ii.subcategory_name}</Text>
                   
                   <Text style={styles.date_text}>{ii.exercise_date}</Text>
                   </View>
                   <View style={styles.seprator}>

                   </View>
                    <View style={{height:'auto', marginTop:5, marginBottom:5}}>
                    {
                       JSON.parse(ii.description).map((i, index)=>{
                     //  console.log('i.exercise_type',ii.exercise_type)
                            if(ii.exercise_type == 'All'){
                                
                                return(
                            
                                    <Text key={ index} style={styles.challenge_detail}>{i.Sets} Sets | {i.Reps} Reps | {i.Weight} lbs Weight</Text>
                                )
                            }else{
                                return(
                                    <Text key={ index} style={styles.challenge_detail}>{i.Distance} Miles  | {i.Minute} : {i.Seconds} Hour | {i.Calories} Calories</Text>
                                )
                            }
                        
                       })
                   }
                       {/* <FlatList
                       data={JSON.parse(i.description)}
                       renderItem={(item)=>this.personalRecord}
                       keyExtractor={(item,index)=>index.toString}
                       /> */}
                    </View>
                {/* </View> */}
                  
            </View>
            
            
        )
    }
    componentDidMount(){
     const { cat_id,sub_id,specific} = this.props.route.params;
     console.log('component did mound is calling')
        console.log('cat_id', cat_id, sub_id,specific)
        this.setState({
            category_id:cat_id,
            sub_category_id:sub_id,
            specific:specific, 
            filterData:false,
        })
        this.props.dispatchgetMaincategory();
        
        // if(specific){
            console.log('specific true is calling')
            //this.applyFilter(cat_id, sub_id, specific)
        // }else{
            console.log('all personal best is calling')
            this.props.dispatchgetPersonalBest(this.props.JWT_Token);
            this.props.dispatchsetSubcategoryNull();
        //}
    }
    refresh=()=>{
       
        if(this.state.specific){
            console.log('specific true is calling')
            this.applyFilter(this.state.category_id, this.state.sub_category_id, this.state.specific)
        }else{
            console.log('all personal best is calling');
            this.setState({
                filterData:false
            })
            this.props.dispatchgetPersonalBest(this.props.JWT_Token);
        }
    }
    clear_all=()=>{
        this.setState({
            startdate:'',
            enddate:'',
            singleDate:'',
            //modalVisible:false,
            main_name:'',
            //category_id:this.state.specific ?  '',
            //sub_category_id:'',
            challenge:''
        })
        if(!this.state.specific && this.state.specific != null){
            //console.log('enterign in clear all if', this.state.specific)
            this.setState({
                category_id:'',
                sub_category_id:'',
                
            })
            this.props.dispatchsetSubcategoryNull()
        }
        
    }
    setRange=(text, type)=>{
        if(type == 'range'){
            this.setState({
                startdate:text.startDate,
                enddate:text.endDate
            })
        }else{
            this.setState({
                singleDate:text.currentDate
            })
        }
    }
    setSingleDate=(text)=>{
        this.setState({
            singleDate:text.currentDate
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
    onChallengeChange=(value, id)=> {
        this.setState({
           main_name: value,
            category_id:value
        });
       // console.log('challnge selected', value);
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
       this.setState({
           challenge:item.subcategory_name
       })
      }
      back=()=>{
          this.props.navigation.goBack()
      }
      openModal=()=>{
          this.setState({
              modalVisible:true
          })
      }
      close_modal=()=>{
        this.setState({ 
            modalVisible: false,

        })
        this.clear_all()
      }
    render(){
        
        const { value } = this.state;
        
        //console.log('this.state', this.state)
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
        //console.log('sub cate in personal', this.props.sub_category)
        }
        console.log('props in personal berst screen ',this.props.personal_best,this.props.personal_best_filter)
        return(
            <View style={styles.container}>
                <CustomHeader title='Exercise Log' onback={this.back} onmodalbtn={this.openModal}/>
                    {/* <TouchableOpacity 
                        style={styles.filter_btn}
                        onPress={() => this.setState({ modalVisible: true })}
                    >
                        <Entypo  name='sound-mix' size={20} color='#1F1F1F'/>
                    </TouchableOpacity> */}
                <CustomModal
                    animation="slide"
                    visible={this.state.modalVisible}
                    mode="overFullScreen"
                    boxBackgroundColor="#262727"
                    transparentContainer={true}
                    bottomHalf={true}
                    outsideClick={() => {
                        this.setState({ modalVisible: true });
                    }}
                >
                {/* <View style={styles.modal_view}>
                    <View style={styles.modal_head}>
                       <Text>dqhdjhuhjhihiuhdi iuhjiohqdiu hjioqhj ijoijs oijoihjd ijoihjdsiu hggygygydgdygdyg ij</Text>
                    </View>
                    <View style={styles.modal_body}>

                    </View>
                    <View style={styles.modal_foot}>

                    </View>
                </View> */}
                
                    <View style={styles.modal_head}>
                        <View style={{flexDirection:'row',width:'auto', justifyContent:'space-between',alignItems:'center' }}>
                        
                        <Entypo name='sound-mix' size={24} color='#FFFFFF'/>
                        <Text style={styles.filter_text}>Filter</Text>
                        </View>
                        {/* <View style={{width:width *(65/100)}}>

                        </View> */}
                        <TouchableOpacity 
                        
                        onPress={this.close_modal}
                    >
                        <AntDesign style={{width:'auto'}}  name='close' size={24} color='#FFFFFF'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.modal_body}>
                        <View style={styles.picker_title_View}>
                            <Text style={styles.picker_title}>Category</Text>
                        </View>
                        <View style={styles.pickerBlock}>
                         <FilterPicker specific={this.state.specific} placeholder='Select' main={true} data={main} color='white' value={this.state.category_id} onValueChange={this.onChallengeChange}  width={width * (50/100)}/>
                        </View>
                    {this.props.sub_category !== null && this.props.sub_category !== undefined &&this.props.sub_category.length > 0 ?
                    <>
                        <View style={styles.picker_title_View}>
                            <Text style={styles.picker_title}>Exercise</Text>
                        </View>
                         <View style={styles.pickerBlock}>
                         <FilterPicker specific={this.state.specific} placeholder='Select' main={false} data={this.props.sub_category} color='white' value={this.state.sub_category_id} onValueChange={this.onsubChallengeChange}  width={width * (50/100)}/>
                         </View>
                        </> 
                         : null}
                         <View>
                <View style={styles.switch_block}>
                {PROP.map((res,index) => {
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
                                backgroundColor:value === res.key ? '#ADF350' : null,
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
                                this.setState({
                                    value: res.key,
                                });
                            }}
                            >
                                
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    value: res.key,
                                });
                            }}
                            >
                            <Text style={styles.date_range}>{index == 0 ? 'Date' : 'Date Range'}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
                </View>
                {/* <Text>{this.state.value}</Text> */}
            </View>
                         {/* <View style={styles.picker_title_View}>
                            <Text style={styles.picker_title}>Date</Text>
                        </View> */}
                        <DatePicker
                        style={ { 
                            width: width * (90/100), 
                            height:height*(5/100),
                            borderRadius:10,
                            borderColor:'rgba(31, 31, 31, 0.5)',
                            borderWidth:1,
                            borderRadius:5 ,
                            marginTop:20,
                            fontSize:14,
                            fontFamily: 'Montserrat-Regular',
                            fontStyle: 'normal',
                            fontWeight: "500",
                            justifyContent:'center',
                            alignItems:'flex-start',
                            backgroundColor:'rgba(255, 255, 255, 0.9)'
                        } }
                        customStyles = { {
                            placeholderText:{ 
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "500",
                                fontSize: 14,
                                lineHeight: 18
                        }, // placeHolder style
                            headerStyle : {
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "500",
                                fontSize: 14,
                                lineHeight: 18
                            },			// title container style
                            headerMarkTitle : { 
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "500",
                                fontSize: 14,
                                lineHeight: 18
                            }, // title mark style 
                            headerDateTitle: {
                                fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "500",
                                fontSize: 14,
                                lineHeight: 18
                             }, // title Date style
                            contentInput: {
                                paddingLeft:15
                            }, //content text container style
                            contentText: {fontSize:20, 
                                color:'rgba(31, 31, 31, 0.6)',
                                textAlign:'left',
                                fontFamily: 'Montserrat-Regular',
                                fontStyle: 'normal',
                                fontWeight: "500",
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
                            fontWeight: "500",
                            fontSize: 14,
                            lineHeight: 18
                        }}
                        //selectedBgColor="#ADF350"
                        allowFontScaling = {true} // optional
                        placeholder={this.state.value == 'single' ? 'Select Date' : 'Select Date Range'}
                        onConfirm={text=>this.setRange(text, this.state.value)}
                        mode={this.state.value}
                        customButton = {this.customButton}
                        markText='Range'
                        />
                    </View>
                    
                    <View style={styles.modal_foot}>
                       
                        
                       <TouchableOpacity onPress={this.clear_all}>
                           <Text style={styles.clear_text}>Clear All</Text>
                       </TouchableOpacity>
                        
                        
                        {/* <View style={{width:width *(65/100)}}>

                        </View> */}
                        <TouchableOpacity 
                        style={styles.apply_btn}
                        onPress={this.applyFilter}
                    >
                        <Text style={styles.apply_text}>Apply Filter</Text>
                    </TouchableOpacity>
                    </View>
                
                    
                </CustomModal>
                <FlatList
                  data={this.props.personal_best}
                  //keyExtractor={(item,index)=>item.id.toString()}
                  renderItem={this.renderDateData}
                  ListEmptyComponent={this.emptyComponent}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.props.profileLoading}
                      onRefresh={this.refresh}
                      tintColor='white'
                      color='white'
                      progressBackgroundColor='white'
                      
                    />
                  }
                 // horizontal={true}
                  //showsVerticalScrollIndicator={false}
                  //showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn, JWT_Token} = state.auth
    const {count} = state.count
    const {hisoryChallenges}= state.challenge
    const {fitLoading, sub_category,image_url,main_category} = state.fitness
    const {personal_best,profileLoading,personal_best_filter} = state.profile
   return {user,isLoggedIn ,count,JWT_Token,hisoryChallenges,fitLoading,sub_category,image_url,main_category,personal_best,profileLoading,personal_best_filter}
}

const mapDispatchToProps = {
  dispatchLogout: () => logout(),
  dispatchgetMaincategory: () => getMaincategory(),
    dispatchgetSubcategory: (id) => getSubcategory(id),
    dispatchgetPersonalBest:(jwt)=>getPersonalBest(jwt),
    dispatchsetSubcategoryNull: () => setSubcategoryNull(),
    dispatchgetPersonalByFilter:(data,jwt) => getPersonalBestNewFilter(data,jwt)
 // dispatchgetRefreshToken:(jwt)=>getRefreshtoken(jwt)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalBest)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        //alignItems:'center', 
        marginBottom:83,
       // position:'relative'
        //  paddingTop:Platform.OS === 'ios' ? Constants.statusBarHeight: 0 ,
        //backgroundColor:'#262727'
    },
    filter_btn:{
        position:'absolute',
        top:-10,
        right:10,
        width:44,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#81a84c",
        borderRadius:5,
        zIndex:99999
    },
    modal_view:{
        //flex:1,
        
    },
    modal_head:{
        flex:0.08,
        width:width * (95/100),
        flexDirection:'row',
        borderBottomColor:'rgba(242, 242, 242, 0.3)',
        borderBottomWidth:1,
        paddingBottom:10,
        paddingVertical:10,
        justifyContent:'space-between',
       // height:70
    },
    modal_body:{
        flex:0.9,
        //width:width*(80/100),
        justifyContent:'flex-start',
        alignItems:'center'
    },
    modal_foot:{
         flex:0.06,
         width:width * (95/100),
         flexDirection:'row',
         borderTopColor:'rgba(242, 242, 242, 0.3)',
         borderTopWidth:1,
         paddingTop:20,
         paddingVertical:20,
          justifyContent:'space-between',
        alignItems:'center'
    },
    filter_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#FFFFFF',
        marginLeft:5
    },
    picker_title:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        color: '#FFFFFF',
        textAlign:'left',
        marginTop:10
    },
    picker_title_View:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginBottom:10,
        width:'95%'
    },
    pickerBlock:{
        height:height * (5/100),
        //width: width * (95/100), 
        borderColor:'rgba(31, 31, 31, 0.5)',
        borderWidth:1,
        borderRadius:5
    },
    apply_btn:{
        backgroundColor: '#ADF350',
        borderRadius: 23,
        width:170,
        height:height * (5/100),
        justifyContent:'center',
        alignItems:'center'
    },
    apply_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight:'600',
        fontSize: 18,
        lineHeight: 22,

        color: '#1F1F1F'
    },
    clear_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: 'rgba(242, 242, 242, 0.5)'
    },
    head_block:{
        flexDirection:'row',
        justifyContent:'space-between',
       // width:'85%',
        alignItems:'center',
        marginVertical:10,
        //flex:1,
        alignItems:'center',
        backgroundColor:'white'

    },
    item_bloack:{
        width:width-20, 
        height:'auto', 
        backgroundColor:'#262727',
        marginLeft:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'space-around',
        marginHorizontal:5,
        marginVertical:10,
        flexDirection:'column',
        position:'relative',
        alignItems:'center',
        paddingVertical:10
    },
    item_bloack1:{
        width:width-20, 
        height:120, 
        backgroundColor:'#262727',
        marginLeft:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:5,
        marginVertical:10,
        flexDirection:'column',
        position:'relative'
    },
    firstBlock:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        marginHorizontal:10,
        marginVertical:10
    },
    roundBlock:{
        flex:0.4,
        position:'relative'
    },
    seprator:{
        height:3, 
        backgroundColor:'rgba(255, 255, 255, 0.3)'
    },
    round_absolute:{
        position:'absolute',
        backgroundColor:'#262727',
        width:98,
        height:98,
        borderRadius:100/2,
        top:-7,
        right:10,
        justifyContent:'center',
        alignItems:'center'
       
    },
    challenge_name:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#ADF350',
        opacity:0.7,
        fontFamily:'Montserrat-Regular',
        //paddingVertical:5,
        flex:0.7
       
    },
    challenge_name_:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        flex:0.8,
        lineHeight: 17,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',
        paddingVertical:5,
        //flex:0.7
       
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)',
        marginVertical:3,
        //marginLeft:25,
        fontFamily:'Montserrat-Regular'
    },
    challenge_SWR:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: '#ADF350',
        marginVertical:3,
        opacity:0.7,
        //marginLeft:25,
        fontFamily:'Montserrat-Regular'
    },
    progress_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',

        color: 'rgba(173, 243, 80, 0.5)'
    },
    head_bloack:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'flex-start',
        //justifyContent:'space-around',
        alignItems:'center',
        paddingVertical:5
    },
    date_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)'
    },
    switch_block:{
        width:width * (95/100),
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginTop:10
    },
    touch_bloack:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        width:width * (40/100)
    },
    date_range:{
        fontFamily:'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
        color: '#FFFFFF',
        marginLeft:10
    }
})