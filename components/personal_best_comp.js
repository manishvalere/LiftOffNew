import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
const data = ['1', '2','3', '4']
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class PersonalBest_Comp extends Component{
    renderpersonalText=(item)=>{
        // console.log('item in ipersonal', item)
              if(this.props.personal_record.exercise_type !== 'Cardio'){
                  return(
              
                      <Text key={item.index} style={styles.persnal_text}>{item.item.Sets} Sets | {item.item.Reps} Reps | {item.item.Weight} lbs Weight</Text>
                  )
              }else{
                  return(
                      <Text key={item.index} style={styles.persnal_text}>{item.item.Distance} Miles  | {item.item.Minute} : {item.item.Seconds} Hour | {item.item.Calories} Calories</Text>
                  )
              }
      
            
        }
    personalRecord = (item)=>{
        
        return(
            <Text style={styles.challenge_detail}>3 Sets | 5 Reps | 300 Lbs Weight</Text>
        )
    }
    renderDes=(i,index ,ii)=>{
        console.log('iiiii', i)
        if(ii.exercise_type == 'All'){
                                
            return(
        
                <Text key={index} style={styles.challenge_detail}>{i.item.Sets} Sets | {i.item.Reps} Reps | {i.item.Weight} lbs Weight</Text>
            )
        }else{
            return(
                <Text key={index} style={styles.challenge_detail}>{i.item.Distance} Miles  | {i.item.Minute} : {i.item.Seconds} Hour | {i.item.Calories} Calories</Text>
            )
        }
    }
    renderItem=(item)=>{
        const ii= item.item
       const personal_data = ii.description ?? []
      // console.log('personal data', personal_data)
        return(
            
            <View style={styles.item_bloack} key={item.index}>
                {/* <View style={styles.firstBlock}> */}
                   <View style={styles.head_bloack}>
                   
                   <Text style={styles.challenge_name}>{ii.subcategory_name}</Text>
                   
                   <Text style={styles.date_text}>{ii.exercise_date}</Text>
                   </View>
                   <View style={styles.seprator}>

                   </View>
                   <View style={{height:69, marginTop:5}}>
                   {/* {
                       JSON.parse(personal_data).map((i, index)=>{
                       
                        if(ii.exercise_type == 'All'){
                                
                            return(
                        
                                <Text key={index} style={styles.challenge_detail}>{i.Sets} Sets | {i.Reps} Reps | {i.Weight} lbs Weight</Text>
                            )
                        }else{
                            return(
                                <Text key={index} style={styles.challenge_detail}>{i.Distance} Miles  | {i.Minute} : {i.Seconds} Hour | {i.Calories} Calories</Text>
                            )
                        }
                        
                       })
                   } */}
                   <FlatList
                   data={JSON.parse(personal_data)}
                   renderItem={(i, index)=>this.renderDes(i,index, ii)}
                   showsVerticalScrollIndicator={true}
                   keyExtractor={(item,index)=>index.toString}
                   />
                   </View>
                       {/* <FlatList
                       data={JSON.parse(personal_data)}
                       renderItem={this.personalRecord}
                       keyExtractor={(item,index)=>index.toString}
                       /> */}
                   
                {/* </View> */}
                  
            </View>
            
            
        )
    }
    rendernodata=()=>{
        return(
            <View 
           
            style={styles.item_bloack}>
               
                   
               <Text style={styles.compet_text}>No Record For This Exercise</Text>
                  
                
            </View>
        )
    }
    render(){
        return(
            
                <FlatList
                  data={this.props.data}
                    //keyExtractor={(item)=>item.id.toString()}
                  renderItem={this.renderItem}
                  horizontal={true}
                  ListEmptyComponent={this.rendernodata()}
                  //showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                />
            
            
        )
    }
}
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
        width:windowWidth-70, 
        height:120, 
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
    firstBlock:{
        flex:1,
       
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
        marginLeft:15,
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
    compet_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.5,
        textAlign:'center',
        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    },
})