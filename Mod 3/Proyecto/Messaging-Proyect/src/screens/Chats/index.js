import styled from "@emotion/native";
import { View } from "react-native";
import { Avatar, List, Badge, Divider } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import { ScrollBody } from "../../components/Body";
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
import { FlatList } from "react-native-gesture-handler";

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
          const contactPhone = data.phones.find((e) => e !== auth);
          const contact = contacts.find(
            (e) => e.phoneNumbers[0].number == contactPhone
          );

          return {
            id: doc.id,
            name: contact ? contact.name : data.phones[1],
            message: data.lastMessage,
          };
        });
        setChats(firestoreChats);
      }
    );
    return () => {
      unsuscribe();
    };
  }, [auth, contacts]);

  return (
    <>
      <FlatList
        data={chats}
        renderItem={({ item }) => {
          return (
            <>
            <List.Item
              key={item.id}
              title={item.name}
              description={item.message}
              titleStyle={item.id === 1 ? { fontWeight: "bold" } : undefined}
              descriptionStyle={
                item.id === 1 ? { fontWeight: "bold" } : undefined
              }
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
                    size={40}
                    label={item.name
                      .split(" ")
                      .slice(0, 2)
                      .map((e) => e[0])
                      .join("")}
                    color="white"
                  />
                </View>
              )}
              right={(props) => (
                <View
                  style={{
                    flex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Badge size={25} visible={item.id === 1 ? true : false}>
                    {item.id === 1 ? item.unread : 0}
                  </Badge>
                </View>
              )}
              onPress={(e) =>
                props.navigation.push("Chat", { id: item.id, name: item.name })
              }
            />
            <Divider style={{ height: 1 }}/>
            </>
          );
        }}
      />
    </>
  );
}
