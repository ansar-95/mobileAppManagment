import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableHighlight ,ScrollView } from 'react-native';
import Card from './Card';
import { FontAwesome5 } from '@expo/vector-icons';
import {SecureStore} from 'expo';
import {useSelector} from 'react-redux';


export default function Home({ navigation }) {




    var a = useSelector(state => state.candidature)
    const list = [];
    a.forEach(element => {
      list.push(
        <TouchableHighlight key={element.id} onPress={() => navigation.push('Details')}>
          <Card>
            <Text
              style={[styles.setColorWhite, styles.setFontSize, styles.setFontBold]}
              >
                  {element.jobTitle}
              
            </Text>

            <Text
              style={styles.setColorWhite}
            >{element.nomEntreprise}</Text>

            <Text
              style={styles.setColorWhite}
            >Date de la candidature  : {element.dateCandidature}</Text>
          
        </Card>
    </TouchableHighlight>
      )
    });

    
    return (

      <View style={styles.container}>
        <View style={styles.containerTwo}>
        <Text
            style={[ styles.setFontSize, styles.setFontBold,styles.setMarginLeft]}
          >
          Mes Candidatures :
          </Text>
        </View>
        <View style={styles.containerThree}>
          <ScrollView>
            {list}
          </ScrollView>
          
        </View>
  
        <View style={styles.containerFour}>
          <FontAwesome5  style={styles.setCircleAdd}name="plus-circle" size={60} color="#7FB3D5" onPress={() => navigation.push('Ajouter')} />
        </View>
        
      </View>
      
    );
  
    
  
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
  
      //justifyContent: 'center',
    },  
    containerOne : {
      flex: 0.3,
      alignItems:'center',
      justifyContent : 'center',
    },
    containerTwo : {
      flex: 0.10,
      justifyContent : 'center',
  
  
    },
    containerThree : {
      flex: 0.9,

      alignItems:'center',
    },
    
    containerFour : {
      flex: 0.15,
      alignItems:'flex-end',
      justifyContent : 'center',
      
    }, 
    tinyLogo: {
      width: 200,
      height: 200,
    },
    setColorWhite : {
      color : '#fff'
    },
    setFontSize : {
      fontSize : 20,
    },
  
    setFontSizeButton : {
      fontSize : 40,
    },
    setFontBold : {
      fontWeight : 'bold',
    },
    setMarginLeft : {
      marginLeft : '5%',
    },
    setCircleAdd : {
      marginRight : '3%',
    }
  
  
  
  });