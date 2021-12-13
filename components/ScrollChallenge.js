import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions, TouchableOpacity } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { getCurrentChallenge, setChallengeId } from '../actions/challenge';

import { connect } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export  class ScrollChallenge extends Component{
    constructor(props){
        super(props);
    }
    onPressItem=(module, i, profile)=>{
      // console.log('module on press', i.description)
        if(module=='pending'){
            this.props.navigation.navigate('pending_challenge', {
                title:i.subcategory_name+' Challenge',
                id:i.id,
                category_type:i.exercise_type
            })
        }
        if(module=='current'){
            if(i.user_id == i.receiver_user_id){
                this.props.navigation.navigate('challenge_created',
                {challenge:i.subcategory_name,
                 id:i.id,
                 category_type:i.exercise_type,
                 subcategory_id:i.subcategory_id,
                 exercise_date:i.exercise_date,
                 detail:i.description
        }
                )
               
            }else{
                //console.log('udjdjkn', i.description)
                this.props.navigation.navigate('start_challenge',
                {title:i.subcategory_name+' Challenge',
                 id:i.id,
                 category_type:i.exercise_type,
                 history:false,
                 subcategory_id:i.subcategory_id,
                 exercise_date:i.exercise_date,
                 detail:i.description
        })
            }
            this.props.dispatchsetchallengeID(i.id)
        }
        if(module=='history'){
          //  console.log('modue histoey if')
            this.props.navigation.navigate('challenge_detail', {
                title:i.subcategory_name+' Challenge',
             id:i.challenge_id,
             category_type:i.exercise_type,
             history:true,
             history_record:i

            })
        }
    }
    renderItem=(item)=>{
    
        const i = item.item
        var sets =0, reps=0,weight=0, duration =0, distance=0, time,calories=0,  minute=0, seconds=0;
        
        //console.log('des',i )
        if(i.description !== null && i.description !== undefined ){
           if(this.props.module !== 'history'){
            if(i.exercise_type !== 'Cardio'){
                sets = i.description.sets;
                reps = i.description.reps;
                duration = i.description.duration
               }else{
                   distance = i.description.distance;
                   time = i.description.time;
                   duration = i.description.duration
               }
           }else if(this.props.module == 'history'){
              
            if(i.exercise_type !== 'Cardio'){
                // for(let j=0; j<i.description.length; j++){
                    
                // //     let set_i =parseInt(i.description[j].sets)
                // //     let reps_i =parseInt(i.description[j].reps)
                // //     let weight_i =parseInt(i.description[j].weight)
                // //    // let set_i =i.description[j].sets
                // //    sets += set_i;
                // //     reps += reps_i;
                // //     weight += weight_i
                   
                    
                // }
                sets = i.description.length;
                reps = i.description[0].reps
                
               }else{
                for(let j=0; j<i.description.length; j++){
                    
                    //     let ditance_i =parseInt(i.description[j].distance)
            //     let minute_i =parseInt(i.description[j].minute)
            //     let second_i =parseInt(i.description[j].seconds)
            //     let calory_i =parseInt(i.description[j].calories)
            //    // let set_i =i.description[j].sets
               
            //    distance += ditance_i;
            //    minute += minute_i;
            //    seconds += second_i
            //    calories += calory_i
          //  console.log('gdhwdhdh',i.description[j].calories )
            distance = i.description[j].distance;
            minute = i.description[j].minute;
            seconds = i.description[j].seconds;
            if(i.description[j].calories!== null){
                calories = i.description[j].calories
            }
                time = minute+':'+seconds
                }
               }
           }
        }
        return(

            <TouchableOpacity 

            onPress={()=>this.onPressItem(this.props.module, i, this.props.profile)} 
            style={styles.item_bloack}>
                <View style={styles.firstBlock}>
                   <View>
                   <Text style={styles.challenge_name}>{i.subcategory_name}</Text>
                   </View>
                   <View style={styles.bar_bloack}>
                       <Text style={styles.compet_text}>COMPETITORS</Text>
                       <View>
                           <Text>
                               <Text style={styles.percent_text}>{i.challenge_count}</Text>
                               <Text style={styles.percent_text_1}>/</Text>
                               <Text  style={styles.hundred}>100</Text>
                           </Text>
                       </View>
                       
                   </View>
                   <View style={styles.bar_line}>
                       <View style={{width:+i.challenge_count+'%',height:2, backgroundColor:'#ADF350'}}>
                          
                       </View>
                       
                     </View>
                   <View style={styles.seprator}>
                      <View style={styles.setBlock}>
                        <Text style={styles.sets_text}>
                        {i.exercise_type !== 'Cardio' ? 'SETS' : 'DISTANCE'}
                         </Text>
                         <Text style={styles.num}>
                             {i.exercise_type !== 'Cardio' ? sets : distance } {i.exercise_type !== 'Cardio' ? null : 'Miles' }
                         </Text>
                      </View>
                      <View style={styles.setBlock}>
                         <Text  style={styles.sets_text}>
                         {i.exercise_type !== 'Cardio' ? 'REPS' : 'TIME'}
                         </Text>
                         <Text style={styles.num}>
                         {i.exercise_type !== 'Cardio' ? reps : time}
                         </Text>
                      </View>
                      <View style={styles.setBlock_1}>
                      <Text  style={styles.sets_text}>
                      {this.props.module == 'history' ? i.exercise_type == 'Cardio' ? 'CALORIES': 'COMPLETED' : 'DURATION'}
                         </Text>
                         <Text style={styles.num}>
                         {this.props.module == 'history' ? i.exercise_type == 'Cardio' ? calories: null : duration+' Days'}
                         </Text>
                      </View>
                   </View>
                   {/* <View>
                       <Text style={styles.challenge_detail}>3 Sets | 5 Reps | 300 Lbs Weight</Text>
                   </View> */}
                   {/* <View style={styles.round_absolute}>
                  
        
                  </View>    */}
                </View>
               
                  
                
            </TouchableOpacity>
            
            
        )
    }
    render(){
        // if(this.props.data !== null && this.props.data !== undefined){
            return(
            <FlatList
                  data={this.props.data == null || this.props.data == undefined ? data :this.props.data}
                  keyExtractor={(item)=>item.challenge_id}
                  renderItem={this.renderItem}
                  horizontal={true}
                  //showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
            )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {challengeLoading,challengeError,currentChallenges} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,currentChallenges}
 
  }
  const mapDispatchToProps = {
    
    dispatchsetchallengeID:(id)=>setChallengeId(id)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(ScrollChallenge)
const styles = StyleSheet.create({
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
        width:windowWidth-90, 
        //height:windowHeight * (20/100), 
        backgroundColor:'#262727',
        marginLeft:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        position:'relative'
    },
    firstBlock:{
        flex:1,
        flexDirection:'column',
        // /justifyContent:'center',
        //marginLeft:10,
        marginTop:10
    },
    roundBlock:{
        flex:0.4,
        position:'relative'
    },
    seprator:{
        //height:1, 
        backgroundColor:'#262727',
        flexDirection:'row',
        borderTopColor:'#1F1F1F',
        borderTopWidth:1,
        flexDirection:'row',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    round_absolute:{
        position:'absolute',
        backgroundColor:'#ADF350',
        width:150,
        height:150,
        borderRadius:150/2,
        top:-20,
        right:-40,
        justifyContent:'center',
        alignItems:'center',
        opacity:0.1
       
    },
    challenge_name:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#FFFFFF',
        marginLeft:10,
        marginVertical:10,
        fontFamily:'Montserrat-Regular'
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)'
    },
    progress_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',

        color: 'rgba(173, 243, 80, 0.5)'
    },
    bar_bloack:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
        //marginBottom:5
    },
    compet_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0.5,

        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    },
    percent_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: '#ADF350',
        fontFamily:'Montserrat-Regular'
    },
    percent_text_1:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    },
    hundred:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 20,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    },
    bar_line:{
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        //opacity:0.3,
        height:2,
        
        marginHorizontal:10,
        marginBottom:10
    },
    setBlock:{
        width:'33%',
        height:40,
        borderRightColor:'#1F1F1F',
        borderRightWidth:1,
        justifyContent:'center'
    },
    setBlock_1:{
        width:'33%',
        height:40,
        justifyContent:'center',
        borderBottomLeftRadius:20
    },
    sets_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 11,
        lineHeight: 13,
        fontFamily:'Montserrat-Regular',
        letterSpacing: 0.3,

        color: 'rgba(255, 255, 255, 0.5)',
        marginLeft:10
    },
    num:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        fontFamily:'Montserrat-Regular',
        //letterSpacing: 0.3,

        color: '#FFFFFF',
        marginLeft:10
    }
})