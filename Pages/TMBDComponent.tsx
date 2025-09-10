import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, TextInput} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {fetchPopularMovies} from "../Services/Api";
import cineplusLogo from '../assets/imagenes/LogoCineplus.png';
import profileImage from '../assets/imagenes/LogoCineplus.png';
import { usePerfil } from '../context/PerfilContext';
import GlobalContext from '../Provider/GlobalProvider';

export default function TmbdComponent() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState([]);
    const { idContext } = useContext(GlobalContext);

    const navigation = useNavigation();
    const { foto } = usePerfil();

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await fetchPopularMovies();
                setMovies(data);
            } catch (error) {
                console.error("Error al obtener películas:", error);
            } finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, []);

    const agregarAFavoritos = async (id_pelicula) => {
        if (!idContext) {
            Alert.alert("Error", "Debes iniciar sesión para agregar a favoritos");
            return;
        }

        try {
            const response = await fetch("http://192.168.1.10:3000/favoritos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: idContext,
                    id_pelicula: id_pelicula,
                    comentario: "",
                    calificacion: null,
                }),
            });

            const nuevoFavorito = await response.json();

            if (response.ok) {
                setFavoritos(prev => [...prev, nuevoFavorito]);
                Alert.alert("Éxito", "Película agregada a tus favoritos");
            } else {
                Alert.alert("Error", nuevoFavorito.error || "No se pudo agregar a favoritos");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleProfilePress = () => {
        navigation.navigate('Perfil');
    };

    const handleMoviePress = (movie) => {
        console.log("Navegar a la pantalla de detalles de la pelicula", movie.title);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={cineplusLogo} style={styles.logoHeader} />
                <TouchableOpacity onPress={handleProfilePress}>
                    <Image
                        source={foto ? { uri: foto } : profileImage}
                        style={styles.profileIcon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
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
                            {/* Se añade el botón de favoritos */}
                            <TouchableOpacity
                                style={styles.favoriteButton}
                                onPress={() => agregarAFavoritos(movie.id)}
                            >
                                <Text style={styles.favoriteButtonText}>❤</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Más populares</Text>
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
                            {/* Se añade el botón de favoritos */}
                            <TouchableOpacity
                                style={styles.favoriteButton}
                                onPress={() => agregarAFavoritos(movie.id)}
                            >
                                <Text style={styles.favoriteButtonText}>❤</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
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
        height: 80,
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
        position: 'relative',
    },
    movieImage: {
        width: '100%',
        aspectRatio: 2 / 3,
        borderRadius: 8,
    },
    favoriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    favoriteButtonText: {
        fontSize: 15,
        color: 'red',
    },
    ratingText: {
        color: '#FFD700',
        position: 'absolute',
        bottom: 5,
        left: 10,
    }
});
