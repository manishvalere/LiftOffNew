import React, { Component } from 'react';
import { View, Text ,Image,ImageBackground, StyleSheet, ScrollView,Dimensions,RefreshControl} from 'react-native';
import Search_Box from '../../components/search_box';
import ScrollChallenge from '../../components/ScrollChallenge';
import Btn_continue from '../../components/Btn_continue';
import Compete_Head from '../../components/compet_head';
import { connect } from 'react-redux';
import { getCurrentChallenge , getPendingChallenge, getHistoryChallenge} from '../../actions/challenge';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class ChallengeMainScreen extends Component{
    onPress=()=>{
        this.props.navigation.navigate('create_challenge')
    }
    componentDidMount(){
        this.refresh();
    }
    refresh=()=>{
       // console.log('refresh is calling')
        this.props.dispatchgetCurrentChallenge(this.props.JWT_Token);
        this.props.dispatchgetPendingChallenge(this.props.JWT_Token);
        this.props.dispatchgetHistoryChallenge(this.props.JWT_Token);
    }
    componentDidUpdate(prevProps){
        if(prevProps.completeChallenge !== this.props.completeChallenge){
            //  console.log('cdu personal record', this.props.personal_record)
              //this.props.duspatchgetPersonalBest(this.state.category_type, this.props.JWT_Token)
              this.refresh()
          
          }
        if(prevProps.createChallenge !== this.props.createChallenge){
            if(this.props.createChallenge){
                this.refresh()
            }
        }
        if(this.props.pendingChange !== prevProps.pendingChange){
            if(this.props.pendingChange){
                this.refresh()
            }
        }
    }
    componentWillUnmount(){
       // console.log('component will mount is calling')
    }
    rendernodata=(data)=>{
        return(
            <View 
           
            style={styles.item_bloack}>
               
                   
               <Text style={styles.compet_text}>{data}</Text>
                  
                
            </View>
        )
    }
    render(){
       // console.log('current challemge compete screen', this.props.currentChallenges)
        return(
           
               <View style={styles.container}>
                   
                  <ImageBackground resizeMode='cover' style={styles.img} source={require('../../assets/challenge/challenge_home.png')}>
                 <View style={styles.img_block}>
                 
                      
                       {/* <Search_Box width='90%'  placeholder='Find your Challenge'/> */}
                       
                    </View>
               
                    </ImageBackground>
               
               
                <ScrollView 
                 refreshControl={
                    <RefreshControl
                    refreshing={this.props.challengeLoading}
                    onRefresh={this.refresh}
                    tintColor='white'
                    color='white'
                    progressBackgroundColor='white'
                    />
                  }
                contentContainerStyle={{justifyContent:'flex-start', alignItems:'center',}}>
                   
                    <View style={styles.scroll_block}>
                        <Compete_Head onPress={() => {
                
                
                        this.props.navigation.navigate('current_challenge', {
                        title:'Current Challenges'
                        
                        });
                         }} 
                        title='Current Challenges'/>
                         { this.props.currentChallenges  !== null && this.props.currentChallenges.length>0 ? <ScrollChallenge
                        navigation={this.props.navigation}
                        data={this.props.currentChallenges}
                        module='current'
                        />: this.rendernodata('No Current Challenges')}
                        

                        <Compete_Head 
                         onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            this.props.navigation.navigate('pending_challenge', {
                              title:'Pending Challenges'
                              
                            });
                          }}
                        title='Pending Challenges'/>
                        { this.props.pendingChallenges !== null && this.props.pendingChallenges.length>0 ? <ScrollChallenge
                        navigation={this.props.navigation}
                        data={this.props.pendingChallenges}
                        
                        module='pending'
                        />: this.rendernodata('No Pending Challenges')}

                        <Compete_Head 
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            this.props.navigation.navigate('history_challenge', {
                              title:'Challenge History'
                              
                            });
                          }}
                        title='Challenge History'/>
                        {this.props.hisoryChallenges !== null && this.props.hisoryChallenges.length>0  ? <ScrollChallenge
                        navigation={this.props.navigation}
                        data={this.props.hisoryChallenges}
                        module='history'
                        />: this.rendernodata('No Challenge History')}
                        
                    </View>
                
               
            </ScrollView>
            <View style={{width:windowWidth, height:80,justifyContent:'center', alignItems:'center' }}>
               <Btn_continue onPress={this.onPress} /*onPress={()=>this.props.navigation.navigate('find_friend')}*/ title='Create a Challenge'/>
            </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    
    const {challengeLoading,challengeError,currentChallenges, pendingChallenges,hisoryChallenges,completeChallenge, createChallenge,pendingChange} = state.challenge
    return { JWT_Token,challengeLoading,challengeError, currentChallenges,pendingChallenges,hisoryChallenges,completeChallenge,createChallenge,pendingChange}
 
  }
  const mapDispatchToProps = {
    dispatchgetCurrentChallenge:(jwt)=>getCurrentChallenge(jwt),
    dispatchgetPendingChallenge:(jwt)=>getPendingChallenge(jwt),
    dispatchgetHistoryChallenge:(jwt)=>getHistoryChallenge(jwt)
   }
  export default connect(mapStateToProps, mapDispatchToProps)(ChallengeMainScreen)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:83
    },
    scroll_block:{
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'yellow',
        //width:'100%',
        //flex:1
        //height:windowHeight-200
    },
    img_block:{
        height:windowHeight *(20/100),
        width:windowWidth,
        alignItems:'center'
    },
    img:{
        // width:'100%',
        // height:'100%',
        maxWidth:'100%',
        maxHeight:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
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
        position:'relative',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    compet_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: 0.5,

        color:'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular'
    },

    
    
})