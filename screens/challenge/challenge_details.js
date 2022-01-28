import React from 'react';
import { Component } from 'react';
import {View , Text,StyleSheet,Dimensions, TouchableOpacity,Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { getChallengeDetail,setChallengeId } from '../../actions';
import { connect } from 'react-redux';
const width = Dimensions.get('window').width;
import CustomModal from '../../components/customModal';
import {MaterialCommunityIcons,Feather,Entypo,AntDesign} from 'react-native-vector-icons';

const height = Dimensions.get('window').height;
const data_dummy = ['1','2','1',]
export class Challenge_Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            challenge_id:'',
            category_type:'',
            subcategory_id:'',
            exercise_date:'',
            challenge:'',
            modalVisible:false,
            current_user:''
        }
    }
    render_detail=(i)=>{
        console.log('iii',i)
        const data = this.props.getChallengeDetail
        const ii = i.item
        const time =  ii.minute+':'+ii.seconds
        console.log('hasgdvsahbd', ii.weight)
        return(
            <View style={styles.detail_row}>
                {this.state.category_type !== 'Cardio' ? <Text style={styles.text_description_2}>{ii.sets} Sets | {ii.reps} Reps {ii.weight !== undefined && ii.weight !== '' ? ('| '+ ii.weight +' Lbs Weight'): null}</Text>:
                       <Text style={styles.text_description_2}>{ii.distance} Miles | {time} Hours | {ii.calories} Calories</Text>
                       }
            </View>
        )
    }
    componentDidMount(){
        
        const { title, id, category_type, history,history_record,exercise_date,subcategory_id } = this.props.route.params;
        this.props.navigation.setOptions({ title: title });
        console.log('idddd',id)
        this.setState({
            challenge:title,
            challenge_id:id,
            category_type:category_type,
            subcategory_id:subcategory_id,
            exercise_date:exercise_date

        })
        this.props.dispatchgetChallengeDetail(this.props.JWT_Token, id),
        this.props.dispatchsetchallengeID(id);

    }
    openModal=(i)=>{
        this.setState({
            current_user:i,
            modalVisible:true
        })
    }
    close_modal=()=>{
        this.setState({ 
            modalVisible: false,

        })
        
      }
    renderItem=(item)=>{
        const i = item.item
       
        
        var sets = 0, reps =0, weight =0, distance =0, time =0, calories= 0 ,minute=0, seconds=0;
        var desc_status = i.description
           console.log('des',desc_status)
           if(i.description !== null && i.description !== undefined && desc_status !== "" ){
              if(i.exercise_type !== 'Cardio'){
                  const new_des = JSON.parse(i.description)
                 // console.log('length od des', new_des.length)
            //    for(let j=0; j<new_des.length; j++){
                
            //        let set_i =parseInt(new_des[j].sets)
            //        let reps_i =parseInt(new_des[j].reps)
            //        let weight_i =parseInt(new_des[j].weight)
            //       // let set_i =i.description[j].sets
                  
            //       sets += set_i;
            //        reps += reps_i;
            //        weight += weight_i
                  
                   
            //    }
                sets = new_des.length;
                reps = new_des[0].reps
              }else{
                const new_des = JSON.parse(i.description)
               for(let j=0; j<new_des.length; j++){
                //    let ditance_i =parseInt(new_des[j].distance)
                //    let minute_i =parseInt(new_des[j].minute)
                //    let second_i =parseInt(new_des[j].seconds)
                //    let calory_i =parseInt(new_des[j].calories)
                //   // let set_i =i.description[j].sets
                  
                //   distance += ditance_i;
                //   minute += minute_i;
                //   seconds += second_i
                //   calories += calory_i
                //    time = minute+':'+seconds
                distance = new_des[j].distance;
            minute = new_des[j].minute;
            seconds = new_des[j].seconds;
            calories = new_des[j].calories
                time = minute+':'+seconds
              }
           }
           }
        return(
            <View style={styles.item}>
                
                <View style={styles.first_block}>
                   <View style={{flex:0.85,}}>
                   <Text style={styles.user_name}>{i.first_name}</Text>
                   <Text style={styles.user_detail}>Height - {i.height} feet | Weight - {i.weight} lbs</Text>
                   </View>
                   <View style={styles.icon_block}>
                       {i.winner_status == 'Winner' ? <Image source={require('../../assets/Vector.png')}/>: null}
                       {i.winner_status == 'Tie' ?<Image style={styles.tie_image}  source={require('../../assets/Icon_2.png')}/> : null} 
                      
                   </View>
                </View>
                <View style={styles.second_block}>

                </View>
                <View style={styles.third_block}>
                    <View>
                     {desc_status !== "" ? i.exercise_type !== 'Cardio' ? <Text style={styles.text_description}>{sets} Sets | {reps} Reps </Text>:
                       <Text style={styles.text_description}>{distance} Miles | {time} Hours | {calories} Calories</Text>
                       : <Text style={styles.text_description}>Not Completed</Text>} 
                    </View>
                    
                    <View>
                    {this.props.challenge_detail.swr == 1 && i.exercise_type !== 'Cardio' && desc_status !== ""?  <Text style={styles.text_description}>SWR - {i.swr_result}</Text> : null}

                    </View>
                    {desc_status !== "" ? <TouchableOpacity onPress={()=>this.openModal(i)} style={styles.detail_btn}>
                        <Text style={styles.detail_text}>Details</Text>
                    </TouchableOpacity>: null}
                </View>
            </View>
        )
    }
     render(){
     const  data = this.props.challenge_detail;
     const ii = this.state.current_user;
     var parse_i = [];
     if(ii.description != undefined){
        parse_i =   JSON.parse(ii.description)
     }
      console.log('challenge details',data)
    //  console.log('user data',this.props.user)
         return(
             <View style={styles.container}>
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
                        <View style={{flexDirection:'column',height:'auto', justifyContent:'space-around',alignItems:'flex-start' }}>
                        
                        {/* <Entypo name='sound-mix' size={24} color='#FFFFFF'/> */}
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.filter_text}>{ii.first_name}</Text>
                            {ii.winner_status == 'Tie' ? <Image source={require('../../assets/Icon_2.png')}/> : null}
                            {ii.winner_status == "Winner" ? <Image   source={require('../../assets/Vector.png')}/> : null}
                        </View>
                        <Text style={styles.user_detail}>Height - {ii.height}  feet | Weight - {ii.weight} lbs</Text>
                        </View>
                        {/* <View style={{width:width *(65/100)}}>

                        </View> */}
                        <TouchableOpacity 
                        
                        onPress={this.close_modal}
                    >
                        <AntDesign style={{width:'auto'}}  name='close' size={24} color='#FFFFFF'/>
                    </TouchableOpacity>
                    </View>
                    <View style={styles.exercise_head}>
                        <Text style={styles.text_description_1}>{this.props.challenge_detail.subcategory_name} Challenge</Text>
                        {this.props.challenge_detail.swr == 1 && this.state.category_type !== 'Cardio' ?  <Text style={styles.text_description_1}>SWR - {ii.swr_result}</Text> : null}
                    </View>
                    <View style={styles.modal_body}>
                        <FlatList
                        data={parse_i}
                        renderItem={(ii)=>this.render_detail(ii)}
                        keyExtractor={(item,index)=>index.toString()}
                        />
                        
                   
                         
                
                    </View>
                </CustomModal>
                 <View style={styles.main_user_block}>
                    <View>
                    <Text style={styles.created_by}>Created by {data.first_name}</Text>
                    <Text style={styles.created_by}>Date of Challenge - {data.exercise_date}</Text>
                    <Text style={styles.created_by}>Date of Expire - {data.expire_date}</Text>
                    </View>
                   {!data.expire_status && this.props.user.id == data.user_id ?  <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('challenge_created',
                    {challenge:this.state.challenge,
                     id:this.state.challenge_id,
                     category_type:this.state.category_type,
                     subcategory_id:this.state.subcategory_id,
                     exercise_date:this.state.exercise_date,
                     exercise_status:data.exercise_status
                    
            })}
                     style={styles.invite_btn}>
                        <Text style={styles.invite_text}>Invite</Text>
                   </TouchableOpacity> : null}
                </View>
                 <FlatList
                    data ={data.users}
                    renderItem={this.renderItem}
                 />
             </View>
         )
     }
}
const mapStateToProps = state => {
    const {JWT_Token, user} = state.auth
    const {challengeLoading,challengeError,challenge_detail} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,challenge_detail,user}
 
  }
  const mapDispatchToProps = {
    dispatchgetChallengeDetail:(jwt,id)=>getChallengeDetail(jwt,id),
    dispatchsetchallengeID:(id)=>setChallengeId(id)
   }
