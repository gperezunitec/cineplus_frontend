import {Button, Text, TextInput} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useState} from "react";

export default function Home() {

    const navigation = useNavigation();
    const [inputCorreo, setInputCorreo] = useState()
    const [inputPassword, setInputPassword] = useState()




    return(
        <>
            <Text>Inicio de Sesion</Text>
            <Text>Correo</Text>
            <TextInput
                placeholder="Correo"
                value={inputCorreo}
                onChangeText={text => setInputCorreo(text)}
            />
            <Text>Password</Text>
            <TextInput
                placeholder="Password"
                value={inputPassword}
                onChangeText={text => setInputPassword(text)}
            />
            <Button title={"Ingresar"}></Button>
            <Button title={"Ver Peliculas populares"}
                    onPress={() => navigation.navigate('Peliculas Populares')}></Button>

        </>
    )
}