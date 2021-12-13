import { Container, Header, Content, Item, Input, Icon,Picker } from 'native-base';
import React from 'react';


export default class Days_Picker extends React.Component{
    
    render(){
      
        return(
            <Picker
            modalStyle={{backgroundColor:'#1F1F1F'}}
              mode="dropdown"
              iosHeader={this.props.header}
              iosIcon={<Icon name="ios-arrow-down-circle-outline" style={{color:'white', fontSize:24,}}/>}
              iconType ='MaterialIcons'
              androidIcon={<Icon name="keyboard-arrow-down" color='#FFFFFF' size={14}/>}
              placeholder={this.props.placeholder}
              placeholderStyle={{ color: '#FFFFFF',fontFamily:'Montserrat-Regular' }}
                textStyle={{ color: '#FFFFFF', paddingRight: 5,fontFamily:'Montserrat-Regular' }}
              itemStyle={{
               // backgroundColor: '#1F1F1F',
                marginLeft: 0,
                paddingLeft: 10,
               
              }}
              headerBackButtonTextStyle={{
                fontSize:16,
                lineHeight:20,
                fontWeight:'500',
                color:'#FFFFFF',
                //width:'100%',
                fontFamily:'Montserrat-Regular'
              }}
              headerStyle={{backgroundColor:'#1F1F1F'}}
              headerTitleStyle={{
                fontSize:16,
                lineHeight:20,
                fontWeight:'500',
                color:'#FFFFFF',
                //width:'100%',
                fontFamily:'Montserrat-Regular'
              }}
              itemTextStyle={{ 
                fontSize:16,
                lineHeight:20,
                fontWeight:'500',
                color:'#FFFFFF',
                //width:'100%',
                fontFamily:'Montserrat-Regular'

            }}
            
              selectedValue={this.props.value}
              onValueChange={this.props.onValueChange}
              style={{  
                  height:60,
                  width:'100%',
                  fontSize:16,
                  fontWeight:'500',
                  borderBottomWidth:1,
                  // justifyContent:'space-between',
                  // alignItems:'flex-end',
                  borderBottomColor:'rgba(255, 255, 255, 0.3)',
                  
                }}
            >
              { 
                this.props.main ? this.props.data.map((i, index)=>{
                 
                  return(
                  <Picker.Item label={i.days} value={i.value} key={index}/>
                  )
                }):this.props.data.map((i, index)=>{
                  return(
                  <Picker.Item label={i.days} value={i.value} key={index}/>
                  )
                })
              }
            </Picker>
        )
    }
}