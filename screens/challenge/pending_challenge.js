import React, { Component } from 'react';
import { Text, View, FlatList,StyleSheet,Dimensions, TouchableOpacity,RefreshControl } from 'react-native';

import {MaterialIcons} from 'react-native-vector-icons'
import Btn_continue from '../../components/Btn_continue';
import { connect } from 'react-redux';
import { getPendingChallenge,setAcceptChallenge,setDenyChallenge } from '../../actions/challenge';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const data = [
    {
        id:'1',
        selected:false
    },
    {
        id:'2',
        selected:false
    },
    {
        id:'3',
        selected:false
    },
    {
        id:'4',
        selected:false
    },
    {
        id:'5',
        selected:false
    },
    {
        id:'6',
        selected:false
    },
    {
        id:'7',
        selected:false
    }
]
export  class PendingChallenge extends Component{
    
    constructor(props){
        super(props);
        this.state={
            selected:[]
        }
    }
    componentDidMount=()=>{
        // this.changeTitleText
       const { title,id } = this.props.route.params;
       this.props.navigation.setOptions({ title: title });
       this.refresh();
       
    }
    componentDidUpdate(prevProps){
        if(this.props.pendingChange !== prevProps.pendingChange){
            if(this.props.pendingChange){
                this.refresh()
            }
        }
    }
    refresh=()=>{
         
        this.props.dispatchgetPendingChallenge(this.props.JWT_Token)
     }
     onDeny=()=>{
        this.props.dispatchsetAcceptChallenge('Decline', this.state.selected, this.props.JWT_Token)
     }
     onAcept=()=>{
        this.props.dispatchsetAcceptChallenge('Accept', this.state.selected,this.props.JWT_Token)
     }
     onItemPress=(item)=>{
        // console.log('onPress on item',contact)
        // const cont = this.state.contacts
        var selected = this.state.selected
        this.setState(prevState => ({
          
            selected: [...prevState.selected, item.id],
          //contact: [...prevState.contact, contact.item.phoneNumbers[0].number]
        }))

        if(item['selected']){
          item['selected'] = false;
        // console.log('if in contact ', )
          selected = selected.filter(e => e !== item.id); // will return ['A', 'C']
          this.setState({
            
            selected:selected
          })
        }else if(!item['selected']){
          item['selected'] = true;
         
        }
        //console.log('selected', this.state.selected)
     }
    renderItem=(item)=>{
       // console.log('pending item', item)
        return(
            
            <TouchableOpacity onPress={()=>this.onItemPress(item.item)} style={styles.item_bloack}>
                <View style={styles.firstBlock}>
                   <View>
                   <Text style={styles.challenge_name}>{item.item.subcategory_name}</Text>
                   </View>
                   <View style={styles.seprator}>

                   </View>
                   <View>
                       {item.item.exercise_type ==  'All' ? <Text style={styles.challenge_detail}>{item.item.description.sets } Sets | {item.item.description.reps } Reps | {item.item.description.duration } Days</Text> : 
                       <Text style={styles.challenge_detail}>{item.item.description.distance} KM | {item.item.description.time} Hour | {item.item.description.duration } Days</Text>
                       }
                   </View>
                </View>
               {
                   item.item.selected ?  <View style={styles.icon_block}>
                   <MaterialIcons name='check' color='black' size={20} />
                   </View> :
                    <View style={styles.no_icon_block}>
                    <MaterialIcons name='check' color='black' size={20} />
                    </View>
               }
                 
            </TouchableOpacity>
            
            
        )
    }
    emptycomp=()=>{
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#ADF350', fontFamily:'Montserrat-Regular', fontSize:16, marginTop:15}}>No Pending Challenges!</Text>
            </View>
        )
    }
    render(){
      //  console.log('this.props.chllenge',this.props.pendingChallenge)
        return(
            <View style={styles.container}>
                <FlatList
                  data={this.props.pendingChallenges}
                  keyExtractor={(item)=>item.id}
                  renderItem={(item)=>this.renderItem(item)}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={this.emptycomp}
                  refreshControl={
                    <RefreshControl
                    refreshing={this.props.challengeLoading}
                      onRefresh={this.refresh}
                      tintColor='white'
                      color='white'
                      progressBackgroundColor='white'
                      
                    />
                  }
                />
               {this.props.pendingChallenges !== null && this.props.pendingChallenges.length > 0 ?
            <View style={{flexDirection:'row', width:'95%', marginHorizontal:10,marginTop:20,marginBottom:20, justifyContent:'center', alignItems:'center' }}>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
            <Btn_continue onboard={true} black={true} onPress={this.onDeny}  title='Deny' />
            </View>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}> 
            <Btn_continue onboard={true} onPress={this.onAcept} title='Accept'/>
            </View>
           
            
        </View> : null   
            }
            </View>
            
        )
    }
}
const mapStateToProps = state => {
    const {JWT_Token} = state.auth
    const {challengeLoading,challengeError,pendingChallenges,pendingChange} = state.challenge
    return { JWT_Token,challengeLoading,challengeError,pendingChallenges,pendingChange}
 
  }
  const mapDispatchToProps = {
    dispatchgetPendingChallenge:(jwt)=>getPendingChallenge(jwt),
    dispatchsetAcceptChallenge:(type, status, jwt)=>setAcceptChallenge(type,status, jwt),
    dispatchsetDenyChallenge:()=>setDenyChallenge()
   }
  export default connect(mapStateToProps, mapDispatchToProps)(PendingChallenge)
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        
        marginBottom:83
    },
    head_block:{
        flexDirection:'row',
        justifyContent:'space-between',
       // width:'85%',
        alignItems:'center',
        marginVertical:10,
        //flex:1,
        alignItems:'center',
        backgroundColor:'white'

    },
    item_bloack:{
        width:'95%', 
        height:81, 
        backgroundColor:'#262727',
        marginHorizontal:10, 
        marginBottom:20,
        marginTop:10,
        borderRadius:10,
        flexDirection:'row',
        position:'relative'
    },
    firstBlock:{
        flex:0.6,
        flexDirection:'column',
        justifyContent:'space-around',
        marginLeft:10,
        marginVertical:10
    },
    roundBlock:{
        flex:0.4,
        position:'relative'
    },
    seprator:{
        height:1, 
        backgroundColor:'#1F1F1F'
    },
    round_absolute:{
        position:'absolute',
        backgroundColor:'#262727',
        width:98,
        height:98,
        borderRadius:100/2,
        top:-7,
        right:10,
        justifyContent:'center',
        alignItems:'center'
       
    },
    challenge_name:{
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        color: '#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    challenge_detail:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 15,
        color: 'rgba(255, 255, 255, 0.3)',
        fontFamily:'Montserrat-Regular'
    },
    progress_text:{
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',

        color: 'rgba(173, 243, 80, 0.5)'
    },
    icon_block:{
        position:'absolute',
        top:28,
        right:20,
        backgroundColor:'#ADF350',
        width:24,
        height:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    },
    no_icon_block:{
        position:'absolute',
        top:28,
        right:20,
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        width:24,
        height:24,
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center'
    }
})