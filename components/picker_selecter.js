import { Container, Header, Content, Item, Input, Icon,Picker } from 'native-base';
import React from 'react';
import { Dimensions,StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Picker_select extends React.Component{
    
    render(){
        return(
            <Picker
              mode="dropdown"
              
              iosIcon={<Icon name="ios-arrow-down-circle-outline" style={styles.icon} color='#FFFFFF' size={14}/>}
              iconType ='MaterialIcons'
              androidIcon={<Icon name="keyboard-arrow-down" color='#FFFFFF' size={14}/>}
              placeholder={this.props.placeholder}
              textStyle={{ color: "#FFFFFF", paddingRight: 10,fontFamily:'Montserrat-Regular' }}
              // itemStyle={{
              //   backgroundColor: "rgba(255, 255, 255, 0.3)",
              //   marginLeft: 0,
              //   paddingLeft: 10,
               
              // }}
              itemTextStyle={{ 
                
                fontSize:16,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular'

            }}
              selectedValue={this.props.value}
              onValueChange={this.props.onValueChange}
              style={{  
                  color: this.props.color ,
                  //borderWidth:1,
                  //marginTop:0,
                  width:windowWidth * (45/100),
                  height:50,
                    borderBottomWidth:1,
                  borderBottomColor:'rgba(255, 255, 255, 0.3)',
                 // display:'flex',
                 //width:'100%',
                 fontSize:16,
                 fontWeight:'500',
                 fontFamily:'Montserrat-Regular'
                }}
            >
              {
                this.props.challenge ? this.props.data.map((i, index)=>{
                  return(
                  <Picker.Item label={i.name} value={i.value} key={index}/>
                  )
                }):this.props.data.map((i, index)=>{
                  return(
                  <Picker.Item label={i.category_name} value={i.id} key={index}/>
                  )
                })
              }
            </Picker>
        )
    }
}
const styles = StyleSheet.create({
  icon:{
    color:'rgba(255, 255, 255, 0.3)'
  }
})