import React from 'react';
import Card from './Card';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableHighlight  } from 'react-native';

export  function CandidatureList(props) {
  
    return (
        <Card>
          <Text
            style={[styles.setColorWhite, styles.setFontSize, styles.setFontBold]}
          >
            {props.jobTitle}
          </Text>
        </Card>
    );
  
  
}

const styles = StyleSheet.create({

    setColorWhite : {
      color : '#fff'
    },
    setFontSize : {
      fontSize : 20,
    },
  
    setFontBold : {
      fontWeight : 'bold',
    },
});






