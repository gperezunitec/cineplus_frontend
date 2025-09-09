import React, {useContext, useEffect, useState} from 'react';
import {fetchPopularMovies} from "../Services/Api";
import {View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Button, Alert} from 'react-native';
import GlobalContext from "../Provider/GlobalProvider";

function TmbdComponent() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favoritos, setFavoritos] = useState([]); // lista de favoritos para actualizar
    const { idContext } = useContext(GlobalContext);

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
            Alert.alert("Error", "Debes iniciar sesión para agregar favoritos");
            return;
        }

        try {
            const response = await fetch("http://10.0.2.2:3000/favoritos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: idContext,
                    id_pelicula: id_pelicula,
                    comentario: "",
                    calificacion: null,
                }),
            });

            const nuevoFavorito = await response.json(); // parsea JSON solo una vez

            if (response.ok) {
                setFavoritos(prev => [...prev, nuevoFavorito]); // Actualiza la lista en pantalla
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
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titulo}>Películas Populares</Text>
            {movies.map((movie) => (
                <View key={movie.id} style={styles.item}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                        style={styles.imagen}
                    />
                    <Text style={styles.nombre}>{movie.title}</Text>
                    <Text>📅 {movie.release_date}</Text>
                    <Text>⭐ {movie.vote_count}</Text>
                    <Button title="Agregar a Favoritos" onPress={() => agregarAFavoritos(movie.id)} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    item: { marginBottom: 20, alignItems: "center" },
    imagen: { width: 100, height: 150, borderRadius: 8, marginBottom: 5 },
    nombre: { fontWeight: "bold", fontSize: 16 },
});

export default TmbdComponent;