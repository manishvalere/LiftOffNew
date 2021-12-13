// import { Container, Header, Content, Tab, Tabs } from 'native-base';
import React , {Component} from 'react';
import { View, Text , StyleSheet, Image,FlatList,RefreshControl} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Today_Screen from './Today';
import Weekly_Screen from './Weekly';
import Alltime_Screen from './Alltime';
import LeaderCrad from '../../components/leader_card';
const data = ['1', '2', '3', '4', '5', '6'];
import { connect } from 'react-redux';
import { getLeaderBoard } from '../../actions';
const Tab = createMaterialTopTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//     sceneContainerStyle={{
//         backgroundColor: '#1F1F1F',
//  }}
//     tabBarOptions={{
//         activeTintColor: '#1F1F1F',
//         inactiveTintColor:'rgba(31, 31, 31, 0.4)',
//         cardStyle: { backgroundColor: '#1F1F1F' },
//         iconStyle:'#fff',
//         fontStyle: 'normal',
//         fontWeight: 'bold',
//         fontSize: 20,
//         fontFamily:'Montserrat-Regular',
//         lineHeight: 17,
//         indicatorStyle:{
//             backgroundColor:'#ADF350'
//         },
        
//         style: {
//            borderTopWidth: 0,
//           //paddingTop: 10,
//           paddingBottom: 0,
//           height: 43,
//           // shadowColor: '#000',
//           // shadowOpacity: 0.1,
//          // shadowRadius: 20,
//           backgroundColor:'#ADF350',
//          // borderRadius: 20,
//           borderTopLeftRadius:40,
//           borderTopRightRadius:40,
//           justifyContent:'center',
//           borderWidth:0,
//           fontFamily:'Montserrat-Regular',
//           //shadowOffset: { width: 0, height: 0 }
//         }
//       }}
//     >
//       <Tab.Screen 
     
//       name="Todays" component={Today_Screen} />
//       <Tab.Screen name="Weekly" component={Weekly_Screen} />
//       <Tab.Screen name="All Time" component={Alltime_Screen} />
//     </Tab.Navigator>
//   );
// }
export  class LeaderBoard extends Component{
  rendersItems=(item)=>{
    return(

        <LeaderCrad image_url={this.props.image_url} item={item.item}/>
    )
}
componentDidMount(){
    this.refresh();
}
refresh=()=>{
    this.props.dispatchgetLeaderBoard(this.props.JWT_Token)
}
    render(){
       // console.log('image_url in profile render',this.props.image_url)
        return(
            // <Container >
            // <Tabs tabBarUnderlineStyle={{backgroundColor:'#ADF350'}}>
            //         <Tab style={{backgroundColor:'#1F1F1F'}} tabStyle={{backgroundColor:'#ADF350'}} heading="Tab1">
            //             <View>
            //                 <Text> tab 1</Text>
            //             </View>
            //         </Tab>
            //         <Tab tabStyle={{backgroundColor:'#ADF350'}} heading="Tab2">
            //         <View>
            //                 <Text> tab 1</Text>
            //             </View>
            //         </Tab>
            //         <Tab tabStyle={{backgroundColor:'#ADF350'}} heading="Tab3">
            //         <View>
            //                 <Text> tab 1</Text>
            //             </View>
            //         </Tab>
            //         </Tabs>
                    
           
            // </Container>
            // <MyTabs/>
            <View style={styles.container}>
                <View style={styles.first_block}>
                    <View style={styles.rounded_first}>

                    </View>
                    <View style={styles.rounded_second}>

                    </View>
                    <View style={styles.congratulation_block}>
                        <View>
                        <Text style={styles.congo_text}>Lift Off </Text>
                        <Text style={styles.congo_text}>Champions!</Text>
                        {/* <Text style={styles.tagline_text}>Today’s top 3 scorer</Text> */}
                        </View>
                        
                    </View>
                    <View style={styles.icon_block}>
                       <View style={{width:100, height:160,position:'absolute',top:-15, justifyContent:'center', alignItems:'center'}}>
                       <Image style={{maxWidth:'100%', maxHeight:'100%', marginRight:20}} source={require('../../assets/Medal.png')}/>
                       </View>
                    </View>
                </View>
                <View style={styles.second_block}>
                    <View style={styles.table_head}>
                        <View style={styles.table_head_t1}>
                            <Text style={styles.table_text}>USER</Text>
                        </View>
                        <View style={styles.table_head_t2}>
                            <Text style={styles.table_text}>CHALLENGES</Text>
                        </View>
                        <View style={styles.table_head_t3}>
                            <Text style={styles.table_text}>SCORE</Text>
                        </View>
                    </View>
                    <View style={styles.flatlist_block}>
                        <FlatList
                            renderItem={this.rendersItems} 
                            data={this.props.leader}
                            keyExtractor={(item)=>item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                  refreshing={this.props.profileLoading}
                                  onRefresh={this.refresh}
                                  tintColor='white'
                                  color='white'
                                  progressBackgroundColor='white'
                                  
                                />
                              }
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn, JWT_Token} = state.auth
    const {profileLoading, leader,image_url} = state.profile
   return { user,isLoggedIn,JWT_Token,profileLoading ,leader,image_url}
}

const mapDispatchToProps = {
  dispatchLogout: () => logout(),
  dispatchgetLeaderBoard: (jwt) => getLeaderBoard(jwt)
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)

const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor:'#1F1F1F',
      marginBottom:83
  },
  first_block:{
      flex:0.25,
      backgroundColor:'#262727', 
      position:'relative',
      flexDirection:'row'
  },
  second_block:{
      flex:0.75
  },
  rounded_first:{
      position:'absolute',
      backgroundColor:'#1F1F1F',
      width:179,
      height:179, 
      borderRadius:179/2, 
      top:-90,
      left:-80
  },
  rounded_second:{
      width:208,
      height:208,
      borderRadius:208/2,
      backgroundColor:'#1F1F1F',
      right:-65,
      top:-15,
      position:'absolute'
  },
  congratulation_block:{
      flex:0.6, 
      //justifyContent:'center',
      justifyContent:'flex-start',
      alignItems:'flex-start',
      marginTop:30,
      textAlign:'left',
      flexDirection:'row'
  },
  icon_block:{
      flex:0.4,
      alignItems:'flex-end',
      justifyContent:'flex-end',
      position:'relative',
      flexDirection:'row',
      //backgroundColor:'red'
  },
  congo_text:{
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      color: '#ADF350',
      marginLeft:20,
      fontFamily:'Montserrat-Regular',
  },
  tagline_text:{
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: 18,
      lineHeight: 22,
      color: '#FFFFFF',
      opacity:0.8,
      fontFamily:'Montserrat-Regular',
  },
  table_head:{
      flex:0.1,
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomWidth:1,
      borderBottomColor:'rgba(255, 255, 255, 0.3)',
      marginHorizontal:10
  },
  table_head_t1:{
      flex:0.6,
      
      justifyContent:'center',
      alignItems:'center'
  },
  table_head_t2:{
      flex:0.3,
     
      justifyContent:'center',
      alignItems:'center'
  },
  table_head_t3:{
      flex:0.21,
     
      justifyContent:'center',
      alignItems:'center'
  },
  table_text:{
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 11,
      lineHeight: 13,
      letterSpacing: 0.1,
      color: '#ADF350',
      fontFamily:'Montserrat-Regular',
  },
  flatlist_block:{
      flex:0.9,
      margin:10
  }
  
})