import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import RadioButton from '../../components/RadioButton';
import Btn_continue from '../../components/Btn_continue';
import color from '../../constant/colors';
import { connect } from 'react-redux';
import {MaterialIcons} from 'react-native-vector-icons';


import { setProfileValue } from '../../actions';

const PROP = [
	{
		key: 'male',
		text: 'Male',
	},
	{
		key: 'female',
		text: 'Female',
	},
	
];
export class Onboarding_One extends Component{
    constructor(props){
        super(props);
        this.state={
            error:''
        }
        this.ChildElement = React.createRef();
    }
    onPress_btn=()=>{
        if(this.validate()){
          //   console.log('validation true');
            // this.setState(defaultState);
            const childelement = this.ChildElement.current;
            const gender = childelement.state.value
            this.props.dispatchSetProfileValue('gender', gender);

        this.props.navigation.navigate('Onboard_two')
        }
    }
    
    validate=()=>{

        // /this.props.navigation.navigate('Onboard_two')
    //}
    //handleClick = () => {
        const childelement = this.ChildElement.current;
        const gender = childelement.state.value
        
       if(gender == null){
           this.setState({
               error:'Please select gender first!'
           })
           return false;
       }
        
          
        return true;
          
          
    };
    // handleClick=()=>{
    //     console.log('log', this.props.profile)
    // }
    render(){
       // console.log('profile in gender', this.props.gender)
        return(
            <View style={styles.container}>
                <View
                style={styles.backround_block}
                >
                
                </View>

                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{width:'85%', alignItems:'center', justifyContent:'flex-start', flexDirection:'row', marginTop:40}}>
                    <MaterialIcons name='keyboard-arrow-left' color='white' size={25} />
                    </TouchableOpacity>
                    <View style={styles.text_block}>
                        <View style={{marginTop:20}}>
                        <Text style={styles.create_head}>Help us create the best</Text>
                        <Text style={styles.create_head}>workout experience for you</Text>
                        </View>
                        <View>
                           <RadioButton ref={this.ChildElement}   PROP={PROP}/>
                           <Text style={{color:'red', fontFamily:'Montserrat-Regular'}}>{this.state.error}</Text>
                        </View>
                    </View>
                   
                <View style={{flex:0.3}}/>
                    
                
                <View style={styles.bloack_2}>
                    
                    <View style={{flex:1, flexDirection:'row', marginBottom:40}}>
                        <View style={styles.pagination_big}></View>
                        <View style={styles.pagination_small}></View>
                        <View style={styles.pagination_small}></View>
                    </View>
                    <View style={styles.Btn_continue}>
                    <Btn_continue onboard={true} onPress={this.onPress_btn} title='Next'/>
                    </View>
                </View>
                
            </View>
        )
    }
}
const mapStateToProps = state => {
    const {user,isLoggedIn,autherror,JWT_Token, gender} = state.auth
   return { user,isLoggedIn,autherror,JWT_Token, gender }
  }
  
  const mapDispatchToProps = {
    dispatchSetProfileValue:(fieldName, value)=>setProfileValue(fieldName,value)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Onboarding_One)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        position:'relative',
        backgroundColor:'#363636'
    },
    backround_block:{
        position:'absolute',
        width:679,
        height:679,
        left:-60, 
        top:-260,
        backgroundColor:'#262727', 
        borderRadius:679/2
    },
    block_1:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'center'
    },
    bloack_2:{
        flex:1,
        justifyContent:'center',
        alignItems:'flex-end', 
        flexDirection:'row',
        width:'80%',
        //marginBottom:50
    },
    text_block:{
        
        flex:1,
        justifyContent:'space-between',
        alignItems:'flex-start',
        //marginTop:40,
        width:'80%'
    },
    checkbox_block:{
        flex:1
    },
    btn_block:{
        flex:1
    },
    create_head:{
        fontSize:20,
        fontWeight:'600',
        lineHeight:28,
        color:'#FFFFFF',
        fontFamily:'Montserrat-Regular'
    },
    Btn_continue:{
        flex:2,
       // width:'80%',
       marginBottom:40,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    pagination_big:{
        width:34,
        height:8,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        marginRight:10
    },
    pagination_small:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        marginRight:10
    },
    btn_con:{
        width:'70%',
        height:48,
        backgroundColor:color.primary,
        borderRadius:50/2,
        justifyContent:'center',
        alignItems:'center'
        
    },
    
})