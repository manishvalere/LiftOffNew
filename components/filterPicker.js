import { Container, Header, Content, Item, Input, Icon,Picker } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class FilterPicker extends React.Component{
    
    render(){
    console.log('value in picker', this.props.specific)  
        return(
            <Picker
            modalStyle={{backgroundColor:'#1F1F1F'}}
              mode="dropdown"
              enabled={!this.props.specific}
              iosHeader={this.props.header}
              iosIcon={<Icon name="ios-arrow-down-circle-outline" style={{color:'rgba(31, 31, 31, 0.6)', fontSize:20, textAlign:'right', justifyContent:'center', alignItem:'center'}}/>}
              iconType ='MaterialIcons'
              androidIcon={<Icon name="keyboard-arrow-down" color='rgba(255, 255, 255, 0.3)' size={14}/>}
              placeholder={this.props.placeholder}
              placeholderStyle={{ color: "rgba(31, 31, 31, 0.6)",fontFamily:'Montserrat-Regular',fontSize:14 }}
                textStyle={{ color: "rgba(31, 31, 31, 0.6)", paddingRight: 5,fontFamily:'Montserrat-Regular',fontSize:14 }}
              itemStyle={{
               // backgroundColor: '#1F1F1F',
                marginLeft: 0,
                paddingLeft: 10,
               
              }}
              headerBackButtonTextStyle={{
                fontSize:14,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'
              }}
              headerStyle={{backgroundColor:'#1F1F1F'}}
              headerTitleStyle={{
                fontSize:14,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'
              }}
              itemTextStyle={{ 
                
                fontSize:14,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'

            }}
            
              selectedValue={this.props.value}
              onValueChange={this.props.onValueChange}
              style={{  
                   height:height*(5/100),
                   width:width * (90/100),
                   backgroundColor:'rgba(255, 255, 255, 0.9)',
                   alignItems:'center',
                   justifyContent:'space-between'
                //   borderColor:'rgba(31, 31, 31, 0.5)',
                //   borderWidth:1,
                //   borderRadius:5
                  
                }}
            >
              {
                this.props.main ? this.props.data.map((i, index)=>{
                 
                  return(
                  <Picker.Item label={i.category_name} value={i.id} key={index}/>
                  )
                }):this.props.data.map((i, index)=>{
                  return(
                  <Picker.Item label={i.subcategory_name} value={i.id} key={index}/>
                  )
                })
              }
            </Picker>
        )
    }
}