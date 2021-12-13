import React, {useState} from 'react';
import {View, Button,StyleSheet, Platform, TouchableOpacity,Text} from 'react-native';
import {DatePicker} from 'native-base'
import { Component } from 'react';
import { TouchableRipple } from 'react-native-paper';

export   class Date_picker_Native extends Component{
    constructor(props) {
        super(props);
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
      }
      setDate(newDate) {
        this.setState({ chosenDate: newDate });
      }
 
  render(){
   
    
    return(
      
   
        <View style={styles.picker_view}>
          {/* {!this.state.show ? <View>
            <TouchableOpacity style={styles.picker_btn}   onPress={this.showDatepicker} ><Text style={styles.text}>{comp_date}</Text></TouchableOpacity>
          </View> :null} */}
        
        <DatePicker
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
        </View>
      
    )
  }
}
export default Date_picker_Native
  
 
  

const styles = StyleSheet.create({
    picker_btn:{
      color:'rgba(255, 255, 255, 0.3)',
        width:'100%'
    },
    picker_view:{
        height:60, 
        width:'90%', 
        borderBottomColor:'rgba(255, 255, 255, 0.3)', 
        borderBottomWidth:1, 
        justifyContent:'center', 
        alignItems:'flex-start'
    },
    text:{
        fontSize:16,
        //lineHeight:20,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        marginLeft:7
    }
})
// import React, {useState} from 'react';
// import {View, Button,StyleSheet, Platform, TouchableOpacity,Text} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

// export  const Date_picker = () => {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(true);

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };
//   var day = date.getDate();
//   var month = date.getMonth()+1;
//   var year = date.getFullYear();
//   console.log('day', day)
//   var comp_date = day+'/'+month+'/'+year
//   // get the time as a string
//   var time = date.toLocaleTimeString();
  
 
//   return (
   
//     <View style={styles.picker_view}>
//       {show ? null :<View>
//         <TouchableOpacity style={styles.picker_btn}   onPress={showDatepicker} ><Text style={styles.text}>{comp_date}</Text></TouchableOpacity>
//       </View>}
    
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//           style={{width: '100%', backgroundColor:'transparent'}}
//         />
//       )}
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//     picker_btn:{
       
//         width:'100%'
//     },
//     picker_view:{
//         height:60, 
//         width:'90%', 
//         borderBottomColor:'rgba(255, 255, 255, 0.3)', 
//         borderBottomWidth:1, 
//         justifyContent:'center', 
//         alignItems:'flex-start'
//     },
//     text:{
//         fontSize:16,
//         //lineHeight:20,
//         fontWeight:'500',
//         color:'rgba(255, 255, 255, 0.3)',
//         marginLeft:7
//     }
// })