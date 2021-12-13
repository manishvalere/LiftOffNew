import { Container, Header, Content, Item, Input, Icon } from 'native-base';
import React from 'react';
import {StyleSheet,TouchableWithoutFeedback,Keyboard} from 'react-native';

export default class InputNormal extends React.Component{
    render(){
        return(
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Item  style={styles.item}>
                    <Icon active name={this.props.icon} type={this.props.icon_type} style={{color:'white'}}/>
                    <Input 
                    {...this.props}
                    placeholder={this.props.placeholder} 
                    value={this.props.value}
                    //onChange={(text)=>this.props.onChange(text)} 
                    style={styles.input}
                    secureTextEntry={this.props.secure}
                    autoCapitalize={this.props.autoCapitalize}
                    />
            </Item>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    item:{
        width:'80%',
        borderBottomColor:'rgba(255, 255, 255, 0.3)'
    },
    input:{
        fontSize:16,
        lineHeight:20,
        height:40,
        fontWeight:'500',
        color:'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    }
})