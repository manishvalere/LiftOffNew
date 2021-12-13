import * as React from 'react';
import { View, StyleSheet, Button, ScrollView,Text,Dimensions ,Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import Btn_continue from '../../components/Btn_continue';
import { Component } from 'react';
import { connect } from 'react-redux';
import { getBlockDetail } from '../../actions/feed';
import RenderHtml from "react-native-render-html";
import {MaterialIcons} from 'react-native-vector-icons'
import Video_Comp from '../../components/video';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export  class  Home_detail extends Component{
  constructor(props){
    super(props);
    
    
  }
  state = { 
    showVideo: true,
    url:''
   };
  // const video = React.useRef(null);
  // const [status, setStatus] = React.useState({});
  componentDidMount=()=>{
    // this.changeTitleText
   const { id, url } = this.props.route.params;
   this.setState({
     url:url
   })
  
   this.props.dispatchgetBlockDetail(id);
  
 }

renderVideo() {
  if(this.state.videoload) {
     return(
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
        <ActivityIndicator size='large' color='#262727'/>
      </View>
     )
  }else{
    return (
      <Video source={{
        uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      }}  
        ref={(ref) => {
            this.player = ref
        }} 
        repeat                                     
        onBuffer={this.onBuffer}               
        onError={this.videoError}     
        controls        
        // onLoad={this.setState({
        //   videoload:true
        // })}
        resizeMode='containe'
        posterResizeMode='contain'
        fullscreenAutorotate
        fullscreenOrientation='landscape'
        style={styles.backgroundVideo} />
  );
  }


}
onBuffer(bufferObj) {
  //console.log('buffering', bufferObj.isBuffering);
}

videoError(error) {
  //console.log('video error:', error);
}
 render(){
  

  var blog=''
  
 //console.log('feed detail page',this.props.feed_detail)
 if(this.props.feed_detail != null && this.props.feed_detail != undefined){
   blog = this.props.feed_detail
   
 }
 const source = {
  html:blog.blog_description
};


// const source ={
//   html:`<P>heloo</p></br><ol><li>This is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blog</li><li>This is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blogThis is test for image &amp; video in a blog</li></ol>`
// }
 //console.log('media blog',this.state.url+'/'+blog.media)
  return (
    <ScrollView> 
    <View style={styles.container}>
        <View style= {{alignItems:'center'}}>
        <View style={{width:windowWidth-25, marginVertical:10, justifyContent:'flex-start', alignItems:'flex-start', }}>
            <Text style={styles.recomend_text_title}>{blog.blog_title}</Text>
            <Text style={styles.recomend_text_sub}>{blog.blog_subtitle}</Text>
        </View>
       
        {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        volume={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
      
     
      <View  style={blog.media_type =='Image' ? styles.video_block_1 : styles.video_block}>
      {blog.media_type =='Image' ? 
        <Image
        source={{uri:this.state.url+'/'+blog.media}}
        style={styles.video_block}
        resizeMode='stretch'
        />: <Video_Comp src={this.state.url+'/'+blog.media}/>
    }
      </View>  
    
        {/* {blog.media_type !=='Image' ?  <TouchableOpacity onPress={()=>this.props.navigation.navigate('full_video',{
          url:this.state.url+'/'+blog.media
        })} style={styles.fullscreen_icon_block}>
            <MaterialIcons color='white' name='fullscreen' size={25}/>
        </TouchableOpacity> : null } */}
       
      
      <View style={{margin:10}}>
          
          <RenderHtml baseFontStyle={styles.detail_text}  source={source }/>
      </View>
      {/* <View style={styles.video_block_1}>
          <Image  style={styles.video_block}resizeMode='contain' source={require('../../assets/home/feed.jpg')}/>
      </View> */}
      {/* <View style={{margin:10}}>
          <Text style={styles.detail_text}>
         
          </Text>
      </View> */}
      
      
    </View>
    
    <View style={{justifyContent:'center', alignItems:'center', marginVertical:20,width:'100%',}}>
          <Btn_continue onPress={()=>this.props.navigation.navigate('Fitness')} title='Start Workout'/>
      </View>
      </View>
    </ScrollView>
  );
}
}
const mapStateToProps = state => {
  const {JWT_Token} = state.auth
  const {feedLoading,feed_detail} = state.feed
 return { JWT_Token,feedLoading,feed_detail}
}
const mapDispatchToProps = {
  dispatchgetBlockDetail: (id) => getBlockDetail(id),
 
 }
export default connect(mapStateToProps, mapDispatchToProps)(Home_detail)
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    //margin:10,
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'#262727',
    marginBottom:83
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recomend_text_title:{
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#ADF350',
    fontFamily:'Montserrat-Regular'
  },
  recomend_text_sub:{
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
    opacity:0.7,
    
  },
  detail_text:{
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    //lineHeight: 25,
    color: '#FFFFFF',
    opacity:0.6, 
    textAlign:'left',
    paddingVertical:0,
    includeFontPadding:false,
    fontFamily:'Montserrat-Regular'
  },
  image_block:{
      width:'100%', 
      height:200, 
      margin:10
    },
    img:{
        width:'100%',
        maxWidth:'100%',
        aspectRatio:1.6 ,
        height:200

    },
    backgroundVideo: {
      
      alignSelf: 'center',
      width: '95%',
      height: 200,
      marginHorizontal:10,
      position:'relative'
    },
    video_parnet:{
      position:'relative'
    },
    fullscreen_icon_block:{
      position:'absolute',
      right:20, 
      bottom:20,
      zIndex:999
    },
    video_block:{
      borderRadius:10, 
      position:'relative',
      width: windowWidth-25  ,
      height: 250 ,
      justifyContent:'center',
      alignItems:'center',
      
    // / backgroundColor:'rgba(255, 255, 255, 0.1)'
   },
   video_block_1:{
    borderRadius:10, 
    position:'relative',
    width: windowWidth-25  ,
    height: 250 ,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(255, 255, 255, 0.1)'
 }
});

