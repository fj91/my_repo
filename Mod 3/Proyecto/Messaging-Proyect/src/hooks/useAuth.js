import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const AuthContext = createContext();

const AUTH_KEY = "phone";

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

export function AuthProvider(props) {
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(function loadFromAsyncStorage() {
    AsyncStorage.getItem(AUTH_KEY).then(async (value) => {
      if (value) {
        setAuth(value);
      }
      setLoading(false);
      SplashScreen.hideAsync();
    });
  }, []);

  const storeAuth = (value) => {
    try {
      setAuth(value);
      AsyncStorage.setItem(AUTH_KEY, value);
    } catch (e) {
      // saving error
    }
  };
  return (
    <AuthContext.Provider
      {...props}
      value={{ auth, setAuth: storeAuth, loading }}
    ></AuthContext.Provider>
  );
}
