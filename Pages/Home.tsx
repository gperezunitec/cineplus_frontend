import {Button, Text, TextInput} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useContext, useState} from "react";
import GlobalContext from "../Provider/GlobalProvider";

export default function Home() {

    const {correoContext, setCorreoContext,passwordContext, setPasswordContext} = useContext(GlobalContext)


    const navigation = useNavigation();



    return(
        <>
            <Text>Inicio de Sesion</Text>
            <Text>Correo</Text>
            <TextInput
                placeholder="Correo"
                value={correoContext}
                onChangeText={text => setCorreoContext(text)}
            />
            <Text>Password</Text>
            <TextInput
                placeholder="Password"
                value={passwordContext}
                onChangeText={text => setPasswordContext(text)}
            />
            <Button title={"Ingresar"}></Button>
            <Button title={"Crear usuario"}></Button>
            <Button title={"Ver Peliculas populares"} onPress={() => navigation.navigate('Peliculas Populares')}></Button>
            <Text>{correoContext}</Text>

        </>
    );

}