import { Button, Text, TextInput, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {useContext, useState} from "react";
import GlobalContext from "../Provider/GlobalProvider";
import Logo from '../assets/imagenes/LogoCineplus.png';


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

            const responseCheck = await fetch(`http://10.0.2.2:3000/usuarios?correo=${correoContext}`);
            const usuariosExistentes = await responseCheck.json();

            if (usuariosExistentes.length > 0) {
                Alert.alert("Error", "El usuario ya existe con este correo");
                return;
            }


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


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logo}
                />
            </View>

            <Text style={styles.heading}>INICIO DE SESIÓN</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>CORREO</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor="#888"
                    value={correoContext}
                    onChangeText={text => setCorreoContext(text)}
                />

                <Text style={styles.label}>PASSWORD</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={passwordContext}
                    onChangeText={text => setPasswordContext(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={comprobarUsuario}>
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={crearUsuario}>
                    <Text style={styles.buttonText}>Crear usuario</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 50,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 5,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000',
    },
    formContainer: {
        width: '80%',
    },
    label: {
        fontSize: 16,
        color: '#0c0b0bff',
        marginBottom: 5,
        marginTop: 15,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#f7f2f2ff',
    },
    buttonContainer: {
        marginTop: 30,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '48%',
    },
    buttonSecondary: {
        backgroundColor: '#555',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    registerButton: {
        marginTop: 20,
        padding: 10,
    },
    registerText: {
        color: '#888',
        fontSize: 16,
    },
    registerLink: {
        color: '#000',
        fontWeight: 'bold',
    }
});
