import { Text } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";
import TMBDComponent from "../Pages/TMBDComponent";
import Home from "../Pages/Home";


export default function BottomTabNavegacion() {

    const tab =createBottomTabNavigator()

    return(
        <NavigationContainer>
            <tab.Navigator>
                <tab.Screen name={"Popular Movies"} component={Home}></tab.Screen>
            </tab.Navigator>
        </NavigationContainer>
    )
}