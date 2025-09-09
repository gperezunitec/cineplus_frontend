import { View, Text, Button, Image, StyleSheet, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'



export default function Camara() {

    const [image, setImage] = useState('');

    async function pickImage(){
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 1,

        })

        if (!result.canceled){
            console.log(result.assets[0])
                setImage(result.assets[0].uri)
            
        }


    }

    async function takePhoto(){
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled){
            console.log(result.assets[0])
            setImage(result.assets[0].uri)
        }
    }


  return (
    <View style={styles.container}>

        <Text style={styles.heading}>Camara</Text>

        <View style={styles.buttonSpacing}>
            <TouchableOpacity onPress={pickImage} style={styles.button}>
                <Text style={styles.buttonText}>Abrir Galería</Text>
            </TouchableOpacity>
        </View>

            <View style={styles.buttonSpacing}>
                <TouchableOpacity onPress={takePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>Tomar Fotografía</Text>
                </TouchableOpacity>
            </View>

            
            {
            
            image && (
                <View style={styles.imageContainer}>
                    <Text style={styles.imageLabel}>Imagen Seleccionada</Text>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            )
            
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonSpacing: {
        width: '80%',
        marginBottom: 20,
    },
    imageContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    imageLabel: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: '500',
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 10,
    }
})


     