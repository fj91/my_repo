import styled from "@emotion/native";
import { View } from "react-native";
import { useState } from "react";
import {
  Title,
  Button,
  TextInput,
  Searchbar,
  Divider,
  List,
  Avatar,
} from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { firestore, storage, auth } from "../../services/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  getDownloadURL,
  ref,
  or,
  and,
  FieldPath,
} from "firebase/firestore";

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
  width: 72%;
`;

const StyledFlatList = styled(FlatList)`
  padding: 5px 20px;
`;

const StyledListItem = styled(List.Item)``;

export function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const listing = async () => {
    //console.log(searchQuery);
    //console.log(auth.currentUser?.email);
    if (searchQuery.trim().length === 0) {
      setUsers("");
    } else {
      const q = query(
        collection(firestore, "users"),
        or(
          // query as-is:
          and(
            where("name", ">=", searchQuery),
            where("name", "<=", searchQuery + "\uf8ff")
          ),
          // capitalize first letter:
          and(
            where(
              "name",
              ">=",
              searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
            ),
            where(
              "name",
              "<=",
              searchQuery.charAt(0).toUpperCase() +
                searchQuery.slice(1) +
                "\uf8ff"
            )
          ),
          // lowercase:
          and(
            where("name", ">=", searchQuery.toLowerCase()),
            where("name", "<=", searchQuery.toLowerCase() + "\uf8ff")
          )
        )
      );
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs
        .filter((doc) => doc.data().email !== auth.currentUser?.email)
        .map((doc) => {         
          return {
            // console.log(doc.id, " => ", doc.data())
            id: doc.id,
            ...doc.data(),
          };
        });     
      setUsers(list);
      //console.log(list);
    }
  };  

  return (
    <>
      <CenterBody>
        <Searchbar
          placeholder="Buscar"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={listing}
          onClearIconPress={() => setUsers("")}
        />
      </CenterBody>
      <StyledFlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <>
              <StyledListItem
                key={item.id}
                title={item.name + " " + item.lastname}
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
                onPress={(e) =>
                    navigation.navigate("Profile", { item })
                  }
              />
              <Divider style={{ height: 1 }} />
            </>
          );
        }}
      />
    </>
  );
}
