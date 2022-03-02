import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions, TouchableOpacity,RefreshControl } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { connect } from 'react-redux';
import { getHistoryChallenge,setChallengeId } from '../../actions/challenge';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = ['1', '2','3','4','5','6','7','8','9' ]
export  class HistoryChallenge extends Component{
    componentDidMount=()=>{
        // this.changeTitleText
       const { title } = this.props.route.params;
       this.props.navigation.setOptions({ title: title });
      // this.refresh()
     }
     refresh=()=>{
         
        this.props.dispatchgetHistoryChallenge(this.props.JWT_Token)
     }
     movetoChallenge_detail=(i)=>{
         console.log('ehidh',i)
        this.props.dispatchsetchallengeID(i.challenge_id);
        this.props.navigation.navigate('challenge_detail',
        {
         title:i.subcategory_name+' Challenge',
         id:i.challenge_id,
         category_type:i.exercise_type,
         history:true,
         history_record:i,
         subcategory_id:i.subcategory_id,
         exercise_date:i.exercise_date
} 
        )
       
     }
     renderItem=(item)=>{

       // console.log('item challenge', item)
        const i = item.item
        var sets = 0, reps =0, weight =0, distance =0, time =0, calories= 0 ,minute=0, seconds=0;
        
        //console.log('des',i.subcategory_name,i.exercise_type,i.description )
        if(i.description !== null && i.description !== undefined){
           if(i.exercise_type !== 'Cardio'){
            for(let j=0; j<i.description.length; j++){
                    
                sets = i.description.length;
                reps = i.description[0].reps
               
                
            }
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
            
            distance = i.description[j].distance;
            minute = i.description[j].minute;
            seconds = i.description[j].seconds;
            calories = i.description[j].calories
                time = minute+':'+seconds
           }
        }
        }
        return(
            
            <TouchableOpacity 
            onPress={()=> this.movetoChallenge_detail(i)} 
            style={styles.item_bloack}>
                <View style={styles.firstBlock}>
                   <View>
                   <Text style={styles.challenge_name}>{i.subcategory_name}</Text>
                   </View>
                   <View style={styles.seprator}>

                   </View>
                   <View>
                       {i.exercise_type !== 'Cardio' ? <Text style={styles.challenge_detail}>{sets} Sets | {reps} Reps | COMPLETED</Text>:
                       <Text style={styles.challenge_detail}>{distance} Miles | {time} Hours | {calories} Calories</Text>
                       }
                       
                   </View>
                </View>
               
                  
                <View style={styles.round_absolute}>
                    {/* <View  style={styles.round_width}> */}
                        <ProgressCircle
                            percent={i.challenge_count}
                            radius={40}
                            borderWidth={8}
                            color="#ADF350"
                            shadowColor="#3b3b3b"
                            bgColor="#262727"
                        >
                            
                    <Text style={styles.progress_text}>{i.challenge_count}</Text>
                </ProgressCircle>
        {/* </View> */}
                </View>    
            </TouchableOpacity>
            
            
        )
    }
    emptycomp=()=>{
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#ADF350', fontFamily:'Montserrat-Regular', fontSize:16, marginTop:15}}>No History Challenges!</Text>
            </View>
        )
    }
    render(){
       // console.log('history', this.props.hisoryChallenges)
        return(
            
                <FlatList
                  data={this.props.hisoryChallenges}
                  keyExtractor={(item,index)=>item.challenge_id}
                  renderItem={this.renderItem}
                  style={styles.container}
                  //horizontal={true}
                  //showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={this.emptycomp}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.props.challengeLoading}
                      onRefresh={this.refresh}
                      tintColor='white'
                      color='white'
                      progressBackgroundColor='white'
                      
                    />
                  }
                />
            
            
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {challengeLoading,challengeError,hisoryChallenges} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,hisoryChallenges}
 
  }
  const mapDispatchToProps = {
    dispatchgetHistoryChallenge:(jwt)=>getHistoryChallenge(jwt),
    dispatchsetchallengeID:(id)=>setChallengeId(id)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(HistoryChallenge)
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:83
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
        width:'95%', 
        height:81, 
        backgroundColor:'#262727',
        marginHorizontal:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        position:'relative'
    },
    firstBlock:{
        flex:0.6,
        flexDirection:'column',
        justifyContent:'space-around',
        marginLeft:10,
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
        fontFamily:'Montserrat-Regular'
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    },
    progress_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',

        color: 'rgba(173, 243, 80, 0.5)'
    }
})