import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { usePerfil } from '../context/PerfilContext'

type Props = {
  onClose: () => void
}

export default function Camara({ onClose }: Props) {
  const [image, setImage] = useState('')
  const { setFoto } = usePerfil()

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImage(uri)
      setFoto(uri)
      onClose() // cierra modal
    }
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      const uri = result.assets[0].uri
      setImage(uri)
      setFoto(uri)
      onClose() 
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Camara</Text>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Abrir Galería</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Tomar Fotografía</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    paddingHorizontal: 20 
  },
  heading: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#000' },
  button: { 
    backgroundColor: '#000', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    alignItems: 'center', 
    width: '80%', 
    marginVertical: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  image: { 
    height: 200, 
    width: 200, 
    borderRadius: 10,
   marginTop: 20 }
})