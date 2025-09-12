import { Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import TMBDComponent from "../Pages/TMBDComponent";
import Home from "../Pages/Home";
import PerfilComponent from "./PerfilComponent";
import InformacionUsuario from "../Pages/InformacionUsuario";
import ListaFavoritos from "../Pages/ListaFavoritos";

import Camara from './Camara'
import Perfil from '../Pages/Perfil'


export default function StackNavegacion() {


    const Stack=createStackNavigator();


    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home}></Stack.Screen>
                <Stack.Screen name={"Perfil"} component={InformacionUsuario}></Stack.Screen>
                <Stack.Screen name={"Mis Favoritos"} component={ListaFavoritos}></Stack.Screen>
                <Stack.Screen name={"Peliculas Populares"} component={TMBDComponent}></Stack.Screen>
                <Stack.Screen name={"Camara"} component={Camara}></Stack.Screen>
                <Stack.Screen name={"perfil"} component={Perfil}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>

    )
}