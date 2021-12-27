import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity ,Platform,Image, ScrollView, ActivityIndicator,RefreshControl, Dimensions} from 'react-native';
import Constants from 'expo-constants'
import { logout,changeCount } from '../../actions';
import { connect } from 'react-redux';
import {MaterialCommunityIcons,Feather,FontAwesome} from 'react-native-vector-icons';

import Compete_Head from '../../components/compet_head';
import ScrollChallenge from '../../components/ScrollChallenge';
import PersonalBest_Comp from '../../components/personal_best_comp';
import {showImagePicker,launchCamera,launchImageLibrary} from "react-native-image-picker"
import { setProfileImage ,getHistoryChallenge,getPersonalBest,getCompleteChallenges, getGymPartner} from '../../actions';
import {Toast, Root} from 'native-base';
const windowWidth = Dimensions.get('window').width;
export class ProfileScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
          filepath: {
            data: '',
            uri: ''
          },
          fileData: '',
          fileUri: ''
        }
      }
    componentDidMount(){
        //this.interval = setInterval(() => this.props.dispatchgetRefreshToken(this.props.JWT_Token), 30000);
       this.refresh()
    }
    // componentWillUnmount() {
    //     clearInterval(this.interval);
    //   }
    refresh=()=>{
        this.props.dispatchgetHistoryChallenge(this.props.JWT_Token);
        this.props.dispatchgetPersonalBest(this.props.JWT_Token);
        this.props.dispatchgetCompletedChallenges(this.props.JWT_Token)
        this.props.dispatchgetGymPartner(this.props.JWT_Token);
    }
    componentDidUpdate(prevProps){
        if(this.props.profile_img_error != prevProps.profile_img_error){
            if(this.props.profile_img_error){
                return Toast.show({
                    text: "Something went wrong!",
                    textStyle: { color: "red" },
                    //buttonText: "Okay",
                    //type: "success",
                    duration:5000
                });
            }   
        }
    }
    logout_=()=>{
       // console.log('logour is calling')
        this.props.dispatchLogout()
    }
    count_increment=()=>{
        this.props.dispatchIncriment(40)
    }
    launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
            includeBase64:true
          },
        };
        launchImageLibrary(options, (response) => {
        //  console.log('Response image gallery = ', response);
    
          if (response.didCancel) {
           // console.log('User cancelled image picker');
          } else if (response.error) {
           // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
          //  console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
           // console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri:response.uri
            });
            this.props.dispatchsetProfileImage(this.props.JWT_Token,response)
          }
        });
    
      }
      renderFileUri() {
      //  console.log('this file data in function',this.state.fileUri, this.props.profileLoading )
        if(this.props.authLoading){
            return(
                <View style={styles.profile_pic_1}>
            <ActivityIndicator size='small' color='white' />
            </View>
            )
        }else
        if(this.props.user !== null){
            var   user = this.props.user
            //console.log('user picture', this.props.image_url+'/'+user.picture)
           if(user.picture !== null){
            
            return <Image
            source={{ uri:this.props.image_url+'/'+user.picture }}
            style={styles.profile_pic}
          />
           }else{
            return <Image
            source={require('../../assets/profile_new.png')}
            style={styles.profile_pic}
          />
           }
         
        }  if(this.props.authLoading){
            return(
                <View style={styles.profile_pic}>
            <ActivityIndicator size='small' color='white' />
            </View>
            )
        }else{
          return <Image
            source={require('../../assets/profile_new.png')}
            style={styles.profile_pic}
          />
        }
      }
    render(){
      //  console.log('route props in profile', this.props.image_url)
        //console.log('hello', this.props.user)
        var won =0 , lose = 0, complete = 0; tie=0
       // console.log('this.props.completedChallenge.wonchallenge',this.props.completedChallenge.wonchallenge)
       // console.log('this props', this.props.completedChallenge)
       
        if(this.props.completedChallenge.wonchallenge !== undefined && this.props.completedChallenge.losschallenge !== undefined && this.props.completedChallenge.completedchallenge !== undefined){
         won = this.props.completedChallenge.wonchallenge.length;
         lose = this.props.completedChallenge.losschallenge.length;
         complete = this.props.completedChallenge.completedchallenge.length;
         tie = this.props.completedChallenge.tiechallenge !== undefined ? this.props.completedChallenge.tiechallenge.length : 0
        }
    
        if(this.props.user !== null){
          var   user = this.props.user
        }
        return(
            <View style={styles.container}>
                <View style={styles.first_block}>
                    <View style={styles.title_block}>
                        <View>
                        <Feather style={styles.more_icon} name='settings' size={18} color = '#FFFFFF' onPress={()=>this.props.navigation.navigate('setting')}/>
                        </View>
                        <View>
                        <Text style={styles.title_text}>
                            Profile
                        </Text>
                        </View>
                        <View>
                        
                        <TouchableOpacity 
                        style={styles.more_icon_1} 
                       
                        onPress={()=>this.props.navigation.navigate('edit_profile')}
                        >
                            <Text style={styles.title_text}>Edit</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.name_block}>
                        <View style={styles.name_1}>
                            <View style={styles.profile_pic_block}>
                                
                            {this.renderFileUri()}
                            <TouchableOpacity style={styles.pencil} onPress={this.launchImageLibrary} >
                                <FontAwesome name='pencil-square-o' size={24} color='white'/>
                            </TouchableOpacity>
                            </View>
                            
                            <View style={styles.profile_detail_block}>
                                <View>
                                    <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
                                </View>
                                <View style={styles.three_block}>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Friend')} style={{backgroundColor:'#ADF350',alignItems:'center', paddingHorizontal:10,paddingVertical:5, borderRadius:6}}>
                                    <Text style={styles.number}>
                                        {this.props.gym_partner.gym_partner}
                                    </Text>
                                    <Text style={styles.gym_text}>
                                    Gym Friends
                                    </Text>
                                </TouchableOpacity>
                                {/* <View style={styles.horizontal}></View> */}
                                <TouchableOpacity style={{backgroundColor:'#ADF350',alignItems:'center', paddingHorizontal:10,paddingVertical:5, borderRadius:6}}>
                                    <Text style={styles.number}>
                                       {this.props.gym_partner.created_challenge}
                                    </Text>
                                    <Text style={styles.gym_text}>
                                    Created Challenges
                                    </Text>
                                </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.4,flexDirection:'row',justifyContent:'center', alignItems:'center', marginHorizontal:20}}>
                             <View style={{flex:0.2}}>
                                
                             </View>
                             <View style={{flex:0.8,flexDirection:'row',justifyContent:'space-between', marginHorizontal:20}}>
                                <TouchableOpacity
                                style={styles.achievement_btn}
                                onPress={()=>this.props.navigation.navigate('Achivements')}
                                >
                                    <Text style={styles.btn_text}>Achievements</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                style={styles.achievement_btn}
                                onPress={()=>this.props.navigation.navigate('Leaderboard')}
                                >
                                    <Text style={styles.btn_text}>Leaderboard</Text>
                                </TouchableOpacity>
                             </View>
                        </View>
                       
                    </View>
                </View>
                <View  style={styles.second_block}>
                    <ScrollView
                    refreshControl={
                        <RefreshControl
                        refreshing={this.props.profileLoading}
                        onRefresh={this.refresh}
                        tintColor='white'
                        color='white'
                        progressBackgroundColor='white'
                        />
                      }
                    >
                    <View style={styles.age_block}>
                        <View>
                            <Text style={styles.info_head}>
                                Age
                            </Text>
                            <Text style={styles.info_text}>
                                {user.dob}
                               
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.info_head}>
                                Height
                            </Text>
                            <Text style={styles.info_text}>
                                {user.height}
                            </Text>
                       </View>
                       <View>
                            <Text style={styles.info_head}>
                                Weight
                            </Text>
                            <Text style={styles.info_text}>
                               {user.weight} Lbs
                            </Text>
                        </View>

                    </View>
                    
                    <View style={styles.challenge_block}>
                        <View>
                        <View style={styles.challenge_complete}>
                            <Text style={styles.challenge_count_text}>{complete}</Text>
                            <Text style={styles.challenge_count_text}>Challenges Completed</Text>
                        </View>
                        </View>
                        <View style={{flexDirection:'row', marginTop:10}}>
                        <View  style={styles.win}>
                            <Text style={styles.challenge_count_text}>{won}</Text>
                            <Text style={styles.challenge_count_text}>Wins</Text>
                        </View>
                        <View style={styles.lose}>
                            <Text style={styles.challenge_count_text}>{lose}</Text>
                            <Text style={styles.challenge_count_text}>Losses</Text>
                        </View>
                        <View style={styles.lose}>
                            <Text style={styles.challenge_count_text}>{tie}</Text>
                            <Text style={styles.challenge_count_text}>Ties</Text>
                        </View>
                        </View>
                    </View>
                    <View style={styles.history_block}>
                        <View style={{marginLeft:10}}>
                        <Compete_Head onPress={()=>this.props.navigation.navigate('history', {title:'Challenge History'})} title='Challenge History'/>
                        </View>
                        <ScrollChallenge
                        navigation={this.props.navigation}
                        data={this.props.hisoryChallenges}
                        module='history'
                        profile={true}
                        />
                    </View>
                    {/* <View style={styles.personal_block}>
                    <View style={{marginLeft:10}}>
                        <Compete_Head onPress={()=>this.props.navigation.navigate('personal_best')} title='Personal Best'/>
                        </View>
                        <PersonalBest_Comp data = {this.props.personal_best}/>
                    </View> */}
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn, JWT_Token,profile_img_error,image_url,authLoading} = state.auth
    const {count} = state.count
    const {hisoryChallenges}= state.challenge
    const {personal_best,profileLoading,completedChallenge,gym_partner} =state.profile
    
   return {user,isLoggedIn ,count,JWT_Token,hisoryChallenges,profile_img_error,image_url,personal_best,profileLoading,authLoading,completedChallenge,gym_partner}
}

