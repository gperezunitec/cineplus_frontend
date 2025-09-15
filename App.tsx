import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import StackNavegacion from "./Components/StackNavigation";
import GlobalProvider from "./Provider/GlobalProvider";  // 👈 Usamos el Provider correcto

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
