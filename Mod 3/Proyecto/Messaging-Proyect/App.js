import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { PhoneNumber } from "./src/screens/PhoneNumber";
import { Navigator } from "./src/Navigator";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import * as SplashScreen from "expo-splash-screen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore, auth } from "./src/services/firebase";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#128c7e",
    accent: "#f1c40f",
  },
};

async function registerForPushNotificationsAsync(auth) {
  let token;

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
    token = (await Notifications.getExpoPushTokenAsync()).data;
    //console.log("token", token);
    setDoc(doc(firestore, "users", auth), {
      tokens: [token],
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

function AuthApp() {
  const { auth, setAuth, loading } = useAuth();
  useEffect(() => {    
    if (auth) {
      //console.log('here',auth);
      registerForPushNotificationsAsync(auth);
    }
  }, [auth]);

  if (loading) return null;
  return (
    <>
      {!auth && <PhoneNumber />}
      {auth && <Navigator />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <AuthApp />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>
  );
}
