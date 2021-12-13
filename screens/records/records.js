import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
export class RecordMainScreen extends Component{
    render(){
        return(
            <View  style={styles.container}>
                <Text>record screen</Text>
                <Text>{this.props.count.count}</Text>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    count: state.count,
  });
export default connect(mapStateToProps)(RecordMainScreen);
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})