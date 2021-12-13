import React, {useState} from 'react';
import {View, Button,StyleSheet, Platform, TouchableOpacity,Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Component } from 'react';

export   class Time_picker extends Component{
  state = {
  time:new Date(),
  mode  :'time',
  show: true

  }
   onChange = (event, selectedtime) => {
    const currentDate = selectedtime || this.state.time;
    this.setState({
      show:Platform.OS === 'ios',
      time:currentDate
    })
    
  }

   showMode = (currentMode) => {
    this.setState({
      show:true,
      mode:currentMode
    })
    
  };

   showDatepicker = () => {
    this.showMode('date');
  };

   showTimepicker = () => {
    this.showMode('time');
  };
 
  render(){
    
    return(
      
   
        <View style={styles.picker_view}>
          {/* {!this.state.show ? <View>
            <TouchableOpacity style={styles.picker_btn}   onPress={this.showDatepicker} ><Text style={styles.text}>{comp_date}</Text></TouchableOpacity>
          </View> :null} */}
        
          {this.state.show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.time}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
              style={{width: '100%', backgroundColor:'#1F1F1F'}}
              textColor="rgba(255, 255, 255, 0.3)" 
              dateFormat="shortdate"
            />
          )}
        </View>
      
    )
  }
}
export default Time_picker;
  
 
  

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
