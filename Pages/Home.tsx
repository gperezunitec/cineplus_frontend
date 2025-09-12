import {Alert, Button, Text, TextInput} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useContext, useState} from "react";
import { GlobalContext } from "../Provider/GlobalProvider";

export default function Home() {

    const {correoContext, setCorreoContext,passwordContext, setPasswordContext,idContext,setIdContext} = useContext(GlobalContext)
    const navigation = useNavigation();


    //Login
    const comprobarUsuario = async () => {
        if (!correoContext || !passwordContext) {
            Alert.alert("Error", "Debes ingresar correo y contraseña");
            return;
        }

        try {

            const response = await fetch("http://10.0.2.2:3000/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: correoContext,
                    password: passwordContext
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const id = data.usuario?.id;
                if (!id) {
                    Alert.alert("Error", "No se pudo obtener el ID del usuario");
                    return;
                }
                setIdContext(id);
                Alert.alert("Éxito", `Usuario encontrado, iniciando sesión`);
                navigation.navigate("Perfil");////MODIFICADO
            } else {
                Alert.alert("Error", data.message || "Usuario no encontrado");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
            console.error(error);
        }
    };


// 🔹 Función para crear usuario
    const crearUsuario = async () => {
        if (!correoContext || !passwordContext) {
            Alert.alert("Error", "Debes ingresar correo y contraseña");
            return;
        }

        try {
            const response = await fetch("http://10.0.2.2:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: correoContext,
                    password: passwordContext
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Éxito", "Usuario creado correctamente");
                setIdContext(data.usuario.id);
                navigation.navigate("Perfil");
            } else {
                Alert.alert("Error", data.message || "No se pudo crear el usuario");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
            console.error(error);
        }
    };




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
            <Button title={"Ingresar"} onPress={comprobarUsuario}></Button>
            <Button title={"Crear usuario"} onPress={crearUsuario}></Button>



        </>
    );

}