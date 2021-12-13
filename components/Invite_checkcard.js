import React, { Component } from 'react';
import {View , Text, StyleSheet, TouchableOpacity,Dimensions,Image, FlatList} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons'
import Avatar from './Avatar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Invite_Check_Card extends Component{
    renderNumber=(item)=>{
       // console.log('item number', item)
        return(
            <Text style={styles.phone}>{item.item.number}</Text>
        )
        
    }
     getAvatarInitials = (textString) => {
        if (!textString) return '';
        const text = textString.trim();
        const textSplit = text.split(' ');
        if (textSplit.length <= 1) return text.charAt(0);
        const initials =
          textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
        return initials;
      };
      
    render(){
        //console.log('contact in comp',this.props.item)
        const item = this.props.item;
      //  console.log('item', item)
        return(
            <TouchableOpacity
                style={styles.container}
                onPress={this.props.onPress}
            >
                <View style={styles.first_block}>
                <Avatar
              img={
                item.hasThumbnail ?
                  {uri: item.thumbnailPath} : undefined
              }
              placeholder={this.getAvatarInitials(
                `${item.givenName} ${item.familyName}`,
              )}
              width={40}
              height={40}
            />
                </View>
                <View style={styles.second_block}>
                    <View style={styles.name_block}>
                        <Text style={styles.name_text}>{item.givenName} {item.familyName}</Text>
                        <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
                        {/* <FlatList
                        renderItem={this.renderNumber}
                        data={item.phoneNumbers}
                        keyExtractor={(item, index)=>index.toString()}
                        /> */}
                    </View>
                    <View style = {styles.icon_block}>
                        <View 
                        style={{width:20,
                                height:20, 
                                backgroundColor:item.selected ? '#ADF350':'rgba(255, 255, 255, 0.1)',
                                justifyContent:'center',
                                alignItems:'center',
                                borderRadius:10}}
                            >
                        <MaterialIcons name='check' color={item.selected ? '#262727': '#AAAAAA'} size={18} />
                        </View>
                        
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        width:windowWidth-20,
        height:60,
        backgroundColor:'#262727',
        marginVertical:10,
        flexDirection:'row', 
        borderRadius:10

    },
    first_block:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    second_block:{
        flex:0.8,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    image_block:{
        width:40,
        height:40, 
        borderRadius:40/2
    },
    name_block:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'flex-start',
        flex:0.8
    },
    icon_block:{
        justifyContent:'center',
        alignItems:'center',
        flex:0.2,
       
    },
    icon_width:{
        width:20,
        height:20, 
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    name_text:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.2,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular',
    },
    phone:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 18,
        
        letterSpacing: 0.2,

        color: 'rgba(255, 255, 255, 0.5)'
    }
    
})