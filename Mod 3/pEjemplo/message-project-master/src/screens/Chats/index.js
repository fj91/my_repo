import styled from "@emotion/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Appbar, Avatar, Button, List } from "react-native-paper";
import { ScrollBody } from "../../components/Body";
import { useAuth } from "../../hooks/useAuth";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../services/firebase";
import { useContacts } from "../../hooks/useContacts";

const StyledListItem = styled(List.Item)`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.color ?? "black"};
`;
export function Chats(props) {
  const { auth } = useAuth();
  const [chats, setChats] = useState([]);
  const contacts = useContacts();
  useEffect(() => {
    const unsuscribe = onSnapshot(
      query(
        collection(firestore, "chats"),
        where("phones", "array-contains", auth)
      ),
      (snapshot) => {
        const firestoreChats = snapshot.docs.map((doc) => {
          const data = doc.data();
          const otherPhone = data.phones.find((e) => e !== auth);
          const contact = contacts.find(
            (e) => e.phoneNumbers[0].number == otherPhone
          );
          return {
            id: doc.id,
            name: contact
              ? `${contact.firstName} ${contact.lastName}`
              : data.phones[0],
            message: data.lastMessage,
          };
        });
        setChats(firestoreChats);
      }
    );
    return () => {
      unsuscribe();
    };
  }, [auth]);
  const createChat = async () => {
    const response = await addDoc(collection(firestore, "chats"), {
      phones: [auth, String(Math.trunc(Math.random() * 1000))],
    });
    console.log(response);
  };
  return (
    <>
      <Button onPress={createChat} mode="outlined">
        Random
      </Button>
      <ScrollBody>
        {chats.map((chat) => (
          <StyledListItem
            key={chat.id}
            title={chat.name}
            description={chat.message}
            color={chat.id === 1 ? "red" : undefined}
            left={(props) => (
              <View
                style={{
                  flex: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar.Text
                  {...props}
                  size={30}
                  label={chat.name
                    .split(" ")
                    .slice(0, 2)
                    .map((e) => e[0])
                    .join("")}
                  color="white"
                />
              </View>
            )}
            onPress={(e) =>
              props.navigation.push("Chat", { id: chat.id, name: chat.name })
            }
          />
        ))}
      </ScrollBody>
    </>
  );
}
