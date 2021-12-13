import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export class WebView_Screen extends Component {
    constructor(props){
        super(props);
        this.state={
            url:''
        }
    }
    componentDidMount(){
        const { title, url} = this.props.route.params;
        this.props.navigation.setOptions({ title: title });
        this.setState({
            url:url
        })
    }
  render() {
    //console.log('this.state in webview', this.state.url)
    return (
      <WebView
      style={{marginBottom:70, paddingBottom:12}}
        source={{ uri: this.state.url }}
       // style={{ marginTop: 20 }}
      />
    );
  }
}
export default WebView_Screen