import styled from "@emotion/native";
import { useRoute } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Text } from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  IconButton,
  TextInput,
} from "react-native-paper";
import { Body } from "../../components/Body";
import { useAuth } from "../../hooks/useAuth";
import { firestore, storage } from "../../services/firebase";
import { listenToChats } from "./utils/firestoreMessages";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const StyledTextInput = styled(TextInput)`
  width: 100%;
`;
const StyledView = styled.View`
  flex: 1;
`;
const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode: contain;
`;
const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const FlatList = styled.FlatList({
  transform: [{ scaleY: -1 }],
});
const MessageContainer = styled.View((props) => ({
  transform: [{ scaleY: -1 }],
  margin: 16,
  padding: 8,
  backgroundColor: props.mine ? "#eaeaea" : "green",
  borderRadius: 8,
}));

const ChatItem = (props) => {
  const { auth } = useAuth();
  const { phone, id, content, createdAt, type = "text" } = props;

  return (
    <MessageContainer key={id} mine={phone === auth}>
      <Text>{content}</Text>
      <Text>type: {type}</Text>
      <Text>{new Date(createdAt.seconds * 1000).toISOString()}</Text>
    </MessageContainer>
  );
};
const ChatImageItem = (props) => {
  const { auth } = useAuth();
  const [image, setImage] = useState(null);
  const { phone, id, content, createdAt } = props;

  useEffect(
    function () {
      async function loadImageFromStorage() {
        const imageRef = ref(storage, content);
        const url = await getDownloadURL(imageRef);
        setImage(url);
      }
      loadImageFromStorage();
    },
    [content]
  );

  return (
    <MessageContainer key={id} mine={phone === auth}>
      {image ? <StyledImage source={{ uri: image }} /> : <ActivityIndicator />}
      <Text>{new Date(createdAt.seconds * 1000).toISOString()}</Text>
    </MessageContainer>
  );
};

const renderChatItem = (row) => {
  const { index, item } = row;
  if (item.type === "image") return <ChatImageItem {...item} />;
  return <ChatItem {...item} />;
};

async function uploadImage(uri, chatId, auth) {
  const extension = uri.split(".").slice(-1)[0];
  const path =
    "chats/" + chatId + "/" + new Date().toISOString() + "." + extension;
  const imageRef = ref(storage, path);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  await uploadBytes(imageRef, blob);

  addDoc(collection(firestore, "chats", chatId, "messages"), {
    content: path,
    createdAt: new Date(),
    phone: auth,
    type: "image",
  });
}

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { auth } = useAuth();
  const { control, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const route = useRoute();
  const chatId = route.params.id;
  useEffect(
    function () {
      return listenToChats(route.params.id, setMessages);
    },
    [chatId]
  );

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
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
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Necesitamos los permisos");
      return;
    }

    const media = await ImagePicker.launchImageLibraryAsync();
    if (media.canceled) {
      return;
    }
    setSelectedImage(media.assets[0]);
    await uploadImage(media.assets[0].uri, chatId, auth);
  };
  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Necesitamos los permisos");
      return;
    }

    const media = await ImagePicker.launchCameraAsync();
    if (media.canceled) {
      return;
    }
    setSelectedImage(media.assets[0]);
    await uploadImage(media.assets[0].uri, chatId, auth);
  };
  console.log(messages);
  return (
    <Body>
      <Text>Este es el chat {chatId}</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={messages}
        renderItem={renderChatItem}
      ></FlatList>
      <InputContainer>
        <Controller
          control={control}
          rules={{ required: true }}
          name="message"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <StyledView>
              <StyledTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={error}
                onEndEditing={onSubmit}
              />
              <HelperText type="error" visible={Boolean(error)}>
                {error?.message}
              </HelperText>
            </StyledView>
          )}
        ></Controller>
        <IconButton icon="attachment" size={20} onPress={pickImage} />
        <IconButton icon="camera" size={20} onPress={takePhoto} />
      </InputContainer>
    </Body>
  );
}
