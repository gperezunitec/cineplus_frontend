import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/core";
import GlobalContext from "../Provider/GlobalProvider";
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';




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

    return (

        <View style={styles.container}>
            <View style={styles.profileCard}>
                <View style={styles.imagen}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image}></Image>
                    ) : (
                        <View style={styles.placeholder}>
                        <Ionicons name="person" size={60} color="#ccc" />
                        </View>
                    )}
                </View>

                <Text style={styles.name}>{correoContext}</Text>
                <Text style={styles.subtitle}>Mi Perfil</Text>

                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.roundButton} onPress={pickImage}>
                        <Ionicons name="image" size={28} color="#fff" />
                        <Text style={styles.roundText}>Galería</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundButton} onPress={takePhoto}>
                        <Ionicons name="camera" size={28} color="#fff" />
                        <Text style={styles.roundText}>Cámara</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.navRow}>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Mis Favoritos')}>
                        <Text style={styles.navText}>Favoritos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Peliculas Populares')}>
                        <Text style={styles.navText}>Populares</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    }

    const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
    },
    profileCard:{
        width:'90%',
        backgroundColor:'#ffffff',
        alignItems:'center',
        paddingVertical:40,
        paddingHorizontal:20,
        shadowColor:'#ffffff',
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.1,
        shadowRadius:10,
        elevation:8,
    },
    imagen:{
        marginBottom:20,
    },
    image:{
        width:140,
        height:140,
        borderRadius:70,
        borderWidth:3,
        borderColor:'#040405ff',
    },
    placeholder:{
        width:140,
        height:140,
        borderRadius:70,
        backgroundColor:'#e0e0e0',
        justifyContent:'center',
        alignItems:'center',
    },
    name:{
        fontSize:22,
        fontWeight:'700',
        color:'#333',
        marginBottom:4,
    },
    subtitle:{
        fontSize:16,
        color:'#666',
        marginBottom:30,
    },
    actionRow:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
        marginBottom:30,
    },
    roundButton:{
        backgroundColor:'#090d13ff',
        width:90,
        height:90,
        borderRadius:45,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:15,
        elevation:4,
        shadowColor:'#05090eff',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
    },
    roundText:{
        marginTop:6,
        color:'#fff',
        fontSize:14,
        fontWeight:'500',
    },
    navRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
    },
    navButton:{
        backgroundColor:'#08080dff',
        paddingVertical:14,
        borderRadius:12,
        width:'48%',
        alignItems:'center',
        elevation:3,
    },
    navText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'600',
    }
    })