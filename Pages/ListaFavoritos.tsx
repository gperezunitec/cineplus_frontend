import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, Alert, StyleSheet, Button, TouchableOpacity} from "react-native";
import GlobalContext from "../Provider/GlobalProvider";


export default function ListaFavoritos() {
    const { idContext } = useContext(GlobalContext);
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarFavoritos = async () => {
        if (!idContext) {
            Alert.alert("Error", "No se encontró el usuario logueado");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://10.0.2.2:3000/favoritos/usuario/${idContext}`);
            const data = await response.json();

            if (response.ok || response.status === 200) {
                setFavoritos(data);
            } else {
                Alert.alert("Error", data.message || "No se pudieron cargar los favoritos");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar con el servidor");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const eliminarFavorito = async (id_favorito) => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/favoritos/${id_favorito}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                // 🔄 Quitamos de la lista localmente
                setFavoritos(prev => prev.filter(fav => fav.id_favorito !== id_favorito));
                Alert.alert("Éxito", "Película eliminada de favoritos");
            } else {
                Alert.alert("Error", data.error || "No se pudo eliminar la película");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    useEffect(() => {
        cargarFavoritos();
    }, [idContext]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    if (favoritos.length === 0) {
        return <Text style={{ margin: 20 }}>No tienes películas favoritas</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mis Favoritos</Text>
            <FlatList
                data={favoritos}
                keyExtractor={(item) => item.id_favorito.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>

                        <Text style={styles.nombre}>🎬 {item.Pelicula?.titulo || "Título desconocido"}</Text>
                        <Text>⭐ Calificación: {item.calificacion || "N/A"}</Text>
                        <Text>💬 Comentario: {item.comentario || "Sin comentario"}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={() => eliminarFavorito(item.id_favorito)}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({

    titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    item: { padding: 10, marginBottom: 15, backgroundColor: "#f0f0f0", borderRadius: 10 },
    nombre: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
    imagen: { width: "100%", height: 150, marginBottom: 5, borderRadius: 8 },

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        padding: 20,
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
    }


});


