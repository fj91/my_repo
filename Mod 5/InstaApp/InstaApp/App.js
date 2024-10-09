import { StyleSheet, Text, View } from "react-native";
import { Login } from "./src/screens/Login";
import { SignUp } from "./src/screens/SignUp";
import { Home } from "./src/screens/Home";
import { Add } from "./src/screens/Add";
import { Search } from "./src/screens/Search";
import { Profile } from "./src/screens/Profile";
import { Comments } from "./src/screens/Comments";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { IconButton } from "react-native-paper";



SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Inicia sesión" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Inicio",
            headerRight: () => (
              <IconButton
                onPress={() => navigation.navigate("Search")}
                icon="magnify"               
              />
            ),
          })}          
        />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ title: "Nueva publicación" }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: "Encuentra nuevos amig@s" }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{ title: "Añadir comentario" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
