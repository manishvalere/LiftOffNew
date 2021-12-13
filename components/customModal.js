import React, { Component } from 'react';
import { 
    View, 
    Modal, 
    StyleSheet, 
    Dimensions, 
    TouchableWithoutFeedback 
} from 'react-native';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        const { height, width } = Dimensions.get('window');
        this.height = height;
        this.width = width;
    }

    render() {
        //console.log('this.width',this.width)
        const modalHeight = this.props.bottomHalf? this.height / 2: this.height;
        const styles = StyleSheetFactory.getSheet({
            boxBgColor: this.props.boxBackgroundColor,
            fullscreen: this.props.fullscreen,
            modalHeight: modalHeight,
            bottomHalf: this.props.bottomHalf
        });
        return (
            <Modal 
                animationType={this.props.animation}
                transparent={this.props.transparentContainer}
                visible={this.props.visible}
                presentationStyle={this.props.mode}
                // style={{ borderTopColor:'white', borderTopWidth:2}}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.props.outsideClick()}
                >
                    <View style={styles.mainContainer}>
                        <View style={styles.modalWrapper}>
                            <View style={styles.modalContainer}>
                                {this.props.children}
                            </View>
                        </View> 
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

class StyleSheetFactory {
    static getSheet({
        boxBgColor, 
        fullscreen,
        bottomHalf,
        modalHeight
    }) {
        const styles = StyleSheet.create({
            mainContainer: { 
                flex: 1 ,
               
            },
            modalWrapper: {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                height: modalHeight,
                width: Dimensions.get('window').width,
                // borderTopRightRadius: 10,
                // borderTopLeftRadius:10,
                // borderTopWidth:1,
                // borderEndWidth:1,
                // borderStartWidth:1,
                // borderWidth:1,
//                 boxShadow: '0 -2 0 rgba(173, 243, 80, 0.3)',
// borderRadius: '17 18 0 0'
            },
            modalContainer: {  
                backgroundColor: boxBgColor,
                width: this.width,
                height: modalHeight,
                //borderWidth: 1,
                //borderColor: '#ADF350',
               // borderStyle: 'solid',
                paddingHorizontal: 10,
                //paddingVertical: 10,
                // borderTopWidth:1,
                // borderTopColor:'white',
                 borderRadius:10,
                //borderRadius: 10,
                //borderTopColor:'#ADF350'
                shadowColor: '#ADF350',
                shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 21
            }
        });

        if(fullscreen) {
            styles.modalWrapper = {
                ...styles.modalWrapper,
                flex: 1
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                flex: 1
            };
        }
        else if(bottomHalf) {
            styles.modalWrapper = {
                ...styles.modalWrapper,
                marginTop: modalHeight
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                flex: 1
            };
        }
        else { 
            styles.modalWrapper = {
                ...styles.modalWrapper,
                flex: 1
            };

            styles.modalContainer = {
                ...styles.modalContainer,
                marginHorizontal: 10
            }
        }

        return styles;
    }
}