import styled from "@emotion/native";
import { View, Alert, LogBox } from "react-native";
import { TextInput, Title, Avatar, Button, Divider } from "react-native-paper";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../services/firebase";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { doc, setDoc } from "firebase/firestore";

LogBox.ignoreAllLogs();

const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 50px 30px;
`;
const StyledTitle = styled(Title)`
  justify-content: center;
  align-self: center;
`;
const StyledAvatar = styled(Avatar.Image)`
  justify-content: center;
  align-self: center;
  align-items: center;
  margin-top: 20px;
`;
const StyledTextInput = styled(TextInput)`
  width: 100%;
  margin-top: 20px;
`;
const StyledView = styled(View)`
  width: 100%;
`;
const StyledButton = styled(Button)`
  width: 60%;
  margin-top: 20px;
`;

async function registerForPushNotificationsAsync() {
  let token;  
  //console.log("notification");
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    try {
      token = (await Notifications.getExpoPushTokenAsync()).data;   
    } catch (error) {
      console.log(error);
    }   
    console.log("token", token);
    setDoc(
      doc(firestore, "users", auth.currentUser?.uid),
      {
        tokens: [token],
      },
      { merge: true }
    );
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Autenticado");
        setAuthenticated(true);
        SplashScreen.hideAsync();
        registerForPushNotificationsAsync();
        navigation.replace("Home");
      } else {
        console.log("No está autenticado");
        setAuthenticated(false);
        SplashScreen.hideAsync();
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return Alert.alert("Favor ingresar usuario y contraseña");
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          //console.log(user);
          setEmail("");
          setPassword("");
          navigation.replace("Home");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            Alert.alert(
              "El usuario no existe, asegurate de que tus credenciales estén correctas"
            );
          }
          if (error.code === "auth/invalid-email") {
            Alert.alert("Ese correo es inválido");
          }
          if (error.code === "auth/wrong-password") {
            Alert.alert("La contraseña es inválida");
          }
          /*const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + errorMessage)*/
        });
    }
  };

  /*if (authenticated) {
    console.log("Redirect to Home");
    navigation.replace("Home");  
  }*/

  return (
    <>
      <CenterBody>
        <StyledTitle>Hola, bienvenid@!</StyledTitle>
        <StyledAvatar size={300} source={require("../../../assets/live.png")} />
        <StyledView>
          <StyledTextInput
            label="Ingresa tu email..."
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <StyledTextInput
            label="Ingresa tu contraseña..."
            mode="outlined"
            secureTextEntry={isPasswordSecure}
            value={password}
            right={
              <TextInput.Icon
                icon={isPasswordSecure ? "eye-off" : "eye"}
                onPress={() => {
                  isPasswordSecure
                    ? setIsPasswordSecure(false)
                    : setIsPasswordSecure(true);
                }}
              />
            }
            onChangeText={setPassword}
          />
        </StyledView>
        <StyledButton mode="contained" onPress={handleLogin}>
          Continuar
        </StyledButton>
        <StyledTitle>-------------- O --------------</StyledTitle>
        <StyledTitle>¿No tienes una cuenta?</StyledTitle>
        <Button mode="text" onPress={() => navigation.navigate("SignUp")}>
          Regístrate
        </Button>
      </CenterBody>
    </>
  );
}
