import React, { Component, useReducer } from 'react';
import { View, Text,StyleSheet ,FlatList,Dimensions,Image,TouchableOpacity,ActivityIndicator,Alert, Modal,WebView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail,Button,   Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { Video, AVPlaybackStatus } from 'expo-av';
import { bindActionCreators } from 'redux';
import { changeCount } from '../../actions/counts';
import { getFeed } from '../../actions/feed';
import RenderHtml from "react-native-render-html";

import Video_Thumb from '../../components/Video_Thumb';
import Video_Comp from '../../components/video';
import {MaterialCommunityIcons} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = ['1','2', '3', '4']
export class HomeScreen extends Component{
  constructor(props){
    super(props);
    
    
  }
  state={
    videoload:false,
    videoShow:false,
    isVisible:false,
  }
  componentDidMount(){
    //console.log('componentdidmountis callin')
    this.props.dispatchgetFeed(this.props.JWT_Token);
   
  }
  openModal=()=>{
    this.setState((prevState)=>{
      return{
        isVisible:!prevState.isVisible,
        videoShow:!prevState.videoShow
      }
      
    })
  }
  
  showVideo=()=>{
    //console.log('show video is cslling')
    this.setState((prevState)=>{
      return{
        videoShow:!prevState.videoShow

      }
      
    })
  }

  renderModal=(image)=>{
    return(
      <Modal
      style={{
         width:windowWidth,
         height:windowHeight,
         backgroundColor: '#1F1F1F'
      }}
      animationType="slide"
      transparent={false}
      visible={this.state.isVisible}
      presentationStyle='fullScreen'
      
      >
     
    <View style={{flex:1,backgroundColor:'blue'}}>
    {/* <Image style={styles.image} 
               source={require('../../assets/home.png')}
              /> */}
     
     <Video source={{
          uri: image,
        }}  
                ref={(ref) => {
                    this.player = ref
                }} 
                isLooping={false}                                     
                onBuffer={this.onBuffer}               
                onError={this.videoError}     
                useNativeControls
                resizeMode="contain"    
                // onLoad={this.setState({
                //   videoload:true
                // })}
               
                posterResizeMode='contain'
                
                paused
                style={styles.backgroundVideo_1}
                 />
          <TouchableOpacity onPress={this.openModal}>
            <Text>Hide Modal</Text>
          </TouchableOpacity>
          </View>
      
    </Modal>
    )
  }
  
  renderVideo(image) {
    if(this.state.videoload) {
       return(
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
          <ActivityIndicator size='large' color='#262727'/>
        </View>
       )
    }else{
      return (
        <View style={{position:'relative'}}>
        <Video source={{
          uri: image,
        }}  
                ref={(ref) => {
                    this.player = ref
                }} 
                isLooping={false}                                     
                onBuffer={this.onBuffer}               
                onError={this.videoError}     
                //controls        
                // onLoad={this.setState({
                //   videoload:true
                // })}
                resizeMode='contain'
                //useNativeControls
                fullscreenAutorotate
                fullscreenOrientation='landscape'
               // paused
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                style={styles.backgroundVideo}
                 />
         <TouchableOpacity style={styles.icon_block} onPress={this.openModal}>
            <MaterialCommunityIcons name='fullscreen' size={35} color='white'/>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.icon_block_1} onPress={this.showVideo}>
            <MaterialCommunityIcons name='pause-circle' size={35} color='white'/>
          </TouchableOpacity>
        </View>
    );
    }
  
  
  }
  renderItem=(item,index)=>{

    const  blog_description =item.item.blog_description;
    const image =this.props.feed.url+'/'+item.item.media
    const thumbnail = this.props.feed.url+'/'+item.item.thumbnail
   // console.log('image in fedd', image)
    return(
      <Card key={index} style={{borderRadius:10, backgroundColor:'#262727', borderWidth:0, borderColor:'transparent'}}>
            <TouchableOpacity 
              onPress={()=>{this.props.navigation.navigate('home_detail',{
                
                id:item.item.id,
                url:this.props.feed.url
              })}}
             
              >
            <CardItem style={{backgroundColor:'#262727', borderRadius:10, marginVertical:5}}>
              
              <Left>
                
                <Body style={styles.title_block}>
                  <Text style={styles.feed_title}>{item.item.blog_title}</Text>
                  
                  <RenderHtml baseFontStyle={styles.feed_subtitle} source={{html: blog_description }} />
                </Body>
              </Left>
              
            </CardItem>
            </TouchableOpacity>
            <CardItem cardBody style={{borderRadius:10, backgroundColor:'#262727', justifyContent:'center', alignItems:'center'}}>
              <View 
             
              style={ item.item.media_type == 'Image' ? styles.img_block : styles.video_block}
              >
             {
               item.item.media_type == 'Image' ? <Image style={styles.image} 
               source={{uri: image}}
              /> : this.state.videoShow ? this.renderVideo(image)  :  <Video_Thumb source={image} thumbnail={thumbnail} onPlayPress={this.showVideo}/>
             }
            {this.renderModal(image) }
              </View>
            </CardItem>
           
          </Card>
    )
  }          
              render() {
                
              //console.log('video visible', this.props.feed)
                return(
                  <View>
                      {
                    this.props.feedLoading ? <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                    <ActivityIndicator size='large' color='#262727'/>
                  </View> :
                  <FlatList
                    data={this.props.feed !== null ? this.props.feed.data : null}
                    renderItem={this.renderItem}
                    keyExtractor={(item)=>item.id}
                    style={{marginBottom:83,marginHorizontal:10}}
                    />
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
        marginBottom:83,
        
       
    },
    feed_title:{
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 20,
      color: '#ADF350'
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
      opacity:0.5
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
       height: windowWidth-25 ,
       justifyContent:'center',
       alignItems:'center',
       //backgroundColor:'yellow'
    },
    video_block:{
      borderRadius:10, 
      position:'relative',
      width: windowWidth-25  ,
      height: windowWidth-25 ,
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
    
}

    
})