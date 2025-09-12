import React from 'react';
import {Button} from "react-native";
import {useNavigation} from "@react-navigation/core";


export default function InformacionUsuario() {
    const navigation = useNavigation<any>();


    return(
        <>
            <Button title={"Ver Mis Favoritos"} onPress={() => navigation.navigate('Mis Favoritos')}></Button>
            <Button title={"Ver Peliculas populares"} onPress={() => navigation.navigate('Peliculas Populares')}></Button>
        </>
    );

};