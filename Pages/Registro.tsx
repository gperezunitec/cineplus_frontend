import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


export default function Registro() {
    const [inputNombre, setInputNombre] = useState('')
    const [inputCorreo, setInputCorreo] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [inputConfirmPassword, setInputConfirmPassword] = useState('')

    const handleRegistro = () => {
       
        console.log('Nombre:', inputNombre)
        console.log('Correo:', inputCorreo)
        console.log('Contraseña:', inputPassword)
    }

    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Crear Cuenta</Text>

              
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>NOMBRE</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Jiara Martins"
                        placeholderTextColor="#888"
                        value={inputNombre}
                        onChangeText={setInputNombre}
                    />
                </View>


                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CORREO ELECTRONICO</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="hello@reallygreatsite.com"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={inputCorreo}
                        onChangeText={setInputCorreo}
                    />
                </View>


                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CONTRASEÑA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={inputPassword}
                        onChangeText={setInputPassword}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="********"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={inputConfirmPassword}
                        onChangeText={setInputConfirmPassword}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegistro}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center', 
        alignItems: 'center',     
        paddingHorizontal: 20,
    },
    contentContainer: {
        width: '100%', 
        alignItems: 'center',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#000',
    },
    inputGroup: {
        marginBottom: 20,
        width: '100%', 
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        width: '100%', 
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
})