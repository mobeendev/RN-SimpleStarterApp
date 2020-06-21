//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import {UserStore} from '../utils/store/user'
import * as usersApi from '../utils/network/OflApi'

// create a component
class MapScreen extends Component {
    state={
        email:'',
        password:'',
        error:'',
        token: "",
        url : "",  
        loading:false
    }

    componentDidMount(){
      console.log(this.state.token);
    }

    onBottomPress = () =>{
      
    


      UserStore.token().then((response) => {
        this.setState({ 
          token: response,           
           url : this.props.uri+"?user_token="+response,
          loading: false
        })


    }).catch((e) => {
      console.error(e)
    });



      console.log(this.state.token);

    }
   


    render() {
        return (
            <View style={styles.container}>
                 <TextInput
                    placeholder="email" 
                    style={styles.input} 
                    value={this.state.email}
                    onChangeText={email=> this.setState({email})}
                     />

                 <TextInput 
                    placeholder="password" 
                    style={styles.input}
                    secureTextEntry
                     value={this.state.password}
                     onChangeText={password => this.setState({password})}
                     />

                

                 <TouchableOpacity style={styles.buttonContainer} onPress={this.onBottomPress} >
                     <Text style={styles.buttonText}>Login</Text>
                 </TouchableOpacity>

                 <Text style={styles.errorText} >
                         {this.state.error}
                     </Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20
      
     
    },
    input:{
        height:40,
        backgroundColor:'rgba(255,255,255,.5)',
        paddingLeft:10,
        marginBottom:15,
        borderRadius:5,
        fontSize:15,
    
    },
    errorText:{
        fontSize:25,
        color:'red',
        alignSelf:'center',
        marginTop:10

    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    buttonContainer:{
        backgroundColor:'#3B3B98',
        padding:15,
        borderRadius:8
    }
});

//make this component available to the app
export default MapScreen;
