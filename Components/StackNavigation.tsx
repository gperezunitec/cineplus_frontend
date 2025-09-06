import { Text } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import TMBDComponent from "../Pages/TMBDComponent";
import Home from "../Pages/Home";

export default function StackNavegacion() {


    const Stack=createStackNavigator();


    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"Home"} component={Home}></Stack.Screen>
                <Stack.Screen name={"Peliculas Populares"} component={TMBDComponent}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    )
}