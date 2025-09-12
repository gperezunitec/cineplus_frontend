import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabNavegacion from "./Components/BottomTabNavigation";
import StackNavegacion from "./Components/StackNavigation";
import { createContext } from 'react';
import GlobalProvider from "./Provider/GlobalProvider";

export default function App() {
  return (
    <GlobalProvider>
      <StackNavegacion />
    </GlobalProvider>
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
