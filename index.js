import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';
import App from './App';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
messaging().onMessage(async remoteMessage => {
    PushNotificationIOS.addNotificationRequest({
      id: remoteMessage.messageId,
      body: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
     
    });
    
    
    //setInitialRoute('Compete');
  });
if (Platform.OS === 'ios') {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            const { foreground, userInteraction, title, message } = notification;
            if (foreground && (title || message) && !userInteraction) PushNotification.localNotification(notification);
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
    });
}
// if (Platform.OS === 'ios') {
//     // Must be outside of any component LifeCycle (such as `componentDidMount`).
//     messaging().onMessage(async remoteMessage => {
//         PushNotificationIOS.addNotificationRequest({
//             alertBody: remoteMessage.notification.body,
//              alertTitle: remoteMessage.notification.title
//           })
//     })
    
//  }
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
