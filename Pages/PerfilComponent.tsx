import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import TMBDComponent from "./TMBDComponent";
import InformacionUsuario from "./InformacionUsuario";
import ListaFavoritos from "./ListaFavoritos";

export default function PerfilComponent() {


    const tab =createBottomTabNavigator()

    return(
        <>
            <NavigationContainer>
                <tab.Navigator>
                    <tab.Screen name={"Favoritos"} component={ListaFavoritos}></tab.Screen>
                    <tab.Screen name={"Peliculas Populares"} component={TMBDComponent}></tab.Screen>
                    <tab.Screen name={"Perfil"} component={InformacionUsuario}></tab.Screen>
                </tab.Navigator>
            </NavigationContainer>

        </>
    );

};