import React from 'react';
import { StyleSheet,  View } from 'react-native';

export default function Card(props){
    return (
        <View style={style.card}>
            <View style={style.cardContent}>
                {props.children}
            </View>
        </View>
    )

}

const style = StyleSheet.create({
    card : {

        borderRadius : 15,       
        elevation : 3,
        backgroundColor : '#A9DFBF',
        shadowOffset : {width : 1,height :1},
        shadowColor : "#333",
        shadowOpacity : 0.9,
        shadowRadius : 15,
        marginHorizontal:4,
        marginVertical : 6,
    },
    cardContent : {
        marginHorizontal : '10%',
        marginVertical: 10,
        color : '#fff',
    }
})