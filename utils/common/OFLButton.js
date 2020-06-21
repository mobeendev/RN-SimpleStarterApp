import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, I18nManager } from "react-native";
import { DefaultTheme } from '../styles/common'

/* constants ================================================================ */

const BUTTON_HEIGHT = 56;

/* <DimButtonRound />
============================================================================= */

export class OFLButton extends React.Component{
    props : {
      style?: any, 
      icon? : number,
      text? : string,
      color: string,
      onPress : () => mixed
    };
  
    constructor(props) {
      super(props);
    }
  
    render(){
  
      const parentStyle = {
        borderColor: this.props.color,
      }
  
      const textStyle = {
        color: this.props.color
      }
  
      let content = (<Text style={[styles.text, textStyle]}>
        {this.props.text.toUpperCase()}
      </Text>)
  
  
  
      if (this.props.onPress) {
        return (
          <TouchableOpacity
            accessibilityTraits="button"
            onPress={this.props.onPress}
            activeOpacity={0.5}
            style={[styles.container, this.props.style, parentStyle]}>
            {content}
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={[styles.container, this.props.style, parentStyle]}>
            {content}
          </View>
        );
      }
    }
  }
  
  /* StyleSheet
  ============================================================================= */
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 10
    },
  
    text: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
      paddingTop: 10,
      paddingBottom: 10,
      paddingStart: 5,
      paddingEnd: 5,
      textAlign: "center",
      fontFamily: DefaultTheme.fontContent,
    }
  });