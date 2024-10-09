import { auth } from "../services/firebase";
import { useEffect, useState } from "react";

export function useAuth() {
    const [authenticated, setAuthenticated] = useState(true);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if(user){
            //console.log("Autenticado");
            setAuthenticated(true);    
          }
          else{
            //console.log("No está autenticado")
            setAuthenticated(false);
          }
        })
        return unsubscribe
      },[])
}
