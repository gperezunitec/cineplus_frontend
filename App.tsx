import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavegacion from "./Components/BottomTabNavigation";
import StackNavegacion from "./Components/StackNavigation";
import { PerfilProvider } from "./context/PerfilContext";

export default function App() {
  return (
      <PerfilProvider>
        <StackNavegacion />
      </PerfilProvider>
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