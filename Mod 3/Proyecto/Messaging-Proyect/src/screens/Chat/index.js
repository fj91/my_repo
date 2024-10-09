import { useRoute } from "@react-navigation/native";
import styled from "@emotion/native";
import { Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Body } from "../../components/Body";
import { useAuth } from "../../hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import {
  TextInput,
  HelperText,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import { firestore, storage } from "../../services/firebase";
import { listenToChats } from "./utils/firestoreMsg";
import { uploadImageAsync } from "./utils/uploadImage";
import {
  addDoc,
  collection,
  doc,  
  setDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref } from "firebase/storage";

const StyledTextInput = styled(TextInput)`
  width: 95%;
  margin-top: 20px;
  margin-left: 10px;
`;

const StyledView = styled.View`
  flex: 1;
`;

const StyledInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;

const FlatList = styled.FlatList({
  transform: [{ scaleY: -1 }],
});

const MsgContainer = styled.View((props) => ({
  margin: 16,
  padding: 8,
  transform: [{ scaleY: -1 }],
  backgroundColor: props.mine ? "#dcf8c6" : "#34b7f1",
  alignSelf: props.mine ? "flex-start" : "flex-end",
  borderRadius: 8,
}));

const ChatItem = (props) => {
  //console.log(props);
  const { phone, id, content, createdAt, type = "text" } = props;
  const { auth } = useAuth();
  return (
    <MsgContainer key={id} mine={phone === auth}>
      <Text style={{ fontSize: 16 }}>{content}</Text>
      <Text style={{ fontSize: 12 }}>
        {new Date(createdAt.seconds * 1000)
          .toISOString()
          .split(".")[0]
          .replace("T", " ")}
      </Text>
    </MsgContainer>
  );
};

const ChatImageItem = (props) => {
  const { auth } = useAuth();
  const [chatImage, setChatImage] = useState(null);
  const { phone, id, content, createdAt } = props;
  console.log(props);
  useEffect(
    function () {
      async function loadImageFromStorage() {
        const imageRef = ref(storage, content);
        const url = await getDownloadURL(imageRef);        
        setChatImage(url);
      }
      loadImageFromStorage();
    },
    [content]
  );
  return (
    <MsgContainer key={id} mine={phone === auth}>
      {chatImage ? (
        <StyledImage source={{ uri: chatImage }} />
      ) : (
        <ActivityIndicator />
      )}
      <Text style={{ fontSize: 12 }}>
        {new Date(createdAt.seconds * 1000)
          .toISOString()
          .split(".")[0]
          .replace("T", " ")}
      </Text>
    </MsgContainer>
  );
};

const renderChatItem = (row) => {
  const { index, item } = row;
  if (item.type === "image") return <ChatImageItem {...item} />;
  return <ChatItem {...item} />;
};

export function Chat() {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const { auth } = useAuth();

  const { control, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled || result.assets !== null) {
      //console.log('here',result);
      setImage(result.assets[0]);
      // Upload image to firebase storage
      await uploadImageAsync(result.assets[0].uri, chatId, auth);
    }

    // Persist in firestore
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("La App necesita permisos para acceder a la camara");
      permission.canAskAgain = true;
      return;
    }
    // Persist in firestore
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled || result.assets !== null) {
      setImage(result.assets[0]);
      await uploadImageAsync(result.assets[0].uri, chatId, auth);
    }
  };

  const route = useRoute();
  const chatId = route.params.id;
  useEffect(
    function () {
      return listenToChats(route.params.id, setMessages);
    },
    [chatId]
  );

  const onSubmit = handleSubmit((data) => {
    //console.log({data});
    addDoc(collection(firestore, "chats", chatId, "messages"), {
      content: data.message,
      createdAt: new Date(),
      phone: auth,
      type: "text",
    });
    setDoc(
      doc(firestore, "chats", chatId),
      {
        lastMessage: data.message,
      },
      { merge: true }
    );

    reset();
  });
  //console.log(messages);
  return (
    <Body>
      <FlatList
        keyExtractor={(item) => item.id}
        data={messages}
        renderItem={renderChatItem}
      ></FlatList>
      <StyledInputContainer>
        <Controller
          control={control}
          name="message"
          rules={{
            required: true,
            maxLength: {
              value: 100,
              message: "Solo se permite un máximo de 100 caracteres",
            },
            validate: (value) => {
              return !!value.trim();
            },
          }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <StyledView>
              <StyledTextInput
                // onBlur={onBlur}
                onChangeText={onChange}
                onEndEditing={onSubmit}
                value={value}
                mode="outlined"
                error={error}
                onFocus={() => setIsActive(true)}
                onBlur={() => setIsActive(false)}
                right={
                  isActive ? (
                    <TextInput.Icon
                      icon="send"
                      color="#128c7e"
                      size={25}
                      onPress={onSubmit}
                    />
                  ) : (
                    <TextInput.Icon
                      forceTextInputFocus="false"
                      color="#128c7e"
                      icon="camera"
                      size={25}
                      onPress={takePhoto}
                    />
                  )
                }
              />
              <HelperText type="error" visible={Boolean(error)}>
                {error?.message}
              </HelperText>
            </StyledView>
          )}
        />
        <IconButton
          icon="paperclip"
          size={25}
          color="#128c7e"
          onPress={pickImage}
        />
      </StyledInputContainer>
    </Body>
  );
}
