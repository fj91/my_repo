import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

const AuthContext = createContext();

export function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

const AUTH_KEY = "phone";

export function AuthProvider(props) {
  const [auth, setAuth] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(function loadFromAsyncStorage() {
    AsyncStorage.getItem(AUTH_KEY).then(async (value) => {
      if (value) {
        setAuth(value);
      }
      setLoading(false);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      SplashScreen.hideAsync();
    });
  }, []);
  const persistedSetAuth = (text) => {
    setAuth(text);
    void AsyncStorage.setItem(AUTH_KEY, text);
  };
  return (
    <AuthContext.Provider
      {...props}
      value={{ auth, setAuth: persistedSetAuth, loading }}
    ></AuthContext.Provider>
  );
}
