import React, { Component, useReducer } from 'react';
import { View, Text,StyleSheet ,FlatList,Dimensions,Image,TouchableOpacity,ActivityIndicator,Alert, Modal,WebView,RefreshControl} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Button,   Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { Video, AVPlaybackStatus } from 'expo-av';
import { bindActionCreators } from 'redux';
import { changeCount } from '../../actions/counts';
import { getFeed } from '../../actions/feed';
import RenderHtml from "react-native-render-html";
import axios from 'axios';
import Video_Thumb from '../../components/Video_Thumb';
import Video_Comp from '../../components/video';
import {MaterialCommunityIcons} from 'react-native-vector-icons'
import Home_Image from '../../components/homeimage_comp';
import colors from '../../constant/colors';
import FitnessHeader from '../../components/fitnessHeader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = ['1','2', '3', '4']
export class HomeScreen extends Component{
  constructor(props){
    super(props);
    
    this.onEndReachedCalledDuringMomentum = true;
  }
  state={
    videoload:false,
    videoShow:false,
    isVisible:false,
    list: [], 
    start: 0, 
    
    feedLoading:true, 
    url:''
  }
  componentDidMount(){
    //console.log('componentdidmountis callin')
    //this.props.dispatchgetFeed(this.props.JWT_Token);
    this.fetchResult();
  }
//   fetchResult = () => {
//     const { offset, limit, list } = this.state;
//     fetchModeDateFromAPI(offset, limit).then(res => {
//     if (!res.list) return;
//     this.setState({
//         list: list.concat(res.list),
//         offset: offset + 100,
//         limit: limit
//     });
//     });
// };
  fetchResult = () => {
    console.log('this.state', this.state.start)
    const { start, list } = this.state;
    this.setState({
      footerloading:true
    })
    axios({
      method: 'POST',
      url: colors.baseURL + 'auth/blog-list',
     // headers: getHeaders(jwt),
      data: {
       start:this.state.start
      }
    })

    .then((response) => {
      // if (!response.list) return;
      if (!response.data) return;
      if(response.status == 200) {
        //console.log('response in home', response.data)
        this.setState({
          list: list.concat(response.data.data),
          start:start+1,
          feedLoading:false,
          footerloading:false,
          url:response.data.url
      });
      
      }else if(response.status == 401){
        //console.log('response in login 401', response.error)
        this.setState({
          feedLoading:false,
          footerloading:false,
        })
      }
      if(response.status == 422){
        this.setState({
          feedLoading:false,
          footerloading:false,
        })
      }
    })
    .catch((error) => {
      if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        this.setState({
          feedLoading:false,
          footerloading:false,
        })
      }
      if(error) {
         this.setState({
          feedLoading:false,
          footerloading:false,
        })
      }
      console.log('error in catch list',error);
       this.setState({
          feedLoading:false,
          footerloading:false,
        })
    });
};

