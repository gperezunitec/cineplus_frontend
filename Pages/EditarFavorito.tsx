import React, { useContext } from "react";
import {View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from "react-native";
import GlobalContext from "../Provider/GlobalProvider";

export default function EditarFavorito({ navigation }) {
    const {
        comentarioContext,
        setComentarioContext,
        calificacionContext,
        setCalificacionContext,
        idFavoritoContext,
        nombrePeliculaContext,
        setNombrePeliculaContext
    } = useContext(GlobalContext);

    const guardarCambios = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/favoritos/${idFavoritoContext}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comentario: comentarioContext || "",
                    calificacion: calificacionContext ? Number(calificacionContext) : null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Éxito", "Comentario y calificación actualizados");
                navigation.goBack();
            } else {
                Alert.alert("Error", data.message || data.error || "No se pudo actualizar");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "No se pudo conectar con el servidor");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{nombrePeliculaContext}</Text>

            <Text style={styles.label}>Editar Comentario</Text>
            <TextInput
                style={styles.input}
                value={comentarioContext}
                onChangeText={setComentarioContext}
                placeholder="Escribe un comentario..."
            />

            <Text style={styles.label}>Editar Calificación</Text>
            <TextInput
                style={styles.input}
                value={calificacionContext ? calificacionContext.toString() : ""}
                onChangeText={setCalificacionContext}
                keyboardType="numeric"
                placeholder="Ej: 5"
            />


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={guardarCambios}>
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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

        fontSize: 16,
        borderWidth: 1,
        borderColor: '#f7f2f2ff',





        padding: 10,
        marginBottom: 15,




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