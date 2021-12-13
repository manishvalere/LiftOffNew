import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Video from 'react-native-video';


export default class FullScreen extends Component {
    
    static navigationOptions = {
        title: 'React Native Video'
    };

    state = { showVideo: true,url:'' };

    componentDidMount() {
        // this.willFocusSubscription = 
        // this.props.navigation.addListener('willFocus',
        //     () => {
        //         this.setState({ showVideo: true });
        //     }
        //   );
          const { id, url } = this.props.route.params;
   this.setState({
     url:url
   })
    }

    // componentWillUnmount() {
    //     this.willFocusSubscription.unsubscribe();
    // }

    render() {
       // console.log('url in full screen ', this.state.url)
        return (
            <View style={styles.mainContainer}>
                <View style={styles.videoContainer}>
                    {this.renderVideo()}
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button 
                        title="Go to React Native Video Player"
                        onPress={() => {
                            this.setState({ showVideo: false });
                            this.props.navigation.navigate("Another");
                        }}
                    />
                </View> */}
                
            </View>
        );
    }

    renderVideo() {
        if(this.state.showVideo) {
            return (
                <Video source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}  
                        ref={(ref) => {
                            this.player = ref
                        }}                                      
                        onBuffer={this.onBuffer}               
                        onError={this.videoError}     
                        controls        
                        style={styles.backgroundVideo} />
            );
        }

        return null;
    }

    onBuffer(bufferObj) {
       // console.log('buffering', bufferObj.isBuffering);
    }

    videoError(error) {
       // console.log('video error:', error);
    }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    backgroundVideo: {
      flex: 1,
      marginBottom:83
    },
    videoContainer: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    }
  });

// // React Native Video Library to Play Video in Android and IOS
// // https://aboutreact.com/react-native-video/

// // import React in our code
// import React, {useState, useRef} from 'react';

// // import all the components we are going to use
// import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

// //Import React Native Video to play video
// import Video from 'react-native-video';

// //Media Controls to control Play/Pause/Seek and full screen
// import
//   MediaControls, {PLAYER_STATES}
// from 'react-native-media-controls';

// const FullScreen = () => {
//   const videoPlayer = useRef(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [paused, setPaused] = useState(false);
//   const [
//     playerState, setPlayerState
//   ] = useState(PLAYER_STATES.PLAYING);
//   const [screenType, setScreenType] = useState('content');

//   const onSeek = (seek) => {
//     //Handler for change in seekbar
//     videoPlayer.current.seek(seek);
//   };

//   const onPaused = (playerState) => {
//     //Handler for Video Pause
//     setPaused(!paused);
//     setPlayerState(playerState);
//   };

//   const onReplay = () => {
//     //Handler for Replay
//     setPlayerState(PLAYER_STATES.PLAYING);
//     videoPlayer.current.seek(0);
//   };

//   const onProgress = (data) => {
//     // Video Player will progress continue even if it ends
//     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
//       setCurrentTime(data.currentTime);
//     }
//   };

//   const onLoad = (data) => {
//     setDuration(data.duration);
//     setIsLoading(false);
//   };

//   const onLoadStart = (data) => setIsLoading(true);

//   const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

//   const onError = () => alert('Oh! ', error);

//   const exitFullScreen = () => {
//     alert('Exit full screen');
//   };

//   const enterFullScreen = () => {};

//   const onFullScreen = () => {
//     setIsFullScreen(isFullScreen);
//     if (screenType == 'content') setScreenType('cover');
//     else setScreenType('content');
//   };

//   const renderToolbar = () => (
//     <View>
//       <Text style={styles.toolbar}> toolbar </Text>
//     </View>
//   );

//   const onSeeking = (currentTime) => setCurrentTime(currentTime);

//   return (
//     <View style={{flex: 1}}>
//       <Video
//         onEnd={onEnd}
//         onLoad={onLoad}
//         onLoadStart={onLoadStart}
//         onProgress={onProgress}
//         paused={paused}
//         ref={videoPlayer}
//         resizeMode={screenType}
//         onFullScreen={isFullScreen}
//         source={{
//           uri:
//             'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4',
//         }}
//         style={styles.mediaPlayer}
//         volume={10}
//       />
//       <MediaControls
//         duration={duration}
//         isLoading={isLoading}
//         mainColor="#333"
//         onFullScreen={onFullScreen}
//         onPaused={onPaused}
//         onReplay={onReplay}
//         onSeek={onSeek}
//         onSeeking={onSeeking}
//         playerState={playerState}
//         progress={currentTime}
//         toolbar={renderToolbar()}
//       />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   toolbar: {
//     marginTop: 30,
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
// });