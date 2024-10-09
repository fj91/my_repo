import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "@emotion/native";
import { Avatar, List, Appbar, Divider } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import { useContacts } from "../../hooks/useContacts";
import { FlatList } from "react-native-gesture-handler";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../../services/firebase";

const StyledListItem = styled(List.Item)``;

export function Contacts() {
  const navigation = useNavigation();
  const { auth } = useAuth();
  const contacts = useContacts();
  //console.log(contacts)
  const navigateToChat = async (phoneNumber, name) => {
    //console.log(phoneNumber, name)
    const documents = await getDocs(
      query(
        collection(firestore, "chats"),
        where("phones", "array-contains", auth)
      )
    );
    const previousChat = documents.docs
      .map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      })
      .find((doc) => doc.phones.includes(phoneNumber));
    // console.log("newchat", {
    //   phones: [phoneNumber, auth],
    // });
    if (!previousChat) {
      const newChat = await addDoc(collection(firestore, "chats"), {
        phones: [auth, phoneNumber],
      });
      navigation.navigate("Mis chats", {
        screen: "Chat",
        params: { id: newChat.id, name },
      });
      return;
    }
    navigation.navigate("Mis chats", {
      screen: "Chat",
      params: { id: previousChat.id, name },
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Contactos" />
      </Appbar.Header>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return (
            <>
            <StyledListItem
              key={item.id}
              title={item.name}
              // description={item.phone}
              left={(props) => (
                <View
                  style={{
                    flex: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.imageAvailable ? (
                    <Avatar.Image {...props} size={50} source={item.image} />
                  ) : (
                    <Avatar.Text
                      {...props}
                      size={50}
                      label={item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((e) => e[0])
                        .join("")}
                      color="white"
                    />
                  )}
                </View>
              )}
              onPress={(e) =>
                navigateToChat(item.phoneNumbers[0].number, item.name)
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