export default connect(mapStateToProps, mapDispatchToProps)(Challenge_Detail)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    item:{
        height:110,
        width:width-30,
        backgroundColor:'#262727',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:5,
        borderRadius:10,
        flexDirection:'column'

    },
    first_block:{
        flex:0.6,
        width:'90%',
        flexDirection:'row'
    },
    second_block:{
        height:2,
        width:'90%',
        backgroundColor:'rgba(255, 255, 255, 0.3)'
    },
    third_block:{
        flex:0.4,
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text_description:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: '#FFFFFF',
       // marginTop:5
    },
    text_description_1:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 15,
        color: '#FFFFFF',
        marginVertical:5
    },
    text_description_2:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.5)',
        marginVertical:4
    },
    user_name:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
        color: '#FFFFFF',
        marginTop:5
    },
    user_detail:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.5)',
        //marginTop:5,
        //marginBottom:5
    },
    main_user_block:{
        width:'90%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:10,

    },
    created_by:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.2,
        color: 'rgba(255, 255, 255, 0.3)'
    },
    invite_btn:{
        width:60,
        height:20,
        backgroundColor:'#ADF350',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    invite_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 10,
        lineHeight: 20,
        color: '#1F1F1F'

    },
    icon_block:{
        flex:0.15,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    detail_btn:{
        backgroundColor:'#ADF350',
        width:60,
        height:20,
        borderRadius:5,
        //marginVertical:5,
        justifyContent:'center',
        alignItems:'center'
    },
    detail_text:{
        fontFamily: 'Montserrat-Regular',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 20,
        color: '#1F1F1F'
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
        flex:0.15,
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
        marginRight:10
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
        position:'relative'
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
        height:1, 
        backgroundColor:'#1F1F1F'
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
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',
        paddingVertical:5,
        flex:0.7
       
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)',
        marginVertical:3,
        marginLeft:25,
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
        justifyContent:'space-around',
        alignItems:'center',
        height:50
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
    },
    detail_row:{
        width:width -20,
        flexDirection:'row',
        marginVertical:5
    },
    exercise_head:{
        flexDirection:'row',
        width:width-20,
        justifyContent:'space-between',
        marginVertical:10
    },
    tie_image:{
        width:30,
        height:40
    }
    
})
 