import * as React from 'react';
import { StyleSheet,  View,Text  } from 'react-native';

import { TextInput, Switch  } from 'react-native-paper';
import CreerCandidature from './CreerCandidature';
import RemplissageAutomatique from './RemplissageAutomatique';

export default function Ajouter({ navigation }){
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [clickValidate, setClickValidate] = React.useState(false);
    const [dataCandidature, setDataCandidature] = React.useState({});
    const [link, setLink] = React.useState("");

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    handleToUpdate = handleToUpdate.bind(this)

    function handleToUpdate(arg) {
        setClickValidate(true)
        setLink(arg)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: arg })
        };
        fetch('http://192.168.1.22:3000/api/offreEmploie/indeed', requestOptions)
            .then(response => response.json())
            .then(json => setDataCandidature(json))
            .catch(error => console.log(error))

    }



    return (
        <View style={styles.container}>
        <View  style={styles.containerOne}>
            <View style={styles.containerRaw}>
                <View style={styles.containerOneRaw}>
                    <Text style={[styles.setFontSizeTextTitle,styles.setfontStyleTextTitle,styles.setPaddingBottom]}>Remplissage automatique</Text>
                </View>
                <View style={styles.containerTwoRaw}>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />    
                </View>
            
            </View>


        </View>


        {
            isSwitchOn == true ?
            <RemplissageAutomatique handleToUpdate = {handleToUpdate.bind(this)}/>
            :
            <CreerCandidature/>
        }
        {
            isSwitchOn == true  && clickValidate == true
            ?
            <CreerCandidature 
                poste={dataCandidature.jobTitle}
                lieu={dataCandidature.location}
                nomEntreprise={dataCandidature.nomEntreprise}
                type={dataCandidature.typeDeContrat}
                description={dataCandidature.descriptionPost}
                navigation={navigation} 
                />
            : null
        } 


        

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerOne: {
        flex: 0.1,
        //backgroundColor : 'yellow',
        justifyContent : 'center',
    },
    containerTwo: {
        flex: 0.2,
        //backgroundColor : 'blue'
    },
    containerRaw: {
        flexDirection : 'row',
        //backgroundColor : 'grey',
        justifyContent : 'center',
    },
    containerOneRaw: {
        flex: 0.5,
        //backgroundColor : 'red',
        justifyContent : 'center',
        alignItems : 'center',
    },
    containerTwoRaw: {
        flex: 0.5,
        //backgroundColor : 'green',
        justifyContent : 'center',
        alignItems : 'flex-end'
    },
    input: {
        marginLeft : '5%',
        marginRight : '5%',
        height: '27%',
        borderRadius : 8,
        borderWidth: 1,
        padding: 10,
    },
    setMarginLeft : {
        marginLeft : '7%',
    },
    setMarginRight : {
        marginRight : '7%',
    },
    setFontSizeTextTitle : {
        fontSize : 14,
    },
    setfontStyleTextTitle : {
        fontWeight : 'bold'
    },
    setPaddingBottom : {
        paddingBottom : '1%'
    }






  });

