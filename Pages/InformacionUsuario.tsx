import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import GlobalContext from "../Provider/GlobalProvider";
import * as ImagePicker from 'expo-image-picker'




export default function InformacionUsuario() {
    const navigation = useNavigation();
    const { correoContext } = useContext(GlobalContext);
    const [image, setImage] = useState('')


    async function pickImage(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:['images','videos'],
            allowsEditing:false,
            quality:1,
        })

        if (!result.canceled){
            console.log(result.assets[0])
            setImage(result.assets[0].uri)
        }
    }

    async function takePhoto(){
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            quality:1,
        })

        if (!result.canceled){
            console.log(result.assets[0])
            setImage(result.assets[0].uri)
        }
    }

    return(
        <>
            <View style={styles.container} >

                <View style={styles.imageContainer}>
                    {
                        image && (
                            <Image source={{uri:image}} style={styles.image}></Image>
                        )
                    }
                </View>


                <Text style={styles.label}>{correoContext}</Text>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                        <Text style={styles.buttonText}>Abrir Galeria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePhoto}>
                        <Text style={styles.buttonText}>Tomar Fotografia</Text>
                    </TouchableOpacity>

                </View>



                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mis Favoritos')}>
                    <Text style={styles.buttonText}>Favoritos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Peliculas Populares')}>
                    <Text style={styles.buttonText}>Populares</Text>
                </TouchableOpacity>
                </View>
            </View>
        </>
    );

};



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
    },
    imageContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height: 100,
        width: 100,
        borderRadius: 10,
    }
});