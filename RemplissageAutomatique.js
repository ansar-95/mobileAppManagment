import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { TextInput, Button   } from 'react-native-paper';
export default function RemplissageAutomatique(props){

    var handleToUpdate  = props.handleToUpdate;
    const [link, onChangeLink] = React.useState("");

    return (
        <View  style={styles.containerTwo}>
        <TextInput
            style={[styles.setMarginLeft,styles.setMarginRight]}
            mode="outlined"
            label="Remplir automatiquement via un lien"
            placeholder="Uniquement Indeed"
            onChangeText={onChangeLink}
            value={link}
        />
          <Button
            mode="contained"
            style={[styles.setMarginLeft,styles.setMarginRight, styles.setMarginTop]}
            color='#7FB3D5'
            onPress={() => handleToUpdate(link)}
            >
            Valider
         </Button>


        

        </View>
    )

}

const styles = StyleSheet.create({

    containerTwo: {
        flex: 0.2,
        //backgroundColor : 'blue'
    },
    setMarginLeft : {
        marginLeft : '7%',
    },
    setMarginRight : {
        marginRight : '7%',
    },
    setMarginTop : {
        marginTop : '2%',
    }


})
