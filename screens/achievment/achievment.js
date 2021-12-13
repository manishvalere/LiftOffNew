import React, { Component } from 'react';
import { View, Text , StyleSheet, ScrollView,Dimensions} from 'react-native';

import { connect } from 'react-redux';
import Compete_Head from '../../components/compet_head';
import Achievement_Comp from '../../components/achievment_comp';
import { getCompleteChallenges } from '../../actions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export class AchievmentMainScreen extends Component{
    componentDidMount(){
        this.props.dispatchgetCompletedChallenges(this.props.JWT_Token)
    }
    render(){
        var won ='Won Challenges | 0'  , lose = 'Lost Challenges | 0', complete = 'Challenges Completed | 0'; tie = 'Tie Challenges | 0'
        //console.log('this.props.completedChallenge.wonchallenge',this.props.completedChallenge.wonchallenge)
       // console.log('this props', this.props.completedChallenge)
        if(this.props.completedChallenge.wonchallenge !== undefined && this.props.completedChallenge.losschallenge !== undefined && this.props.completedChallenge.completedchallenge !== undefined){
         won = 'Won Challenges | '+this.props.completedChallenge.wonchallenge.length;
         lose = 'Lost Challenges | '+this.props.completedChallenge.losschallenge.length;
         complete = 'Challenges Completed | '+this.props.completedChallenge.completedchallenge.length;
         if(this.props.completedChallenge.tiechallenge !== undefined){
            tie = 'Tie Challenges | '+this.props.completedChallenge.tiechallenge.length
         }
        }
        return(
           
               <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={styles.user_name}>
                    Great, {this.props.user.first_name} {this.props.user.last_name}!
                    </Text>
                    <Text style={styles.go_text}>
                    Here are your Achievements
                    </Text>
                </View>
                
               
               
                <ScrollView contentContainerStyle={{justifyContent:'flex-start', alignItems:'center',}}>
                    <View style={styles.scroll_block}>
                        <Compete_Head ach={true} title={won}/>
                        <Achievement_Comp  data={this.props.completedChallenge.wonchallenge} type='won' icon = {true}/>

                        

                        <Compete_Head ach={true} title={lose}/>
                        <Achievement_Comp data={this.props.completedChallenge.losschallenge} type='lose' icon = {true}/>
                        
                        <Compete_Head ach={true} title={tie}/>
                        {this.props.completedChallenge.tiechallenge !== undefined ? 
                        <Achievement_Comp data={this.props.completedChallenge.tiechallenge} type='tie'/>: null
                        }
                        
                        <Compete_Head ach={true} title={complete}/>
                        <Achievement_Comp data={this.props.completedChallenge.completedchallenge} type='complete'/>

                       
                        
                        
                    </View>
                
               
            </ScrollView>
            
            </View>
        )
    }
}

const mapStateToProps = state => {
    const {user,isLoggedIn, JWT_Token} = state.auth
    const {profileLoading, completedChallenge} = state.profile
   return { user,isLoggedIn,JWT_Token,profileLoading ,completedChallenge}
}

const mapDispatchToProps = {
  dispatchLogout: () => logout(),
  dispatchgetCompletedChallenges: (JWT) => getCompleteChallenges(JWT)
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievmentMainScreen)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:83
    },
    scroll_block:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        marginLeft:10
        //backgroundColor:'yellow',
        //width:'100%',
        //flex:1
        //height:windowHeight-200
    },
    head:{
        justifyContent:'center',
        alignItems:'flex-start',
        //flex:1,
        //backgroundColor:'yellow',
        width:'90%', 
        marginVertical:10
    },
    user_name:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 24,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    go_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily:'Montserrat-Regular',
    }
    
    
    
})