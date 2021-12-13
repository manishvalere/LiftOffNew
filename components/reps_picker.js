// import { Container, Header, Content, Item, Input, Icon,Picker } from 'native-base';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

export default class Reps_Picker extends React.Component{
    
    render(){
      
        return(
            <Picker
                selectedValue={this.props.value}
                onValueChange={(itemValue, itemIndex) =>
                this.props.onValueChange(itemValue, 'Reps')
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        )
    }
}