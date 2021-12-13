import React, { Component } from 'react';
import { View, Text ,Image,ImageBackground, StyleSheet, ScrollView,Dimensions} from 'react-native';
import Search_Box from '../../components/search_box';
import ScrollChallenge from '../../components/ScrollChallenge';
import Btn_continue from '../../components/Btn_continue';
import Compete_Head from '../../components/compet_head';
import { connect } from 'react-redux';
import { getCurrentChallenge } from '../../actions/challenge';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class ChallengeMainScreen extends Component{
    onPress=()=>{
        this.props.navigation.navigate('create_challenge')
    }
    componentDidMount(){
        this.props.dispatchgetCurrentChallenge(this.props.JWT_Token)
    }
    render(){
        return(
           
               <View style={styles.container}>
                   
                  <ImageBackground resizeMode='cover' style={styles.img} source={require('../../assets/challenge/challenge_home.png')}>
                 <View style={styles.img_block}>
                 
                      
                       <Search_Box width='90%'  placeholder='Find your Challenge'/>
                       
                    </View>
               
                    </ImageBackground>
               
               
                <ScrollView contentContainerStyle={{justifyContent:'flex-start', alignItems:'center',}}>
                   
                    <View style={styles.scroll_block}>
                        <Compete_Head onPress={() => {
                
                
                        this.props.navigation.navigate('current_challenge', {
                        title:'Current Challenges'
                        
                        });
                         }} 
                        title='Current Challenges'/>
                        <ScrollChallenge/>

                        <Compete_Head 
                         onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            this.props.navigation.navigate('pending_challenge', {
                              title:'Pending Challenges'
                              
                            });
                          }}
                        title='Pending Challenges'/>
                        <ScrollChallenge/>

                        <Compete_Head 
                        onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            this.props.navigation.navigate('history_challenge', {
                              title:'History Challenges'
                              
                            });
                          }}
                        title='History Challenges'/>
                        <ScrollChallenge />
                    </View>
                
               
            </ScrollView>
            <View style={{width:windowWidth, height:80,justifyContent:'center', alignItems:'center' }}>
               <Btn_continue onPress={this.onPress} title='Create a Challenge'/>
            </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    
    const {challengeLoading,challengeError,} = state.challenge
    return { JWT_Token,challengeLoading,challengeError}
 
  }
  const mapDispatchToProps = {
    dispatchgetCurrentChallenge:(jwt)=>getCurrentChallenge(jwt)
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
      }

    
    
})