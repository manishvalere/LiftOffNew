{/* <Item regular>
            <Input placeholder='Regular Textbox' />
          </Item> */}
          import { Container, Header, Content, Item, Input, Icon } from 'native-base';
          import React from 'react';
          import {StyleSheet} from 'react-native';
          
          export default class InputTextEdit extends React.Component{
              render(){
                  return(
                      <Item style={styles.item} >
                          <Input 
                          {...this.props}
                          placeholder={this.props.placeholder} 
                          placeholderTextColor='#FFFFFF'
                          style={styles.input}
                          keyboardType={this.props.keyboardType}
                          placeholder={this.props.placeholder} 
                          value={this.props.value}
                          //onChange={(text)=>this.props.onChange(text)} 
                          style={styles.input}
                          disabled= {this.props.disable}
                          />
                      </Item>
                      
                  )
              }
          }
          const styles = StyleSheet.create({
              item:{
                  height:60,
                  width:'95%',
                  borderBottomColor:'rgba(255, 255, 255, 0.3)'
              },
              input:{
                  fontSize:16,
                  lineHeight:20,
                  fontWeight:'500',
                  color:'#FFFFFF',
                  width:'100%',
                  fontFamily:'Montserrat-Regular'
              }
          })