import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FlatList, Text, View } from "react-native";
import { Avatar, Button, List } from "react-native-paper";
import { Body } from "../../components/Body";
import { useAuth } from "../../hooks/useAuth";
import { useContacts } from "../../hooks/useContacts";
import { firestore } from "../../services/firebase";

const ContactItem = styled.View`
  padding: 16px;
`;

const StyledListItem = styled(List.Item)`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.color ?? "black"};
`;

export function Contacts() {
  const navigation = useNavigation();
  const contacts = useContacts();
  const { auth } = useAuth();
  const navigateToChat = async (phoneNumber, name) => {
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
    console.log("newchat", {
      phones: [phoneNumber, auth],
    });
    if (!previousChat) {
      const newChat = await addDoc(collection(firestore, "chats"), {
        phones: [phoneNumber, auth],
      });
      navigation.navigate("ChatTab", {
        screen: "Chat",
        params: { id: newChat.id, name },
      });
      return;
    }
    navigation.navigate("ChatTab", {
      screen: "Chat",
      params: { id: previousChat.id, name },
    });
  };
  return (
    <Body>
      <Text>Vista de contactos</Text>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return (
            <StyledListItem
              key={item.id}
              title={`${item.firstName} ${item.lastName}`}
              description={item.phoneNumbers[0].number}
              color={item.id === 1 ? "red" : undefined}
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
                    label={(item.firstName[0] ?? "")}
                    color="white"
                  />
                </View>
              )}
              onPress={(e) =>
                navigateToChat(
                  item.phoneNumbers[0].number,
                  `${item.firstName} ${item.lastName}`
                )
              }
            />
          );
        }}
      />
      <Button
        onPress={() =>
          navigation.navigate("ChatTab", {
            screen: "Chat",
            params: { id: 100 },
          })
        }
      >
        Navegar
      </Button>
    </Body>
  );
}
