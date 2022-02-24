import React, {useState} from 'react';
import { StyleSheet,  View,ScrollView, Alert  } from 'react-native';
import { TextInput, Button} from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import allActions from './actions'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as Calendar from 'expo-calendar';

export default function CreerCandidature(props){
    var currentDate = new Date();
    var options = {year: "numeric", month :"2-digit", day: "2-digit" };
    const [date, onChangeText] = React.useState(currentDate.toLocaleDateString("fr-FR", options));
    const dispatch = useDispatch()
    
    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          return result
        } else {
          return ""
        }
    }

    
    function valueDate(date){
        
        if(date.length == 2 || date.length == 5){
            date += '/';
        }

        return date;
    }


    const utcDateToString = momentInUTC => {
        let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        return s;
    };


    const startdateUtc = () =>{

        var date = new Date(); 
        date.setDate(date.getDate()+7)
        var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

        return new Date(now_utc);

    }

    const enddateNowUtc = () =>{

        var date = new Date(); 
        date.setDate(date.getDate()+7)
        date.setDate(date.getHours()+2)
        var now_utc =  Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

        return new Date(now_utc);

    }

    let saveCandidature = async() => {


        if(props.poste == null || props.lieu == null || props.nomEntreprise == null || props.type == null ||props.description == null || date == null){
            Alert.alert("Veuillez remplir tout les champs")
        }else {

            let id  = await getValueFor('id')
            let token = await getValueFor('token')

            const candidature = await fetch('http://192.168.1.22:3000/api/candidature', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`, // notice the Bearer before your token
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId : id,
                    jobTitle : props.poste,
                    location : props.lieu,
                    nomEntreprise : props.nomEntreprise,
                    typeDeContrat : props.type,
                    descriptionPost : props.description,
                    date : date,
                })
            }).then(res =>res.json()).then(candidature => {return candidature});    
            
            
            let datCandidature = {
                id : candidature.data._id,
                jobTitle : candidature.data.jobTitle,
                location : candidature.data.location,
                nomEntreprise : candidature.data.nomEntreprise,
                dateCandidature : candidature.data.dateCandidature
            }
            dispatch(allActions.candidatureActions.setCandidature(datCandidature))
            
            const details = {
                endDate: utcDateToString(startdateUtc()),
                notes: "Relancer la candidature pour le poste de " +datCandidature.jobTitle+"chez"+ datCandidature.nomEntreprise,
                startDate: utcDateToString(startdateUtc()),
                title: "Rappel candidature",
            };
            await Calendar.createEventAsync('10',details)

            props.navigation.goBack() 

        }
    }





    return (
        
        <View  style={styles.containerThree}>
            <ScrollView style={styles.setHeight}>
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight]}
            mode="outlined"
            label="Nom du poste"
            value={props.poste}
        />
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Lieu"
            value={props.lieu}
        />
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Nom de l'entreprise"
            value={props.nomEntreprise}
        />
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Type de contrat"
            value={props.type}
        />
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Description"
            multiline={true}
            numberOfLines={15}
            value={props.description}
        />
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight,styles.setMarginTop]}
            mode="outlined"
            label="Date de la candidature"
            keyboardType="numeric"
            onChangeText={onChangeText}
            value={valueDate(date)}
        />

        <Button
            mode="contained"
            style={[styles.setMarginLeft,styles.setMarginRight, styles.setMarginTop]}
            color='#7FB3D5'
            onPress={saveCandidature}
            >
            Enregistrer
        </Button>

        </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({

    containerThree: {
        flex: 0.8,
        //backgroundColor : 'blue'
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
    setHeight : {
        height : 50
    }


})
