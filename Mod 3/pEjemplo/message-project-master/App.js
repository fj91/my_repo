import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { Chats } from "./src/screens/Chats";
import { PhoneNumbers } from "./src/screens/PhoneNumber";
import { Navigator } from "./src/Navigator";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import * as SplashScreen from "expo-splash-screen";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./src/services/firebase";
SplashScreen.preventAutoHideAsync();
function AuthApp() {
  const { auth, setAut, loading } = useAuth();
  useEffect(() => {
    if (auth) registerForPushNotificationsAsync(auth);
  }, []);
  if (loading) return null;
  return (
    <>
      {!auth && <PhoneNumbers />}
      {auth && <Navigator />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AuthApp />
        <StatusBar style="auto" />
      </PaperProvider>
    </AuthProvider>
  );
}

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
    const currentUser = await getDoc(doc(firestore, "users/" + auth));
    console.log(currentUser.data());
    await setDoc(collection(firestore, "users"), auth, {
      tokens: [...(currentUser.data()?.tokens ?? []), token],
    });
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
