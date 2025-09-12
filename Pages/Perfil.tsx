import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
const cineplusLogo = require('../assets/imagenes/LogoCineplus.png');
const profileImage = require('../assets/imagenes/LogoCineplus.png');
const cameraIcon = require('../assets/imagenes/Camara.png');
import Camara from '../Components/Camara'
import { usePerfil } from '../context/PerfilContext'

export default function Perfil() {
  const userName = "Fabina Doe"
  const userTopMovies: any[] = []
  const userFavoriteMovies: any[] = []
  const [showCamera, setShowCamera] = useState(false)
  const { foto } = usePerfil()

  const handleCameraPress = () => setShowCamera(true)
  const handleCloseCamera = () => setShowCamera(false)

  const renderEmptyState = (message: string) => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>{message}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={cineplusLogo} style={styles.logoHeader} />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={foto ? { uri: foto } : profileImage} style={styles.profileImage} />
          <TouchableOpacity onPress={handleCameraPress} style={styles.cameraIconContainer}>
            <Image source={cameraIcon} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <ScrollView style={styles.scrollViewContent}>
        <Text style={styles.sectionTitle}>My Top 10 Movies</Text>
        {userTopMovies.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
            {userTopMovies.map((movie) => (
              <View key={movie.id} style={styles.movieItem}>
                <View style={styles.moviePlaceholder} />
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          renderEmptyState("Aun no tienes peliculas Top 10, Califica algunas para ver sus trailers")
        )}

        <Text style={styles.sectionTitle}>Favorite Movies</Text>
        {userFavoriteMovies.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.movieList}>
            {userFavoriteMovies.map((movie) => (
              <View key={movie.id} style={styles.movieItem}>
                <View style={styles.moviePlaceholder} />
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          renderEmptyState("Aun no tienes peliculas favoritas, agrega 1")
        )}
      </ScrollView>

      {/* Modal de cámara */}
      <Modal visible={showCamera} animationType="slide">
        <Camara onClose={handleCloseCamera} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     backgroundColor: '#fff' 
    },
  header: {
     flexDirection: 'row', 
     justifyContent: 'flex-start', 
     alignItems: 'center', 
     paddingHorizontal: 20, 
     paddingTop: 50, 
     paddingBottom: 20 
    },
  logoHeader: {
     width: 80, 
     height: 30, 
     resizeMode: 'contain' 
    },
  profileSection: { 
    alignItems: 'center', 
    paddingVertical: 20 
  },
  profileImageContainer: {
     width: 120,
     height: 120, 
     borderRadius: 60, 
     backgroundColor: '#ccc', 
     justifyContent: 'center', 
     alignItems: 'center', 
     marginBottom: 10 
    },
  profileImage: { 
    width: '100%', 
    height: '100%', borderRadius: 60, resizeMode: 'cover' },
  cameraIconContainer: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#fff', borderRadius: 15, padding: 5, borderWidth: 1, borderColor: '#ccc' },
  cameraIcon: { width: 20, height: 20, resizeMode: 'contain' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  scrollViewContent: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#000' },
  movieList: { marginBottom: 20 },
  movieItem: { width: 100, marginRight: 15, alignItems: 'center' },
  moviePlaceholder: { width: '100%', aspectRatio: 2 / 3, backgroundColor: '#000', borderRadius: 8 },
  movieTitle: { color: '#000', textAlign: 'center', marginTop: 5, fontSize: 12 },
  emptyStateContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  emptyStateText: { textAlign: 'center', color: '#888', fontStyle: 'italic' }
})
