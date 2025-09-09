import { Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import TMBDComponent from "../Pages/TMBDComponent";
import Home from "../Pages/Home";
import Registro from '../Pages/Registro';
import Camara from './Camara'
import Perfil from '../Pages/Perfil'

export default function StackNavegacion() {


    const Stack=createStackNavigator();


    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home}></Stack.Screen>
                <Stack.Screen name={"Peliculas Populares"} component={TMBDComponent}></Stack.Screen>
                <Stack.Screen name={"Registro"} component={Registro}></Stack.Screen>
                <Stack.Screen name={"Camra"} component={Camara}></Stack.Screen>
                <Stack.Screen name={"Perfil"} component={Perfil}></Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>

    )
}