import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { fetchPopularMovies } from "../Services/Api"
import cineplusLogo from '../assets/imagenes/LogoCineplus.png'
import profileImage from '../assets/imagenes/LogoCineplus.png'
import heartIcon from '../assets/imagenes/heartIcon.png'
import heartFilledIcon from '../assets/imagenes/heartFilledIcon.png'

function TmbdComponent() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState(new Set())
    const navigation = useNavigation()

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await fetchPopularMovies()
                setMovies(data)
            } catch (error) {
                console.error('Error al obtener películas:', error)
            } finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, [])



    const handleProfilePress = () => {
        navigation.navigate('Perfil') 
    }

    const handleMoviePress = (movie) => {
        console.log("Navegar a la pantalla de detalles de la pelicula", movie.title)
    }

    const toggleFavorite = (movieId) => {
        setFavorites(prevFavorites =>{
            const newFavorites = new Set(prevFavorites)
            if (newFavorites.has(movieId)){
                newFavorites.delete(movieId)
            } else{
                newFavorites.add(movieId)
            }
            return newFavorites
        })
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={cineplusLogo} style={styles.logoHeader} />
                <TouchableOpacity onPress={handleProfilePress}>
                    <Image source={profileImage} style={styles.profileIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <Text style={styles.searchIcon}></Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar"
                    placeholderTextColor="#888"
                />
            </View>

            <ScrollView style={styles.scrollViewContent}>
                <Text style={styles.sectionTitle}>Nuevos Estrenos</Text>
                <View style={styles.movieRow}>
                    {movies.slice(0, 3).map((movie) => (

                        <TouchableOpacity 
                        key={movie.id}
                        style={styles.movieItem}
                        onPress={() => handleMoviePress(movie)}
                        >
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                                style={styles.movieImage}
                            />

                            <TouchableOpacity 
                            style = {styles.favoriteButton}
                            onPress={() => toggleFavorite(movie.id)}

                            >
                                <image 
                                source = {favorites.has(movie.id) ? heartFilledIcon : heartIcon}
                                style={styles.favoriteIcon}
                                />
                            </TouchableOpacity>


                        </TouchableOpacity>
                            
                        
                    ))}
                </View>

                <View style={styles.categoriesRow}>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Acción</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Comedia</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Romance</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Mas populares</Text>
                <View style={styles.movieRow}>
                    {movies.slice(3, 6).map((movie) => (
                        <TouchableOpacity 
                        key={movie.id}
                        style={styles.movieItem}
                        onPress={() => handleMoviePress(movie)}
                        >
                             <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                                style={styles.movieImage}
                            />

                            <TouchableOpacity 
                            style = {styles.favoriteButton}
                            onPress={() => toggleFavorite(movie.id)}

                            >
                                <image 
                                source = {favorites.has(movie.id) ? heartFilledIcon : heartIcon}
                                style={styles.favoriteIcon}
                                />
                            </TouchableOpacity>
                             


                        </TouchableOpacity>
                        
                        
                    ))}
                </View>
                
                 <View style={styles.categoriesRow}>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Acción</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Comedia</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                    <View style={styles.categoryItem}>
                        <View style={styles.categoryPlaceholder} />
                        <Text style={styles.categoryText}>Romance</Text>
                        <Text style={styles.ratingText}>★★★★☆</Text>
                    </View>
                </View>
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    logoHeader: {
        width: 80,
        height: 30,
        resizeMode: 'contain',
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    movieRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    movieItem: {
        width: '30%',
        alignItems: 'center',
        position : 'relative'
    },
    movieImage: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 8,
    },
    favoriteButton : {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7',
        borderRadius: 15,
        padding:5

    },
    favoriteIcon:{
        width:20,
        height:20

    },
    categoriesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    categoryItem: {
        width: '30%',
        alignItems: 'center',
    },
    categoryPlaceholder: {
        width: '100%',
        aspectRatio: 2 / 3,
        backgroundColor: '#000',
        borderRadius: 8,
    },
    categoryText: {
        color: '#fff',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 15,
        left: 10,
    },
    ratingText: {
        color: '#FFD700', 
        position: 'absolute',
        bottom: 5,
        left: 10,
    }
   
})

export default TmbdComponent;