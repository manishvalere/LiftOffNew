import { Container, Header, Content, Item, Input, Icon,Picker } from 'native-base';
import React from 'react';
import colors from '../constant/colors';


export default class Challenge_picker extends React.Component{
    
    render(){
      
        return(
            <Picker
            modalStyle={{backgroundColor:'#1F1F1F'}}
              mode="dropdown"
              iosHeader={this.props.header}
              iosIcon={<Icon name="ios-arrow-down-circle-outline" style={{color:'white', fontSize:24, textAlign:'right'}}/>}
              iconType ='MaterialIcons'
              androidIcon={<Icon name="keyboard-arrow-down" color='rgba(255, 255, 255, 0.3)' size={14}/>}
              placeholder={this.props.placeholder}
              placeholderStyle={{ color:'white',fontFamily:'Montserrat-Regular' }}
                textStyle={{ color: "white", paddingRight: 5,fontFamily:'Montserrat-Regular' }}
              itemStyle={{
               // backgroundColor: '#1F1F1F',
                marginLeft: 0,
                paddingLeft: 10,
               
              }}
              headerBackButtonTextStyle={{
                fontSize:16,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'
              }}
              headerStyle={{backgroundColor:'#1F1F1F'}}
              headerTitleStyle={{
                fontSize:16,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'
              }}
              itemTextStyle={{ 
                
                fontSize:16,
                fontWeight:'500',
                fontFamily:'Montserrat-Regular',
                color:'white'

            }}
            
              selectedValue={this.props.value}
              onValueChange={this.props.onValueChange}
              style={{  
                  height:50,
                  width:'92%',
                  fontSize:16,
                  fontWeight:'500'
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