footercomp=()=>{
  return(
  
                      
                    this.state.footerloading ?  <Card  style={{justifyContent:'center',alignItems:'center', borderRadius:10, backgroundColor:'#262727', borderWidth:0, borderColor:'transparent'}}>
                  
                    <CardItem style={{backgroundColor:'#262727', borderRadius:10, marginVertical:5}}>
                    <ActivityIndicator size='large' color='white'/>
                    </CardItem>
                   
                  </Card>
                    
                  : null
  )
}
rendernodata=()=>{
  return(
      <View 
     
      style={styles.item_bloack}>
         
             
         <Text style={styles.compet_text}>No Blogs Available</Text>
            
          
      </View>
  )
}
  refresh=()=>{
    //console.log('refresh is calinng')
    this.setState({feedLoading: true,start:0, list:[]},() => {this.fetchResult();});
    
    
}

  renderItem=(item,index)=>{

    const  blog_description =item.item.blog_description;
    const image =this.state.url+'/'+item.item.media
    const thumbnail = this.state.url+'/'+item.item.thumbnail
   // console.log('image in fedd', image)
    return(
      <Card key={index} style={{borderRadius:10, backgroundColor:'#262727', borderWidth:0, borderColor:'transparent'}}>
            <TouchableOpacity 
              onPress={()=>{this.props.navigation.navigate('home_detail',{
                
                id:item.item.id,
                url:this.state.url
              })}}
             
              >
            <CardItem style={{backgroundColor:'#262727', borderRadius:10, marginVertical:5}}>
              
              <Left>
                
                <Body style={styles.title_block}>
                  <Text style={styles.feed_title}>{item.item.blog_title}</Text>
                  <Text style={styles.feed_subtitle}>{item.item.blog_subtitle}</Text>
                  {/* <RenderHtml baseFontStyle={styles.feed_subtitle} source={{html: blog_description }} /> */}
                </Body>
              </Left>
              
            </CardItem>
            </TouchableOpacity>
            <CardItem cardBody style={{borderRadius:10, backgroundColor:'#262727', justifyContent:'center', alignItems:'center'}}>
              <View 
             
              style={ item.item.media_type == 'Image' ? styles.img_block : styles.video_block}
              >
             {
               item.item.media_type == 'Image' ?<Home_Image onPress={()=>{this.props.navigation.navigate('home_detail',{
                
                id:item.item.id,
                url:this.state.url
              })}}
               uri={image}
               />: <Video_Comp src={image}/>}
              </View>
            </CardItem>
           
          </Card>
    )
  }          
              render() {
                
              // /console.log('video visible', this.state.list)
                return(
                  <View style={styles.container}>
                    <FitnessHeader feed={true} onSettingPress={this.settingPress} title='News Feed' onPress={this.onTimerPress}/>
                      {
                    this.state.feedLoading ? <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                    <ActivityIndicator size='large' color='white'/>
                  </View> :
                  <>
                  
                  <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    keyExtractor={(item)=>item.id.toString()}
                    style={{marginBottom:83,marginHorizontal:10}}
                    initialNumToRender={10}
                    onMomentumScrollBegin = {() => {this.onEndReachedCalledDuringMomentum = false;}}
                    onEndReached = {() => {
                        if (!this.onEndReachedCalledDuringMomentum) {
                          this.fetchResult();    // LOAD MORE DATA
                          this.onEndReachedCalledDuringMomentum = true;
                        }
                      }
                    }
                     onEndReachedThreshold={0.1}
                     
                     ListFooterComponent={this.footercomp}
                     ListEmptyComponent={this.rendernodata}
                     showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.feedLoading}
                        onRefresh={()=>this.refresh()}
                        tintColor='white'
                        color='white'
                        progressBackgroundColor='white'
                        
                      />
                    }
                    />
                    </>
                }
                 
                  </View>
                )
                 
                    
                  
                
              }             
       
}

  const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {feedLoading,feed} = state.feed
   return { JWT_Token,feedLoading,feed}
  }
  const mapDispatchToProps = {
    dispatchgetFeed: (token) => getFeed(token),
   
   }
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        //marginBottom:83,
        
       
    },
    feed_title:{
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
      color: '#ADF350',
      fontFamily:'Montserrat-Regular'
    },
    title_block:{
      justifyContent:'center', 
      display:'flex', 
      alignItems:'flex-start', 
      marginLeft:0
    },
    image:{
      width: windowWidth-25  ,
      height: windowWidth-25 ,
      //flex: 1,
     justifyContent:'center',
     alignItems:'center',
      borderRadius:10
    },
    feed_subtitle:{
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 17,
      color: '#FFFFFF', 
      opacity:0.5,
      paddingVertical:0,
      marginTop:3,
      fontFamily:'Montserrat-Regular'
    },
    backgroundVideo: {
      
      alignSelf: 'center',
     
      width: windowWidth-25  ,
       height: windowWidth-25 ,
      //flex: 1,
      justifyContent:'center',
      alignItems:'center',
      // resizeMode: 'contain',
      borderRadius:10,
      backgroundColor:'rgba(255, 255, 255, 0.2)'
    },
    backgroundVideo: {
      
      alignSelf: 'center',
     
      width: windowWidth-25  ,
       height: windowWidth-25 ,
      //flex: 1,
      justifyContent:'center',
      alignItems:'center',
      // resizeMode: 'contain',
      borderRadius:10,
      backgroundColor:'rgba(255, 255, 255, 0.2)'
    },
    backgroundVideo_1: {
      
      alignSelf: 'center',
     
      width: windowWidth  ,
       height: windowWidth,
      //flex: 1,
      justifyContent:'center',
      alignItems:'center',
      // resizeMode: 'contain',
      borderRadius:10,
      backgroundColor:'rgba(255, 255, 255, 0.2)',
      zIndex:9999
    },
    fullscreen_icon_block:{
      position:'absolute',
      right:20, 
      bottom:20,
      
    },
    img_block:{
       borderRadius:10, 
       position:'relative',
       width: windowWidth-25  ,
       height:250,
       justifyContent:'center',
       alignItems:'center',
       //backgroundColor:'yellow'
    },
    video_block:{
      borderRadius:10, 
      position:'relative',
      width: windowWidth-25  ,
      height: 250 ,
      justifyContent:'center',
      alignItems:'center',
      //backgroundColor:'yellow'
   },
   icon_block:{
    width:30,
    height:30, 
    position:'absolute',
    right:10,
    bottom:10
    
   },
   icon_block_1:{
    
    position:'absolute',
    left:10,
    bottom:10
    
},
recomend_text_title:{
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: 16,
  lineHeight: 20,
  color: '#ADF350',
  fontFamily:'Montserrat-Regular'
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