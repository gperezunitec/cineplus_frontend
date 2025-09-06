import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavegacion from "./Components/BottomTabNavigation";
import StackNavegacion from "./Components/StackNavigation";

export default function App() {
  return (
    <StackNavegacion></StackNavegacion>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
