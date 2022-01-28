import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity,Dimensions,FlatList,Image ,ActivityIndicator,RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { getRefreshtoken } from '../../actions';
import  {getMaincategory,setMaincategoryNull } from '../../actions/fitness';
import FitnessHeader from '../../components/fitnessHeader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import messaging from '@react-native-firebase/messaging';
import Btn_continue from '../../components/Btn_continue';
const data = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
export class MyFitnessHome extends Component{
    
    componentDidMount(){
   // console.log('fitness home cdm is calling ')
       this.refresh();
       messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        if(remoteMessage.data.screen == 'challenge_detail'){
            const data_ = remoteMessage.data.detail
            this.props.navigation.navigate('Compete', { screen: 'challenge_detail', params:{
                title:data_.title,
            id:data_.id,
            category_type:data_.category_type,
            history:true,
            //history_record:i,
            subcategory_id:data_.subcategory_id,
            exercise_date:data_.exercise_date} })
        }else if(remoteMessage.data.screen == 'challenge'){
            this.props.navigation.navigate('Compete')
        }else if(remoteMessage.data.screen == 'pending'){
            this.props.navigation.navigate('Compete',{screen: 'pending_challenge', param:{
                title:'Pending Challenges'
            }})
        }else if(remoteMessage.data.screen == 'friend'){
            this.props.navigation.navigate('Friend');
        }else if(remoteMessage.data.screen == 'complete'){
            this.props.navigation.navigate('Compete',{screen: '', param:{
                title:data_.title,
                id:data_.id,
                category_type:data_.exercise_type,
                exercise_date:data_.exercise_date,
                detail:data_.description,
                history:false,
                subcategory_id:data_.subcategory_id,
            }})
        //setInitialRoute('Compete');
       // navigation.navigate(remoteMessage.notification.type);
      }});
       // this.interval = setInterval(() => this.props.dispatchgetRefreshToken(this.props.JWT_Token), 30000);
      
      
    }
    componentWillUnmount() {
        this.props.distachsetMaincategoryNull()
      }
    refresh=()=>{
       // console.log('refresh is calinng')
        this.props.dispatchgetMaincategory(this.props.JWT_Token);
    }
    EmptyListMessage=()=>{
        return(
            
                <View style={styles.container}>
                    <Text style={styles.emptyListStyle}>Something went wrong!</Text>
                </View>
            
        )
    }
    renderfitnessCategory=(item)=>{
        // console.log('item at fitenes',item)
        // console.log('image',this.props.image_url)
        const image = this.props.image_url+'/'+item.item.category_image
      return(
        <TouchableOpacity 
        // onPress={()=>this.props.navigation.navigate('fitnes_sub',{
        //     title: item,
        //   })}  
        onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('fitnes_sub', {
              title:item.item.category_name,
              id:item.item.id
              
            });
          }}
          style={styles.blocks}>
           <View style={styles.image_block}>
            {/* <Image
            source={require('../../assets/icon.png')}
            style={{width: '90%', height: '90%', }}
          /> */}
                <Image
                    style={styles.tinyLogo}
                    source={{uri: image}}
                />
           </View>
           <Text style={styles.home_title_text}>{item.item.category_name}</Text>
        </TouchableOpacity>
      )
    }
    onTimerPress=()=>{
        this.props.navigation.navigate('personal_best',{cat_id:'',sub_id:'',specific:false})
    }
    settingPress=()=>{
        this.props.navigation.navigate('setting')
    }
    render(){
       // console.log('user', this.props.user)
        
        return(
            <View  style={styles.container}>
                <FitnessHeader onSettingPress={this.settingPress} title='My Fitness' onPress={this.onTimerPress}/>
                <View style={styles.page_heading}>
                    <Text style={styles.heading}>Choose Workout Category</Text>
                </View>
                {/* <Btn_continue title="Test" onPress={()=> this.props.navigation.navigate('Compete', { screen: 'challenge_detail', params:{
            title:' Challenge',
        id:'10',
        category_type:'All',
        history:true,
        //history_record:i,
        subcategory_id:'2',
        exercise_date:'10-11-2021'},
        initial: false,
     })
        //setInitialRoute('Compete');
       // navigation.navigate(remoteMessage.notification.type);
      }/> */}
                <View style={styles.mainContainer}>
                <View style={{flexDirection:'row'}}>
                    {
                        this.props.fitLoading ? <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                        <ActivityIndicator size='large' color='white'/>
                      </View> :
                       <FlatList
                       data={this.props.main_category}
                       renderItem={this.renderfitnessCategory}
                       numColumns={3}
                       keyExtractor={(item)=>item.id}
                       //inverted={true}
                       ListEmptyComponent={this.EmptyListMessage}
                       refreshControl={
                        <RefreshControl
                          refreshing={this.props.fitLoading}
                          onRefresh={this.refresh}
                          tintColor='white'
                          color='white'
                          progressBackgroundColor='white'
                         
                        />
                      }
            
                       />
                    }
                  
                </View>
                </View>
            </View>
        )
                
    }
}
const mapStateToProps = state => {
    const {JWT_Token,user} = state.auth
    const {fitLoading, image_url,main_category,fitError} = state.fitness
   return { JWT_Token,fitLoading, image_url,main_category,fitError,user}
  }
  const mapDispatchToProps = {
    dispatchgetMaincategory: (token) => getMaincategory(token),
    distachsetMaincategoryNull:() => setMaincategoryNull()
   // dispatchgetRefreshToken:(jwt)=>getRefreshtoken(jwt)
   }
export default connect(mapStateToProps,mapDispatchToProps)(MyFitnessHome);
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'column',
        marginBottom:83
    },
    page_heading:{
        flex:0.07,
        alignItems:'center',
        justifyContent:'center'
    },
    heading:{
        fontSize:16,
        fontWeight:'500',
        fontStyle:'normal',
        lineHeight:20,
        color:'#ADF350',
        fontFamily:'Montserrat-Regular'
        // fontFamily:'Montserrat-Medium'
    },
    mainContainer:{
        flex:0.93
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        maxWidth:'100%',
        maxHeight:'100%',
      },
    blocks:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        borderRadius:10
    },
    image_block:{
        backgroundColor:'#262727',
        width:windowWidth * (28/100),
        height:120, 
        justifyContent:'center',
        alignItems:'center', 
        margin:10,
        borderRadius:10
    } ,
    home_title_text:{
        color:'#FFFFFF',
        fontSize:14,
        fontWeight:'500',
        lineHeight:17,
        fontFamily:'Montserrat-Regular'
    } ,
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        color:'rgba(173, 243, 80, 0.5)'
      },

})