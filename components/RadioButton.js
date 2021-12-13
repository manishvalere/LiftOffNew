import React , {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet ,Image} from 'react-native';
import { connect } from 'react-redux'

export  class RadioButton extends Component {
	state = {
		value: null,
	};
    _setValue = (fieldName, value) => {
      //  console.log('Set value in uurscreen');
        this.props.dispatchSetProfileValue(fieldName, value);
      }
    render() {
        const { PROP } = this.props;
        const { value } = this.state;
    
        return (
            <View>
                {PROP.map(res => {
                    return (
                        <View key={res.key} style={styles.container}>
                            {/* <Text style={styles.radioText}>{res.text}</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => {
                                    this.setState({
                                        value: res.key,
                                    });
                                }}>
                                  {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity> */}
                            <TouchableOpacity 
                            style={{
                                //flex:1,
                                width:'100%',
                                backgroundColor:'rgba(0, 0, 0, 0.3)',
                                height:48,
                                borderRadius:50,
                                justifyContent:'center',
                                alignItems:'stretch',
                                borderWidth:value === res.key ? 1.5 : null,
                                borderColor:value === res.key ? '#6BBA62' : null
                            }}
                            onPress={() => {
                                this.setState({
                                    value: res.key,
                                });
                            }}
                            >
                                <View style={styles.btn_touch_view}>
                                <Text style={styles.radio_btn_text}>{res.text}</Text>
                                {value === res.key && 
                                <View style={styles.image_view}>
                                    <Image style={styles.image_icon} source={require('../assets/rigth_icon.png')}/>
                                    <Image style={styles.image_icon} source={require('../assets/rigth_icon_border.png')}/>
                                </View>
                                }
                                </View>
                            </TouchableOpacity>
                            {/* <Text>select:{this.state.value}</Text> */}
                        </View>
                    );
                })}
                {/* <Text>{this.state.value}</Text> */}
            </View>
        );
    }
}
export default RadioButton;
const styles = StyleSheet.create({
	container: {
        marginBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-between',
	},
    radioText: {
        marginRight: 35,
        fontSize: 20,
        color: '#000',
        fontWeight: '700'
    },
	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
    radio_btn:{
        width:'100%',
        backgroundColor:'rgba(0, 0, 0, 0.3)',
        height:48,
        borderRadius:50,
        justifyContent:'center',
    },
    radio_btn_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color:'rgba(255, 255, 255, 0.5)',
        marginLeft:20,
        fontFamily:'Montserrat-Regular'
    },
    boder_condition:{
        borderWidth:1.5,
        borderColor:'#6BBA62'
    },btn_touch_view:{
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    image_view:{
        marginRight:20,
        position:'relative',
    },
    image_icon:{
        position:'absolute',
        //width:12,
       // backgroundColor:'black',
        top:-10,
        right:5
    }
});