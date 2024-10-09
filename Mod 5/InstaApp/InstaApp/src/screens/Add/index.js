import styled from "@emotion/native";
import { View } from "react-native";
import { useState } from "react";
import { Title, Button, TextInput } from "react-native-paper";
import { auth } from "../../services/firebase";
import { uploadImageAsync } from "./utils/uploadImage";
import { useNavigation } from "@react-navigation/native";
import { FAB, BottomNavigation } from "react-native-paper";

const CenterBody = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
`;

const StyledTitle = styled(Title)`
  justify-content: center;
  align-self: center;
  padding: 5px 5px;
`;

const StyledImage = styled.Image`
  width: 300px;
  height: 300px;
  resize-mode: contain;
`;

const StyledTextInput = styled(TextInput)`
  width: 95%;
  margin-top: 20px;
  margin-left: 10px;
  multiline: true;
  mode: outlined;
`;

const StyledButton = styled(Button)`
  width: 60%;
  margin-top: 20px;
`;

export function Add(props) {
  //console.log(props.route.params.imageURI);
  //const [image, setImage] = useState("");
  const navigation = useNavigation();
  const [caption, setCaption] = useState("");

  const handlePost = async () => {
    console.log("Comienza a subir imagen");
    await uploadImageAsync(props.route.params.imageURI, caption);
    setCaption("");
    navigation.navigate("Home");
    /*auth.onAuthStateChanged(async (user) => {
        if(user){            
               
        }
        else{
          console.log("No está autenticado, no sube imagen");          
        }
      })*/
  };

  return (
    <>
      <CenterBody>
        <StyledImage source={{ uri: props.route.params.imageURI }} />
        <StyledTitle>Escribe un pie de foto:</StyledTitle>
        <StyledTextInput
          mode="outlined"
          multiline={true}
          value={caption}
          onChangeText={setCaption}
        />
        <StyledButton mode="contained" onPress={handlePost}>
          Publicar
        </StyledButton>
      </CenterBody>
    </>
  );
}
