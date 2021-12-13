import { StatusBar } from 'expo-status-bar';
import React , {useEffect,useState}from 'react';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Root } from 'native-base';
// const store = createStore(rootReducer, applyMiddleware(thunk));
import { persistStore, persistReducer } from 'redux-persist'
import StackNavigator from './navigation/stackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from "react-native-push-notification";
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,applyMiddleware(thunk));
let persistor = persistStore(store)
// const store =createStore(rootReducer, applyMiddleware(thunk))
export default function App() {
  const [initialRoute, setInitialRoute] = useState('Fitness');
  const [token, setToken] =  useState('')
  async function saveTokenToDatabase(token) {
    // Assume user is already signed in
    // const userId = auth().currentUser.uid;
    // console.log('userID',userId)
    // Add the token to the users datastore
    // await firestore()
    //   .collection('users')
    //   .doc(userId)
    //   .update({
    //     tokens: firestore.FieldValue.arrayUnion(token),
    //   });
    setToken(token)
  }
 async function requestUserPermission(){
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };
// if (Platform.OS === 'ios') {
//     // Must be outside of any component LifeCycle (such as `componentDidMount`).
//     messaging().onMessage(async remoteMessage => {
//         PushNotificationIOS.addNotificationRequest({
//             alertBody: remoteMessage.body,
//              alertTitle: remoteMessage.title
//           })
//     })
    
//  }
  useEffect(() => {
    requestUserPermission();
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
    messaging()
    .getToken()
    .then(token => {
      console.log('device token', token)
      return saveTokenToDatabase(token);
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      setInitialRoute('Compete');
     // navigation.navigate(remoteMessage.notification.type);
    });
    // messaging().onMessage(async remoteMessage => {
    //   PushNotificationIOS.addNotificationRequest({
    //     alertBody: remoteMessage.notification.body,
    //      alertTitle: remoteMessage.notification.title
    //   })
      
      
    //   setInitialRoute('Compete');
    // });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('Compete');
        }
       // setLoading(false);
      });
      
  },[])
  return (
    <Root>
    <PaperProvider >
    <Provider store = { store }>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigation initial={initialRoute} deviceToken={token}/>
          {/* <StackNavigator/> */}
        </NavigationContainer>
    </PersistGate>
    </Provider>
    </PaperProvider>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
