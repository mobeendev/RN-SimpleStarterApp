import React, { Component } from 'react';
import { DefaultTheme } from '../styles/common'
import { StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native'
import { user } from '../store/user'
import { withNavigation } from 'react-navigation';

function isEmpty(value){
    return Object.keys(user).length === 0 && user.constructor === Object;
  }

class ProfileHeader extends Component{
    props: {
        style?: any, 
        name? : string,
        pin? : string,
        imageUri: string,
        onPress : () => mixed
    };

    constructor(props){
        super(props);

        this.state = {
            name: "",
            pin : '',
            picture: ""
        };        
    }

    componentDidMount(){
        if(isEmpty(user.profile)){
            this.setState({
                name: "",
                pin : '',
                picture: ""
            });
        }else{
            var name = user.profile.first_name + " " + user.profile.last_name
            var pin = user.pin;

            this.setState({
                name: name,
                pin : pin,
                picture: user.profile.image_name
            });
        }
    }


    onNavigationStateChange = (prevState, currentState) => {
        if(user.profile.first_name != null){
            var name = user.profile.first_name + " " + user.profile.last_name
            this.setState({
                name: name,
                picture: user.profile.image_name
            });
        }else{
            this.setState({
                name: "",
                picture: ""
            });
        }

    }

    render(){
        if (this.props.onPress) {
                return (
                  <TouchableOpacity
                    accessibilityTraits="button"
                    onPress={this.props.onPress}
                    activeOpacity={0.5}
                    style={[styles.container, this.props.style]}>
                    
                    <View style={[styles.container]}>
                        <Image source={{uri: this.state.picture}} style={[styles.profilePicture]} borderRadius={25} />
                        <View style={[styles.profileTextContainer]}>
                            <Text numberOfLines={1} style={[styles.titleText]}>
                                {this.state.name}
                            </Text>
                            <Text numberOfLines={1} style={[styles.textPin]}>
                                {this.state.pin}
                            </Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                );
        } else {
                return (
                    <View style={[styles.container]}>
                        <Image source={{uri: this.state.picture}} style={[styles.profilePicture, arrowStyle]} resizeMethod="scale"/>
                        <View style={[styles.profileTextContainer]}>
                            <Text numberOfLines={1} style={[styles.titleText]}>
                                {this.state.name}
                            </Text>
                            <Text numberOfLines={1} style={[styles.textPin]}>
                                {this.state.pin}
                            </Text>
                        </View>
                    </View>
                );
            }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 5
    },

    titleText: {
        color: DefaultTheme.textPrimaryInverseColor,
        fontSize : DefaultTheme.textContentSize,
        fontFamily: DefaultTheme.fontBold,
        fontSize: 18,
        paddingTop: 6,
        paddingBottom: 2
    },

    textPin: {
        color: DefaultTheme.textPrimaryInverseColor,
        fontSize : DefaultTheme.textContentSize,
        fontFamily: DefaultTheme.fontBold,
        fontSize: 14,
        paddingTop: 2,
        paddingBottom: 2,
        opacity: 0.8
    },

    profilePicture: {
        width: 50, 
        height: 50, 
        borderRadius: 25,
        marginRight: 10,
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: 2,
        resizeMode: 'cover'
    },

    profileTextContainer:{
        flex: 1,
        flexDirection: 'column', 
    }
  });

  export default withNavigation(ProfileHeader)