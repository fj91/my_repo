import styled from "@emotion/native";
import { Alert, View } from "react-native";
import { useEffect, useState } from "react";
import { Title, Button, TextInput, List, Divider, Avatar } from "react-native-paper";
import { auth, firestore } from "../../services/firebase";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

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
  margin-bottom: 5px;
`;

const Body = styled.View`
  flex: 1;
`;

const StyledInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledListItem = styled(List.Item)``;

export function Comments(props) {
  //console.log(props.route.params);
  //const [image, setImage] = useState("");
  const [comments, setComments] = useState("");
  const [comment, setComment] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCommentsData();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const loadCommentsData = async () => {
    //obtain list of comments of the post
    const query1 = await getDocs(
      query(collection(firestore, "posts", props.route.params.id, "comments"), orderBy("date", "asc"))
    );
    const list = query1.docs.map((doc) => {
      //const data = doc.data();
      //const userID = data.userID;
      return {
        ...doc.data(),
      };     
    });
    //console.log(list);
    setComments(list);
  };

  const handleComment = async () => {
    if (comment.trim().length === 0) {
      return Alert.alert("Comentarios vacíos no se permiten");
    } else {
      const query1 = await getDocs(
        query(
          collection(firestore, "users"),
          where("email", "==", auth.currentUser?.email)
        )
      );
      const user = query1.docs.map((doc) => {
        const data = doc.data();
        const name = data.name;
        const lastname = data.lastname;
        return {
          name: name,
          lastname: lastname,
        };
      });
      const data = JSON.parse(JSON.stringify(user[0]));
      await addDoc(
        collection(firestore, "posts", props.route.params.id, "comments"),
        {
          date: new Date(),
          comment: comment,
          userID: auth.currentUser?.uid,
          userName: data.name + " " + data.lastname,
        }
      );
      setComment("");
      await loadCommentsData();
    }
  };

  return (
    <Body>
      <FlatList
        keyExtractor={(item) => item.id}
        data={comments}
        renderItem={({ item }) => {
          return (
            <>
              <StyledListItem
                key={item.id}
                title={item.userName}
                description={item.comment}
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
                      size={50}
                      label={item.userName
                        .split(" ")
                        .slice(0, 2)
                        .map((e) => e[0])
                        .join("")}
                      color="white"
                    />
                  </View>
                )}
              />
              <Divider style={{ height: 1 }} />
            </>
          );
        }}
      ></FlatList>
      <StyledInputContainer>
        <StyledTextInput
          mode="outlined"
          multiline={true}
          value={comment}
          onChangeText={setComment}
          onEndEditing={handleComment}
          right={
            <TextInput.Icon icon="send" size={25} onPress={handleComment} />
          }
        />
      </StyledInputContainer>
    </Body>
  );
}