const mapDispatchToProps = {
  dispatchLogout: () => logout(),
  dispatchIncriment: (count) => changeCount(count),
  dispatchsetProfileImage: (jwt, image) => setProfileImage(jwt,image),
  dispatchgetHistoryChallenge:(jwt)=>getHistoryChallenge(jwt),
  dispatchgetPersonalBest:(jwt)=>getPersonalBest(jwt),
  dispatchgetCompletedChallenges: (JWT) => getCompleteChallenges(JWT),
  dispatchgetGymPartner:(jwt) => getGymPartner(jwt)
 // dispatchgetRefreshToken:(jwt)=>getRefreshtoken(jwt)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        //alignItems:'center', 
        marginBottom:83,
        paddingTop:Platform.OS === 'ios' ? Constants.statusBarHeight: 0 ,
        backgroundColor:'#262727'
    },
    first_block:{
        flex:0.3,
        
    },
    second_block:{
        flex:0.7,
        backgroundColor:'#1F1F1F',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        
        justifyContent:'space-between'
    },
    title_block:{
        flex:0.3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginTop:Platform.OS === 'ios' ? 15 : 0 ,

    },
    name_block:{
        flex:0.7
    },
    title_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular'
        
    },
    more_icon:{
        paddingLeft:14
    },
    more_icon_1:{
        paddingRight:10
    },
    profile_pic_block:{
        flex:0.2,
        width:76,
        height:76,
        borderRadius:76/2,
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    profile_detail_block:{
        flex:0.8, 
        marginHorizontal:20,
        height:25
    },
    profile_pic:{
        width:76, 
        height:76, 
        borderRadius:76/2,
        borderColor:'#FFFFFF',
        borderWidth:0.5
        //position:'relative'
    },
    profile_pic_1:{
        width:76, 
        height:76, 
        borderRadius:76/2,
        borderColor:'#FFFFFF',
        borderWidth:0.5,
        justifyContent:'center',
        alignItems:'center'
        //position:'relative'
    },
    name_1:{
        flex:0.6, 
        flexDirection:'row', 
        marginHorizontal:20,
        
    },
    name:{
        fontSize:18,
        fontStyle:'normal',
        fontWeight:'600',
        lineHeight:22,
        letterSpacing:0.2,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Bold'
        //fontFamily: "Montserrat"
    },
    number:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 22,
        color: '#1F1F1F',
        fontFamily:'Montserrat-Regular'
    },
    three_block:{
        height:50,
        marginVertical:10, 
        flexDirection:'row',
        justifyContent:'space-between'
    },
    gym_text:{
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 14,
        fontWeight:'bold',
        color: '#1F1F1F',
        opacity: 0.8,
        fontFamily:'Montserrat-Regular'
    },
    horizontal:{
        width:0.25, 
        height:40,
        marginHorizontal:10, 
        backgroundColor:'#FFFFFF',
        opacity:0.6
    },
    achievement_btn:{
        width: windowWidth * (30/100),
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 50, 
        justifyContent:'center',
        alignItems:'center'
    },
    btn_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        color: '#262727',
        fontFamily:'Montserrat-Regular'
    },
    age_block:{
        flex:1,
        flexDirection:'row',
        marginVertical:10,
        marginHorizontal:20,
        borderBottomWidth:0.5, 
        borderBottomColor:'rgba(255, 255, 255, 0.3)',
        justifyContent:'space-between',
        height:50

    },
    challenge_block:{
        flex:2,
        flexDirection:'column',
        marginVertical:10,
        marginHorizontal:20
    },
    history_block:{
        flex:3,
        //marginLeft:10,


    },
    personal_block:{
        flex:4,
       
    },
    challenge_complete:{
        flex:1,
        height:70,
        marginHorizontal:5,
        //marginRight:10,
        borderRadius:10, 
        backgroundColor:'#ADF350', 
        justifyContent:'center',
        alignItems:'center'
    },
    win:{
        flex:1,
        height:70,
        marginHorizontal:5,
        //marginRight:10,
        borderRadius:10, 
        backgroundColor:'#ADF350',
        justifyContent:'center',
        alignItems:'center'
    },
    lose:{
        flex:1,
        height:70,
        marginHorizontal:5,
        borderRadius:10, 
        backgroundColor:'#ADF350',
        justifyContent:'center',
        alignItems:'center'
    },
    challenge_count_text:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 20,
        color: '#1F1F1F',
        fontFamily:'Montserrat-Regular'

    },
    info_head:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 0.8,
        fontFamily:'Montserrat-Regular'
    },
    info_text:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 21,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    pencil:{
        position:'absolute',
        bottom:0,
        right:-10
    }

})