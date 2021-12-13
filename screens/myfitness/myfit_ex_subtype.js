import React, { Component } from 'react';
import { View, Text,StyleSheet,Button,FlatList ,TouchableOpacity, Dimensions,Image, ActivityIndicator,RefreshControl} from 'react-native';
data = ['1','2','3','4','5','6', '7'];

import {MaterialIcons} from 'react-native-vector-icons'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import  {getSubcategory , setSubcategoryNull} from '../../actions/fitness';
import { connect } from 'react-redux';
export class MyFitness_Subtype extends Component{
    constructor(props){
        super(props);
        this.state={
            category_type:'',
            id:''
        }
    }
      componentDidMount=()=>{
         // this.changeTitleText
        const { title,id } = this.props.route.params;
        this.props.navigation.setOptions({ title: title });
        this.props.dispatchgetSubcategory(id);
        this.setState({
            category_type:title,
            id:id
        })
       
      }
      componentWillUnmount(){
        this.props.dispatchsubCategoryNull();
      }
      refresh=()=>{
       // console.log('refresh is calinng in refresh', this.state.id)
        
        if(this.state.id !=='' && this.state.id !== undefined){
          this.props.dispatchgetSubcategory(this.state.id);
        }
    }
      EmptyListMessage = ({item}) => {
        return (
          // Flat List Item
          <Text
            style={styles.emptyListStyle}
            //onPress={() => getItem(item)}
            >
            Something went wrong!
          </Text>
        );
      };
      renderItems=({item, index})=>{
         // console.log('item in sub category', item)
          const  image = this.props.image_url+'/'+item.subcategory_image
         // console.log('image in subcategory', image)
          var trimmedString='';
          var newstr=''
          if(item.subcategory_name.length > 32){
             trimmedString = item.subcategory_name.substring(0, 32);
           newstr = trimmedString.concat('...');
          }else{
            newstr = item.subcategory_name
          }
          
        return(
            <TouchableOpacity 
              style={styles.touchable}
              key={index}
              onPress={() => {
               
                this.props.navigation.navigate('add_sets', {
                  title: item.subcategory_name,
                  id:item.id, 
                  category_type:item.category_id,
                  swr:item.swr_status
                });
              }}
            >
                
            <View style={styles.image_block}>
                 <Image style={{width:70, height:70,backgroundColor:'rgba(255, 255, 255, 0.2)',borderRadius:10}}  source={{uri: image}}/>
            </View>
               <View style={styles.detail_bloack}>
                   <View style={{flex:1, justifyContent:'space-between'}}>
                    <View>
                       <Text style={styles.title}>{newstr}</Text>
                    </View>

                   {/* <View style={{flexDirection:'row'}}>
                       <View style={{background:'#1F1F1F', borderRadius:12}}>
                           <Text style={styles.strength}>{item.description}</Text>
                        </View>
                       <View  style={{background:'#1F1F1F', borderRadius:12}}>
                       <Text style={styles.strength}>{item.balance}</Text>
                       </View>
                   </View>

                   <View>
                       <Text style={styles.lbs}>{item.lbs} | {item.calories} | {item.mins}</Text>
                   </View> */}
                   </View>
               </View>
               <View style={styles.icon_block}>
                <MaterialIcons name='keyboard-arrow-right' color='black' size={20} />
                </View>   
            </TouchableOpacity>
        )
    }
    
    render(){
        
        
        return(
            <View  style={styles.container}>
                {
                        this.props.fitLoading ? <View style={{width:windowWidth, justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor:'#1F1F1F', }}>
                        <ActivityIndicator size='large' color='white'/>
                      </View> :
                       <FlatList
                       data={this.props.sub_category}
                       renderItem={(item, index)=>this.renderItems(item, index)}
                       keyExtractor={(item,index)=>index.toString()}
                       ListEmptyComponent={this.EmptyListMessage}
                       refreshControl={
                        <RefreshControl
                          refreshing={this.props.fitLoading}
                          onRefresh={this.refresh}
                          tintColor='white'
                          color='white'
                          progressBackgroundColor='white'
                        />
                      }
                       />
                    }
               
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {fitLoading, sub_category,image_url} = state.fitness
   return { JWT_Token,fitLoading, sub_category,image_url}
  }
  const mapDispatchToProps = {
    dispatchgetSubcategory: (id) => getSubcategory(id),
    dispatchsubCategoryNull:() => setSubcategoryNull()
   }
export default connect(mapStateToProps, mapDispatchToProps)(MyFitness_Subtype);
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:83
    },
    touchable:{
        flex:1,
        width:windowWidth -20,
        flexDirection:'row',
        height:80,
        backgroundColor:'#262727',
        marginVertical:10,
        borderRadius:10,
        position:'relative'
    },
    image_block:{
        flex:2.5,
        width:50,
        justifyContent:'center',
        alignItems:'center'
    },
    detail_bloack:{
        flex:7.5,
        flexDirection:'column',
        justifyContent:'center',
        marginVertical:10

    },
    title:{
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:14,
        lineHeight:17,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    strength:{
        color:'rgba(255, 255, 255, 0.5)',
        fontSize:10,
        lineHeight:12,
        fontStyle:'normal',
        backgroundColor:'#1F1F1F',
        paddingVertical:3,
        paddingHorizontal:7,
        borderRadius:10,
        marginRight:10,
        fontFamily:'Montserrat-Regular'
    },
    lbs:{
        color:'rgba(173, 243, 80, 0.5)',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15
    },
    icon_block:{
        position:'absolute',
        top:28,
        right:10,
        backgroundColor:'#ADF350',
        width:24,
        height:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        color:'rgba(173, 243, 80, 0.5)'
      },
})