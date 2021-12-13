import * as React from 'react';
import { View, StyleSheet, Button,Text,Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Video_Comp(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: props.src,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        //isPlaying={true}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        volume={10}
        posterSource={require('../assets/fitness/video_icon.png')}
      />
      
      
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius:10
    },
    video: {
        alignSelf: 'center',
     
        width: windowWidth -25 ,
         height:250,
        //flex: 1,
        justifyContent:'center',
        alignItems:'center',
        // resizeMode: 'contain',
        borderRadius:10,
        backgroundColor:'black',
       
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
})