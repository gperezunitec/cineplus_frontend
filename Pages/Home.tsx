import {Button, Text, TextInput, View, StyleSheet, Image,TouchableOpacity} from 'react-native'
import {useNavigation} from "@react-navigation/native"
import {useState} from "react"
import Logo from '../assets/imagenes/LogoCineplus.png'

export default function Home() {

    const navigation = useNavigation();
    const [inputUsuario, setInputUsuario] = useState('')
    const [inputPassword, setInputPassword] = useState('')


    const handleRegisterPress = () => {
        navigation.navigate('Registro')
    }

    return(
        <View style={styles.container}>

            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.heading}>INICIO DE SESION</Text>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Usuario</Text>
                <TextInput
                style={styles.input}
                placeholder="karely2003"
                placeholderTextColor="#ffff"
                value={inputUsuario}
                onChangeText={text => setInputUsuario(text)}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#F5F5F5"
                secureTextEntry
                value={inputPassword}
                onChangeText={text => setInputPassword(text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Ver Peliculas populares"
                onPress={() => navigation.navigate('Peliculas Populares')}
            />

            
            <TouchableOpacity onPress={handleRegisterPress} style={styles.registerButton}>
                <Text style={styles.registerText}>
                    ¿No tienes cuenta? <Text style={styles.registerLink}>Registrate aqui</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 50,
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
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
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
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
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
})