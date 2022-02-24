import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableHighlight  } from 'react-native';
import { TextInput,Button  } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useDispatch,useSelector } from 'react-redux';
import allActions from './actions'

export default function Login({ navigation }) {





    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(allActions.candidatureActions.resetCandidature())
    })

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          return result
        } else {
          return ""
        }
    }
    const handleLogin = async () => {

        if(login != null && password != null){

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: login, password : password })
            };
            let data = await  fetch('http://192.168.1.22:3000/api/auth/login', requestOptions)
                .then(response => response.json())
            
            save('token',data.token)
            save('id',data.userId)
            dispatch(allActions.userActions.setUser(data))

            dispatch(allActions.candidatureActions.resetCandidature())
            const candidatureData = await fetch(`http://192.168.1.22:3000/api/candidature/${data.userId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${data.token}`, // notice the Bearer before your token
            },
            }).then(response => response.json())
            
            candidatureData.forEach(element => {
                let datCandidature = {
                    id : element._id,
                    jobTitle : element.jobTitle,
                    location : element.location,
                    nomEntreprise : element.nomEntreprise,
                    dateCandidature : element.dateCandidature
                }
                dispatch(allActions.candidatureActions.setCandidature(datCandidature))
            });
            



            navigation.push('Home')

        }

    }





    return (

      <View style={styles.container}>
            <View style={styles.containerOne}>
                <Image
                    style={styles.tinyLogo}
                    source={require('./assets/img/recruiting.png')} />
            </View>

            <View style={styles.containerTwo}>

            <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight]}
            mode="outlined"
            label="Login"
            placeholder="example@gmail.com"
            onChangeText={setLogin}
            value={login}
            />

            <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            />

            <Button 
                style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
                mode="contained" 
                onPress={handleLogin}
                >
                Se connecter
            </Button>

            </View>

      </View>
      
    );
  
    
  
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    
    containerOne : {
        flex: 0.3,
        alignItems:'center',
        justifyContent : 'center',

    },
    containerTwo : {
        flex: 0.3,
        justifyContent : 'center',
        //alignItems:'center',
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    setMarginLeft : {
        marginLeft : '7%',
    },
    setMarginRight : {
        marginRight : '7%',
    },
    setMarginTop : {
        marginTop : '5%',
    },
    setHeightButton : {
        height : 100,
    },
    setAlignItems : {
        alignItems : 'center'
    }





})
