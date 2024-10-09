import styled from "@emotion/native";
import { Alert, View } from "react-native";
import { TextInput, Title, Avatar, Button, Divider } from "react-native-paper";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { firestore, storage, auth } from "../../services/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

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

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const handleCreateAccount = async () => {
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      lastname.trim().length === 0
    ) {
      return Alert.alert("Todos los campos son requeridos");
    } else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //console.log("Account created");
          const user = userCredential.user;
          setDoc(doc(firestore, "users", user.uid), {
            email: email,
            name: name,
            lastname: lastname,
          });          
          //console.log(user);
          setEmail("");
          setName("");
          setLastname("");
          setPassword("");
          Alert.alert("El usuario se ha creado con éxito");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("Ese correo ya está en uso");
          }
          if (error.code === "auth/invalid-email") {
            Alert.alert("Ese correo es inválido");
          }
          if (error.code === "auth/weak-password") {
            Alert.alert("La contraseña debe tener al menos 6 caracteres");
          }
          console.error(error);
        });
    }
  };

  return (
    <>
      <CenterBody>
        <StyledTitle>
          Regístrate para ver fotos y videos de tus amigos.
        </StyledTitle>
        <StyledView>
          <StyledTextInput
            label="Correo electrónico"
            autoCapitalize="none"
            mode="outlined"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <StyledTextInput
            label="Nombre"
            mode="outlined"
            value={name}
            onChangeText={setName}
          />
          <StyledTextInput
            label="Apellidos"
            mode="outlined"
            value={lastname}
            onChangeText={setLastname}
          />
          <StyledTextInput
            label="Contraseña"
            mode="outlined"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </StyledView>
        <StyledButton mode="contained" onPress={handleCreateAccount}>
          Registrarte
        </StyledButton>
      </CenterBody>
    </>
  );
}
