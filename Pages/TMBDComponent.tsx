import React, {useEffect, useState} from 'react';
import {fetchPopularMovies} from "../Services/Api";
import {View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Button} from 'react-native';

function TmbdComponent() {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        async function loadMovies() {
            try {
                const data = await fetchPopularMovies();
                setMovies(data); // ✅ ahora sí guardamos las películas
            } catch (error) {
                console.error('Error al obtener películas:', error);
            } finally {
                setLoading(false);
            }
        }

        loadMovies();

    },[])


    return (
        <ScrollView>
            <Text>Películas Populares</Text>
            {movies.map((movie) => (
                <View key={movie.id}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                        style={{ width: 100, height: 150 }}
                    />
                    <Text>{movie.title}</Text>
                    <Text>{movie.release_date}</Text>
                    <Text>{movie.vote_count}</Text>
                    <Button title={"Agregar a Favoritos"}></Button>
                </View>

            ))}
        </ScrollView>
    );
}

export default TmbdComponent;