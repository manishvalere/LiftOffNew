import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions,RefreshControl, TouchableOpacity,ActivityIndicator } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import { connect } from 'react-redux';
import { getCurrentChallenge, setChallengeId } from '../../actions/challenge';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {MaterialIcons} from 'react-native-vector-icons';

export  class MyChallenge extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false
        }
    }
    componentDidMount=()=>{
    //     const { title } = this.props.route.params;
    //    this.props.navigation.setOptions({ title: title });
       this.refresh()
     }
     refresh=()=>{
         
        this.props.dispatchgetCurrentChallenge(this.props.JWT_Token)
     }
    oncurrentpress=(i)=>{
        if(i.user_id == i.receiver_user_id){
            this.props.navigation.navigate('challenge_created',
            {challenge:i.subcategory_name,
             id:i.id,
             category_type:i.exercise_type,
             exercise_date:i.exercise_date,
             detail:i.description,
             history:false,
             subcategory_id:i.subcategory_id,
    }
            )
        }else{
            this.props.navigation.navigate('start_challenge',
            {title:i.subcategory_name+' Challenge',
             id:i.id,
             category_type:i.exercise_type,
             exercise_date:i.exercise_date,
             detail:i.description,
             history:false,
             subcategory_id:i.subcategory_id,
    })
        }
        
        this.props.dispatchsetchallengeID(i.id)
    }
    renderItem=(item)=>{

       // console.log('item challenge', item)
        const i = item.item
        var sets, reps, weight, distance, time, calories, duration
        if(i.receiver_user_id == i.user_id){
            if(i.description !== null && i.description !== undefined){
                if(i.exercise_type !== 'Cardio'){
                 sets = i.description.sets;
                 reps = i.description.reps;
                 duration = i.description.duration
                }else{
                    distance = i.description.distance;
                    time = i.description.time;
                    duration = i.description.duration
                }
             }
             return(
                 
                 <TouchableOpacity 
                 onPress={()=>this.oncurrentpress(i)} 
                 style={styles.item_bloack}>
                     <View style={styles.firstBlock}>
                        <View>
                        <Text style={styles.challenge_name}>{i.subcategory_name}</Text>
                        </View>
                        <View style={styles.seprator}>
     
                        </View>
                        <View>
                            {i.exercise_type !== 'Cardio' ? <Text style={styles.challenge_detail}>{sets} Sets | {reps} Reps | {duration} Days</Text>:
                            <Text style={styles.challenge_detail}>{distance} KM | {time} Hour | {duration} Days</Text>
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
        }else{
            return null
        }
        //console.log('des',i.subcategory_name,i.exercise_type,i.description )
        
    }
    emptycomp=()=>{
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#ADF350', fontFamily:'Montserrat-Regular', fontSize:16, marginTop:15}}>No Current Challenges!</Text>
            </View>
        )
    }
    render(){
        //console.log('this.props.currentChallenges',this.props.currentChallenges)
        if(this.props.challengeLoading){
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                <ActivityIndicator size='large' color='white'/>
              </View>
            )
        }else{
        return(
            <View style={styles.container}> 
                <FlatList
                  data={this.props.currentChallenges}
                  keyExtractor={(item)=>item.id.toString()}
                  renderItem={(item)=>this.renderItem(item)}
                  ListEmptyComponent={this.emptycomp}
                  showsHorizontalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.loading}
                      onRefresh={this.refresh}
                      tintColor='white'
                      color='white'
                      progressBackgroundColor='white'
                      
                    />
                  }
                />
                
            </View>

        )
    }}
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {challengeLoading,challengeError,currentChallenges} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,currentChallenges}
 
  }
  const mapDispatchToProps = {
    dispatchgetCurrentChallenge:(jwt)=>getCurrentChallenge(jwt),
    dispatchsetchallengeID:(id)=>setChallengeId(id)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(MyChallenge)
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:83,
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

        color: 'rgba(173, 243, 80, 0.5)',
        fontFamily:'Montserrat-Regular'
    },
    icon_block:{
       
        backgroundColor:'#ADF350',
        width:20,
        height:20,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        margin:5
    },
})